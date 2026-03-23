import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Flowo CRM — CRM for Creative Agencies",
  description:
    "Manage deals, clients, and pipelines with Flowo — the CRM built for creative teams.",
  openGraph: {
    title: "Flowo CRM — CRM for Creative Agencies",
    description: "Manage deals, clients, and pipelines with Flowo.",
    type: "website",
    url: "https://flowo.alsy.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-flowo-void text-slate-100 antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
