"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm text-center">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold text-red-600">
            Something went wrong!
          </h2>

          <p className="text-sm text-gray-600 wrap-break-word">
            {error.message || "An unexpected error occurred."}
          </p>

          <button
            onClick={() => reset()}
            className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors cursor-pointer hover:bg-gray-300"
          >
            Try Again
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
