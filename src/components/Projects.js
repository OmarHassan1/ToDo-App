import React, { useState } from "react";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { IndividualProject } from "./individualProject";
export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectid}
        data-doc-id={project.docId}
        data-testid="project-action-parent"
        className={
          active === project.projectid
            ? "active sidebar__project"
            : "sidebar__project"
        }
        onClick={() => {
          setActive(project.projectid);
          setSelectedProject(project.projectid);
        }}
        onKeyDown={() => {
          setActive(project.projectid);
          setSelectedProject(project.projectid);
        }}
      >
        <IndividualProject project={project} />
      </li>
    ))
  );
};
