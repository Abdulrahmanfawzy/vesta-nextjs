"use server";

import {
  getSupportTicketsApi,
  type GetSupportTicketsParams,
} from "@/api/support.api";

export async function getSupportTicketsApiAction(
  params: GetSupportTicketsParams = {},
) {
  return getSupportTicketsApi(params);
}