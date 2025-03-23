import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ColorQuiz, { SettingsModal } from "./index";
import { toast } from "react-toastify";

// Mock react-toastify to avoid side effects in tests
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div>ToastContainer</div>,
}));

describe("ColorQuiz Component", () => {
  it("renders the ColorQuiz component correctly", () => {
    render(<ColorQuiz />);
    expect(screen.getByText("Color Quiz")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Color Quiz" })
    ).toBeInTheDocument();
  });

  it("renders the correct number of color boxes based on colorNum", () => {
    render(<ColorQuiz />);
    const colorBoxes = screen.getAllByRole("button", { name: /color/i });
    expect(colorBoxes).toHaveLength(4); // Default colorNum is 4
  });

  it("updates the number of color boxes when colorNum changes", async () => {
    render(<ColorQuiz />);
    const settingsIcon = screen.getByRole("button", { name: /settings/i });

    // Open settings modal
    fireEvent.click(settingsIcon);

    // Change the number of colors
    const colorNumInput = screen.getByLabelText("Number of colors");
    fireEvent.change(colorNumInput, { target: { value: "6" } });

    // Close settings modal
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Wait for the color boxes to update
    await waitFor(() => {
      const colorBoxes = screen.getAllByRole("button", { name: /color/i });
      expect(colorBoxes).toHaveLength(6);
    });
  });

  it("displays a success toast when the correct color is clicked", async () => {
    render(<ColorQuiz />);
    const correctColor = screen.getByRole("heading", { level: 2 }).textContent;

    // Find the correct color box and click it
    const correctColorBox = screen
      .getAllByRole("button", { name: /color/i })
      .find((box) => box.style.backgroundColor === correctColor);

    if (correctColorBox) {
      fireEvent.click(correctColorBox);
    }

    // Check if the success toast is displayed
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Wow, Correct! 🎉");
    });
  });

  it("displays an error toast when the wrong color is clicked", async () => {
    render(<ColorQuiz />);
    const correctColor = screen.getByRole("heading", { level: 2 }).textContent;

    // Find a wrong color box and click it
    const wrongColorBox = screen
      .getAllByRole("button", { name: /color/i })
      .find((box) => box.style.backgroundColor !== correctColor);

    if (wrongColorBox) {
      fireEvent.click(wrongColorBox);
    }

    // Check if the error toast is displayed
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Oops, Wrong! 😢");
    });
  });
});

describe("SettingsModal Component", () => {
  it("opens and closes the settings modal", () => {
    const setColorNum = jest.fn();
    render(<SettingsModal colorNum={4} setColorNum={setColorNum} />);

    // Open the modal
    const settingsIcon = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsIcon);

    // Check if the modal is open
    expect(screen.getByText("Settings")).toBeInTheDocument();

    // Close the modal
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Check if the modal is closed
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("updates the colorNum input value", () => {
    const setColorNum = jest.fn();
    render(<SettingsModal colorNum={4} setColorNum={setColorNum} />);

    // Open the modal
    const settingsIcon = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsIcon);

    // Change the input value
    const colorNumInput = screen.getByLabelText("Number of colors");
    fireEvent.change(colorNumInput, { target: { value: "8" } });

    // Check if the input value is updated
    expect(colorNumInput).toHaveValue(8);
    expect(setColorNum).toHaveBeenCalledWith(8);
  });

  it("does not allow colorNum to exceed 10", () => {
    const setColorNum = jest.fn();
    render(<SettingsModal colorNum={4} setColorNum={setColorNum} />);

    // Open the modal
    const settingsIcon = screen.getByRole("button", { name: /settings/i });
    fireEvent.click(settingsIcon);

    // Try to set a value greater than 10
    const colorNumInput = screen.getByLabelText("Number of colors");
    fireEvent.change(colorNumInput, { target: { value: "15" } });

    // Check if the value is capped at 10
    expect(colorNumInput).toHaveValue(10);
    expect(setColorNum).toHaveBeenCalledWith(10);
  });
});
