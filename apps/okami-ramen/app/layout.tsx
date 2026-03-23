import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Okami Ramen — Authentic Japanese Ramen",
  description:
    "Experience authentic Japanese ramen crafted with 20-hour tonkotsu broth, fresh-cut noodles, and premium toppings. View our full menu and seasonal specials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={notoSerifJP.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
