import React from "react";
import { Canvas } from "@react-three/fiber";

export type JacketCanvasProps = { children: React.ReactNode };

export default function JacketCanvas({
  children,
  ...props
}: JacketCanvasProps) {
  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.physicallyCorrectLights = true;
      }}
      style={{ backgroundColor: "#000", height: "100vh" }}
      {...props}
    >
      {children}
    </Canvas>
  );
}
