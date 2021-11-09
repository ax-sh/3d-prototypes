import * as THREE from "three";

import {
  Html,
  OrbitControls,
  useGLTF,
  // useHelper,
  useProgress,
} from "@react-three/drei";
import React from "react";

import JacketCanvas from "../../components/JacketCanvas/JacketCanvas";
import { BoxHelper, Group, Mesh } from "three";
import { useThree } from "@react-three/fiber";

const DEBUG = false;

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
    </>
  );
};

// eslint-disable-next-line react/display-name
const Model = React.forwardRef(({ url, ...rest }: { url: string }, ref) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} ref={ref} {...rest} />;
});

function getBoundingSphere(o: Mesh) {
  const bbox = new THREE.Box3().setFromObject(o);
  return bbox.getBoundingSphere(new THREE.Sphere());
}

const Scene = () => {
  const ref = React.useRef<Group>();
  const o = React.useRef<Mesh>();
  const orbit = React.useRef<OrbitControls>();

  // useHelper(o, BoxHelper, "#0f0");
  // useHelper(ref, BoxHelper, "#00f");
  const axis = React.useRef();
  const { camera } = useThree();

  React.useEffect(() => {
    if (!o.current) return;
    const { center, radius } = getBoundingSphere(o.current);
    console.log(center, orbit);
    if (axis.current) {
      axis.current.scale.set(radius, radius, radius);
      axis.current.position.copy(center);
    }
    camera.position.copy(
      center.clone().add(new THREE.Vector3(radius, radius, radius))
    );
    camera.updateProjectionMatrix();
    if (orbit.current) {
      console.log(orbit.current.target.copy(center.clone()));
    }
  }, [camera]);

  const url = "./jacket.glb";
  return (
    <mesh ref={ref}>
      <Lights />
      {/*{DEBUG && <axesHelper ref={axis} />}*/}
      <Model url={url} ref={o} />
      <OrbitControls ref={orbit} />
    </mesh>
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
    </JacketCanvas>
  );
}
