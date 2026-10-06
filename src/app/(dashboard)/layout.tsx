import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/DashboardSidebar";
import { TooltipProvider } from "radix-ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TooltipProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <div className="hidden md:block fixed left-0 top-0 ">
              <AppSidebar />
            </div>

            <main className="md:ml-31 min-h-screen w-full md:w-[calc(100%-124px)] px-4 pb-4">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </>
  );
}
