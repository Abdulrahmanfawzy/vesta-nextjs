"use client";
import { Download, Eye, FileText, Package } from "lucide-react";
import ChartsCard from "@/components/common/charts/ChartsCard";

const actions = [
  {
    title: "View All",
    subtitle: "Returns",
    icon: Eye,
  },
  {
    title: "Export",
    subtitle: "Report",
    icon: Download,
  },
  {
    title: "View Return",
    subtitle: "Details",
    icon: FileText,
  },
  {
    title: "Manage Return",
    subtitle: "Requests",
    icon: Package,
  },
];

function QuickActions() {
  return (
    <ChartsCard title="QUICK ACTIONS">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="flex cursor-pointer h-22 w-full flex-col items-center justify-center rounded-2xl bg-card shadow-card-shadow p-1"
            >
              <Icon
                size={33}
                strokeWidth={1.8}
                className="text-app-accent-orange"
              />

              <span className="mt-1 flex flex-wrap justify-center items-center text-center gap-1 text-sm text-app-primary">
                {action.title}
                <span className="block">{action.subtitle}</span>
              </span>
            </button>
          );
        })}
      </div>
    </ChartsCard>
  );
}

export default QuickActions;
