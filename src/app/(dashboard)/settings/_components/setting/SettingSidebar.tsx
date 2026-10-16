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
  <aside className="w-full shrink-0 border-b border-app-neutral-light pb-3 lg:min-h-screen lg:w-60 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
    <nav
      aria-label="Settings sections"
      className="settings-sidebar-scrollbar flex w-full flex-row items-stretch p-4 gap-1 overflow-x-auto lg:mt-4 lg:flex-col lg:overflow-visible"
    >
      {settingItems.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-current={selectedSetting === item.value ? "page" : undefined}
          onClick={() => onSettingChange(item.value)}
          className={`box-border w-auto shrink-0 self-stretch whitespace-nowrap rounded-lg px-4 py-3 text-start text-sm transition-colors lg:w-full
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
