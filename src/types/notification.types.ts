export type DeviceType = "web" | "android" | "ios";

export interface RegisterDeviceTokenResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    device_type: DeviceType;
  };
}