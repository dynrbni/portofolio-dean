"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/portfolio";

const filters = ["All projects", "Business systems", "Websites"] as const;
type Filter = (typeof filters)[number];

export default function ProjectGallery() {
  const [filter, setFilter] = useState<Filter>("All projects");
  const [selected, setSelected] = useState<Project>(projects[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = projects.filter(
    (project) => filter === "All projects" || project.category === filter,
  );

  function openProject(project: Project) {
    setSelected(project);
    dialog.current?.showModal();
  }

  return (
    <>
      <div className="project-toolbar">
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="project-count" aria-live="polite">
          {String(visible.length).padStart(2, "0")} projects
        </span>
      </div>
      <div className="project-grid" key={filter}>
        {visible.map((project, index) => (
          <article className="project" key={project.name} data-reveal>
            <button
              className={`project-visual ${project.tone}`}
              onClick={() => openProject(project)}
              aria-label={`View ${project.name} project details`}
            >
              <div className="project-browser">
                <div className="browser-bar">
                  <span aria-hidden="true">● ● ●</span>
                  <span>
                    {project.name === "PorLapor"
                      ? "PorLapor / Application preview"
                      : new URL(project.href).hostname}
                  </span>
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="project-image">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 700px) 92vw, 45vw"
                  />
                </div>
              </div>
              <span className="project-open" aria-hidden="true">
                View project ↗
              </span>
            </button>
            <div className="project-meta">
              <span>{project.label}</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>
              <button
                className="project-title"
                onClick={() => openProject(project)}
              >
                <span>{project.name}</span>
                <span aria-hidden="true">↗</span>
              </button>
            </h3>
            <p className="project-description">{project.description}</p>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        aria-labelledby="project-dialog-title"
      >
        <div className="dialog-content">
          <div className="dialog-top">
            <span className="eyebrow">Project overview</span>
            <button
              className="close-button"
              onClick={() => dialog.current?.close()}
              aria-label="Close project details"
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <p className="dialog-category">{selected.label}</p>
          <h2 id="project-dialog-title">{selected.name}</h2>
          <div className="dialog-image">
            <Image
              src={selected.image}
              alt={selected.imageAlt}
              width={1440}
              height={1000}
              sizes="(max-width: 700px) 90vw, 760px"
            />
          </div>
          <p className="dialog-description">{selected.detail}</p>
          <ul className="feature-list">
            {selected.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <a
            href={selected.href}
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            {selected.linkLabel}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </dialog>
    </>
  );
}
