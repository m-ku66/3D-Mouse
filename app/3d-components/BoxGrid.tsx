import React, { useState, useMemo } from "react";
import { MeshProps } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import Box from "./Box";

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

        // Use react-spring to animate the y position
        const springProps = useSpring({
          position: isHovered
            ? [basePosition[0], 0.9 * animationDirection, basePosition[2]]
            : basePosition,
          config: { tension: animationTension, friction: animationFriction },
        });

        return (
          <animated.group
            key={`${x}-${z}`}
            position={
              springProps.position as unknown as [number, number, number]
            }
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredBox(`${x}-${z}`);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredBox(null);
            }}
          >
            <Box {...boxProps} />
          </animated.group>
        );
      })}
    </>
  );
}
