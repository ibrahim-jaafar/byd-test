import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function Car() {
  const { scene } = useGLTF("https://github.com/ibrahim-jaafar/test/blob/ae22ad96778abd66fc64c0e49635210592c93509/byd.glb");
  return <primitive object={scene} scale={1} />;
}

export default function App() {
  return (
    <Canvas camera={{ position: [4, 2, 4], fov: 60 }}>
      
      {/* basic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      {/* realistic environment lighting */}
      <Environment preset="city" />

      {/* car model */}
      <Car />

      {/* mouse controls */}
      <OrbitControls enableDamping />
    </Canvas>
  );
}