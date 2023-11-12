import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskList from "./TaskList";

describe("TaskList Component", () => {
  beforeEach(() => {
    render(<TaskList />);
  });

  test("should add a new task to the list", () => {
  
    const input = screen.getByPlaceholderText("task");
    const addButton = screen.getByText("add");

    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(addButton);

    const task = screen.getByText("Test task");
    expect(task).toBeInTheDocument();
  });

  test("should delete a task from the list", () => {
   
    const input = screen.getByPlaceholderText("task");
    const addButton = screen.getByText("add");

    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText("delete");
    fireEvent.click(deleteButton);

    const deletedTask = screen.queryByText("Test task");
    expect(deletedTask).toBeNull();
  });

  test("should mark a task as done", () => {
  
    const input = screen.getByPlaceholderText("task");
    const addButton = screen.getByText("add");

    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    const task = screen.getByText("Test task");
    expect(task).toHaveClass("sc-eDLKEg ficrBt line-through-on");
  });
});