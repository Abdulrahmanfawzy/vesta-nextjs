
export interface ContactMessagePayload {
  category: string;
  subject: string;
  message: string;
}

export interface ContactMessageResponse {
  success: boolean;
  message: string;
  data: null;
}
