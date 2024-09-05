"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import {
  ArmchairIcon,
  SlidersHorizontalIcon,
  SunMoonIcon,
  Grid2X2Icon,
  SparklesIcon,
  LayoutGridIcon,
  SunIcon,
  GripIcon,
  SquareSquareIcon,
  BlendIcon,
  EclipseIcon,
  EyeIcon,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Switch } from "@/components/ui/switch";

type Props = {
  appState: string;
  setAppState: React.Dispatch<React.SetStateAction<string>>;
  fx: any;
  setFx: React.Dispatch<React.SetStateAction<any>>;
  boxGridProps: any;
  setBoxGridProps: React.Dispatch<React.SetStateAction<any>>;
  fxSwitch: boolean;
  setFxSwitch: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserInterface = ({
  appState,
  setAppState,
  fx,
  setFx,
  boxGridProps,
  setBoxGridProps,
  fxSwitch,
  setFxSwitch,
}: Props) => {
  const [openMenu, setOpenMenu] = useState(false);

  function renderTitle() {
    switch (appState) {
      case "boxGrid":
        return "Box Grid";
      case "box":
        return "Box";
      default:
        return "";
    }
  }

  return (
    <>
      <h1 className="fadeIn1 select-none absolute top-5 left-5 z-10 text-[3rem] font-bold italic">
        {renderTitle()}
      </h1>

      <Image
        className="absolute bottom-5 left-5 z-10"
        src="/copyright.svg"
        alt="Marc Miango"
        width={150}
        height={150}
      />

      {/* Control Panel */}
      <div className="absolute bottom-10 right-10 z-10 bg-primary rounded-full p-4">
        <div className="flex gap-8">
          {/* Scene Control */}
          <HoverCard>
            <HoverCardTrigger>
              <ArmchairIcon size={24} />
            </HoverCardTrigger>
            <HoverCardContent></HoverCardContent>
          </HoverCard>

          {/* FX Control */}
          <HoverCard>
            <HoverCardTrigger>
              <SlidersHorizontalIcon size={24} />
            </HoverCardTrigger>
            <HoverCardContent className="bg-primary">
              {/* FX Switch */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <SparklesIcon size={24} />
                  <Switch
                    checked={fxSwitch}
                    onCheckedChange={() => setFxSwitch(!fxSwitch)}
                  />
                </div>
                {/* Grid Spacing */}
                <div className="flex gap-4">
                  <LayoutGridIcon size={24} />
                  <Slider
                    value={[boxGridProps.spacing]}
                    min={0.5}
                    max={2}
                    step={0.01}
                    onValueChange={(value) =>
                      setBoxGridProps((prev: any) => ({
                        ...prev,
                        spacing: value[0],
                      }))
                    }
                  />
                </div>
                {/* Pixelation */}
                <div className="flex gap-4">
                  <Grid2X2Icon size={24} />
                  <Slider
                    id="pixelation-slider"
                    value={[fx.pixelation]}
                    min={0}
                    max={5}
                    step={0.5}
                    onValueChange={(value) =>
                      setFx((prev: any) => ({
                        ...prev,
                        pixelation: value[0],
                      }))
                    }
                  />
                </div>
                {/* Bloom */}
                <div className="flex gap-4">
                  <SunIcon size={24} />
                  <Switch
                    id="bloom-switch"
                    checked={fx.bloom}
                    onCheckedChange={(checked) =>
                      setFx((prev: any) => ({
                        ...prev,
                        bloom: checked,
                      }))
                    }
                  />
                </div>
                {/* Dot */}
                <div className="flex gap-4">
                  <GripIcon size={24} />
                  <Slider
                    id="dot-slider"
                    value={[fx.dot]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={(value) =>
                      setFx((prev: any) => ({
                        ...prev,
                        dot: value[0],
                      }))
                    }
                  />
                </div>
                {/* Glitch */}
                <div className="flex gap-4">
                  <SquareSquareIcon size={24} />
                  <Switch
                    id="glitch-switch"
                    checked={fx.glitch}
                    onCheckedChange={(checked) =>
                      setFx((prev: any) => ({
                        ...prev,
                        glitch: checked,
                      }))
                    }
                  />
                </div>
                {/* Hue*/}
                <div className="flex gap-4">
                  <BlendIcon size={24} />
                  <Slider
                    id="hue-slider"
                    value={[fx.hueSat.hue]}
                    min={0}
                    max={50}
                    step={1}
                    onValueChange={(value) =>
                      setFx((prev: any) => ({
                        ...prev,
                        hueSat: {
                          ...prev.hueSat,
                          hue: value[0],
                        },
                      }))
                    }
                  />
                </div>
                {/* Saturation*/}
                <div className="flex gap-4">
                  <EclipseIcon size={24} />
                  <Slider
                    id="saturation-slider"
                    value={[fx.hueSat.saturation]}
                    min={0}
                    max={10}
                    step={1.1}
                    onValueChange={(value) =>
                      setFx((prev: any) => ({
                        ...prev,
                        hueSat: {
                          ...prev.hueSat,
                          saturation: value[0],
                        },
                      }))
                    }
                  />
                </div>
                {/* Tracking */}
                <div className="flex gap-4">
                  <EyeIcon size={24} />
                  <Switch
                    id="tracking-switch"
                    checked={boxGridProps.tracking}
                    onCheckedChange={(checked) =>
                      setBoxGridProps((prev: any) => ({
                        ...prev,
                        boxProps: {
                          ...prev.boxProps,
                          tracking: checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Light/Dark Mode */}
          <HoverCard>
            <HoverCardTrigger>
              <SunMoonIcon size={24} />
            </HoverCardTrigger>
            <HoverCardContent></HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </>
  );
};

export default UserInterface;
