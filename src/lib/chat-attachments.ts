export const CHAT_ATTACHMENT_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "mp4",
  "mov",
  "mp3",
  "wav",
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "txt",
] as const;

export const MAX_CHAT_ATTACHMENT_COUNT = 5;
export const MAX_CHAT_ATTACHMENT_SIZE = 10 * 1024 * 1024;
export const MAX_CHAT_MESSAGE_LENGTH = 5000;

export function validateChatAttachments(files: readonly File[]) {
  if (files.length > MAX_CHAT_ATTACHMENT_COUNT) {
    return "You can attach up to 5 files.";
  }

  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (
      !extension ||
      !CHAT_ATTACHMENT_EXTENSIONS.includes(
        extension as (typeof CHAT_ATTACHMENT_EXTENSIONS)[number],
      )
    ) {
      return `${file.name} has an unsupported file type.`;
    }

    if (file.size > MAX_CHAT_ATTACHMENT_SIZE) {
      return `${file.name} exceeds the 10 MB file size limit.`;
    }
  }

  return null;
}
