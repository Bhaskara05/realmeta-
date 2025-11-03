import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI museum curator. Ask me anything about the artworks, artists, or art history!"
    }
  ]);
  const [input, setInput] = useState("");

  const quickQuestions = [
    "Tell me about Renaissance art",
    "What's special about Starry Night?",
    "Explain abstract expressionism",
    "Who painted the Mona Lisa?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "That's a great question! Let me explain... [This is a simulated response. In a real app, this would connect to an AI service.]"
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <div className="gradient-hero text-primary-foreground py-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 animate-fade-in-up">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Curator</h1>
              <p className="text-sm text-primary-foreground/80">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6 space-y-4">
        {/* Messages */}
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
            >
              <Card
                className={`max-w-[80%] p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "glass-card"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="space-y-3 animate-fade-in-up">
            <p className="text-sm text-muted-foreground">Quick questions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="h-auto py-3 text-left justify-start"
                  onClick={() => setInput(question)}
                >
                  <span className="text-xs line-clamp-2">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-16 left-0 right-0 glass-card border-t p-4">
        <div className="max-w-screen-xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about any artwork..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
