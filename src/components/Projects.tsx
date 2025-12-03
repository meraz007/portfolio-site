"use client";

import Image from "next/image";
import { useRef } from "react";
import Tilt from "react-parallax-tilt";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsapAnimations";

type Project = {
  title: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "WriterBuddy AI",
    description:
      "The most advanced AI writing assistant that streamlines your academic workflow. You can easily write any kind of article, blog, SEO meta tag also chat with any documents.",
    image: "/projects/aurora-lab.svg",
    href: "https://writerbuddy.ai/",
    tags: ["Next.js", "Vue.js", "Tailwind CSS", "Git", "Figma"],
  },
  {
    title: "ApplyGoal CRM",
    description:
      "Developed a scalable CRM platform using Next.js and Tailwind CSS, tailored for education agencies and students applying to universities worldwide. Implemented role-based access (agency, student, admin) to provide personalized views and workflows. Built dynamic dashboards and forms for managing student applications, documents, and university programs.",
    image: "/projects/pulse-analytics.svg",
    href: "https://applygoal.com/",
    tags: ["Next.js", "Tailwind CSS", "Role-Based Access", "CRM"],
  },
];

export const Projects = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  ensureGsapRegistered();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-project-card]", {
        opacity: 0,
        y: 80,
        rotateX: -12,
        transformPerspective: 900,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
      <div className="flex flex-col gap-4 text-center">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-neonBlue">
          Featured Work
        </span>
        <h2 className="text-balance text-3xl font-semibold uppercase tracking-[0.3em] text-white md:text-4xl">
          Selected Projects
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
          Real-world projects showcasing expertise in building scalable SaaS platforms and CRM
          solutions with modern frontend technologies and best practices.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Tilt
            key={project.title}
            glareEnable
            glareMaxOpacity={0.35}
            glareColor="#38bdf8"
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1200}
            className="group"
          >
            <article
              data-project-card
              className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/70 shadow-depth transition-transform duration-500 group-hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/10 via-transparent to-neonGreen/10 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 p-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold uppercase tracking-[0.3em] text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-slate-200"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "inline-flex items-center justify-between gap-3 rounded-full border border-neonBlue/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neonBlue transition",
                    "hover:border-neonGreen/70 hover:text-neonGreen"
                  )}
                >
                  View Project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </article>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

