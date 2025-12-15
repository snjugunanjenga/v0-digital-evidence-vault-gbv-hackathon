"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";

interface ChatWidgetProps {
  partnerName: string;
  onSendMessage: (message: string) => void;
}

export function ChatWidget({ partnerName, onSendMessage }: ChatWidgetProps) {
  const [message, setMessage] = React.useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> Chat with {partnerName}
        </CardTitle>
        {/* Close button or other actions could go here */}
      </CardHeader>
      <CardContent>
        <div className="h-48 overflow-y-auto mb-4 border rounded-md p-2 text-sm text-muted-foreground">
          {/* Chat messages would be rendered here */}
          <p>Welcome to your chat with {partnerName}.</p>
          <p>This is a placeholder for real-time communication.</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
