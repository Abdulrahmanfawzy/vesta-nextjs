export type FAQSection =
  | "All"
  | "Returns"
  | "Refunds"
  | "Reports"
  | "Account"
  | "Integrations"
  | "Billing";
interface FaqSidebarProps {
  selectedSection: FAQSection;
  onSectionChange: (section: FAQSection) => void;
}

const faqSections: { value: FAQSection; label: string }[] = [
  { value: "All", label: "All" },
  { value: "Returns", label: "Returns" },
  { value: "Refunds", label: "Refunds" },
  { value: "Reports", label: "Reports" },
  { value: "Account", label: "Account" },
  { value: "Integrations", label: "Integrations" },
  { value: "Billing", label: "Billing" },
];
const FaqSidebar = ({
  selectedSection,
  onSectionChange,
}: FaqSidebarProps) => (
  <aside className="w-60 shrink-0 border-r border-r-[#E5E7EB] pr-6 shadow-[4px_0_8px_-6px_#00000040]">
    <nav
      aria-label="FAQ sections"
      className="mt-4 flex w-full flex-col items-stretch gap-1"
    >
      {faqSections.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-current={
            selectedSection === item.value ? "page" : undefined
          }
          onClick={() => onSectionChange(item.value)}
          className={`box-border w-full self-stretch rounded-lg px-4 py-3 text-start text-sm transition-colors
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/40 ${
              selectedSection === item.value
                ? "border border-accent-orange bg-app-accent-peach/10 font-semibold text-app-accent-peach"
                : "border border-transparent font-medium text-primary hover:bg-app-accent-peach/5"
            }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default FaqSidebar;