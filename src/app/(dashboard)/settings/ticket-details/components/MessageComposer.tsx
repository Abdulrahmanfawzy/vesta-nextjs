"use client";

import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function MessageComposer() {
  return (
    <div className="flex items-center gap-2 p-4 sm:p-5">
      <div className=" flex w-full items-center gap-2   rounded-full border bg-muted/30 p-2 transition-colors border-app-primary/30 focus-within:border-app-primary/80  ">
        <Textarea
          placeholder="Type a message..."
          className="min-h-8 flex-1 resize-none border-0 bg-transparent px-2 py-2 rounded-full shadow-none focus-visible:ring-0 "
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 shrink-0 text-muted-foreground hover:text-foreground "
        >
          <Paperclip className="size-4" />
        </Button>


      </div>

      <Button
        type="button"
        size="sm"
        className="h-full min-h-13.25 w-23.75  shrink-0 rounded-full px-3 py-2 bg-app-primary"
      >
        <Send className="size-4" />
        <span className="hidden sm:inline ">Send</span>
      </Button>



    </div>
  );
}