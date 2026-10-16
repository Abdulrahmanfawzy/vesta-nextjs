
"use client";

import { updatePolicyDocumentAction } from "@/actions/setting.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export function useUpdatePolicy() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      fileName,
      file,
    }: {
      fileName: string;
      file: File;
    }) => updatePolicyDocumentAction(fileName, file),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["return-policies"],
      });

      router.refresh();
    },
  });
}
