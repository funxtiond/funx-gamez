import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

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
