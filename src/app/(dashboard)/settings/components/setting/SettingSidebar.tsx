export type SettingSection = "profile" | "notification" | "return_refund";

interface SettingSidebarProps {
  selectedSetting: SettingSection;
  onSettingChange: (setting: SettingSection) => void;
}

const settingItems: { value: SettingSection; label: string }[] = [
  {
    value: "profile",
    label: "Account & Profile",
  },
  {
    value: "notification",
    label: "Notification",
  },
  {
    value: "return_refund",
    label: "Return & Refund Settings",
  },
];

const SettingSidebar = ({
  selectedSetting,
  onSettingChange,
}: SettingSidebarProps) => (
  <aside className="min-h-screen w-60 shrink-0 border-r border-r-[#E5E7EB] pr-6 shadow-[4px_0_8px_-6px_#00000040]">
    <nav
      aria-label="Settings sections"
      className="mt-4 flex w-full flex-col items-stretch gap-1"
    >
      {settingItems.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-current={selectedSetting === item.value ? "page" : undefined}
          onClick={() => onSettingChange(item.value)}
          className={`box-border w-full self-stretch rounded-lg px-4 py-3 text-start text-sm transition-colors
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/40 ${
            selectedSetting === item.value
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

export default SettingSidebar;
