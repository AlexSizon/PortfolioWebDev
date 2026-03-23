import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina AI — Create Content at Light Speed",
  description:
    "Lumina AI generates on-brand content across every platform in seconds. Powered by GPT-4, trained on your brand voice.",
  openGraph: {
    title: "Lumina AI — Create Content at Light Speed",
    description:
      "Lumina AI generates on-brand content across every platform in seconds.",
    type: "website",
    url: "https://lumina-ai.alsy.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina AI — Create Content at Light Speed",
    description:
      "Lumina AI generates on-brand content across every platform in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="min-h-full flex flex-col bg-space text-slate-50 antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
