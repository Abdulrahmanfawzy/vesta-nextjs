import { Switch } from "@/components/ui/switch";

const NotificationSettings = () => {
  return (
    <section className="flex w-full flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Notification Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose whether you want to receive notifications about your account.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-[#CFCFCF] p-4">
        <div className="pr-6">
          <label
            htmlFor="notifications-enabled"
            className="cursor-pointer text-sm font-medium"
          >
            Enable notifications
          </label>
          <p className="mt-1 text-sm text-muted-foreground">
            Receive updates and important information.
          </p>
        </div>
        <Switch
          id="notifications-enabled"
          defaultChecked
          className="data-[state=checked]:bg-app-primary"
          aria-label="Enable notifications"
        />
      </div>
    </section>
  );
};

export default NotificationSettings;
