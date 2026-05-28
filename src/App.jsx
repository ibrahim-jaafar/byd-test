import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import Car from "./Car";

const MODEL_URL = "https://raw.githubusercontent.com/ibrahim-jaafar/byd-test/b13b23e04d4698323bb5a2e5c2de168c9f0a9653/public/models/2024_byd_dolphin.glb";

function Loader({ progress }) {
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
  const [progress, setProgress] = useState(0);
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", MODEL_URL, true);
    xhr.responseType = "blob";

    xhr.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress((e.loaded / e.total) * 100);
      }
    };

    xhr.onload = () => {
      const url = URL.createObjectURL(xhr.response);
      setBlobUrl(url);
    };

    xhr.onerror = () => {
      console.error("Failed to download model");
    };

    xhr.send();

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  const floorSize = carBounds ? carBounds.radius * 6 : 10;

  return (
    <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
      <Environment preset="sunset" />

      {!blobUrl && <Loader progress={progress} />}

      {blobUrl && (
        <Suspense fallback={null}>
          <Car url={blobUrl} onReady={setCarBounds} />
        </Suspense>
      )}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, carBounds ? -carBounds.size.y / 2 : -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[floorSize, floorSize]} />
        <meshStandardMaterial color="#222" />
      </mesh>

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