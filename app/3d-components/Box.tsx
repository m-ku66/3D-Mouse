import { MeshProps } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { useState } from "react";

type BoxProps = {
  props: MeshProps;
  tracking: boolean;
};

export default function Box({ props, tracking }: BoxProps) {
  const mesh = useRef<Mesh>(null);
  const [meshState, setmeshState] = useState("standard");

  function materialRender() {
    if (meshState === "standard") {
      return <meshStandardMaterial color={"gray"} />;
    } else if (meshState === "emmissive") {
      return (
        <meshStandardMaterial
          emissive="gray"
          emissiveIntensity={2}
          toneMapped={false}
        />
      );
    }
  }

  function handleMaterialChange() {
    if (meshState === "standard") {
      setmeshState("emmissive");
      setTimeout(() => {
        setmeshState("standard");
      }, 2000);
    }
  }

  return (
    <mesh
      onPointerOver={tracking ? handleMaterialChange : undefined}
      {...props}
      ref={mesh}
    >
      <boxGeometry args={[1, 1, 1]} />
      {materialRender()}
    </mesh>
  );
}
