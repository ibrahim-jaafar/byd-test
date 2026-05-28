import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
} from "@react-three/drei";

import { Suspense, useEffect, useRef, useState } from "react";
import Car from "./Car";

function Loader() {
  return (
    <Html center>
      <div style={{ color: "white", fontSize: "18px" }}>
        Loading 3D Model...
      </div>
    </Html>
  );
}

/**
 * Auto floor that adapts to scene size
 */
function AutoFloor({ carRef }) {
  const meshRef = useRef();
  const [size, setSize] = useState(10);

  useEffect(() => {
    if (!carRef?.current) return;

    const box = new THREE.Box3().setFromObject(carRef.current);
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);

    // scale floor relative to car size
    setSize(sphere.radius * 6);
  }, [carRef]);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      receiveShadow
      ref={meshRef}
    >
      <planeGeometry args={[size, size]} />

      <meshStandardMaterial
        color="#222"
        metalness={0.3}
        roughness={0.6}
      />
    </mesh>
  );
}

export default function App() {
  const carRef = useRef();

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 5], fov: 50 }}
      style={{ width: "100vw", height: "100vh", background: "#111" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.1} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={0.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Environment */}
      <Environment preset="sunset" />

      {/* CAR */}
      <Suspense fallback={<Loader />}>
        <Car ref={carRef} />
      </Suspense>

      {/* AUTO FLOOR */}
      <AutoFloor carRef={carRef} />

      {/* Controls */}
      <OrbitControls
        enableDamping
        autoRotate
        autoRotateSpeed={1}
        minDistance={2}
        maxDistance={15}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}