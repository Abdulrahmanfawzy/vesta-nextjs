import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewSkeleton() {
  return (
    <div className="mt-10 grid w-full grid-cols-12 gap-6">
      {/* Summary */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <Skeleton className="h-60 w-full rounded-2xl" />
      </div>

      {/* Performance */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <Skeleton className="h-60 w-full rounded-2xl" />
      </div>

      {/* Return Reasons */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <Skeleton className="h-60 w-full rounded-2xl" />
      </div>

      {/* Products */}
      <div className="col-span-12 lg:col-span-8">
        <Skeleton className="h-70 w-full rounded-2xl" />
      </div>

      {/* Quick Actions */}
      <div className="col-span-12 lg:col-span-4">
        <Skeleton className="h-70 w-full rounded-2xl" />
      </div>
    </div>
  );
}
