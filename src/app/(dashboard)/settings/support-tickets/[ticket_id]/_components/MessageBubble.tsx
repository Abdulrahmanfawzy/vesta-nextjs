import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Headset } from "lucide-react";

interface MessageBubbleProps {
  sender: {
    name: string;
    role: "customer" | "support";
    avatar?: string;
  };
  message: string;
  createdAt: string;
}

export default function MessageBubble({
  sender,
  message,
  createdAt,
}: MessageBubbleProps) {
  const isSupport = sender.role === "support";

  return (
    <div
      className={`flex gap-3 ${
        isSupport ? "flex-row" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <Avatar className="size-9 shrink-0">
        <AvatarFallback
          className={
            isSupport
              ? "bg-[#d6dce4]  rounded-full  "
              : "text-slate-100 bg-app-primary  rounded-full"
          }
        >
          {isSupport? <Headset  className="text-app-primary" /> : sender.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Message */}
      <div className="min-w-0 max-w-[85%]">
        {/* Sender info */}
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <div className="flex flex-col">
              <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-app-primary">
                    {sender.name}-
                  </p>
                  {isSupport ?
                    <span className="text-xs font-bold text-[#aebccf]">
                      Support
                    </span>
                    :
                    <span className="text-xs font-bold text-app-primary">
                      Seller
                    </span>
                   
                              }
              </div>

               <p className="text-xs text-muted-foreground">
            {createdAt}
          </p>
          </div>
         

          
        </div>

        {/*----- Bubble-------------------------- */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            isSupport
              ? "rounded-tl-md bg-app-primary text-primary-foreground"
              : "rounded-tl-md bg-[#eff3f9] text-foreground"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}