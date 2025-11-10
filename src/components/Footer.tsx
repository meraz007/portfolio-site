"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsapAnimations";

export const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  ensureGsapRegistered();

  useEffect(() => {
    if (prefersReducedMotion() || !footerRef.current) return;

    gsap.from(footerRef.current, {
      opacity: 0,
      y: 25,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
        once: true,
      },
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative mx-auto mt-10 flex w-full max-w-4xl flex-col items-center gap-4 px-6 pb-12 text-sm text-slate-300"
    >
      <span className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-neonBlue/60 to-transparent shadow-glow" />
      <p className="text-center text-xs uppercase tracking-[0.35em] text-slate-400/80">
        © 2025 Miraz.Dev — Built with Next.js, Tailwind &amp; GSAP.
      </p>
      <p className="text-center text-[0.65rem] uppercase tracking-[0.3em] text-slate-400/60">
        Crafted for cinematic performance at 60fps. Optimized for neon nights &amp; daytime focus.
      </p>
    </footer>
  );
};

