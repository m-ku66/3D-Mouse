import React from "react";
import Image from "next/image";
import {
  ArmchairIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  LayoutGridIcon,
  Grid2X2Icon,
  SunIcon,
  GripIcon,
  SquareSquareIcon,
  BlendIcon,
  EclipseIcon,
  EyeIcon,
  CircleArrowOutUpRightIcon,
  SunMoonIcon,
  BoxesIcon,
  OrbitIcon,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import FxControl from "../fx-components/FXControl";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();
  // setTheme("light");
  function renderTitle() {
    switch (appState) {
      case "boxGrid":
        return "Box Grid";
      case "shader":
        return "Shader";
      default:
        return "";
    }
  }

  function renderControls() {
    switch (appState) {
      case "boxGrid":
        return (
          <>
            {/* Grid Spacing */}
            <FxControl
              icon={<LayoutGridIcon size={24} />}
              controlType="slider"
              value={boxGridProps.spacing}
              min={0.5}
              max={2}
              step={0.01}
              onChange={(value) =>
                setBoxGridProps((prev: any) => ({
                  ...prev,
                  spacing: value,
                }))
              }
            />

            {/* Pixelation */}
            <FxControl
              icon={<Grid2X2Icon size={24} />}
              controlType="slider"
              value={fx.pixelation}
              min={0}
              max={5}
              step={0.5}
              onChange={(value) =>
                setFx((prev: any) => ({
                  ...prev,
                  pixelation: value,
                }))
              }
            />

            {/* Bloom */}
            <FxControl
              icon={<SunIcon size={24} />}
              controlType="switch"
              value={fx.bloom}
              onChange={(checked) =>
                setFx((prev: any) => ({
                  ...prev,
                  bloom: checked,
                }))
              }
            />

            {/* Dot */}
            <FxControl
              icon={<GripIcon size={24} />}
              controlType="slider"
              value={fx.dot}
              min={0}
              max={1}
              step={0.01}
              onChange={(value) =>
                setFx((prev: any) => ({
                  ...prev,
                  dot: value,
                }))
              }
            />

            {/* Glitch */}
            <FxControl
              icon={<SquareSquareIcon size={24} />}
              controlType="switch"
              value={fx.glitch}
              onChange={(checked) =>
                setFx((prev: any) => ({
                  ...prev,
                  glitch: checked,
                }))
              }
            />

            {/* Hue */}
            <FxControl
              icon={<BlendIcon size={24} />}
              controlType="slider"
              value={fx.hueSat.hue}
              min={0}
              max={50}
              step={1}
              onChange={(value) =>
                setFx((prev: any) => ({
                  ...prev,
                  hueSat: {
                    ...prev.hueSat,
                    hue: value,
                  },
                }))
              }
            />

            {/* Saturation */}
            <FxControl
              icon={<EclipseIcon size={24} />}
              controlType="slider"
              value={fx.hueSat.saturation}
              min={0}
              max={1.1}
              step={0.15}
              onChange={(value) =>
                setFx((prev: any) => ({
                  ...prev,
                  hueSat: {
                    ...prev.hueSat,
                    saturation: value,
                  },
                }))
              }
            />

            {/* Tracking */}
            <FxControl
              icon={<EyeIcon size={24} />}
              controlType="switch"
              value={boxGridProps?.boxProps?.tracking || false} // Safely access tracking state
              onChange={(checked) =>
                setBoxGridProps((prev: any) => ({
                  ...prev,
                  boxProps: {
                    ...prev.boxProps,
                    tracking: checked,
                  },
                }))
              }
            />

            {/* Animation Direction */}
            <FxControl
              icon={<CircleArrowOutUpRightIcon size={24} />}
              controlType="switch"
              value={boxGridProps.animationDirection === 1}
              onChange={(checked) =>
                setBoxGridProps((prev: any) => ({
                  ...prev,
                  animationDirection: checked ? 1 : -1,
                }))
              }
            />
          </>
        );
      case "shader":
        return <div>Shader scene</div>;
      default:
        return <></>;
    }
  }

  return (
    <>
      <h1 className="fadeIn1 select-none absolute top-5 left-5 z-10 text-[3rem] font-bold italic">
        {renderTitle()}
      </h1>

      <Image
        className="fadeIn2 select-none absolute bottom-5 left-5 z-10"
        src={theme === "light" ? "/copyright.svg" : "/copyright-w.svg"}
        alt="Marc Miango"
        width={150}
        height={150}
      />

      {/* Control Panel */}
      <div className="fadeIn3 absolute bottom-5 right-10 z-10  rounded-full p-4">
        <div className="flex gap-8 items-center">
          {/* Scene Control */}
          <HoverCard>
            <HoverCardTrigger>
              <ArmchairIcon className="text-primary" size={24} />
            </HoverCardTrigger>
            <HoverCardContent className="bg-secondary">
              <div className="flex flex-col gap-4">
                <div
                  onClick={() => setAppState("boxGrid")}
                  className="cursor-pointer select-none flex gap-2 opacity-50 hover:opacity-100 duration-150"
                >
                  <BoxesIcon size={24} />
                  <p>Box Grid Scene</p>
                </div>
                <div
                  onClick={() => setAppState("shader")}
                  className="cursor-pointer select-none flex gap-2 opacity-50 hover:opacity-100 duration-150"
                >
                  <OrbitIcon size={24} />
                  <p>Shader Scene</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* FX Control */}
          <HoverCard>
            <HoverCardTrigger>
              <SlidersHorizontalIcon className="text-primary" size={24} />
            </HoverCardTrigger>
            <HoverCardContent className="bg-secondary">
              <div className="flex flex-col gap-4">
                {/* FX Switch */}
                <FxControl
                  icon={<SparklesIcon size={24} />}
                  controlType="switch"
                  value={fxSwitch}
                  onChange={() => setFxSwitch(!fxSwitch)}
                />
                {renderControls()}
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Light/Dark Mode */}
          <div
            onClick={() =>
              theme === "light" ? setTheme("dark") : setTheme("light")
            }
            className="cursor-pointer border rounded-full border-primary p-2"
          >
            <SunMoonIcon className=" text-primary" size={12} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInterface;
