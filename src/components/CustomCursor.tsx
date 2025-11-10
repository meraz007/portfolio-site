'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsapAnimations";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  ensureGsapRegistered();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || prefersReducedMotion()) return;

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.18,
      ease: "expo.out",
    });
    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.18,
      ease: "expo.out",
    });

    const handlePointerMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const magnetics = document.querySelectorAll<HTMLElement>("[data-cursor='magnetic']");

    const handleEnter = (event: Event) => {
      cursor.classList.add("cursor-hover");
      const target = event.currentTarget as HTMLElement;
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "expo.out",
      });
    };

    const handleLeave = (event: Event) => {
      cursor.classList.remove("cursor-hover");
      const target = event.currentTarget as HTMLElement;
      gsap.to(target, { x: 0, y: 0, duration: 0.4, ease: "expo.out" });
    };

    const handleMove = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      gsap.to(target, {
        x: relX * 0.1,
        y: relY * 0.1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    magnetics.forEach((element) => {
      element.addEventListener("pointerenter", handleEnter);
      element.addEventListener("pointerleave", handleLeave);
      element.addEventListener("pointermove", handleMove);
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      magnetics.forEach((element) => {
        element.removeEventListener("pointerenter", handleEnter);
        element.removeEventListener("pointerleave", handleLeave);
        element.removeEventListener("pointermove", handleMove);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

