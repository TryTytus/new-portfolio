import { useRef, useEffect } from 'react';

// --- MATRIX CONFIGURATION ---
// You can edit these values to change how the matrix effect looks and feels!
export const MATRIX_CONFIG = {
    // Density & Size
    FONT_SIZE: 20,                 // Smaller number = More dense columns. Larger = less dense.

    // Speed
    MIN_SPEED: 0.5,                // Minimum falling speed
    MAX_SPEED: 1.5,                // Maximum falling speed

    // Performance & Framerate
    FPS: 30,                       // Higher = smoother but more CPU intensive. 24 or 30 is good.
    ENABLE_GLOW: true,             // Set to false to massively improve performance on old computers

    // Visuals
    TRAIL_OPACITY_FADE: 0.15,      // How fast the trails fade out (lower = longer trails)
    DROP_RESET_PROBABILITY: 0.95,  // Probability a drop will reset after falling off-screen
};

export default function HeroMatrix() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d', { alpha: false }); // Optimize by disabling alpha on context if we fill rect anyway, but we do need alpha for trails. Let's keep default but optimize draw loop.
        if (!ctx) return;

        let animationFrameId: number;
        let isVisible = true;
        let lastDrawTime = 0;
        const fps = MATRIX_CONFIG.FPS;
        const interval = 1000 / fps;

        // Make it high res
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                // Use devicePixelRatio for sharper text, but scale down slightly for performance if needed
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                canvas.width = parent.clientWidth * dpr;
                canvas.height = parent.clientHeight * dpr;
                ctx.scale(dpr, dpr);
            }
        };
        resizeCanvas();

        // Characters for the matrix rain
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン*&^%$#@!'.split('');

        const fontSize = MATRIX_CONFIG.FONT_SIZE;
        // Calculate logical columns based on unscaled width
        let columns = Math.ceil((canvas.width / (Math.min(window.devicePixelRatio || 1, 2))) / fontSize);

        let drops: number[] = [];
        let speeds: number[] = [];
        let opacities: number[] = [];

        const initDrops = () => {
            drops = [];
            speeds = [];
            opacities = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.random() * -100;
                speeds[x] = MATRIX_CONFIG.MIN_SPEED + Math.random() * (MATRIX_CONFIG.MAX_SPEED - MATRIX_CONFIG.MIN_SPEED);
                opacities[x] = 0.5 + Math.random() * 0.5;
            }
        };
        initDrops();

        const draw = (timestamp: number) => {
            if (!isVisible) return;

            animationFrameId = requestAnimationFrame(draw);

            // Throttle FPS
            const deltaTime = timestamp - lastDrawTime;
            if (deltaTime < interval) return;
            lastDrawTime = timestamp - (deltaTime % interval);

            const logicalWidth = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
            const logicalHeight = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

            // Radial gradient mask for trail effect
            ctx.fillStyle = `rgba(2, 6, 23, ${MATRIX_CONFIG.TRAIL_OPACITY_FADE})`; // Slightly darker to clear faster (better performance than long trails)
            ctx.fillRect(0, 0, logicalWidth, logicalHeight);

            ctx.font = `bold ${fontSize}px "Fira Code", monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];

                // Calculate fade based on column position (edges more transparent)
                const xPos = i * fontSize;
                const centerX = logicalWidth / 2;
                const distFromCenter = Math.abs(xPos - centerX);
                const maxDist = logicalWidth / 2;
                const edgeFade = Math.max(0.1, 1 - Math.pow(distFromCenter / maxDist, 2));

                const colorValue = Math.floor(180 + Math.random() * 75);
                ctx.fillStyle = `rgba(34, ${colorValue}, 94, ${opacities[i] * edgeFade * 1.5})`;

                // Head of the drop
                if (Math.random() > 0.90) {
                    ctx.fillStyle = `rgba(134, 239, 172, ${edgeFade})`;
                    if (MATRIX_CONFIG.ENABLE_GLOW) {
                        ctx.shadowColor = '#4ADE80';
                        ctx.shadowBlur = 10;
                    } else {
                        ctx.shadowBlur = 0;
                    }
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(text, xPos, drops[i] * fontSize);

                // Reset drop
                if (drops[i] * fontSize > logicalHeight && Math.random() > MATRIX_CONFIG.DROP_RESET_PROBABILITY) {
                    drops[i] = 0;
                    speeds[i] = MATRIX_CONFIG.MIN_SPEED + Math.random() * (MATRIX_CONFIG.MAX_SPEED - MATRIX_CONFIG.MIN_SPEED);
                }

                drops[i] += speeds[i];
            }
        };

        // Intersection Observer to pause when off-screen
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                    if (isVisible) {
                        lastDrawTime = performance.now();
                        animationFrameId = requestAnimationFrame(draw);
                    } else {
                        cancelAnimationFrame(animationFrameId);
                    }
                });
            },
            { threshold: 0 }
        );

        observer.observe(container);

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                columns = Math.ceil((canvas.width / (Math.min(window.devicePixelRatio || 1, 2))) / fontSize);
                initDrops();
            }, 200); // Debounce resize
        };

        window.addEventListener('resize', handleResize);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-[2rem] opacity-90">
            {/* The canvas itself */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full mix-blend-screen"
                style={{
                    maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)',
                }}
            />
            {/* A glass overlay to make it sit deeper */}
            <div className="absolute inset-0 bg-background-dark/10 backdrop-blur-[1px] pointer-events-none" />
        </div>
    );
}
