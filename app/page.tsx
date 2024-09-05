"use client";
import { Canvas } from "@react-three/fiber";
import BoxGrid from "./3d-components/BoxGrid";
import OrthoCamera from "./3d-components/OrthoCamera";
import FX from "./fx-components/FX";
import { useState } from "react";
import UserInterface from "./interface components/UserInterface";

export default function Home() {
  const [appState, setAppState] = useState("boxGrid");
  const [fxSwitch, setFxSwitch] = useState(false);
  const [fx, setFx] = useState({
    pixelation: 3,
    bloom: true,
    dot: 0,
    glitch: false,
    hueSat: { hue: 30, saturation: 0 },
  });
  const [boxGridProps, setBoxGridProps] = useState({
    width: 30,
    depth: 30,
    spacing: 1.01,
    animationTension: 300,
    animationFriction: 50,
    animationDirection: 1,
    boxProps: { props: {}, tracking: false },
  });

  function renderScene() {
    switch (appState) {
      case "boxGrid":
        return (
          <Canvas className="fadeIn3">
            {fxSwitch ? <FX {...fx} /> : <></>}
            <OrthoCamera position={[30, 30, 30]} target={[0, 0, 0]} zoom={1} />
            <ambientLight intensity={0.1} />
            <pointLight position={[3, 3, -9]} intensity={100} color="red" />
            <pointLight position={[-3, 3, 9]} intensity={100} color="blue" />
            <BoxGrid {...boxGridProps} />
          </Canvas>
        );
      case "shader":
        return <div>Shader scene</div>;
      default:
        return <></>;
    }
  }

  return (
    <div className="hidden md:flex relative container max-w-full h-screen overflow-hidden">
      <UserInterface
        appState={appState}
        setAppState={setAppState}
        fx={fx}
        setFx={setFx}
        boxGridProps={boxGridProps}
        setBoxGridProps={setBoxGridProps}
        fxSwitch={fxSwitch}
        setFxSwitch={setFxSwitch}
      />
      {renderScene()}
    </div>
  );
}
