import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Projects from "../Projects.jsx";
import { useProjects } from "../../context/ProjectContext.jsx";

vi.mock("../../context/ProjectContext.jsx", () => ({
  useProjects: vi.fn(),
}));

describe("Projects page", () => {
  test("shows the 'Create Project' form when 'New Project' button is clicked", () => {
    useProjects.mockReturnValue({
      projects: [],
      loading: false,
      error: "",
      reloadProjects: vi.fn(),
      addProject: vi.fn(),
      editProject: vi.fn(),
      removeProject: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );

    // Form abhi nahi dikhni chahiye
    expect(screen.queryByPlaceholderText("Project title")).not.toBeInTheDocument();

    // "+ New Project" button click karein
    fireEvent.click(screen.getByText("+ New Project"));

    // Ab form dikhni chahiye
    expect(screen.getByPlaceholderText("Project title")).toBeInTheDocument();
  });

  test("shows empty state when there are no projects", () => {
    useProjects.mockReturnValue({
      projects: [],
      loading: false,
      error: "",
      reloadProjects: vi.fn(),
      addProject: vi.fn(),
      editProject: vi.fn(),
      removeProject: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );

    expect(screen.getByText("No projects yet")).toBeInTheDocument();
  });
});