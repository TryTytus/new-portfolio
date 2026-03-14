// import { useRef, useMemo, useEffect, useState } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Points, PointMaterial } from '@react-three/drei';
// import * as THREE from 'three';

// // Random point generator for sphere distribution
// function generatePoints(count: number, radius: number) {
//     const points = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//         // Generate points inside a sphere
//         const u = Math.random();
//         const v = Math.random();
//         const theta = u * 2.0 * Math.PI;
//         const phi = Math.acos(2.0 * v - 1.0);
//         const r = Math.cbrt(Math.random()) * radius;

//         const sinPhi = Math.sin(phi);
//         const x = r * sinPhi * Math.cos(theta);
//         const y = r * sinPhi * Math.sin(theta);
//         const z = r * Math.cos(phi);

//         points[i * 3] = x;
//         points[i * 3 + 1] = y;
//         points[i * 3 + 2] = z;
//     }
//     return points;
// }

// function StarField() {
//     const ref = useRef<THREE.Points>(null);

//     // Create 5000 points distributed in a sphere of radius 15
//     const sphere = useMemo(() => generatePoints(5000, 15), []);

//     useFrame((state, delta) => {
//         if (ref.current) {
//             // Rotate the entire particle system slowly
//             ref.current.rotation.x -= delta / 10;
//             ref.current.rotation.y -= delta / 15;
//         }
//     });

//     return (
//         <group rotation={[0, 0, Math.PI / 4]}>
//             <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
//                 <PointMaterial
//                     transparent
//                     color="#22C55E" // CTA Emerald Green
//                     size={0.05}
//                     sizeAttenuation={true}
//                     depthWrite={false}
//                     blending={THREE.AdditiveBlending}
//                 />
//             </Points>
//         </group>
//     );
// }

// function GridTunnel() {
//     const ref = useRef<THREE.Group>(null);
//     const scrollYRef = useRef(0);

//     useEffect(() => {
//         // Track scroll passively to avoid forced synchronous layout in useFrame
//         const handleScroll = () => {
//             scrollYRef.current = window.scrollY;
//         };
//         handleScroll();
//         window.addEventListener('scroll', handleScroll, { passive: true });
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useFrame((state) => {
//         if (ref.current) {
//             const scrollY = scrollYRef.current;
//             ref.current.position.z = (scrollY * 0.01) % 10; // Endless moving forward effect
//             ref.current.rotation.z = scrollY * 0.001; // Slight twist on scroll
//         }
//     });

//     return (
//         <group ref={ref}>
//             {/* Create multiple rings to form a wireframe tunnel */}
//             {Array.from({ length: 20 }).map((_, i) => (
//                 <mesh key={i} position={[0, 0, -i * 5]}>
//                     <torusGeometry args={[8, 0.02, 16, 64]} />
//                     <meshBasicMaterial color="#334155" wireframe transparent opacity={0.3} />
//                 </mesh>
//             ))}

//             {/* Add intersecting lines for the tunnel */}
//             {Array.from({ length: 8 }).map((_, i) => (
//                 <mesh key={`line-${i}`} rotation={[0, 0, (i * Math.PI) / 4]}>
//                     <cylinderGeometry args={[0.02, 0.02, 100, 8]} />
//                     <meshBasicMaterial color="#1E293B" wireframe transparent opacity={0.2} />
//                 </mesh>
//             ))}
//         </group>
//     );
// }

// export default function CyberpunkCanvas() {
//     // Determine dpr safely
//     const [dpr, setDpr] = useState(1);
//     useEffect(() => {
//         const isLowEnd = (navigator as any).hardwareConcurrency <= 4;
//         setDpr(isLowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 2));
//     }, []);

//     return (
//         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//             <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={dpr}>
//                 {/* Core lighting (mostly using basic/emissive materials so light isn't strictly necessary, but good for future proofing) */}
//                 <ambientLight intensity={0.5} />

//                 {/* Fog to obscure the distance and create depth in the dark environment */}
//                 <fog attach="fog" args={['#0F172A', 5, 25]} />

//                 <StarField />
//                 <GridTunnel />
//             </Canvas>

//             {/* Overlay gradient to ensure text readability over the 3D canvas */}
//             <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/80 to-background-dark pointer-events-none" />
//         </div>
//     );
// }
