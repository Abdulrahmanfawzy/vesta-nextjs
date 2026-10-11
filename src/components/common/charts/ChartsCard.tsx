import CardTitle from "@/components/common/charts/CardTitle";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ChartsCardProps = {
  title: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
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
