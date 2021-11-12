import { useProgress } from "@react-three/drei/core/useProgress";
import { Html } from "@react-three/drei/web/Html";
import React from "react";

function Loader() {
  const {
    progress,
    // active, errors, item, loaded, total
  } = useProgress();
  return (
    <Html style={{ color: "red" }} center>
      <h1>{progress | 0} % loaded</h1>
    </Html>
  );
}

export default Loader;
