import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import ErrorMessage from "../ErrorMessage.jsx";

describe("ErrorMessage component", () => {
  test("renders nothing when there is no message", () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });

   test("displays the error message when provided", () => {
    render(<ErrorMessage message="Something went wrong." />);
    expect(screen.getByText(/Something went wrong\./)).toBeInTheDocument();
  });

  test("calls onRetry when the retry button is clicked", () => {
    const handleRetry = vi.fn();
    render(<ErrorMessage message="Failed to load." onRetry={handleRetry} />);

    const retryButton = screen.getByRole("button");
    fireEvent.click(retryButton);

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});