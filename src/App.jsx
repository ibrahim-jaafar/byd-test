import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
} from "@react-three/drei";

import { Suspense } from "react";

import Car from "./Car";

function Loader() {
  return (
    <Html center>
      <div
        style={{
          color: "white",
          fontSize: "20px",
          fontFamily: "Arial",
        }}
      >
        Loading EV Model...
      </div>
    </Html>
  );
}

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 5], fov: 50 }}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#111",
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Environment */}
      <Environment preset="city" />

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />

        <shadowMaterial opacity={0.35} />
      </mesh>

      {/* Car Model */}
      <Suspense fallback={<Loader />}>
        <Car />
      </Suspense>

      {/* Controls */}
      <OrbitControls
        enableDamping
        autoRotate
        autoRotateSpeed={1}
        minDistance={2}
        maxDistance={15}
      />
    </Canvas>
  );
}