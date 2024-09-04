import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

type CameraProps = {
  position: [number, number, number];
  target: [number, number, number];
};

export default function Camera(props: CameraProps) {
  const { position, target } = props;
  const { camera } = useThree();
  const cameraTarget = useRef(new Vector3(target[0], target[1], target[2]));

  useEffect(() => {
    cameraTarget.current.set(target[0], target[1], target[2]);
  }, [target]);

  useFrame(() => {
    // Set the camera position
    camera.position.set(position[0], position[1], position[2]);

    // Make the camera look at the updated target
    camera.lookAt(cameraTarget.current);
  });

  return null;
}
