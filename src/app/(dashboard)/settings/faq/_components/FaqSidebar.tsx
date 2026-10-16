import { FAQSection } from "@/types/faq.types";


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
const FaqSidebar = ({selectedSection,onSectionChange,}: FaqSidebarProps) => {
  return(
  <aside className="w-full min-w-0 border-b border-app-neutral-light pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
    <h2 className="mb-2 mt-2 text-lg font-bold leading-[150%] text-app-primary sm:text-2xl lg:mb-4">
      Categories
    </h2>
    <nav
      aria-label="FAQ sections"
      className="settings-sidebar-scrollbar p-4 flex w-full flex-row items-stretch gap-1 overflow-x-auto lg:mt-4 lg:flex-col lg:overflow-visible"
    >
      {faqSections.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-current={
            selectedSection === item.value ? "page" : undefined
          }
          onClick={() => onSectionChange(item.value)}
          className={`box-border w-auto shrink-0 self-stretch whitespace-nowrap rounded-lg px-4 py-3 text-start text-sm transition-colors lg:w-full
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/40 ${
              selectedSection === item.value
                ? "border border-accent-orange bg-app-accent-peach/10 font-semibold text-app-accent-peach"
                : "border border-transparent font-medium text-app-primary hover:bg-app-accent-peach/5"
            }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  </aside>
);}

export default FaqSidebar;