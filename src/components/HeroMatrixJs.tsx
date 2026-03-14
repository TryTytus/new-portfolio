// // HeroMatrixJs.tsx
// // Implementation strategy: Custom Element (Web Component).
// // React only renders a single <hero-matrix-js /> tag — zero hooks, zero refs,
// // zero re-renders. All canvas logic lives in the browser's native element
// // lifecycle (connectedCallback / disconnectedCallback), completely outside
// // React's reconciler and therefore completely outside the scroll critical path.

// // ─── CONFIGURATION ─────────────────────────────────────────────────────────
// export const MATRIX_CONFIG = {
//     FONT_SIZE: 20,
//     MIN_SPEED: 0.5,
//     MAX_SPEED: 1.5,
//     FPS: 30,
//     ENABLE_GLOW: true,
//     TRAIL_OPACITY_FADE: 0.15,
//     DROP_RESET_PROBABILITY: 0.95,
// } as const;

// // ─── PRE-BUILT CONSTANTS (module-level, allocated once) ────────────────────
// const CHARS =
//     '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン*&^%$#@!';
// const CHAR_LEN = CHARS.length;

// // Pre-built green strings — zero template-literal allocation in draw loop
// const GREEN_SHADES: string[] = [];
// for (let v = 180; v <= 255; v++) {
//     GREEN_SHADES.push(`rgba(34,${v},94,`);
// }
// const GREEN_LEN = GREEN_SHADES.length;
// const HEAD_COLOR = 'rgba(134,239,172,';

// // ─── MATRIX ENGINE ─────────────────────────────────────────────────────────
// class MatrixEngine {
//     private canvas: HTMLCanvasElement;
//     private ctx: CanvasRenderingContext2D;
//     private rafId = 0;
//     private lastTime = 0;
//     private interval: number;
//     private logW = 0;
//     private logH = 0;
//     private dpr = 1;
//     private resizeTimer = 0;
//     private columns = 0;
//     private fontSize = MATRIX_CONFIG.FONT_SIZE;

//     // Typed arrays → V8 stores them as JSARRAY_DOUBLE, no pointer chasing
//     private drops!: Float32Array;
//     private speeds!: Float32Array;
//     private opacities!: Float32Array;
//     private edgeFade!: Float32Array;

//     private static lowEnd = (() => {
//         const cores = (navigator as { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
//         return cores <= 2;
//     })();

//     constructor(canvas: HTMLCanvasElement) {
//         this.canvas = canvas;
//         this.interval = 1000 / MATRIX_CONFIG.FPS;

//         // alpha:false → compositor skips premultiplication every frame
//         const ctx = canvas.getContext('2d', { alpha: false });
//         if (!ctx) throw new Error('No 2d context');
//         this.ctx = ctx;

//         // Own GPU layer → scroll never triggers a canvas repaint
//         canvas.style.cssText += ';transform:translateZ(0);will-change:transform;';

//         this.resize();
//         this.loop = this.loop.bind(this);
//         this.rafId = requestAnimationFrame(this.loop);
//     }

//     resize() {
//         const parent = this.canvas.parentElement;
//         if (!parent) return;

//         const dpr = MatrixEngine.lowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 2);
//         this.dpr = dpr;
//         this.logW = parent.clientWidth;
//         this.logH = parent.clientHeight;
//         this.canvas.width = Math.round(this.logW * dpr);
//         this.canvas.height = Math.round(this.logH * dpr);
//         this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//         this.columns = Math.ceil(this.logW / this.fontSize);
//         this.allocArrays();
//         this.buildEdgeFade();
//     }

//     private allocArrays() {
//         const n = this.columns;
//         this.drops = new Float32Array(n);
//         this.speeds = new Float32Array(n);
//         this.opacities = new Float32Array(n);
//         const minS = MATRIX_CONFIG.MIN_SPEED;
//         const rangeS = MATRIX_CONFIG.MAX_SPEED - minS;
//         for (let i = 0; i < n; i++) {
//             this.drops[i] = Math.random() * -100;
//             this.speeds[i] = minS + Math.random() * rangeS;
//             this.opacities[i] = 0.5 + Math.random() * 0.5;
//         }
//     }

//     // Pre-compute edge-fade → zero Math.pow / division in draw loop
//     private buildEdgeFade() {
//         const n = this.columns;
//         this.edgeFade = new Float32Array(n);
//         const halfW = this.logW / 2;
//         for (let i = 0; i < n; i++) {
//             const r = Math.abs(i * this.fontSize - halfW) / halfW;
//             this.edgeFade[i] = Math.max(0.1, 1 - r * r);
//         }
//     }

//     private loop(ts: number) {
//         this.rafId = requestAnimationFrame(this.loop);
//         if (document.hidden) return; // free CPU when tab invisible

//         const delta = ts - this.lastTime;
//         if (delta < this.interval) return;
//         this.lastTime = ts - (delta % this.interval);
//         this.draw();
//     }

//     private draw() {
//         const { ctx, logW, logH, fontSize: fs, columns: n,
//             drops, speeds, opacities, edgeFade } = this;
//         const { TRAIL_OPACITY_FADE, DROP_RESET_PROBABILITY,
//             MIN_SPEED, MAX_SPEED, ENABLE_GLOW } = MATRIX_CONFIG;
//         const rangeS = MAX_SPEED - MIN_SPEED;

//         // Fade — one fillRect = one GPU draw call
//         ctx.fillStyle = `rgba(2,6,23,${TRAIL_OPACITY_FADE})`;
//         ctx.fillRect(0, 0, logW, logH);

//         ctx.font = `bold ${fs}px "Fira Code",monospace`;
//         ctx.shadowBlur = 0;

//         for (let i = 0; i < n; i++) {
//             const yPx = drops[i] * fs;
//             const ef = edgeFade[i];

//             // Bitwise | 0 is faster than Math.floor in a hot loop
//             const char = CHARS[(Math.random() * CHAR_LEN) | 0];
//             const isHead = Math.random() > 0.90;

//             if (isHead) {
//                 ctx.fillStyle = HEAD_COLOR + ef.toFixed(2) + ')';
//                 if (ENABLE_GLOW) { ctx.shadowColor = '#4ADE80'; ctx.shadowBlur = 10; }
//             } else {
//                 const si = ((0.55 + Math.random() * 0.45) * GREEN_LEN) | 0;
//                 ctx.fillStyle = GREEN_SHADES[si < GREEN_LEN ? si : GREEN_LEN - 1]
//                     + (opacities[i] * ef * 1.5).toFixed(2) + ')';
//                 if (ENABLE_GLOW) ctx.shadowBlur = 0;
//             }

//             ctx.fillText(char, i * fs, yPx);

//             if (isHead && ENABLE_GLOW) ctx.shadowBlur = 0;

//             if (yPx > logH && Math.random() > DROP_RESET_PROBABILITY) {
//                 drops[i] = 0;
//                 speeds[i] = MIN_SPEED + Math.random() * rangeS;
//             }
//             drops[i] += speeds[i];
//         }
//     }

//     scheduleResize() {
//         clearTimeout(this.resizeTimer);
//         this.resizeTimer = window.setTimeout(() => this.resize(), 200);
//     }

//     destroy() {
//         cancelAnimationFrame(this.rafId);
//         clearTimeout(this.resizeTimer);
//     }
// }

// // ─── CUSTOM ELEMENT ────────────────────────────────────────────────────────
// // connectedCallback / disconnectedCallback are called synchronously by the
// // browser before React ever gets to diffing — completely outside React's
// // reconciler and therefore zero scroll penalty.

// class HeroMatrixElement extends HTMLElement {
//     private engine: MatrixEngine | null = null;
//     private canvas: HTMLCanvasElement | null = null;
//     private overlay: HTMLDivElement | null = null;
//     private onResize: () => void = () => { };

//     connectedCallback() {
//         // Shadow DOM not used — we need Tailwind classes to apply normally
//         this.style.cssText =
//             'display:block;position:absolute;inset:0;overflow:hidden;' +
//             'border-radius:1rem;opacity:.9;';

//         // Canvas
//         const canvas = document.createElement('canvas');
//         canvas.style.cssText =
//             'position:absolute;inset:0;width:100%;height:100%;' +
//             'mix-blend-mode:screen;' +
//             'mask-image:radial-gradient(ellipse at center,black 25%,transparent 85%);' +
//             '-webkit-mask-image:radial-gradient(ellipse at center,black 25%,transparent 85%);';
//         this.canvas = canvas;
//         this.appendChild(canvas);

//         // Glass overlay
//         const overlay = document.createElement('div');
//         overlay.style.cssText =
//             'position:absolute;inset:0;background:rgba(2,6,23,.1);' +
//             'backdrop-filter:blur(1px);pointer-events:none;';
//         this.overlay = overlay;
//         this.appendChild(overlay);

//         // Start engine
//         this.engine = new MatrixEngine(canvas);

//         // Resize
//         const engine = this.engine;
//         this.onResize = () => engine.scheduleResize();
//         window.addEventListener('resize', this.onResize, { passive: true });
//     }

//     disconnectedCallback() {
//         this.engine?.destroy();
//         this.engine = null;
//         window.removeEventListener('resize', this.onResize);
//     }
// }

// // Register only once (hot-reload guard)
// if (!customElements.get('hero-matrix-js')) {
//     customElements.define('hero-matrix-js', HeroMatrixElement);
// }

// // ─── TYPE DECLARATION for TSX ──────────────────────────────────────────────
// declare global {
//     namespace JSX {
//         interface IntrinsicElements {
//             'hero-matrix-js': React.HTMLAttributes<HTMLElement>;
//         }
//     }
// }

// // ─── REACT COMPONENT (single tag, zero hooks) ──────────────────────────────
// // React renders exactly one DOM element; the custom element class does the rest.
// export default function HeroMatrixJs() {
//     // eslint-disable-next-line react/jsx-pascal-case
//     return <hero-matrix-js />;
// }
