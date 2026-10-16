
"use client";

import { useRef, useState } from "react";
import {
  Upload,
  CheckCircle2,
  LoaderCircle,
  X,
} from "lucide-react";
import { useUpdatePolicy } from "@/hooks/useUpdatePolicy";

interface PolicyRowProps {
  title: string;
  url: string;
  policyKey: string;
}

export default function PolicyRow({
  title,
  url,
  policyKey,
}: PolicyRowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useUpdatePolicy();

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setErrorMessage("");
    reset();

    if (
      file.type !== "application/pdf" ||
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setErrorMessage("Please select a valid PDF file.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    mutate(
      {
        fileName: policyKey,
        file,
      },
    );
  }

  const formatFileSize = (size: number) =>
    size >= 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;

  return (
    <div className="border-b border-[#D9D9D9] py-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#18213A]">
          {title}
        </span>

        <button
          type="button"
          title="Replace PDF"
          disabled={isPending}
          onClick={() => inputRef.current?.click()}
          className="rounded-md p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <Upload size={20} />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Fixed Loading Card */}
      {isPending && selectedFile && (
        <div
          className="fixed right-0 top-4 z-[9999] w-[calc(100%-2rem)] max-w-[300px] -translate-x-1/2 overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-lg"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#17213F] text-white">
              <Upload size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#18213A]">
                {title}
              </p>

              <p className="text-xs text-gray-500">
                File Format: pdf · File Size:{" "}
                {formatFileSize(selectedFile.size)}
              </p>
            </div>

            <LoaderCircle className="size-4 shrink-0 animate-spin text-[#F18B76]" />
          </div>

          <div className="h-1 overflow-hidden bg-[#DCE8F5]">
            <div className="h-full w-2/5 animate-pulse rounded-full bg-[#F18B76]" />
          </div>
        </div>
      )}

      {/* Selected File Card */}
      {selectedFile && (
        <div className="mt-3 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#17213F] text-white">
                <Upload size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {title}
                </p>

                <p className="text-xs text-gray-500">
                  File Format: pdf · File Size:{" "}
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>

              {isSuccess ? (
                <CheckCircle2
                  size={20}
                  className="text-green-600"
                />
              ) : (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    setSelectedFile(null);
                    setErrorMessage("");
                    reset();

                    if (inputRef.current) {
                      inputRef.current.value = "";
                    }
                  }}
                  title="Close"
                  className="text-gray-500 disabled:opacity-40"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {isSuccess && (
              <p className="mt-2 text-xs text-green-700">
                Policy updated successfully
              </p>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {(errorMessage || isError) && (
        <p
          role="alert"
          className="mt-2 text-sm text-red-500"
        >
          {errorMessage ||
            error?.message ||
            "Failed to upload policy."}
        </p>
      )}
    </div>
  );
}