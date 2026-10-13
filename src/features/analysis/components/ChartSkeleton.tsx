import { Skeleton } from "@/components/ui/skeleton";

function ChartSkeleton() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      <Skeleton className="h-60 w-full rounded-2xl" />
    </div>
  );
}

export default ChartSkeleton;
