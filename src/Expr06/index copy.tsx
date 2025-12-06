import {
  DragEvent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type DWParamType = {
  children: ReactNode;
  handlePosition: (newPos: Pos) => void;
  position: Pos;
};

type Pos = {
  x: number;
  y: number;
};

const DraggableWrapper = ({
  handlePosition,
  position,
  children,
}: DWParamType) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const { clientX, clientY } = e;

    handlePosition({ x: clientX, y: clientY });
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // alert('down!' + e.clientX)
    console.log('down!')

    // attach global listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
  setIsDragging(false);
  // alert('up!')
  console.log('up!')

  // detach global listeners
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);
};

  return (
    <div
      onMouseDown={handleMouseDown}
      // onDrag={handleDrag}
      // draggable
      className="fixed p-4 rounded-full aspect-square flex items-center bg-amber-500"
      style={{
        // transform: `translate(-${position.x}px, ${position.y}px)`,
        top: position.y,
        left: position.x
      }}
    >
      {children}
    </div>
  );
};

export default function Expr06() {
  const [position, setPosition] = useState<Pos>({
    x: 0,
    y: 0,
  });
  const handlePosition = (newPos: Pos) => {
    setPosition(newPos);
  };
  return (
    <>
      <DraggableWrapper handlePosition={handlePosition} position={position}>
        Drag Me
      </DraggableWrapper>
    </>
  );
}
