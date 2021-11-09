import * as THREE from "three";

import { Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
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

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return (
    <group>
      <primitive object={scene} />
    </group>
  );
};

const Scene = () => {
  const ref = React.useRef<Group>();

  const url = "./jacket.glb";

  return (
    <group ref={ref}>
      <Lights />
      <Model url={url} />
    </group>
  );
};

const Loading = () => {
  const {
    // active,
    progress,
    // errors, item, loaded, total
  } = useProgress();
  return (
    <Html style={{ color: "red" }} center>
      <h1>{progress} % loaded</h1>
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
