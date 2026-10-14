
import { Skeleton } from "@/components/ui/skeleton";

const FaqSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-app-neutral-light p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-5 w-5 shrink-0 rounded-md" />
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-5/6 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqSkeleton;