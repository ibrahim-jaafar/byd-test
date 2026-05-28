import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function Car({ url, onReady }) {
  const { scene } = useGLTF(url);
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

    if (!sphere.radius || sphere.radius === 0) {
      console.error("Model has zero radius");
      return;
    }

    const targetSize = 3;
    const scale = targetSize / sphere.radius;

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