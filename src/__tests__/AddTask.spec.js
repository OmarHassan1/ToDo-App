import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { AddTasks } from "../components/AddTasks";
import { useSelectedProjectValue } from "../context";

beforeEach(cleanup);

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: "1" })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("Never mock firebase")),
      })),
    })),
  },
}));

describe("<AddTasks />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("Success", () => {
    it("renders the <AddTasks />", () => {
      const { queryByTestId } = render(<AddTasks />);
      expect(queryByTestId("add-task-comp")).toBeTruthy();
    });

    it("renders the <AddTasks /> quick overlay", () => {
      const setShowQuickAddTask = jest.fn();

      const { queryByTestId } = render(
        <AddTasks
          showAddTaskMain
          shouldShowMain={false}
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );

      expect(queryByTestId("quick-add-task")).toBeTruthy();
    });

    it("renders the <AddTasks /> main showable using onClick", () => {
      const { queryByTestId } = render(<AddTasks showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders the <AddTasks /> main showable using keyDown", () => {
      const { queryByTestId } = render(<AddTasks showAddTaskMain />);

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders the <AddTasks /> project overlay when using onClick", () => {
      const { queryByTestId } = render(<AddTasks showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("show-project-overlay"));
      expect(queryByTestId("project-overlay")).toBeTruthy();
    });

    it("renders the <AddTasks /> project overlay when using onKeyDown", () => {
      const { queryByTestId } = render(<AddTasks showAddTaskMain />);

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("show-project-overlay"));
      expect(queryByTestId("project-overlay")).toBeTruthy();
    });

    it("renders the <AddTasks /> task date overlay when using onClick", () => {
      const { queryByTestId } = render(<AddTasks showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
    });

    it("renders the <AddTasks /> task date overlay when using onKeyDown", () => {
      const { queryByTestId } = render(<AddTasks showAddTaskMain />);

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
    });

    it("hides the <AddTasks /> main when cancel is clicked using onClick", () => {
      const { queryByTestId } = render(<AddTasks showAddTaskMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("add-task-main-cancel"));
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });

    it("hides the <AddTasks /> main when cancel is clicked using onKeyDown", () => {
      const { queryByTestId } = render(<AddTasks showAddTaskMain />);

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("add-task-main-cancel"));
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });

    it("renders <AddTasks /> for quick add task and then clicks cancel using onClick", () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTasks setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      );

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.click(queryByTestId("add-task-quick-cancel"));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it("renders <AddTasks /> for quick add task and then clicks cancel using onKeyDown", () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTasks setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      );

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("add-task-quick-cancel"));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it("renders <AddTasks /> and adds a task to TODAY", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "TODAY",
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTasks
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();

      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "I am a new task and I am amazing!" },
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "I am a new task and I am amazing!"
      );

      fireEvent.click(queryByTestId("add-task"));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it("renders <AddTasks /> and adds a task to NEXT_7", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "NEXT_7",
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTasks
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();

      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "I am a new task and I am amazing!" },
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "I am a new task and I am amazing!"
      );

      fireEvent.click(queryByTestId("add-task"));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });
    it("renders <AddTasks /> and adds a task with a task date of TODAY", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "1",
      }));

      const { queryByTestId } = render(<AddTasks showMain />);
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "I am the most amazing task ever!" },
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "I am the most amazing task ever!"
      );

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();

      fireEvent.click(queryByTestId("task-date-today"));
      expect(queryByTestId("task-date-overlay")).toBeFalsy();

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("task-date-today"));
      expect(queryByTestId("task-date-overlay")).toBeFalsy();

      fireEvent.click(queryByTestId("add-task"));
    });

    it("renders <AddTasks /> and adds a task with a task date of TOMORROW", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "1",
      }));

      const { queryByTestId } = render(<AddTasks showMain />);
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "I am the most amazing task ever!" },
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "I am the most amazing task ever!"
      );

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();

      fireEvent.click(queryByTestId("task-date-tomorrow"));
      expect(queryByTestId("task-date-overlay")).toBeFalsy();

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("task-date-tomorrow"));
      expect(queryByTestId("task-date-overlay")).toBeFalsy();

      fireEvent.click(queryByTestId("add-task"));
    });

    it("renders <AddTasks /> and adds a task with a task date of NEXT_7", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "1",
      }));

      const { queryByTestId } = render(<AddTasks showMain />);
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "I am the most amazing task ever!" },
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "I am the most amazing task ever!"
      );

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();

      fireEvent.click(queryByTestId("task-date-next-week"));
      expect(queryByTestId("task-date-overlay")).toBeFalsy();

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("task-date-next-week"));
      expect(queryByTestId("task-date-overlay")).toBeFalsy();

      fireEvent.click(queryByTestId("add-task"));
    });
  });
});
