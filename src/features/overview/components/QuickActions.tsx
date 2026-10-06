"use client";

import { Download, Eye, FileText, Package } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import CardTitle from "./overview-ui/CardTitle";

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
    <Card className="rounded-3xl h-full ring-0 border-0 shadow-card-shadow">
      <CardContent>
        <CardTitle title="QUICK ACTIONS" />
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                className="flex cursor-pointer h-20 w-full flex-col items-center justify-center rounded-2xl bg-card shadow-card-shadow p-1"
              >
                <Icon
                  size={33}
                  strokeWidth={1.8}
                  className="text-app-accent-orange"
                />

                <span className="mt-1 text-center text-sm   text-app-primary">
                  {action.title}
                  <span className="block">{action.subtitle}</span>
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickActions;
