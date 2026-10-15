export interface OpenChatResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    ticket_id: number;
    last_message: string | null;
    last_message_at: string | null;
    created_at: string;
    updated_at: string;
    ticket: {
      id: number;
      subject: string;
      category: string;
      status: string;
      return_id: number | null;
    };
  };
}
// ----------------------------------------
export interface ChatMessage {
  id: number;
  chat_id: number;
  sender: {
    id: number;
    type: string;
    name: string;
    avatar_url: string | null;
  };
  type: string;
  body: string;
  read_at: string | null;
  created_at: string;
  attachments: ChatAttachment[];
}

export interface ChatAttachment {
  id: number;
  type: string;
  url: string;
  mime_type: string | null;
  size: number | null;
}

export interface ChatMessagesResponse {
  success: boolean;
  message: string;
  data: ChatMessage[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface SendChatMessageResponse {
  success: boolean;
  message: string;
  data: ChatMessage;
}
// -------------------------------------------------