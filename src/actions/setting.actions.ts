"use server";

import { getReturnPolicies } from "@/api/settings.api";

export async function getReturnPoliciesAction() {
  return await getReturnPolicies();
}