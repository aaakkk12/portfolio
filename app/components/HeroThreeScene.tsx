"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { Box3, Vector3 } from "three";
import type { Group, Mesh } from "three";

type OrbitingShardProps = {
  radius: number;
  speed: number;
  offset: number;
  color: string;
  size: number;
};

function OrbitingShard({ radius, speed, offset, color, size }: OrbitingShardProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime() * speed + offset;
    meshRef.current.position.set(
      Math.cos(elapsed) * radius,
      Math.sin(elapsed * 1.24) * 0.62,
      Math.sin(elapsed) * radius * 0.44,
    );
    meshRef.current.rotation.x += 0.02;
    meshRef.current.rotation.y += 0.03;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[size, 2]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.45}
        metalness={0.35}
        roughness={0.22}
      />
    </mesh>
  );
}

function HeroModel() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/damaged-helmet.glb");
  const modelScene = useMemo(() => {
    const cloned = scene.clone(true);
    const modelBox = new Box3();
    const modelSize = new Vector3();
    const modelCenter = new Vector3();

    cloned.traverse((node) => {
      const mesh = node as Mesh;

      if (!mesh.isMesh) {
        return;
      }

      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    // Normalize imported model bounds so it always renders at predictable size.
    modelBox.setFromObject(cloned);
    modelBox.getSize(modelSize);
    modelBox.getCenter(modelCenter);

    cloned.position.sub(modelCenter);

    const maxAxis = Math.max(modelSize.x, modelSize.y, modelSize.z) || 1;
    const normalizedScale = 2.25 / maxAxis;
    cloned.scale.setScalar(normalizedScale);

    return cloned;
  }, [scene]);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsed * 0.28 + pointer.x * 0.28;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.42) * 0.07 + pointer.y * 0.2;
    groupRef.current.position.y = Math.sin(elapsed * 0.84) * 0.08;
  });

  return (
    <group ref={groupRef} position={[-2.7, -0.72, 0.15]}>
      <Float speed={2.4} rotationIntensity={0.26} floatIntensity={0.52}>
        <primitive object={modelScene} rotation={[0, Math.PI * 0.56, 0]} />
      </Float>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <torusGeometry args={[1.96, 0.06, 24, 180]} />
        <meshStandardMaterial
          color="#8ee4ff"
          emissive="#3d88a3"
          emissiveIntensity={0.45}
          metalness={0.6}
          roughness={0.24}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 7, Math.PI / 4]} position={[0, -0.15, 0]}>
        <torusGeometry args={[2.34, 0.03, 24, 210]} />
        <meshStandardMaterial
          color="#ffd49a"
          emissive="#b67633"
          emissiveIntensity={0.4}
          metalness={0.45}
          roughness={0.24}
          transparent
          opacity={0.9}
        />
      </mesh>

      <OrbitingShard radius={2.55} speed={0.7} offset={0.5} color="#ffe8bf" size={0.12} />
      <OrbitingShard radius={2.16} speed={1.05} offset={2.1} color="#7de5f2" size={0.09} />
      <OrbitingShard radius={1.76} speed={1.38} offset={4.3} color="#fdb65a" size={0.1} />

      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.5, 80]} />
        <meshStandardMaterial color="#0f455c" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export default function HeroThreeScene() {
  return (
    <div className="hero-three-shell" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.4]}
        camera={{ position: [0, 0.72, 9.3], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#03121e"]} />
        <fog attach="fog" args={["#03121e", 6, 16]} />
        <ambientLight intensity={0.45} color="#9ccce8" />
        <hemisphereLight args={["#8ed0ff", "#082337", 0.5]} />
        <directionalLight
          castShadow
          position={[5, 5.4, 4]}
          intensity={1.42}
          color="#ffe0b5"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-4.4, 1.2, 2]} intensity={1.52} color="#66d5f5" />
        <pointLight position={[2.8, 1.6, -2]} intensity={1.05} color="#fdb65a" />
        <pointLight position={[0, -1.8, 1]} intensity={0.65} color="#88eeff" />
        <Suspense fallback={null}>
          <HeroModel />
        </Suspense>
        <Sparkles count={210} scale={[22, 9, 13]} size={1.9} speed={0.24} opacity={0.66} color="#d2f8ff" />
        <Sparkles count={110} scale={[16, 7, 10]} size={2.4} speed={0.34} opacity={0.42} color="#ffd5a5" />
      </Canvas>
      <div className="hero-three-vignette" />
      <div className="hero-three-glow" />
    </div>
  );
}

useGLTF.preload("/models/damaged-helmet.glb");
