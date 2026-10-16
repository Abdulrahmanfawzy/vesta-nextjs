import { format, isValid, parseISO } from "date-fns";

export function formatTicketDate(date: string | null): string {
  if (!date) return "—";

  const parsedDate = parseISO(date);
  if (!isValid(parsedDate)) return "—";

  return format(
    parsedDate,
    "MMMM dd, yyyy '·' hh:mm a"
  );
}