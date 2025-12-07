import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

type Pos = { x: number; y: number };

type DWParamType = {
  children: ReactNode;
  // handlePosition: (newPos: Pos) => void;
  // position: Pos;
};

const DraggableFloatingButton = ({ children }: DWParamType) => {
  // const [offset, setOffset] = useState<Pos>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Pos>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  useLayoutEffect(() => {
    if (!ref.current) return;
    const elementHeight = ref.current.getBoundingClientRect().height;
    const elementWidth = ref.current.getBoundingClientRect().width;
    const margin = 24;
    const initialPositionX = window.innerWidth - elementWidth - margin;
    const initialPositionY = window.innerHeight - elementHeight - margin;
    setPosition({ x: initialPositionX, y: initialPositionY });
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Calculate offset between mouse cursor & element top-left
    // const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    // setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    console.log({ clientX, clientY});
    const btnWidth = ref.current?.getBoundingClientRect().width ?? 0
    const btnHeight = ref.current?.getBoundingClientRect().height ?? 0

    // Put cursor in center of button while dragging
    setPosition({
      x: clientX - btnWidth / 2, 
      y: clientY - btnHeight / 2,
    });
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      className="fixed p-4 rounded-full w-20 aspect-square flex items-center bg-amber-500 cursor-pointer select-none"
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
  return <DraggableFloatingButton>Drag Me</DraggableFloatingButton>;
}
