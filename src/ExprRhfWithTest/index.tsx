import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
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

    console.log({ clientX, clientY });
    const btnWidth = ref.current?.getBoundingClientRect().width ?? 0;
    const btnHeight = ref.current?.getBoundingClientRect().height ?? 0;

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

const fetchUser = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

const queryClient = new QueryClient();

export const UserList = () => {
  // alert("rerendered!");
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  console.log(users, isError, isLoading);
  return (
    <div className="mt-8 max-w-[1200px]">
      <h3>Hey Users:</h3>
      <div className="grid grid-cols-3 gap-8 mt-4">
        {users ? (
          users.map((user: any) => (
            <div className="grid grid-cols-2 text-left card shadow-lg break-all">
              <p>Name:</p>
              <p>{user.name}</p>
              <p>Username: </p>
              <p>{user.username}</p>
              <p>Email:</p>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p data-testid="no-users-found">No users found</p>
        )}
      </div>
    </div>
  );
};

export default function ExprRhfWithTest() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}
