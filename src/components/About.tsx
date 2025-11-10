"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Tilt from "react-parallax-tilt";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsapAnimations";
import { Code2, Palette, Sparkles } from "lucide-react";

const skills = [
  { label: "HTML5", accent: "from-orange-400 via-pink-400 to-red-500" },
  { label: "CSS3", accent: "from-sky-500 via-cyan-400 to-blue-500" },
  { label: "Tailwind", accent: "from-neonBlue via-cyan-300 to-indigo-500" },
  { label: "React", accent: "from-teal-400 via-teal-300 to-sky-400" },
  { label: "Next.js", accent: "from-slate-200 via-white/60 to-neonBlue/80" },
  { label: "Vue.js", accent: "from-emerald-400 via-lime-300 to-green-500" },
  { label: "GSAP", accent: "from-neonGreen via-lime-300 to-sky-300" },
  { label: "Framer Motion", accent: "from-purple-400 via-fuchsia-400 to-pink-500" },
];

export const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  ensureGsapRegistered();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-about-text]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from("[data-skill-card]", {
        y: 50,
        opacity: 0,
        rotateX: -15,
        transformPerspective: 900,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 lg:flex-row lg:items-center lg:gap-16"
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative flex-1">
        <div className="glass-panel neon-border p-10 shadow-depth lg:p-12">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-neonGreen">
            <Sparkles className="h-4 w-4 text-neonBlue" />
            About Miraz
          </span>
          <h2 className="text-balance text-3xl font-semibold uppercase tracking-[0.3em] text-white md:text-4xl">
            Elevating Interfaces With Motion &amp; Emotion
          </h2>
          <p
            data-about-text
            className="mt-6 max-w-xl text-base text-slate-300/90"
          >
            With over <span className="text-neonBlue">4 years</span> crafting frontend experiences,
            I blend modern frameworks with expressive motion. From SaaS dashboards to marketing
            microsites, I orchestrate typography, color, and choreography to design interfaces that
            feel alive and react to every user gesture.
          </p>
          <div className="mt-8 grid gap-6 text-sm text-slate-200/90 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-glow">
              <Code2 className="mb-4 h-6 w-6 text-neonBlue" />
              <p className="font-semibold uppercase tracking-[0.25em] text-white">
                Engineering Precision
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Modular Next.js apps, performance budgets, and pixel-perfect responsive layouts.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-glow">
              <Palette className="mb-4 h-6 w-6 text-neonGreen" />
              <p className="font-semibold uppercase tracking-[0.25em] text-white">
                Artistic Direction
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Neon palettes, glassmorphism, depth layering, and motion systems tailored to brand
                voice.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex-1">
        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((skill) => (
            <Tilt
              key={skill.label}
              glareEnable
              glareMaxOpacity={0.45}
              glareColor="#38bdf8"
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              perspective={1000}
              className="group"
            >
              <div
                data-skill-card
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 text-center shadow-glow transition-transform duration-300 group-hover:scale-[1.03]"
              >
                <div className={`pointer-events-none absolute inset-0 opacity-70 blur-2xl bg-gradient-to-br ${skill.accent}`} />
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                    Expertise
                  </p>
                  <p className="mt-4 text-lg font-semibold uppercase tracking-[0.25em] text-white">
                    {skill.label}
                  </p>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

