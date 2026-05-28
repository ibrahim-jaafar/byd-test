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
          fontSize: "18px",
          fontFamily: "Arial",
        }}
      >
        Loading 3D Model...
      </div>
    </Html>
  );
}

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 8], fov: 50 }}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#111",
      }}
    >
      {/* ===================== */}
      {/* LIGHTING (IMPORTANT) */}
      {/* ===================== */}

      <ambientLight intensity={0.6} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.5}
      />

      {/* ===================== */}
      {/* ENVIRONMENT LIGHT */}
      {/* ===================== */}
      <Environment preset="sunset" />

      {/* ===================== */}
      {/* FLOOR (SHOWROOM STYLE) */}
      {/* ===================== */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />

        <meshStandardMaterial
          color="#1e1e1e"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* ===================== */}
      {/* CAR MODEL */}
      {/* ===================== */}
      <Suspense fallback={<Loader />}>
        <Car />
      </Suspense>

      {/* ===================== */}
      {/* CAMERA CONTROLS */}
      {/* ===================== */}
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