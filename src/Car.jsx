import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

useGLTF.preload("/models/2024_byd_dolphin.glb");

export default function Car({ onReady }) {
  const { scene } = useGLTF("/models/2024_byd_dolphin.glb");

  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    const sphere = new THREE.Sphere();

    box.getCenter(center);
    box.getSize(size);
    box.getBoundingSphere(sphere);

    // center
    scene.position.sub(center);

    // scale
    const targetSize = 3;
    const scale = targetSize / sphere.radius;
    scene.scale.setScalar(scale);

    // shadows
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // send bounds to parent (IMPORTANT)
    if (onReady) {
      onReady({
        radius: sphere.radius * scale,
        size: size.clone().multiplyScalar(scale),
      });
    }
  }, [scene, onReady]);

  return <primitive object={scene} />;
}