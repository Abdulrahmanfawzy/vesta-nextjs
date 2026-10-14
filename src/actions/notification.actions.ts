// after api >> this file number 3

"use server";

import { deleteDeviceToken, registerDeviceToken } from "@/api/notification.api";

export async function registerDeviceTokenAction(
  deviceToken: string,
) {
  return await registerDeviceToken(deviceToken);
}

export async function deleteDeviceTokenAction(
  deviceToken: string,
) {
  return await deleteDeviceToken(deviceToken);
}

