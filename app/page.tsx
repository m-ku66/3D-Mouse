"use client";
import { Canvas } from "@react-three/fiber";
import BoxGrid from "./3d-components/BoxGrid";
import OrthoCamera from "./3d-components/OrthoCamera";
import FX from "./fx-components/FX";
import { useState } from "react";
import UserInterface from "./interface components/UserInterface";

export default function Home() {
  const [fx, setFx] = useState(false);

  function handleFX() {
    if (fx) {
      return (
        <FX
          pixelation={3}
          bloom={true}
          dot={10}
          glitch={true}
          hueSat={{ hue: 10, saturation: 0 }}
        />
      );
    } else {
      return <></>;
    }
  }
  return (
    <div className="hidden md:flex relative container max-w-full h-screen">
      <UserInterface />
      <Canvas>
        {handleFX()}
        <OrthoCamera position={[30, 30, 30]} target={[0, 0, 0]} zoom={1} />
        <ambientLight intensity={0.1} />
        <pointLight position={[3, 3, -9]} intensity={100} color="red" />
        <pointLight position={[-3, 3, 9]} intensity={100} color="blue" />
        <BoxGrid
          width={30}
          depth={30}
          spacing={1.01}
          animationTension={300} // Higher values will make the blocks move more
          animationFriction={50} // Higher values will make the blocks move faster
          animationDirection={1} // 1 or -1 will make the blocks either rise or fall
          boxProps={{ props: {}, tracking: false }} // tracking will change the color of the blocks
        />
      </Canvas>
    </div>
  );
}
