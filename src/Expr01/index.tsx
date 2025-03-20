import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const MyMesh = () => {
  const myMeshRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (myMeshRef.current) {
      myMeshRef.current.rotation.z = Math.sin(clock.elapsedTime);
    }
  });
  return (
    <mesh ref={myMeshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
};

export function Expr01() {
  return (
    <div>
      <h1>Expr01</h1>
      <Canvas>
        <ambientLight intensity={0.1} />
        {/* <directionalLight color="red" position={[0, 0, 5]} /> */}
        <MyMesh />
      </Canvas>
    </div>
  );
}
