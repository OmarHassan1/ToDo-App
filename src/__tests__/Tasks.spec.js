import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Tasks } from "../components/Tasks";
import { useSelectedProjectValue } from "../context";

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
  })),
}));

jest.mock("../hooks", () => ({
  useTasks: () => ({
    tasks: [
      {
        id: "mx2taaXpF38vYqMGbVtY",
        archived: false,
        date: "21/07/2019",
        projectid: "1",
        task:
          "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
        userId: "jlIFXIwyAL3tzHMtzRbw",
      },
    ],
  }),
}));

beforeEach(cleanup);

describe("<Tasks />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders tasks", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "INBOX"),
      selectedProject: "INBOX",
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("tasks")).toBeTruthy();
    expect(queryByTestId("project-name").textContent).toBe("Inbox");
  });

  it("renders a task with a project title", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "1"),
      selectedProject: "1",
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("tasks")).toBeTruthy();
    expect(queryByTestId("project-name").textContent).toBe(" 🎵 Music");
  });

  it("renders a task with a collated title", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "INBOX"),
      selectedProject: "INBOX",
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("tasks")).toBeTruthy();
    expect(queryByTestId("project-name").textContent).toBe("Inbox");
  });
});
