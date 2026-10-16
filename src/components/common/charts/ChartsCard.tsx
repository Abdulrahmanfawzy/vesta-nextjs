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
        "h-full! flex flex-col rounded-3xl overflow-x-auto! border-0 shadow-card-shadow ring-0",
        className,
      )}
    >
      <CardContent
        className={cn("w-full h-full! flex flex-col", contentClassName)}
      >
        {title && <CardTitle title={title} />}

        <div className="flex flex-1 flex-col gap-3 items-center justify-center">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
