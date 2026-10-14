// after api >> this file number 3

"use server";

import { registerDeviceToken } from "@/api/notification.api";

export async function registerDeviceTokenAction(
  deviceToken: string,
) {
  return await registerDeviceToken(deviceToken);
}
