"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Briefcase, Layers3 } from "lucide-react";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsapAnimations";

const experience = [
  {
    role: "Frontend Developer",
    company: "FluxMotion Studio",
    period: "2023 — Present",
    description:
      "Lead engineer for interactive product sites and enterprise dashboards built with Next.js, Vue 3, GSAP, and high fidelity component systems.",
    stack: ["React", "Vue", "Tailwind", "GSAP"],
  },
  {
    role: "UI Animator",
    company: "MotionCraft Agency",
    period: "2022 — 2023",
    description:
      "Designed and implemented cinematic hero sequences, scroll-triggered product stories, and micro-animations to drive engagement.",
    stack: ["Framer Motion", "Lottie", "After Effects"],
  },
  {
    role: "Web Designer",
    company: "Freelance",
    period: "2020 — 2022",
    description:
      "Delivered end-to-end brand experiences with responsive layouts, neon-infused palettes, and performance-first code for global clients.",
    stack: ["Figma", "HTML", "CSS", "Interaction Design"],
  },
];

export const Experience = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  ensureGsapRegistered();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-experience-item]", {
        xPercent: -12,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative mx-auto max-w-5xl px-6 py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      <div className="absolute -left-32 top-24 h-64 w-64 rounded-full bg-neonBlue/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-neonGreen/20 blur-[140px]" />

      <div className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-neonGreen">
          <Layers3 className="h-4 w-4 text-neonBlue" />
          Experience
        </span>
        <h2 className="text-balance text-3xl font-semibold uppercase tracking-[0.3em] text-white md:text-4xl">
          Journey Through Motion
        </h2>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          A progression through studios and creative teams refining the craft of responsive,
          animated storytelling for the web.
        </p>
      </div>

      <div className="relative mt-14">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neonBlue via-white/20 to-neonGreen" />
        <ul className="space-y-10">
          {experience.map((item, index) => (
            <li
              key={item.company}
              data-experience-item
              data-cursor="magnetic"
              className="relative ml-12 rounded-3xl border border-white/10 bg-black/60 p-8 shadow-glow"
            >
              <span className="absolute -left-[39px] top-8 flex h-9 w-9 items-center justify-center rounded-full border border-neonBlue/60 bg-black/70 text-neonBlue shadow-glow">
                {index === 0 ? <Briefcase className="h-4 w-4" /> : <Layers3 className="h-4 w-4" />}
              </span>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.35em] text-white">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.3em] text-neonBlue">
                    {item.company}
                  </p>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{item.period}</p>
              </div>
              <p className="mt-5 text-sm text-slate-300">{item.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

