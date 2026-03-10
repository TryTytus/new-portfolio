import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls, Line } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Data for DNA
const numNodes = 60;
const radius = 2.5;

function DataParticles() {
    const pointsRef = useRef<THREE.Points>(null);
    const particleCount = 500;

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);
        const color = new THREE.Color();

        for (let i = 0; i < particleCount; i++) {
            // Random positions inside a cylinder/sphere
            const r = Math.random() * 8 + 2;
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 30;

            pos[i * 3] = r * Math.cos(theta);
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = r * Math.sin(theta);

            // Matrix green colors
            color.setHSL(0.33, 1.0, Math.random() * 0.5 + 0.2);
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }
        return [pos, col];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            const positionsArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
            // Make particles fall like matrix rain
            for (let i = 0; i < particleCount; i++) {
                positionsArr[i * 3 + 1] -= 0.02;
                if (positionsArr[i * 3 + 1] < -15) {
                    positionsArr[i * 3 + 1] = 15;
                }
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function DNA() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    const nodes = useMemo(() => {
        const data = [];
        const keywords = ['REACT', 'THREE.JS', 'TYPESCRIPT', 'NODE.JS', 'NEXT.JS', 'WEBGL', 'HACKER', 'CYBER', 'SYSTEM', 'FRONTEND', 'BACKEND', 'UI/UX'];

        for (let i = 0; i < numNodes; i++) {
            const t = i * 0.4; // rotation offset
            const y = (i - numNodes / 2) * 0.4;

            const x1 = Math.cos(t) * radius;
            const z1 = Math.sin(t) * radius;

            const x2 = Math.cos(t + Math.PI) * radius;
            const z2 = Math.sin(t + Math.PI) * radius;

            data.push({ x: x1, y, z: z1, char: Math.random() > 0.5 ? '0' : '1', isBackbone: true });
            data.push({ x: x2, y, z: z2, char: Math.random() > 0.5 ? '1' : '0', isBackbone: true });

            // Base pair link
            if (i % 3 === 0) {
                const word = keywords[(i / 3) % keywords.length];
                data.push({
                    x: 0,
                    y,
                    z: 0,
                    char: word,
                    isBackbone: false,
                    rotation: [0, -t, 0] as [number, number, number]
                });
                // Adding a line connection
                data.push({
                    isLine: true,
                    start: [x1, y, z1] as [number, number, number],
                    end: [x2, y, z2] as [number, number, number],
                    opacity: 0.2
                });
            }
        }
        return data;
    }, []);

    return (
        <group ref={groupRef}>
            {nodes.map((n, i) => {
                if (n.isLine) {
                    return (
                        <Line
                            key={`line-${i}`}
                            points={[n.start!, n.end!]}
                            color="#10b981"
                            lineWidth={2}
                            transparent
                            opacity={n.opacity}
                        />
                    )
                }

                return (
                    <Text
                        key={i}
                        position={[n.x!, n.y!, n.z!]}
                        rotation={n.rotation || [0, 0, 0]}
                        fontSize={n.isBackbone ? 0.3 : 0.4}
                        color={n.isBackbone ? "#10b981" : "#34d399"}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {n.char}
                        <meshBasicMaterial
                            color={n.isBackbone ? "#059669" : "#6ee7b7"}
                            toneMapped={false}
                        />
                    </Text>
                );
            })}
        </group>
    );
}

export default function HackerAboutSection() {
    return (
        <section id="about" className="relative min-h-screen bg-background-dark border-y border-secondary/30 flex items-center overflow-hidden py-20">
            {/* The 3D Canvas Background for this section */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                    <ambientLight intensity={1} />
                    {/* We shift the controls target slightly to the right to balance the layout */}
                    <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.2} minPolarAngle={Math.PI / 2 - 0.2} target={[3, 0, 0]} />

                    <DataParticles />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        {/* We offset the DNA mesh to the right on desktop via the group position */}
                        <group position={[4, 0, 0]}>
                            <DNA />
                        </group>
                    </Float>
                </Canvas>
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent pointer-events-none lg:w-2/3" />
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/95 via-transparent to-background-dark/95 pointer-events-none" />

                {/* Vignette effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(5,5,5,0.8)_100%)] pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block px-4 py-2 border border-emerald-500/50 rounded-full bg-emerald-900/20 backdrop-blur-sm mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <span className="text-emerald-400 font-mono text-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                System.Identity.Unlock()
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                            CODE IS
                            <br />
                            <span className="text-white">MY DNA.</span>
                        </h2>

                        <div className="prose prose-invert max-w-lg font-mono relative">
                            {/* Decorative line */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-cyan-500 to-transparent"></div>

                            <div className="pl-6">
                                <p className="text-xl text-emerald-300 mb-6 drop-shadow-[0_0_5px_rgba(110,231,183,0.5)]">
                                    &gt; Analyzing subject... <br />
                                    &gt; Match found: Cybernetic Architect.
                                </p>
                                <p className="text-text-light/80 mb-4 text-lg">
                                    I don't just write code; I weave algorithms into the very fabric of the digital realm. My thought process is logic-gated, my creativity boundless.
                                </p>
                                <p className="text-text-light/80 text-lg">
                                    Where others see mere syntax on a screen, I see architecture, movement, and life. Every bracket, every semicolon, every function contributes to the living entity that is a modern web experience.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <div className="flex flex-col border border-emerald-500/30 p-4 bg-background-dark/60 backdrop-blur-md rounded-lg min-w-[140px] shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-emerald-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                <span className="text-emerald-400 font-mono text-xs mb-1">DATA_STREAMS</span>
                                <span className="text-3xl font-bold font-mono text-white">99.9%</span>
                            </div>
                            <div className="flex flex-col border border-cyan-500/30 p-4 bg-background-dark/60 backdrop-blur-md rounded-lg min-w-[140px] shadow-[0_0_20px_rgba(6,182,212,0.1)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                <span className="text-cyan-400 font-mono text-xs mb-1">NODE_CONNECTIONS</span>
                                <span className="text-3xl font-bold font-mono text-white">10K+</span>
                            </div>
                            <div className="flex flex-col border border-emerald-500/30 p-4 bg-background-dark/60 backdrop-blur-md rounded-lg min-w-[140px] shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-emerald-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                <span className="text-emerald-400 font-mono text-xs mb-1">SYSTEM_UPTIME</span>
                                <span className="text-3xl font-bold font-mono text-white">24/7/365</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIsPjwscmVjdD4KPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMiIgZmlsbD0icmdiYSgwLCAwLCAwLCAwLjE1KSI+PC9yZWN0Pgo8L3N2Zz4=')] opacity-50 mix-blend-overlay z-20"></div>
        </section>
    );
}
