import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
} from "@react-three/drei";

import { Suspense, useState } from "react";
import Car from "./Car";

function Loader() {
  return (
    <Html center>
      <div style={{ color: "white" }}>Loading...</div>
    </Html>
  );
}

export default function App() {
  const [carBounds, setCarBounds] = useState(null);

  const floorSize = carBounds ? carBounds.radius * 6 : 10;

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 5], fov: 50 }}
    >
      {/* LIGHTS */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow />

      <Environment preset="sunset" />

      {/* CAR */}
      <Suspense fallback={<Loader />}>
        <Car onReady={setCarBounds} />
      </Suspense>

      {/* FLOOR (NOW PROPERLY SCALED) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[floorSize, floorSize]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* CAMERA */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        minDistance={2}
        maxDistance={15}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}