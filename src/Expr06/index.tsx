import { ReactNode, useState } from "react";

type Pos = { x: number; y: number };

type DWParamType = {
  children: ReactNode;
  // handlePosition: (newPos: Pos) => void;
  // position: Pos;
};

const DraggableWrapper = ({ children }: DWParamType) => {
  const [offset, setOffset] = useState<Pos>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Pos>({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    console.log({ clientX, clientY, offsetX: offset.x, offsetY: offset.y });
    setPosition({
      x: clientX - offset.x,
      y: clientY - offset.y,
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Calculate offset between mouse cursor & element top-left
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className="fixed p-4 rounded-full aspect-square flex items-center bg-amber-500 cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "fixed",
      }}
    >
      {children}
    </div>
  );
};

export default function Expr06() {
  // alert("rerendered!");
  return <DraggableWrapper>Drag Me</DraggableWrapper>;
}
