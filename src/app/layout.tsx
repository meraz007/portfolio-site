import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miraz.dev"),
  title: "Saiful Islam Miraz | Frontend Developer & UI Animator",
  description:
    "Saiful Islam Miraz is a frontend developer specializing in cinematic UI, motion design, and interactive 3D experiences using Next.js, Tailwind CSS, and GSAP.",
  keywords: [
    "Saiful Islam Miraz",
    "Frontend Developer",
    "UI Animation",
    "Next.js Portfolio",
    "GSAP Animations",
    "Tailwind CSS",
    "Parallax Interface",
  ],
  authors: [{ name: "Saiful Islam Miraz", url: "https://miraz.dev" }],
  creator: "Saiful Islam Miraz",
  openGraph: {
    type: "website",
    title: "Saiful Islam Miraz | Frontend Developer & UI Animator",
    description:
      "Explore a futuristic, neon-lit portfolio showcasing Miraz's mastery in Next.js, Tailwind CSS, and GSAP animations.",
    url: "https://miraz.dev",
    siteName: "Miraz.Dev",
    images: [
      {
        url: "/og-preview.svg",
        width: 1200,
        height: 630,
        alt: "Saiful Islam Miraz Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saiful Islam Miraz | Frontend Developer & UI Animator",
    description:
      "Cinematic portfolio built with Next.js, Tailwind CSS, and GSAP by Saiful Islam Miraz.",
    creator: "@miraz_dev",
    images: ["/og-preview.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased bg-background text-textPrimary`}
      >
        {children}
      </body>
    </html>
  );
}
