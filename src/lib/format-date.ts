import { format, parseISO } from "date-fns";

export function formatTicketDate(date: string | null): string {
  if (!date) return "—";

  return format(
    parseISO(date),
    "MMMM dd, yyyy '·' hh:mm a"
  );
}