import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

const MODEL_URL = "https://raw.githubusercontent.com/ibrahim-jaafar/byd-test/b13b23e04d4698323bb5a2e5c2de168c9f0a9653/public/models/2024_byd_dolphin.glb"; 
useGLTF.preload(MODEL_URL);

export default function Car({ onReady }) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef();

  useEffect(() => {
    if (!scene || !groupRef.current) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    const sphere = new THREE.Sphere();

    box.getCenter(center);
    box.getSize(size);
    box.getBoundingSphere(sphere);

    console.log("center:", center);
    console.log("size:", size);
    console.log("radius:", sphere.radius);

    if (!sphere.radius || sphere.radius === 0) {
      console.error("Model has zero radius — geometry may be empty");
      return;
    }

    const targetSize = 3;
    const scale = targetSize / sphere.radius;

    // Apply transforms to the GROUP, not the scene directly
    groupRef.current.scale.setScalar(scale);
    groupRef.current.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (onReady) {
      onReady({
        radius: sphere.radius * scale,
        size: size.clone().multiplyScalar(scale),
      });
    }
  }, [scene, onReady]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}