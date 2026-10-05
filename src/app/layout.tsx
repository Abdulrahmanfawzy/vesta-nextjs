import { Geist, Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import { TooltipProvider } from "radix-ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// layout
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased")}>
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <main>{children}</main>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
