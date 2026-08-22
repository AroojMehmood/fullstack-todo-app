import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Loader from "../Loader.jsx";

describe("Loader component", () => {
  test("renders a spinner element", () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector(".spinner");
    expect(spinner).toBeInTheDocument();
  });
});