import React, { useState, useEffect, useRef } from "react";
import { MathUtils, Vector3, SphereGeometry } from "three";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Extend Three.js geometries so they can be used in JSX
extend({ SphereGeometry });

const positions = new Float32Array(1500 * 3); // 380 points with 3 coordinates each
const originalPositions = new Float32Array(positions.length); // Store original positions

for (let i = 0; i < 1500; i++) {
  const x = MathUtils.randFloatSpread(3);
  const y = MathUtils.randFloatSpread(3);
  const z = MathUtils.randFloatSpread(3);

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;

  // Store original positions
  originalPositions[i * 3] = x;
  originalPositions[i * 3 + 1] = y;
  originalPositions[i * 3 + 2] = z;
}
type Props = {
  size: number;
  rotateSpeed: number;
  turbDirection: [number, number, number];
};
const PointShader = ({ size, rotateSpeed, turbDirection }: Props) => {
  return (
    <>
      <Points positions={positions}>
        <PointMaterial
          transparent={true}
          size={size}
          sizeAttenuation
          depthTest={true}
          toneMapped={false}
        />
        {Array.from({ length: positions.length / 3 }).map((_, i) => (
          <PointEvent
            key={i}
            index={i}
            originalPosition={[
              originalPositions[i * 3],
              originalPositions[i * 3 + 1],
              originalPositions[i * 3 + 2],
            ]}
            turbDirection={turbDirection}
          />
        ))}
      </Points>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={rotateSpeed}
        enableDamping
      />
    </>
  );
};

type PointEventProps = {
  index: number;
  originalPosition: [number, number, number];
  turbDirection: [number, number, number];
};

function PointEvent({
  index,
  originalPosition,
  turbDirection,
}: PointEventProps) {
  const { theme } = useTheme();
  const [hovered, setHover] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const { raycaster } = useThree(); // Access the raycaster to get mouse position

  useEffect(() => {
    if (!meshRef.current) return;

    if (hovered) {
      // Move the point away from the mouse
      const mousePosition = raycaster.ray.origin;
      const direction = new Vector3(
        meshRef.current.position.x +
          mousePosition.x * Math.random() * turbDirection[0],
        meshRef.current.position.y +
          mousePosition.y * Math.random() * turbDirection[1],
        meshRef.current.position.z +
          mousePosition.z * Math.random() * turbDirection[2]
      );
      direction.normalize().multiplyScalar(2); // Move it a bit away
      meshRef.current.position.add(direction);
    } else {
      // Smoothly move back to the original position
      const targetPosition = new Vector3(...originalPosition);
      meshRef.current.position.lerp(targetPosition, 0.001); // Slowly move back
    }
  }, [hovered, raycaster.ray.origin, originalPosition]);

  useFrame(() => {
    // Ensure the position is constantly updating back to the original if not hovered
    if (!hovered && meshRef.current) {
      const targetPosition = new Vector3(...originalPosition);
      meshRef.current.position.lerp(targetPosition, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={originalPosition}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial
        color={
          hovered
            ? theme === "dark"
              ? "white"
              : "black"
            : theme === "dark"
            ? "white"
            : "black"
        }
      />
    </mesh>
  );
}

export default PointShader;
