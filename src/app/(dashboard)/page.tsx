import type { Metadata } from "next";
import OverviewSkeleton from "@/features/overview/components/OverviewSkeleton";
import OverviewContent from "@/features/overview/OverviewContent";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Overview",
  description: "Overview dashboard of returns, revenue impact, processing statuses, and operational metrics.",
};

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
