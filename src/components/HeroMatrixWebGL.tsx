import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- MATRIX CONFIGURATION ---
export const MATRIX_CONFIG = {
    FONT_SIZE: 20,
    MIN_SPEED: 0.5,
    MAX_SPEED: 1.5,
    FPS: 24,
    ENABLE_GLOW: true, // we handle fake glow in shader
} as const;

// Single static characters array
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン*&^%$#@!';

// 1. Generate Texture Atlas
function createTextAtlas() {
    const canvas = document.createElement('canvas');
    const texSize = 1024;
    const gridSize = 16; // 16x16 = 256 cells
    const cellSize = texSize / gridSize;
    
    canvas.width = texSize;
    canvas.height = texSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, texSize, texSize);
    
    // Draw text in white
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${cellSize * 0.75}px "Fira Code", monospace`;
    
    for (let i = 0; i < CHARS.length; i++) {
        const char = CHARS[i];
        const col = i % gridSize;
        const row = Math.floor(i / gridSize);
        // Add + 2px offset to baseline for better vertical centering
        ctx.fillText(char, (col * cellSize) + (cellSize / 2), (row * cellSize) + (cellSize / 2) + 2);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    // We want 0,0 to be top-left so it matches canvas logic
    texture.flipY = false;
    texture.needsUpdate = true;
    
    return texture;
}

// 2. Shader Material setup
const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;
uniform float uColumns;
uniform float uRows;
uniform float uMinSpeed;
uniform float uMaxSpeed;
uniform float uFps;

varying vec2 vUv;

// Hash function for pseudo-random numbers
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // Grid coordinates
    vec2 gridCoord = vec2(floor(vUv.x * uColumns), floor((1.0 - vUv.y) * uRows));
    vec2 cellUv = vec2(fract(vUv.x * uColumns), fract((1.0 - vUv.y) * uRows));
    
    // Column logic
    float colRandom = random(vec2(gridCoord.x, 0.0));
    float speedRange = uMaxSpeed - uMinSpeed;
    float speed = uMinSpeed + colRandom * speedRange; 
    float offset = colRandom * 1000.0;
    
    // Discretize time based on FPS
    float tTime = floor(uTime * uFps) / uFps;
    
    // Calculate drop position
    // Speed factor 15.0 scales the uniform speed to grid cells per second roughly
    float dropPos = tTime * speed * 25.0 + offset; 
    
    // Logic for cycles (so drops reset naturally with random gaps)
    float maxTailLength = uRows * 0.8;
    float cycleLength = uRows + maxTailLength * (1.0 + random(vec2(gridCoord.x, 1.0)));
    
    float cyclePos = mod(dropPos, cycleLength);
    float dist = cyclePos - gridCoord.y;
    
    float glow = 0.0;
    float head = 0.0;
    
    if (dist >= 0.0) {
        float colTailLength = maxTailLength * (0.5 + colRandom * 0.5);
        if (dist < colTailLength) {
            glow = 1.0 - (dist / colTailLength);
        }
        if (dist < 1.0) {
            head = 1.0;
        }
    }
    
    // Change characters randomly
    float charChangeFreq = 10.0; // Changes per second
    float charRandom = random(vec2(gridCoord.x, gridCoord.y + floor(uTime * charChangeFreq)));
    float charIndex = floor(charRandom * 96.0); // We have ~96 characters in our string
    
    float atlasCols = 16.0;
    float charCol = mod(charIndex, atlasCols);
    float charRow = floor(charIndex / atlasCols);
    
    // UV inside texture atlas
    vec2 texAtlasUv = vec2(
        (charCol + cellUv.x) / atlasCols,
        (charRow + cellUv.y) / atlasCols
    );
    
    vec4 texColor = texture2D(uTexture, texAtlasUv);
    float charAlpha = texColor.r; // BW texture
    
    // Colors
    vec3 bgColor = vec3(2.0/255.0, 6.0/255.0, 23.0/255.0);
    // Green varies slightly per column
    vec3 greenColor = vec3(20.0/255.0, 150.0/255.0 + colRandom*85.0/255.0, 70.0/255.0);
    vec3 headColor = vec3(134.0/255.0, 239.0/255.0, 172.0/255.0);
    
    vec3 finalColor = bgColor;
    
    // Edge fade (radial gradient mask)
    float maxDist = 0.5;
    float distFromCenter = abs(vUv.x - 0.5);
    float edgeFade = max(0.1, 1.0 - pow(distFromCenter / maxDist, 2.0));
    
    float trailOpacity = 0.5 + colRandom * 0.5;
    
    if (charAlpha > 0.3 && glow > 0.0) {
        if (head > 0.0 && random(vec2(tTime, gridCoord.x)) > 0.1) {
            finalColor = mix(bgColor, headColor, edgeFade);
        } else {
            // Apply exponential curve to glow for sharper fade
            float boostedGlow = pow(glow, 1.5);
            finalColor = mix(bgColor, greenColor, boostedGlow * edgeFade * trailOpacity * 2.0);
        }
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

// 3. React Three Fiber Component (The Quad)
function MatrixShaderQuad({ texture, fontSize }: { texture: THREE.Texture, fontSize: number }) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { size, viewport } = useThree();
    
    // Compute logical columns and rows based on container size and device pixel ratio
    // To match HTML exactly, we use size.width / fontSize
    const columns = Math.ceil(size.width / fontSize);
    const rows = Math.ceil(size.height / fontSize);
    
    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uColumns: { value: columns },
        uRows: { value: rows },
        uMinSpeed: { value: MATRIX_CONFIG.MIN_SPEED },
        uMaxSpeed: { value: MATRIX_CONFIG.MAX_SPEED },
        uFps: { value: MATRIX_CONFIG.FPS }
    }), [texture, columns, rows, size.width, size.height]);
    
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // Update other uniforms dynamically if they changed
            materialRef.current.uniforms.uColumns.value = columns;
            materialRef.current.uniforms.uRows.value = rows;
            materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
        }
    });

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}

// 4. Main Component Wrapper
export default function HeroMatrixWebGL() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [dpr, setDpr] = useState(2);
    
    // Only generate texture once
    const texture = useMemo(() => createTextAtlas(), []);
    
    useEffect(() => {
        // Optimize device pixel ratio - use 1 for lower-end devices to save fillrate, 2 max
        const isLowEnd = (navigator as any).hardwareConcurrency <= 4;
        setDpr(isLowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 2));
        
        // Setup intersection observer to pause rendering when offscreen
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );
        
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        
        return () => observer.disconnect();
    }, []);

    if (!texture) return null;

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-[2rem] opacity-90">
            {isVisible && (
                <div className="absolute inset-0 w-full h-full mix-blend-screen"
                    style={{
                        maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 85%)',
                        // Force hardware acceleration layer
                        transform: 'translateZ(0)',
                        willChange: 'transform' // additional hint for browser
                    }}
                >
                    <Canvas
                        dpr={dpr}
                        camera={{ position: [0, 0, 1], type: 'OrthographicCamera', near: 0.1, far: 1000 }}
                        gl={{ 
                            powerPreference: "high-performance",
                            alpha: false, // Turn off canvas alpha for performance since we draw background color in shader
                            antialias: false, // Don't need antialiasing for this matrix effect
                        }}
                    >
                        <MatrixShaderQuad texture={texture} fontSize={MATRIX_CONFIG.FONT_SIZE} />
                    </Canvas>
                </div>
            )}
            
            {/* A glass overlay to make it sit deeper */}
            <div className="absolute inset-0 bg-background-dark/10 backdrop-blur-[1px] pointer-events-none" />
        </div>
    );
}
