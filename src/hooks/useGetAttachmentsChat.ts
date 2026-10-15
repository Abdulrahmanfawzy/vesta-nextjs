import getAttchmentsChatTicketAction from "@/actions/attachments.actions";
import { useQuery } from "@tanstack/react-query";


export function useGetAttachmentsChat(ticketId:number){
    return useQuery({

        queryKey:['attachments',ticketId],
        queryFn: async () => {
            const result = await getAttchmentsChatTicketAction(ticketId);
            if (!result.success) {
                throw new Error(result.message || "Failed to load ticket attachments.");
            }
            return result;
        },
        enabled: Number.isSafeInteger(ticketId) && ticketId > 0,
    })
}