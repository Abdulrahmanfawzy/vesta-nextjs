// components/reports/ReportCard.tsx
import * as React from "react";
import CardTitle from "@/components/common/charts/CardTitle";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ChartsCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function ChartsCard({
  title,
  className,
  contentClassName,
  children,
}: ChartsCardProps) {
  return (
    <Card
      className={cn(
        "h-full! rounded-3xl border-0 shadow-card-shadow ring-0",
        className,
      )}
    >
      <CardContent className={contentClassName}>
        {title && <CardTitle title={title} />}
        {children}
      </CardContent>
    </Card>
  );
}
