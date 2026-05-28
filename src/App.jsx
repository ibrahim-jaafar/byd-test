import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useProgress } from "@react-three/drei";
import { Suspense, useState } from "react";
import Car from "./Car";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        color: "white",
        fontSize: "14px",
        textAlign: "center",
        fontFamily: "sans-serif"
      }}>
        <div>Loading car...</div>
        <div style={{
          marginTop: "8px",
          width: "200px",
          height: "4px",
          background: "#444",
          borderRadius: "2px"
        }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            background: "white",
            borderRadius: "2px",
            transition: "width 0.3s ease"
          }} />
        </div>
        <div style={{ marginTop: "4px" }}>{Math.round(progress)}%</div>
      </div>
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

      {/* FLOOR */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, carBounds ? -carBounds.size.y / 2 : -1, 0]}
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