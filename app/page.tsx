"use client";
import { Canvas } from "@react-three/fiber";
import BoxGrid from "./3d-components/BoxGrid";
import OrthoCamera from "./3d-components/OrthoCamera";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Home() {
  return (
    <div className="relative container max-w-full h-screen">
      <Canvas>
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>

        <OrthoCamera position={[30, 30, 30]} target={[0, 0, 0]} zoom={1} />
        <ambientLight intensity={0.1} />
        <pointLight position={[3, 3, -9]} intensity={100} color="red" />
        <pointLight position={[-3, 3, 9]} intensity={100} color="blue" />
        <BoxGrid
          width={30}
          depth={30}
          spacing={1.01}
          animationTension={300}
          animationFriction={50}
        />
      </Canvas>
    </div>
  );
}
