import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
} from "@react-three/drei";

import Car from "./Car";

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 50 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Lighting */}
      <ambientLight intensity={1} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      {/* HDR-like environment */}
      <Environment preset="city" />

      {/* Car */}
      <Car />

      {/* Camera controls */}
      <OrbitControls
        enableDamping
        minDistance={2}
        maxDistance={15}
      />
    </Canvas>
  );
}