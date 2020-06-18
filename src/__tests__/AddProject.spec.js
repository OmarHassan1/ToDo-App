import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { AddProject } from "../components/AddProject";
import { useSelectedProjectValue } from "../context";

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});
jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: " 🎵 Music",
        projectid: "1",
        userid: "omar01125",
        docId: "omar-khaled",
      },
      {
        name: " 🚀DAILY",
        projectid: "2",
        userid: "omar01125",
        docId: "omar-khaled",
      },
      {
        name: "✈️PLANE",
        projectid: "3",
        userid: "omar01125",
        docId: "omar-khaled",
      },
      {
        name: "🎮 GAMES",
        projectid: "4",
        userid: "omar01125",
        docId: "omar-khaled",
      },
      {
        name: "⚽FOOTBALL",
        projectid: "5",
        userid: "omar01125",
        docId: "omar-khaled",
      },
    ],
    setProjects: jest.fn(),
  })),
}));

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("I am resolved!")),
      })),
    })),
  },
}));

beforeEach(cleanup);

describe("<AddProject />", () => {
  describe("Success", () => {
    it("renders <AddProject />", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
    });

    it("renders <AddProject /> and adds a project using onClick", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();

      fireEvent.change(queryByTestId("project-name"), {
        target: { value: "Best project in the world!" },
      });
      expect(queryByTestId("project-name").value).toBe(
        "Best project in the world!"
      );
      fireEvent.click(queryByTestId("add-project-submit"));
    });

    it("renders <AddProject /> and adds a project using onKeyDown", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();

      fireEvent.change(queryByTestId("project-name"), {
        target: { value: "Best project in the world!" },
      });
      expect(queryByTestId("project-name").value).toBe(
        "Best project in the world!"
      );
      fireEvent.keyDown(queryByTestId("add-project-submit"));
    });

    it("hides the project overlay when cancelled using onClick", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.click(getByText("Cancel"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides the project overlay when cancelled onKeydown", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.keyDown(getByText("Cancel"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides the project overlay using onClick singular and reverse action", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.click(queryByTestId("add-project-action"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides the project overlay using onKeyDown singular and reverse action", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("add-project-action"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });
  });
});
