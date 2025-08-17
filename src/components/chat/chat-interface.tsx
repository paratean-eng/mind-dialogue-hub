import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Mind Dial, your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your question. This is a simulated response from Mind Dial. In a real implementation, this would connect to your AI service.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 chat-scroll">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4 chat-message",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mind-dial-glow">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              </div>
            )}
            
            <Card className={cn(
              "max-w-[70%] p-4 mind-dial-shadow",
              message.role === "user" 
                ? "bg-primary text-primary-foreground ml-auto" 
                : "bg-card border-border"
            )}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              <span className={cn(
                "text-xs mt-2 block opacity-70",
                message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </Card>

            {message.role === "user" && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-secondary-foreground" />
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 justify-start chat-message">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mind-dial-glow">
                <Bot className="h-5 w-5 text-primary" />
              </div>
            </div>
            <Card className="max-w-[70%] p-4 bg-card border-border mind-dial-shadow">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Mind Dial is thinking...</span>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="border-t border-border p-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Mind Dial anything..."
              className="pr-12 py-3 text-base bg-muted/50 border-border focus:ring-primary"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-6 bg-primary hover:bg-primary/90 mind-dial-glow"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}