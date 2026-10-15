"use server";

import { getProfileApi, updateProfileApi } from "@/api/profile.api";



export async function getProfileAction() {
  return getProfileApi();
}
export async function updateProfileAction(formData: FormData) {
  return updateProfileApi(formData);
}