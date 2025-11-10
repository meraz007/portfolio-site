'use client';

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Sparkles, ArrowUpRight } from "lucide-react";
import {
  attachParallaxEffect,
  ensureGsapRegistered,
  prefersReducedMotion,
  smoothScrollTo,
} from "@/lib/gsapAnimations";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const layersRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  ensureGsapRegistered();

  useEffect(() => {
    if (!containerRef.current) return;
    layersRef.current = containerRef.current.querySelectorAll<HTMLElement>("[data-parallax-layer]");
    const cleanup = attachParallaxEffect(containerRef, layersRef);
    return () => cleanup?.();
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.from("[data-hero-subheading]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          "[data-hero-heading]",
          {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          "[data-hero-description]",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          "[data-hero-cta] button",
          {
            y: 35,
            opacity: 0,
            rotationX: -20,
            transformPerspective: 800,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          "[data-hero-orbit]",
          {
            opacity: 0,
            scale: 0.4,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.9"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-grid px-6 py-32 text-textPrimary lg:px-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95" />

      <div className="absolute inset-x-0 top-0 flex justify-center">
        <div className="h-36 w-[65%] rounded-full bg-gradient-to-r from-neonBlue/20 via-transparent to-neonGreen/20 blur-3xl" />
      </div>

      <div
        data-parallax-layer
        className="floating-shape absolute -left-[10%] top-[15%] h-56 w-56 rounded-full opacity-60 blur-xl"
      />
      <div
        data-parallax-layer
        className="floating-shape absolute right-[5%] top-[30%] h-64 w-64 rounded-[40%] opacity-40 blur-xl"
      />

      <div
        data-parallax-layer
        className="absolute inset-x-0 -bottom-32 flex justify-center opacity-50"
      >
        <div className="h-44 w-3/4 rounded-full bg-gradient-to-r from-neonBlue/30 via-transparent to-neonGreen/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <span
          data-hero-subheading
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-neonBlue shadow-glow"
        >
          <Sparkles className="h-4 w-4 text-neonGreen" />
          Cinematic Frontend Experiences
        </span>

        <h1
          data-hero-heading
          className="text-balance text-4xl font-semibold uppercase tracking-[0.35em] text-white drop-shadow-glow sm:text-5xl lg:text-6xl"
        >
          Hi, I&apos;m <span className="text-neonBlue">Saiful Islam Miraz</span>
          <br />
          Frontend Developer &amp; UI Animator
        </h1>

        <p
          data-hero-description
          className="max-w-2xl text-balance text-base text-slate-300/90 md:text-lg"
        >
          I craft immersive, neon-soaked user interfaces with motion-first storytelling. From
          parallax hero moments to GSAP-powered micro-interactions, every pixel is choreographed for
          a cinematic feel across web platforms.
        </p>

        <div
          data-hero-cta
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            data-cursor="magnetic"
            onClick={() => smoothScrollTo("#projects", 70)}
            className="group relative min-w-[190px] overflow-hidden rounded-full border border-neonBlue/70 bg-black/70 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neonBlue shadow-glow transition hover:border-neonGreen/80 hover:text-neonGreen"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View My Work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <span className="absolute inset-0 scale-75 rounded-full bg-gradient-to-r from-neonBlue/40 via-neonGreen/30 to-neonBlue/40 opacity-0 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
          </button>

          <button
            data-cursor="magnetic"
            onClick={() => smoothScrollTo("#contact", 70)}
            className="group relative min-w-[190px] overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-neonBlue/60 hover:text-neonBlue"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Contact Me
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <span className="absolute inset-px rounded-full bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />
          </button>
        </div>
      </div>

      <div
        data-hero-orbit
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="relative h-[520px] w-[520px] max-w-[80vw]">
          <div className="absolute inset-[22%] rounded-full border border-neonBlue/20 blur-sm" />
          <div className="absolute inset-[10%] rounded-full border border-neonGreen/15 blur-sm" />
          <span className="absolute left-1/2 top-6 h-2 w-2 -translate-x-1/2 rounded-full bg-neonBlue shadow-glow animate-orbit" />
        </div>
      </div>
    </section>
  );
};

