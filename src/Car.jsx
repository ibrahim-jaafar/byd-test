import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

export default function Car() {
  const { scene } = useGLTF("/models/2024_byd_dolphin.glb");

  useEffect(() => {
    if (!scene) return;

    // BOX
    const box = new THREE.Box3().setFromObject(scene);

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(center);
    box.getSize(size);

    // center model
    scene.position.sub(center);

    // safe autoscale (less aggressive)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.5 / maxDim;

    scene.scale.setScalar(scale);

    // IMPORTANT: DO NOT force Y positioning yet
    // (this is what usually hides the model)

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

  }, [scene]);

  return <primitive object={scene} />;
}