import { TicketDetailsResponse } from "@/types/support-ticket.types";
import { InformationCard, InformationRow } from "./InformationCard";
interface RelatedInformationProps {
    ticket: TicketDetailsResponse;
}
const RelatedInformation = ({ticket}:RelatedInformationProps) => {
    return (
        <InformationCard title="Related Information">
            <InformationRow label="Type">
                <p className="font-medium text-app-primary"></p>
            </InformationRow>
            <InformationRow label="Category">
                <p className="font-medium text-app-primary">{ticket.data.category}</p>
            </InformationRow>
            <InformationRow label="Assign To">
                <p className="font-medium text-app-primary"></p>
            </InformationRow>
        </InformationCard>
    );
};

export default RelatedInformation;