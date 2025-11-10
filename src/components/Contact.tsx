"use client";

import { FormEvent, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsapAnimations";
import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/miraz007",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saifulislammiraz",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:hello@miraz.dev",
    icon: Mail,
  },
];

export const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const particleRef = useRef<HTMLDivElement | null>(null);
  ensureGsapRegistered();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-contact-stagger]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      if (particleRef.current) {
        gsap.to(particleRef.current, {
          x: 120,
          y: -120,
          scale: 1.2,
          rotate: 180,
          duration: 8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    },
    { scope: sectionRef }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    alert(`Thanks ${name ?? "there"} — let's create something iconic!`);
    form.reset();
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mx-auto max-w-4xl px-6 pb-24 pt-16"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="absolute inset-0 -z-20 opacity-70">
        <div className="noise-overlay" />
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/70 p-10 shadow-depth md:p-14">
        <div
          ref={particleRef}
          className="pointer-events-none absolute -right-24 top-10 h-52 w-52 rounded-full bg-gradient-to-br from-neonBlue/40 to-neonGreen/30 blur-3xl opacity-80"
        />

        <div className="relative z-10 space-y-6 text-center">
          <span
            data-contact-stagger
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.4em] text-neonBlue"
          >
            Let&apos;s collaborate
          </span>
          <h2
            data-contact-stagger
            className="text-balance text-3xl font-semibold uppercase tracking-[0.3em] text-white md:text-4xl"
          >
            Tell Me About Your Vision
          </h2>
          <p
            data-contact-stagger
            className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base"
          >
            Launching a cinematic marketing site, immersive product walkthrough, or interactive
            dashboard? I&apos;m all ears. Drop a message and we&apos;ll choreograph something
            unforgettable.
          </p>
        </div>

        <form
          data-contact-stagger
          onSubmit={handleSubmit}
          className="relative z-10 mt-10 grid gap-6 md:grid-cols-2"
        >
          <div className="md:col-span-1">
            <label
              htmlFor="name"
              className="mb-2 block text-xs uppercase tracking-[0.35em] text-slate-200"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Saiful Islam Miraz"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-sm text-white outline-none transition focus:border-neonBlue/70 focus:shadow-glow"
            />
          </div>
          <div className="md:col-span-1">
            <label
              htmlFor="email"
              className="mb-2 block text-xs uppercase tracking-[0.35em] text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="hello@miraz.dev"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-sm text-white outline-none transition focus:border-neonGreen/70 focus:shadow-glow"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="mb-2 block text-xs uppercase tracking-[0.35em] text-slate-200"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Share your project goals, timeline, and dream experience..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-sm text-white outline-none transition focus:border-neonBlue/70 focus:shadow-glow"
            />
          </div>
          <div className="md:col-span-2 flex flex-col items-center gap-5 md:flex-row md:justify-between">
            <button
              type="submit"
              className="group relative inline-flex items-center gap-3 rounded-full border border-neonBlue/60 bg-black/60 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neonBlue transition hover:border-neonGreen/70 hover:text-neonGreen"
            >
              Send Message
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neonBlue/30 via-transparent to-neonGreen/30 opacity-0 transition duration-500 group-hover:opacity-100" />
            </button>

            <div className="flex items-center gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-neonBlue/60 hover:text-neonBlue"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

