import React from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize, Resolution } from "postprocessing";
import { Pixelation } from "@react-three/postprocessing";
import { DotScreen } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { Vector2 } from "three";
import { HueSaturation } from "@react-three/postprocessing";

type Props = {
  pixelation: number;
  bloom: boolean;
  dot: number;
  glitch: boolean;
  hueSat: {
    hue: number;
    saturation: number;
  };
};

const FX = ({ pixelation, bloom, dot, glitch, hueSat }: Props) => {
  function handlePixel() {
    if (pixelation <= 0) {
      return <></>;
    } else {
      return (
        <Pixelation
          granularity={pixelation} // pixel granularity
        />
      );
    }
  }

  function handleBloom() {
    if (bloom) {
      return (
        <Bloom
          intensity={10} // The bloom intensity.
          kernelSize={KernelSize.LARGE} // blur kernel size
          luminanceThreshold={0.0} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
          mipmapBlur={false} // Enables or disables mipmap blur.
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        />
      );
    } else {
      return <></>;
    }
  }

  function handleDot() {
    if (dot <= 0) {
      return <></>;
    } else {
      return (
        <DotScreen
          blendFunction={BlendFunction.NORMAL} // blend mode
          angle={Math.PI * 0.5} // angle of the dot pattern
          scale={dot} // scale of the dot pattern
        />
      );
    }
  }

  function handleGlitch() {
    if (glitch) {
      return (
        <Glitch
          delay={new Vector2(1.5, 3.5)} // min and max glitch delay
          duration={new Vector2(0.1, 0.3)} // min and max glitch duration
          strength={new Vector2(0.1, 0.5)} // min and max glitch strength
          mode={GlitchMode.SPORADIC} // glitch mode
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
        />
      );
    } else {
      return <></>;
    }
  }

  function handleHueSat() {
    if (hueSat.hue <= 0 && hueSat.saturation <= 0) {
      return <></>;
    } else {
      return (
        <HueSaturation
          blendFunction={BlendFunction.NORMAL} // blend mode
          hue={hueSat.hue} // hue in radians
          saturation={hueSat.saturation} // saturation in radians
        />
      );
    }
  }

  return (
    <EffectComposer>
      {handlePixel()}
      {handleBloom()}
      {handleDot()}
      {handleGlitch()}
      {handleHueSat()}
    </EffectComposer>
  );
};

export default FX;
