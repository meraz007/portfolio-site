'use client';

import { MutableRefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let isGsapRegistered = false;

export const ensureGsapRegistered = () => {
  if (typeof window === "undefined" || isGsapRegistered) return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  isGsapRegistered = true;
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const smoothScrollTo = (target: string | Element, offset = 0) => {
  ensureGsapRegistered();
  if (prefersReducedMotion()) {
    if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "auto" });
    } else {
      target.scrollIntoView({ behavior: "auto" });
    }
    return;
  }

  const targetElement =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!targetElement) return;

  const y = targetElement instanceof HTMLElement
    ? targetElement.getBoundingClientRect().top + window.scrollY - offset
    : 0;

  gsap.to(window, {
    duration: 1.05,
    ease: "power3.inOut",
    scrollTo: y,
  });
};

export const createScrollTriggerReveal = (
  target: gsap.DOMTarget,
  options: gsap.DOMTarget | Partial<ScrollTrigger.Vars> = {}
) => {
  ensureGsapRegistered();

  const baseAnimation = {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  };

  const trigger: Partial<ScrollTrigger.Vars> =
    options && typeof options === "object" && "trigger" in options
      ? (options as Partial<ScrollTrigger.Vars>)
      : {
          trigger: (options as gsap.DOMTarget) || target,
          start: "top 85%",
        };

  gsap.from(target, {
    ...baseAnimation,
    scrollTrigger: {
      ...trigger,
      once: true,
    },
  });
};

export const createStaggerReveal = (
  targets: gsap.DOMTarget,
  trigger: gsap.DOMTarget,
  stagger = 0.15
) => {
  ensureGsapRegistered();
  gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger,
    scrollTrigger: {
      trigger,
      start: "top 80%",
      once: true,
    },
  });
};

type ParallaxConfig = {
  strength?: number;
  mediaQuery?: string;
};

export const attachParallaxEffect = (
  containerRef: MutableRefObject<HTMLElement | null>,
  layersRef: MutableRefObject<NodeListOf<HTMLElement> | null>,
  config: ParallaxConfig = {}
) => {
  ensureGsapRegistered();

  const strength = config.strength ?? 0.08;
  const mediaQuery = config.mediaQuery ?? "(max-width: 768px)";

  const media = typeof window !== "undefined"
    ? window.matchMedia(mediaQuery)
    : null;

  const handlePointerMove = (event: MouseEvent) => {
    if (!layersRef.current) return;
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relY = (event.clientY - bounds.top) / bounds.height - 0.5;

    layersRef.current.forEach((layer, index) => {
      const depth = (index + 1) * strength;
      gsap.to(layer, {
        x: relX * depth * 120,
        y: relY * depth * 90,
        duration: 0.6,
        ease: "expo.out",
      });
    });
  };

  const resetLayers = () => {
    layersRef.current?.forEach((layer) => {
      gsap.to(layer, { x: 0, y: 0, duration: 0.5, ease: "expo.out" });
    });
  };

  const enableParallax = () => {
    containerRef.current?.addEventListener("mousemove", handlePointerMove);
    containerRef.current?.addEventListener("mouseleave", resetLayers);
  };

  const disableParallax = () => {
    containerRef.current?.removeEventListener("mousemove", handlePointerMove);
    containerRef.current?.removeEventListener("mouseleave", resetLayers);
    resetLayers();
  };

  const handleMediaChange = (event: MediaQueryListEvent) => {
    if (event.matches) {
      disableParallax();
    } else {
      enableParallax();
    }
  };

  if (media?.matches) {
    disableParallax();
  } else {
    enableParallax();
  }

  media?.addEventListener("change", handleMediaChange);

  return () => {
    disableParallax();
    media?.removeEventListener("change", handleMediaChange);
  };
};

