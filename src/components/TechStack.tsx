"use client";

import Image from "next/image";
import { useState } from "react";

const technologies = [
  { name: "Next.js", logo: "nextjs" },
  { name: "React", logo: "react" },
  { name: "TypeScript", logo: "typescript" },
  { name: "Node.js", logo: "nodejs" },
  { name: "PostgreSQL", logo: "postgresql" },
  { name: "Tailwind CSS", logo: "tailwindcss" },
  { name: "Supabase", logo: "supabase" },
  { name: "Prisma", logo: "prisma" },
  { name: "Git", logo: "git" },
  { name: "Docker", logo: "docker" },
] as const;

export default function TechStack() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="tech-stack container" aria-labelledby="stack-heading">
      <div className="stack-heading">
        <div>
          <p className="eyebrow">The stack behind the work</p>
          <h2 id="stack-heading">Good tools. Thoughtful execution.</h2>
        </div>
        <button
          className="stack-toggle"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
      <div className="stack-window" data-paused={paused}>
        <div className="stack-track">
          {[0, 1].map((copy) => (
            <ul
              className="stack-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {technologies.map((technology) => (
                <li className="stack-item" key={technology.logo}>
                  <Image
                    src={`/stack/${technology.logo}.svg`}
                    alt=""
                    loading="eager"
                    width={34}
                    height={34}
                  />
                  <span>{technology.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
