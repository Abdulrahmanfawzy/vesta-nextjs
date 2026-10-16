// step number 2 after ts response

import "server-only";

import { getToken } from "@/lib/get-token";
import { RegisterDeviceTokenResponse } from "@/types/notification.types";



export async function registerDeviceToken(
  deviceToken: string,
) {
  const TOKEN = await getToken();

  const body = new URLSearchParams({
    token: deviceToken,
    device_type: "web",
  });

  const response = await fetch(
    `${process.env.API}/api/notifications/device-token`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to register device token");
  }

  const result: RegisterDeviceTokenResponse =
    await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Failed to register device token",
    );
  }

  return result.data;
}

export async function deleteDeviceToken(
  deviceToken: string,
) {
  const TOKEN = await getToken();

  const body = new URLSearchParams({
    token: deviceToken,
    
  });

  const response = await fetch(
    `${process.env.API}/api/notifications/device-token`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete device token");
  }

  const result: RegisterDeviceTokenResponse =
    await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Failed to delete device token",
    );
  }

  return result.data;
}
