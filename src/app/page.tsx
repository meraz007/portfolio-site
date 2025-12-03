import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Tools } from "@/components/Tools";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-textPrimary">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.18),_transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <div className="animate-gradient-move absolute inset-0 bg-[length:200%_200%] bg-gradient-to-br from-blue-500/15 via-purple-500/5 to-green-500/15 blur-3xl" />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-5">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className="floating-shape absolute h-48 w-48 rounded-full opacity-30"
            style={{
              animationDelay: `${index * 1.6}s`,
              animationDuration: `${9 + index * 2}s`,
              top: `${18 + index * 10}%`,
              left: `${8 + index * 16}%`,
            }}
          />
        ))}
      </div>

      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Tools />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
