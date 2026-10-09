import { InformationCard, InformationRow } from "./InformationCard";

const RelatedInformation = () => {
    return (
        <InformationCard title="Related Information">
            <InformationRow label="Type">
                <p className="font-medium text-app-primary">Report Issue</p>
            </InformationRow>
            <InformationRow label="Category">
                <p className="font-medium text-app-primary">Returns & Refunds</p>
            </InformationRow>
            <InformationRow label="Assign To">
                <p className="font-medium text-app-primary">Support team</p>
            </InformationRow>
        </InformationCard>
    );
};

export default RelatedInformation;