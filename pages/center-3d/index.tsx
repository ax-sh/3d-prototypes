import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  Html,
  Sphere,
  useHelper,
} from "@react-three/drei";
import { BoxHelper, PointLightHelper } from "three";

export type Center3dProps = {};

const Model = () => {
  const ref = React.useRef();
  React.useEffect(() => {
    console.log(ref.current);
  }, []);
  useHelper(ref, BoxHelper, "#00f");
  return (
    <group>
      <Sphere ref={ref}>
        <meshPhysicalMaterial color={"#f00"} />
      </Sphere>
    </group>
  );
};
const Scene = () => {
  const ref = React.useRef();
  useHelper(ref, PointLightHelper, "#0f0");
  return (
    <group>
      <ambientLight />
      <pointLight ref={ref} intensity={44} args={[1]} />
      <Model />
      {/*<Stage*/}
      {/*  controls={ref}*/}
      {/*  preset="rembrandt"*/}
      {/*  intensity={1}*/}
      {/*  environment="night"*/}
      {/*>*/}
      {/*    <Sphere/>*/}
      {/*  /!*<Model />*!/*/}
      {/*</Stage>*/}
    </group>
  );
};

export default function Index({}: Center3dProps) {
  return (
    <div className="center-3d canvas-wrapper">
      <Canvas
        onCreated={({ gl }) => {
          gl.physicallyCorrectLights = true;
        }}
      >
        <Scene />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
