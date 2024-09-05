import React, { useState, useMemo } from "react";
import { MeshProps } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import Box from "./Box";

// Child component to handle each individual box's animation
const AnimatedBox = ({
  basePosition,
  isHovered,
  boxProps,
  animationTension,
  animationFriction,
  animationDirection,
  onHover,
  onLeave,
}: {
  basePosition: [number, number, number];
  isHovered: boolean;
  boxProps: any;
  animationTension: number;
  animationFriction: number;
  animationDirection: number;
  onHover: () => void;
  onLeave: () => void;
}) => {
  // Use react-spring to animate the y position
  const springProps = useSpring({
    position: isHovered
      ? [basePosition[0], 0.9 * animationDirection, basePosition[2]]
      : basePosition,
    config: { tension: animationTension, friction: animationFriction },
  });

  return (
    <animated.group
      position={springProps.position as unknown as [number, number, number]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onLeave();
      }}
    >
      <Box {...boxProps} />
    </animated.group>
  );
};

type BoxGridProps = {
  width: number;
  depth: number;
  spacing?: number;
  boxProps?: {
    props: MeshProps;
    tracking: boolean;
  };
  animationTension?: number;
  animationFriction?: number;
  animationDirection?: number;
};

export default function BoxGrid({
  width,
  depth,
  spacing = 1.5,
  boxProps = {
    props: {},
    tracking: false,
  },
  animationTension = 100,
  animationFriction = 20,
  animationDirection = 1,
}: BoxGridProps) {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  // Calculate the offset to center the grid
  const offsetX = useMemo(() => (width - 1) * spacing * 0.5, [width, spacing]);
  const offsetZ = useMemo(() => (depth - 1) * spacing * 0.5, [depth, spacing]);

  return (
    <>
      {Array.from({ length: width * depth }).map((_, index) => {
        const x = Math.floor(index / depth);
        const z = index % depth;

        const basePosition: [number, number, number] = [
          x * spacing - offsetX,
          0,
          z * spacing - offsetZ,
        ];

        const isHovered = hoveredBox === `${x}-${z}`;

        return (
          <AnimatedBox
            key={`${x}-${z}`}
            basePosition={basePosition}
            isHovered={isHovered}
            boxProps={boxProps}
            animationTension={animationTension}
            animationFriction={animationFriction}
            animationDirection={animationDirection}
            onHover={() => setHoveredBox(`${x}-${z}`)}
            onLeave={() => setHoveredBox(null)}
          />
        );
      })}
    </>
  );
}
