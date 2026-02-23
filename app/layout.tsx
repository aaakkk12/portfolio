import type { Metadata } from "next";
import { Manrope, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Akshi Portfolio",
  description: "Converted from React to Next.js with a gradient hero and typing effect.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
