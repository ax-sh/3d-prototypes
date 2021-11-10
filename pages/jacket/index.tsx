import * as THREE from "three";

import {
  Environment,
  Html,
  OrbitControls,
  OrbitControlsProps,
  useGLTF,
  // useHelper,
  useProgress,
} from "@react-three/drei";
import React from "react";

import JacketCanvas from "../../components/JacketCanvas/JacketCanvas";
import { Group, Mesh } from "three";
import { MeshProps, PrimitiveProps, useThree } from "@react-three/fiber";
import { useControls } from "leva";

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

const Lights = () => {
  return (
    <group>
      <ambientLight intensity={1} />
    </group>
  );
};

interface GLTFMesh extends MeshProps {
  url: string;
}

// @ts-ignore
// eslint-disable-next-line react/display-name
const Model = React.forwardRef<PrimitiveProps, GLTFMesh>(
  ({ url, ...rest }, ref) => {
    const { scene, materials } = useGLTF(url);
    const { color } = useControls({
      color: "#ffffff",
    });

    React.useMemo(() => {
      // const m = materials?.[""];
      // if (!m) return;
      // console.log(m);
      // if (color !== "#ffffff") m.color.set(color);
      // console.log(color);
      // m.transparent = true;
      // m.opacity = 0.5;
      Object.keys(materials).forEach((i) => {
        // if() check material prefix for functionality
        if (color !== "#ffffff") console.log(materials?.[i]?.color.set(color));

        console.log("materials", i);
      });
    }, [materials, color]);
    return <primitive object={scene} ref={ref} {...rest} />;
  }
);

function getBoundingSphere(o: Mesh) {
  const bbox = new THREE.Box3().setFromObject(o);
  return bbox.getBoundingSphere(new THREE.Sphere());
}

const Scene = ({ url }: { url: string }) => {
  const ref = React.useRef<Group>();
  const o = React.useRef<PrimitiveProps>();
  const orbit = React.useRef<OrbitControlsProps>();
  const [centerPosition, setCenterPosition] = React.useState(
    new THREE.Vector3()
  );
  const [position, setPosition] = React.useState(new THREE.Vector3());
  const [label, setLabel] = React.useState("");
  const [distance, setDistance] = React.useState(0);

  const { camera } = useThree();

  React.useEffect(() => {
    if (!o.current) return;
    const { center, radius } = getBoundingSphere(o.current);

    camera.position.copy(
      center.clone().add(new THREE.Vector3(1 * radius, 1 * radius, radius))
    );
    camera.updateProjectionMatrix();

    centerPosition.copy(center);
    setCenterPosition(center);
    setDistance(radius);
  }, [camera]);

  const onPointerMove = ({ object, point, distance, ...e }) => {
    console.log(e, "<<<");
    setPosition(point);
    setLabel(object.name);
  };
  const { env } = useControls({
    env: {
      value: "sunset",
      options: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
    },
  });

  return (
    <mesh ref={ref}>
      <Lights />
      <Environment
        background={false}
        path="/"
        preset={env}
        scene={undefined} // adds the ability to pass a custom THREE.Scene
      />
      <Html position={position} style={{ color: "red", pointerEvents: "none" }}>
        <h1>{label}</h1>
      </Html>
      <Model url={url} ref={o} onPointerMove={onPointerMove} />
      <OrbitControls
        ref={orbit}
        target={centerPosition}
        maxDistance={distance * 2}
        minDistance={distance}
      />
    </mesh>
  );
};

export default function Index() {
  const url = "./jacket.glb";
  return (
    <JacketCanvas>
      <React.Suspense fallback={<Loading />}>
        <Scene url={url} />
      </React.Suspense>
    </JacketCanvas>
  );
}
