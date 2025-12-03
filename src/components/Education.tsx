"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { GraduationCap } from "lucide-react";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsapAnimations";

const education = [
  {
    degree: "Bachelor of Science in CSE",
    institution: "Daffodil International University",
    period: "Aug 2016 — Aug 2020",
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "Milestone School and College",
    period: "2013 — 2015",
  },
  {
    degree: "Secondary School Certificate",
    institution: "Lakshmipur Adarsho Samad Govt High School",
    period: "2008 — 2013",
  },
];

export const Education = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  ensureGsapRegistered();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-education-item]", {
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
      id="education"
      ref={sectionRef}
      className="relative mx-auto max-w-5xl px-6 py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      <div className="absolute -left-32 top-24 h-64 w-64 rounded-full bg-neonBlue/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-neonGreen/20 blur-[140px]" />

      <div className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-neonGreen">
          <GraduationCap className="h-4 w-4 text-neonBlue" />
          Education
        </span>
        <h2 className="text-balance text-3xl font-semibold uppercase tracking-[0.3em] text-white md:text-4xl">
          Academic Background
        </h2>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Foundation in computer science and engineering, providing a strong base for modern
          frontend development and software engineering practices.
        </p>
      </div>

      <div className="relative mt-14">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neonBlue via-white/20 to-neonGreen" />
        <ul className="space-y-10">
          {education.map((item, index) => (
            <li
              key={item.institution}
              data-education-item
              className="relative ml-12 rounded-3xl border border-white/10 bg-black/60 p-8 shadow-glow"
            >
              <span className="absolute -left-[39px] top-8 flex h-9 w-9 items-center justify-center rounded-full border border-neonBlue/60 bg-black/70 text-neonBlue shadow-glow">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.35em] text-white">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.3em] text-neonBlue">
                    {item.institution}
                  </p>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{item.period}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

