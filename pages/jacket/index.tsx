import * as THREE from "three";

import { Html, OrbitControls, Torus } from "@react-three/drei";
import React from "react";

import JacketCanvas from "../../components/JacketCanvas/JacketCanvas";
import { Group } from "three";

const Lights = () => {
  return (
    <group>
      <ambientLight />
    </group>
  );
};

const Model = () => {
  return (
    <group>
      <Torus>
        <meshPhysicalMaterial color={"#f00"} />
      </Torus>
    </group>
  );
};

const Scene = () => {
  const ref = React.useRef<Group>();
  return (
    <group ref={ref}>
      <Lights />
      <Model />
    </group>
  );
};

const Loading = () => {
  return (
    <Html style={{ background: "red" }}>
      <h1>Loading</h1>
    </Html>
  );
};

export default function Index() {
  return (
    <JacketCanvas>
      <React.Suspense fallback={<Loading />}>
        <Scene />
      </React.Suspense>
      <OrbitControls />
    </JacketCanvas>
  );
}
