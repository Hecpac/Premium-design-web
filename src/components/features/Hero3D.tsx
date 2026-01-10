"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import { Float, Points, PointMaterial } from "@react-three/drei";

/**
 * Cinematic 3D Backdrop
 * Agentrules v2.0.0 Regla #4 Compliance:
 * - Restricted DPR for mobile performance
 * - useInView for pausing off-screen render
 * - frameloop="demand" not used here as we want continuous subtle drift, 
 *   but suspended when out of view via conditional rendering.
 */

function DustParticles({ count = 500 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const ref = useRef<THREE.Points>(null!);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = t * 0.05;
        ref.current.rotation.x = t * 0.03;
    });

    return (
        <Points positions={points} ref={ref}>
            <PointMaterial
                transparent
                vertexColors={false}
                color="#ffffff"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.2}
            />
        </Points>
    );
}

function Atmosphere() {
    return (
        <group>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <DustParticles count={400} />
            </Float>
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffa500" />
        </group>
    );
}

export function Hero3D() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });

    return (
        <div ref={ref} className="absolute inset-0 z-[1] pointer-events-none opacity-40">
            {inView && (
                <Canvas
                    dpr={[1, 1.5]}
                    gl={{ antialias: false, powerPreference: "high-performance" }}
                    camera={{ position: [0, 0, 5], fov: 45 }}
                >
                    <Suspense fallback={null}>
                        <Atmosphere />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}
