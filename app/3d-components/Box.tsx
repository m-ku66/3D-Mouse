import { MeshProps } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export default function Box(props: MeshProps) {
  const mesh = useRef<Mesh>(null);

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}
