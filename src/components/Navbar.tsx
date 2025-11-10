'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { ensureGsapRegistered, smoothScrollTo } from "@/lib/gsapAnimations";
import clsx from "clsx";

const NAV_LINKS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Contact", href: "contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const underlineRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 32;
      setScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (href: string) => {
    closeMenu();
    smoothScrollTo(`#${href}`, 80);
  };

  const handleUnderlineEnter = useCallback((key: string) => {
    const el = underlineRefs.current[key];
    if (!el) return;
    gsap.to(el, {
      scaleX: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }, []);

  const handleUnderlineLeave = useCallback((key: string) => {
    const el = underlineRefs.current[key];
    if (!el) return;
    gsap.to(el, {
      scaleX: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <header
      ref={navRef}
      className={clsx(
        "fixed top-0 z-40 w-full transition-all duration-500",
        scrolled ? "backdrop-blur-lg" : ""
      )}
    >
      <div
        className={clsx(
          "mx-auto flex items-center justify-between px-6 py-5 lg:max-w-6xl",
          "transition-all duration-500",
          scrolled
            ? "bg-black/60 shadow-glow"
            : "bg-transparent"
        )}
      >
        <button
          onClick={() => smoothScrollTo("#home", 80)}
          className="group relative text-lg font-semibold uppercase tracking-[0.3em] text-textPrimary transition-all hover:text-neonBlue"
        >
          Miraz.Dev
          <span className="absolute -inset-x-2 -bottom-1 h-px origin-center scale-x-0 bg-gradient-to-r from-neonBlue via-white/60 to-neonGreen transition-transform duration-500 group-hover:scale-x-100" />
        </button>

        <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.25em] text-textPrimary md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              className="relative overflow-visible transition-colors hover:text-neonBlue"
              onClick={() => handleNavClick(link.href)}
              onMouseEnter={() => handleUnderlineEnter(link.href)}
              onMouseLeave={() => handleUnderlineLeave(link.href)}
            >
              {link.label}
              <span
                ref={(node) => {
                  underlineRefs.current[link.href] = node;
                  if (node) {
                    gsap.set(node, { scaleX: 0 });
                  }
                }}
                className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-neonBlue via-white to-neonGreen shadow-glow"
              />
            </button>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-textPrimary shadow-glow transition hover:border-neonBlue/70 hover:text-neonBlue md:hidden"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={clsx(
          "md:hidden transition-transform duration-500 ease-in-out",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"
        )}
      >
        <ul className="mx-6 mb-5 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/80 p-6 shadow-depth">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-gradient-to-r from-white/5 via-transparent to-white/5 px-5 py-3 uppercase tracking-[0.35em] text-[0.65rem] text-textPrimary transition hover:border-neonBlue/60 hover:text-neonBlue"
              >
                {link.label}
                <span className="h-px w-10 bg-gradient-to-r from-transparent via-neonBlue to-neonGreen" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

