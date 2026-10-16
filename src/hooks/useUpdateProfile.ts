
"use client";

import { updateProfileAction } from "@/actions/profile.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await updateProfileAction(formData);

      if (!result.success) {
        throw new Error(
          result.message || "Failed to update profile"
        );
      }

      return result;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      toast.success("Profile Updated Successfully!");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update profile info");
    },
  });
}
