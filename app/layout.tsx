import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inconsolata } from "next/font/google";
import type { Metadata } from "next";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Tutorial",
  description: "A simple Next.js tutorial to get you started.",
  keywords: ["Next.js", "React", "JavaScript", "Tutorial"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inconsolata.className}>
        <Navbar />
        <main className="px-4 md:px-8 lg:px-16 mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}