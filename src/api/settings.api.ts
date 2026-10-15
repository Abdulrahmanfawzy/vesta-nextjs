import "server-only";

import type { ReturnPoliciesResponse } from "@/types/settings.types";
import { getToken } from "@/lib/get-token";

export const getReturnPolicies =
 async (): Promise<ReturnPoliciesResponse> => {
   const token = await getToken();
   if (!token) {
     throw new Error("Unauthorized: Missing access token");
   }

   const response = await fetch(
     `${process.env.API}/api/settings/return-policies`,
     {
       headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
       },
       cache: "no-store",
     }
   );

   if (!response.ok) {
     throw new Error(`Failed to fetch return policies (${response.status})`);
   }

   return response.json();
 };
// ----------------------------------------------
export interface UpdatePolicyDocumentResponse {
 success: boolean;
 message: string;
 data: {
   type: string;
   file_url: string;
   file_name: string;
 };
}

export async function updatePolicyDocumentApi(
 fileName: string,
 file: File,
): Promise<UpdatePolicyDocumentResponse> {
 if (typeof fileName !== "string" || !fileName.trim()) {
   throw new Error("Policy file name is required.");
 }
 if (file.size === 0) {
   throw new Error("Choose a non-empty policy PDF.");
 }
 if (!file.name.toLowerCase().endsWith(".pdf")) {
   throw new Error("Policy documents must be PDF files.");
 }

 const token = await getToken();
 if (!token) {
   throw new Error("Unauthorized: Missing access token");
 }

 const formData = new FormData();
 formData.append("file", file);

 const response = await fetch(
   `${process.env.API}/api/settings/policies/documents/${encodeURIComponent(fileName)}`,
   {
     method: "POST",
     headers: {
       Accept: "application/json",
       Authorization: `Bearer ${token}`,
     },
     body: formData,
     cache: "no-store",
   },
 );

 if (!response.ok) {
   const responseBody = await response.text();
   let errorMessage = responseBody;

   try {
     const errorResponse: { message?: string } = JSON.parse(responseBody);
     errorMessage = errorResponse.message || errorMessage;
   } catch {
     // Keep the raw response text when the server does not return JSON.
   }

   throw new Error(
     errorMessage
       ? `Failed to replace policy document (${response.status}): ${errorMessage}`
       : `Failed to replace policy document (${response.status})`,
   );
 }

 const result: UpdatePolicyDocumentResponse = await response.json();
 if (!result.success) {
   throw new Error(result.message || "Failed to replace policy document.");
 }
 return result;
}
