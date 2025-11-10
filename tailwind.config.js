/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        neonBlue: "#38bdf8",
        neonGreen: "#22c55e",
        textPrimary: "#e5e7eb",
        surface: "rgba(46, 60, 77, 0.3)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(56, 189, 248, 0.35)",
        "glow-strong": "0 0 30px rgba(56, 189, 248, 0.55)",
        "glow-green": "0 0 25px rgba(34, 197, 94, 0.45)",
        depth: "0 40px 120px rgba(8, 68, 104, 0.45)",
      },
      dropShadow: {
        glow: "0 0 12px rgba(56, 189, 248, 0.65)",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(34, 197, 94, 0.18), transparent 45%), radial-gradient(circle at 50% 80%, rgba(56, 189, 248, 0.12), transparent 60%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(8, 47, 73, 0.35) 45%, rgba(10, 10, 10, 0.75) 100%)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(-6px) translateX(4px)" },
          "50%": { transform: "translateY(6px) translateX(-4px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.9, filter: "drop-shadow(0 0 18px rgba(56,189,248,0.6))" },
          "50%": { opacity: 0.6, filter: "drop-shadow(0 0 26px rgba(34,197,94,0.7))" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(6px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(6px) rotate(-360deg)" },
        },
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        float: "float-slow 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        orbit: "orbit 12s linear infinite",
        "gradient-move": "gradient-move 18s ease infinite",
      },
    },
  },
  plugins: [],
};
