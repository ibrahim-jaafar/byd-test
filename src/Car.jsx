import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, forwardRef } from "react";

const Car = forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/2024_byd_dolphin.glb");

  useEffect(() => {
    if (!scene) return;

    // =========================
    // 1. Compute bounding box
    // =========================
    const box = new THREE.Box3().setFromObject(scene);

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    const sphere = new THREE.Sphere();

    box.getCenter(center);
    box.getSize(size);
    box.getBoundingSphere(sphere);

    // =========================
    // 2. Center model at origin
    // =========================
    scene.position.sub(center);

    // =========================
    // 3. Auto scale (stable for all car types)
    // =========================
    const targetSize = 3; // controls how big the car appears
    const scale = targetSize / sphere.radius;

    scene.scale.setScalar(scale);

    // =========================
    // 4. Place model on floor correctly
    // =========================
    scene.position.y = -sphere.radius * scale;

    // =========================
    // 5. Enable shadows for realism
    // =========================
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // =========================
    // 6. Expose for external use (floor/camera systems)
    // =========================
    if (ref) ref.current = scene;

  }, [scene, ref]);

  return <primitive object={scene} />;
});

export default Car;