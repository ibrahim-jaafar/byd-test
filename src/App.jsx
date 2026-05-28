import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function Car() {
  const { scene } = useGLTF("/Models/byd.glb");
  const ref = useRef();

  useEffect(() => {
    if (!scene) return;

    // 1. Center model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // 2. Scale model to fit view
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim; // adjust “2” if needed
    scene.scale.setScalar(scale);

  }, [scene]);

  return <primitive object={scene} ref={ref} />;
}