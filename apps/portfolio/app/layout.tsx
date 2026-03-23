import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Syzonenko — Full-Stack Developer",
  description:
    "Full-stack developer specializing in modern web applications. Beautiful UI, real-time features, and scalable architecture.",
  openGraph: {
    title: "Alex Syzonenko — Full-Stack Developer",
    description:
      "Full-stack developer specializing in modern web applications. Beautiful UI, real-time features, and scalable architecture.",
    type: "website",
    url: "https://alsy.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Syzonenko — Full-Stack Developer",
    description: "Full-stack developer specializing in modern web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

