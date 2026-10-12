import OverviewSkeleton from "@/features/overview/components/OverviewSkeleton";
import OverviewContent from "@/features/overview/OverviewContent";

import { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewContent />
      </Suspense>
    </>
  );
}

export default page;
