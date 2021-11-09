import * as THREE from "three";

import {
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
import { useThree } from "@react-three/fiber";

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

// eslint-disable-next-line react/display-name
const Model = React.forwardRef(({ url, ...rest }: { url: string }, ref) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} ref={ref} {...rest} />;
});

function getBoundingSphere(o: Mesh) {
  const bbox = new THREE.Box3().setFromObject(o);
  return bbox.getBoundingSphere(new THREE.Sphere());
}

const Scene = ({ url }: { url: string }) => {
  const ref = React.useRef<Group>();
  const o = React.useRef<Mesh>();
  const orbit = React.useRef<OrbitControlsProps>();
  const [centerPosition, setCenterPosition] = React.useState(
    new THREE.Vector3()
  );

  const { camera } = useThree();

  React.useEffect(() => {
    if (!o.current) return;
    const { center, radius } = getBoundingSphere(o.current);

    camera.position.copy(
      center.clone().add(new THREE.Vector3(0 * radius, 0 * radius, radius))
    );
    camera.updateProjectionMatrix();

    centerPosition.copy(center);
    setCenterPosition(center);
  }, [camera]);

  const onPointerMove = ({ point, distance, ...e }) => {
    console.log(point, e, "<<<");
  };

  return (
    <mesh ref={ref}>
      <Lights />
      {/*{DEBUG && <axesHelper ref={axis} />}*/}
      <Model url={url} ref={o} onPointerMove={onPointerMove} />
      {centerPosition && <OrbitControls ref={orbit} target={centerPosition} />}
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
