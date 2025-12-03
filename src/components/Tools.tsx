"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsapAnimations";
import { Wrench } from "lucide-react";

const tools = [
  { label: "Postman", accent: "from-orange-400 via-red-400 to-orange-500" },
  { label: "Git & GitHub", accent: "from-slate-400 via-slate-300 to-slate-500" },
  { label: "PgAdmin", accent: "from-blue-400 via-blue-300 to-indigo-500" },
  { label: "Figma", accent: "from-purple-400 via-pink-400 to-purple-500" },
  { label: "VS Code", accent: "from-blue-400 via-cyan-300 to-blue-500" },
  { label: "Cursor", accent: "from-green-400 via-emerald-300 to-green-500" },
];

export const Tools = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  ensureGsapRegistered();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-tool-card]", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
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
      id="tools"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-24"
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col items-center gap-4 text-center mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-neonGreen">
          <Wrench className="h-4 w-4 text-neonBlue" />
          Tools & Software
        </span>
        <h2 className="text-balance text-3xl font-semibold uppercase tracking-[0.3em] text-white md:text-4xl">
          Development Tools
        </h2>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Essential tools and software I use daily to build, test, and deploy modern web applications.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <div key={tool.label} className="isolate">
            <div
              data-tool-card
              className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 text-center shadow-glow"
            >
              <div className={`pointer-events-none absolute inset-0 opacity-40 blur-xl bg-gradient-to-br ${tool.accent}`} style={{ clipPath: 'inset(0)' }} />
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                  Tool
                </p>
                <p className="mt-4 text-lg font-semibold uppercase tracking-[0.25em] text-white">
                  {tool.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

