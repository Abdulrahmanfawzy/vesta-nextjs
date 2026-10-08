import { Headphones } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MessageBubble from "./MessageBubble";
import MessageComposer from "./MessageComposer";
import CustomTabs from "@/components/common/CustomTabs";
import Attachments from "./Attachments";

const messages = [
  {
    id: "1",
    sender: {
      name: "Mohamed Ahmed",
      role: "customer" as const,
    },
    message:
      "The return report for the last week is not showing the correct numbers. Please check and advise.",
    createdAt: "May 20, 2025 · 10:24 AM",
  },
  {
    id: "2",
    sender: {
      name: "Support Team",
      role: "support" as const,
    },
    message:
      "Hello Mohamed, Thank you for reaching out. We're currently checking the report and will get back to you shortly with the correct numbers.",
    createdAt: "May 20, 2025 · 01:24 PM",
  },
  {
    id: "3",
    sender: {
      name: "Mohamed Ahmed",
      role: "customer" as const,
    },
    message: "Thanks! I appreciate it.",
    createdAt: "May 21, 2025 · 09:24 AM",
  },
];
const tabs = [
  {
    value: "conversation",
    label: "Conversation",
    content:  (
      <div className="space-y-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            sender={message.sender}
            message={message.message}
            createdAt={message.createdAt}
          />
        ))}

        <MessageComposer />
      </div>
    ),
  },
  {
    value: "Attachments",
    label: "Attachments",
    content: <Attachments />,
  },
];

export default function Conversation() {
  return (
    <Card className="overflow-hidden rounded-2xl  shadow-sm">
      {/* Header */}
      <CardHeader className=" px-5 py-4 sm:px-6">
        <CustomTabs tabs={tabs} />
      </CardHeader>
    </Card>
  );
}