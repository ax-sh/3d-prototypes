import { OrbitControls, Sphere } from "@react-three/drei";
import React from "react";
import JacketCanvas from "../../components/JacketCanvas/JacketCanvas";
import Loader from "../../components/Loader";

interface SceneProps {
  url: string;
}

const Scene = ({ url }: SceneProps) => {
  return (
    <group>
      <Sphere>
        <meshNormalMaterial attach="material" color="white" />
        <OrbitControls />
      </Sphere>
    </group>
  );
};

export default function Index() {
  const url = "./jacket.glb";
  return (
    <JacketCanvas>
      <React.Suspense fallback={<Loader />}>
        <Scene url={url} />
      </React.Suspense>
    </JacketCanvas>
  );
}
