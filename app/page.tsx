"use client";
import { Canvas } from "@react-three/fiber";
import BoxGrid from "./3d-components/BoxGrid";
import OrthoCamera from "./3d-components/OrthoCamera";
import FX from "./fx-components/FX";
import { useState, useEffect } from "react";
import UserInterface from "./interface components/UserInterface";
import PointShader from "./3d-components/PointShader";

export default function Home() {
  const [appState, setAppState] = useState("boxGrid");
  const [fxSwitch, setFxSwitch] = useState(false);
  const [fx, setFx] = useState({
    pixelation: 2,
    bloom: false,
    dot: 0,
    glitch: false,
    hueSat: { hue: 0, saturation: 0 },
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
  const [pointShaderProps, setPointShaderProps] = useState({
    size: 10,
    rotateSpeed: 0.01,
    turbDirection: [0, 0, 0] as [number, number, number],
  });

  useEffect(() => {
    setFx({
      pixelation: 5,
      bloom: false,
      dot: 0,
      glitch: false,
      hueSat: { hue: 0, saturation: 0 },
    });
    setPointShaderProps({
      size: 10,
      rotateSpeed: 0.01,
      turbDirection: [0, 0, 0] as [number, number, number],
    });
  }, [appState]);

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
        return (
          <Canvas
            className="fadeIn3"
            raycaster={{
              params: {
                Mesh: { threshold: 0.2 },
                Line: { threshold: 0.2 },
                LOD: { threshold: 0.2 },
                Sprite: { threshold: 0.2 },
                Points: { threshold: 0.2 },
              },
            }}
            camera={{ position: [0, 0, 10] }}
          >
            {fxSwitch ? <FX {...fx} /> : <></>}
            <PointShader {...pointShaderProps} />
          </Canvas>
        );
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
        pointShaderProps={pointShaderProps}
        setPointShaderProps={setPointShaderProps}
      />
      {renderScene()}
    </div>
  );
}
