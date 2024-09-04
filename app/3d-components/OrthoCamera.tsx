import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3, OrthographicCamera as ThreeOrthographicCamera } from "three";

type OrthographicCameraProps = {
  position: [number, number, number];
  target: [number, number, number];
  zoom?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  near?: number;
  far?: number;
};

export default function OrthographicCamera(props: OrthographicCameraProps) {
  const {
    position,
    target,
    zoom = 1,
    left = -5,
    right = 5,
    top = 5,
    bottom = -5,
    near = 0.1,
    far = 1000,
  } = props;
  const { set, size } = useThree();
  const cameraRef = useRef<ThreeOrthographicCamera>();
  const cameraTarget = useRef(new Vector3(...target));

  useEffect(() => {
    const aspect = size.width / size.height;
    const adjustedLeft = left * aspect;
    const adjustedRight = right * aspect;

    if (!cameraRef.current) {
      cameraRef.current = new ThreeOrthographicCamera(
        adjustedLeft,
        adjustedRight,
        top,
        bottom,
        near,
        far
      );
    } else {
      cameraRef.current.left = adjustedLeft;
      cameraRef.current.right = adjustedRight;
      cameraRef.current.top = top;
      cameraRef.current.bottom = bottom;
      cameraRef.current.near = near;
      cameraRef.current.far = far;
    }

    cameraRef.current.zoom = zoom;
    cameraRef.current.position.set(...position);
    cameraRef.current.lookAt(cameraTarget.current);
    cameraRef.current.updateProjectionMatrix();

    set({ camera: cameraRef.current });

    // Cleanup function that removes cam on unmount
    if (cameraRef.current) {
      cameraRef.current.removeFromParent();
    }
  }, [set, size, left, right, top, bottom, near, far, zoom, position]);

  useEffect(() => {
    cameraTarget.current.set(...target);
  }, [target]);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...position);
      cameraRef.current.lookAt(cameraTarget.current);
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return null;
}
