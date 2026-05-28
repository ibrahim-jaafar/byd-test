import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

export default function Car() {
  const { scene } = useGLTF("/models/byd.glb");

  useEffect(() => {
    if (!scene) return;

    // Center model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // Auto scale
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Bigger scale for cars
    const scale = 4 / maxDim;

    scene.scale.setScalar(scale);

  }, [scene]);

  return <primitive object={scene} />;
}