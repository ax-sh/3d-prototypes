import * as THREE from "three";

import { OrbitControls, Sphere, Torus } from "@react-three/drei";
import React from "react";
import { Center3dProps } from "../center-3d";
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

export default function Index({}: Center3dProps) {
  return (
    <JacketCanvas>
      <React.Suspense fallback={null}>
        <Scene />
      </React.Suspense>
      <OrbitControls />
    </JacketCanvas>
  );
}
