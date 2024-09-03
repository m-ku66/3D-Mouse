import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

export default function Camera() {
  const { camera } = useThree();
  const cameraTarget = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    // Set the camera position
    camera.position.set(5, 5, 5);

    // Make the camera look at the target
    camera.lookAt(cameraTarget.current);
  });

  return null;
}
