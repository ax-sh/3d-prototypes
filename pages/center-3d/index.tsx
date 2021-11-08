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
    // @ts-ignore
    const { geometry } = ref.current || {};
    const { boundingSphere, attributes, ...g } = geometry;

    console.log(boundingSphere, attributes);
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
      <directionalLight intensity={10} />
      <pointLight ref={ref} intensity={44} args={[1]} />
      <Model />
      {/*  NOTE stage doesnt rotate from center*/}
      {/*<React.Suspense fallback={null}>*/}
      {/*  <Stage*/}
      {/*    // controls={ref}*/}
      {/*    preset="rembrandt"*/}
      {/*    intensity={1}*/}
      {/*    environment="night"*/}
      {/*  >*/}
      {/*    <Model />*/}
      {/*  </Stage>*/}
      {/*</React.Suspense>*/}
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
