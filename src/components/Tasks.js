import React, { useEffect } from "react";
import { Checkbox } from "./Checkbox";
import { useTasks } from "../hooks";

import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  let projectName = "";

  try {
    if (
      projects &&
      projects.length > 0 &&
      selectedProject &&
      !collatedTasksExist(selectedProject)
    ) {
      projectName = getTitle(projects, selectedProject).name;
    }
  } catch (err) {
    console.log(err);
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    console.log("projectName 2:", projectName);
  }

  useEffect(() => {
    document.title = `${projectName}  ToDoApp`;
  });
  return (
    <div className="tasks" data-testid="tasks">
      <h3 data-testid="project-name">{projectName}</h3>
      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
