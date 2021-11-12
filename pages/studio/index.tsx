import { Canvas } from "@react-three/fiber";
import React from "react";
import JacketCanvas from "../../components/JacketCanvas/JacketCanvas";
import Loader from "../../components/Loader";

interface StudioProps {
  children: React.ReactNode;
}

const Studio = ({ children }: StudioProps) => {
  return <Canvas>{children}</Canvas>;
};

interface SceneProps {
  url: string;
}

const Scene = ({ url }: SceneProps) => {
  return <group></group>;
};

export default function () {
  const url = "";
  return (
    <Studio>
      <Scene url={url} />
    </Studio>
  );
}
