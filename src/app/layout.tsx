import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = {
  title: "Vesta",
  description: "Vesta is a platform for returns management.",

};

// layout
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>{children}</body>
    </html>
  );
}
