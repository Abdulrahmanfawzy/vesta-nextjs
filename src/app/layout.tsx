import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "./(dashboard)/settings/_components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = {
  title: {
    default: "Vesta",
    template: "%s | Vesta",
  },
  description: "Vesta is a platform for returns management.",
};

// layout
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <NextTopLoader
          color="#d14e1f"
          height={3}
          speed={200}
          showSpinner={false}
        />
        <Toaster position="top-right" />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
