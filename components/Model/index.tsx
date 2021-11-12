import { useGLTF } from "@react-three/drei";
import { MeshProps, PrimitiveProps } from "@react-three/fiber";
import React from "react";

interface GLTFMesh extends MeshProps {
  url: string;
}

const Model = React.forwardRef<PrimitiveProps, GLTFMesh>(
  ({ url, ...rest }, ref) => {
    const { scene, materials } = useGLTF(url);

    return <primitive object={scene} ref={ref} {...rest} />;
  }
);

export default Model;
