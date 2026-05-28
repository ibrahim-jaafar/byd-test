import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

export default function Car() {
  const { scene } = useGLTF("/models/2024_byd_dolphin.glb");

  useEffect(() => {
    if (!scene) return;

    // Center model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // Auto scale (important for Blender exports)
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const scale = 4 / maxDim;
    scene.scale.setScalar(scale);

    // Slight lift so it sits on floor properly
    scene.position.y = -1;

    // Enable shadows on all meshes
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

  }, [scene]);

  return <primitive object={scene} />;
}