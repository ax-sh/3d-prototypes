import { OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import Head from "next/head";
import React from "react";
import JacketCanvas from "../../components/JacketCanvas/JacketCanvas";
import Loader from "../../components/Loader";
import Model from "../../components/Model";

interface StudioProps {
  children: React.ReactNode;
}

const Studio = ({ children }: StudioProps) => {
  const { background, intensity } = useControls({
    background: "#000",
    intensity: 0.5,
  });
  return (
    <Canvas
      style={{ height: "100vh" }}
      gl={{ preserveDrawingBuffer: true, physicallyCorrectLights: true }}
      shadows
      dpr={[1, 1.5]}
      // camera={{ position: [0, 0, 150], fov: 50 }}
    >
      <ambientLight intensity={intensity} />
      <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
      <color attach="background" args={[background]} />
    </Canvas>
  );
};

interface SceneProps {
  url: string;
}

const Scene = ({ url, ...rest }: SceneProps) => {
  const onPointerMove = ({ point, face, object: { geometry }, ...e }: any) => {
    const { position } = geometry.attributes;
    const a = position.getX(face.a);
    position.setX(face.a, a + 2);
  };
  return (
    <group {...rest}>
      <Model url={url} />
      {/*<Sphere onPointerMove={onPointerMove}>*/}
      {/*  <meshNormalMaterial />*/}
      {/*</Sphere>*/}
    </group>
  );
};

export default function () {
  const url = "/jacket.glb";
  const ref = React.useRef();
  return (
    <>
      <Head>
        <title>Studio</title>
      </Head>
      <Studio>
        <Scene url={url} ref={ref} />
        <OrbitControls />
      </Studio>
    </>
  );
}
