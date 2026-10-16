"use server";

import { getReturnPolicies, updatePolicyDocumentApi } from "@/api/settings.api";


export async function getReturnPoliciesAction() {
  return await getReturnPolicies();
}
// -------------------------------------------
export async function updatePolicyDocumentAction(fileName:string, file: File,){
  return await updatePolicyDocumentApi(fileName, file);
}