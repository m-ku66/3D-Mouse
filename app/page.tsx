"use client";
import { Canvas } from "@react-three/fiber";
import Box from "./3d-components/Box";
import Camera from "./3d-components/Camera";
export default function Home() {
  return (
    <div className="relative container max-w-full h-screen">
      <Canvas>
        <Camera />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
