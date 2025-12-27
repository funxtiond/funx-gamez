import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
// import { UserForm } from './UserForm';
import "@testing-library/jest-dom";
import { UserList } from ".";

// 1. Setup MSW server to mock API endpoints
const server = setupServer(
  http.get("https://jsonplaceholder.typicode.com/users", () => {
    return HttpResponse.json({ name: "Initial Name" });
  }),
  http.post("https://jsonplaceholder.typicode.com/users", async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json({ message: "Success", received: data });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// 2. Create a testing wrapper with a fresh QueryClient for each test
const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in tests
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// test('loads user data and submits new data successfully', async () => {
//   render(<UserForm />, { wrapper: createTestWrapper() });

//   // Wait for the data to load and the initial form state to set
//   const nameInput = await screen.findByPlaceholderText('Name');
//   expect(nameInput).toHaveValue('Initial Name');

//   // Simulate user input
//   fireEvent.change(nameInput, { target: { value: 'New Name' } });

//   // Simulate form submission
//   const saveButton = screen.getByRole('button', { name: /save/i });
//   fireEvent.click(saveButton);

//   // Wait for the mutation to complete and success message to appear
//   await waitFor(() => {
//     expect(screen.getByText('User updated!')).toBeInTheDocument();
//   });
// });

test("handles API error on data fetching", async () => {
  // Mock an error response for this specific test
  server.use(
    http.get("https://jsonplaceholder.typicode.com/users", () => {
      // return HttpResponse.json({ message: "Failed" }, { status: 500 });
      return HttpResponse.error();
    })
  );

  render(<UserList />, { wrapper: createTestWrapper() });

  // Check for the error message
  await screen.findByTestId("no-users-found");
});
