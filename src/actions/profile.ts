"use server";

import { getProfileApi } from "@/api/profile.api";



export async function getProfileAction() {
  return getProfileApi();
}