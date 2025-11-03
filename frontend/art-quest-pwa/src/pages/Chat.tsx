import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
      content:
        "🎨 Welcome to the Museum Gallery! I’m your AI Curator. Ask me about any artwork, artist, or hidden story in art history.",
    },
  ]);
  const [input, setInput] = useState("");

  const quickQuestions = [
    "Tell me about Renaissance art",
    "What's special about Starry Night?",
    "Explain abstract expressionism",
    "Who painted the Mona Lisa?",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "🖌️ Fascinating question! Here’s what art historians say... (This would be connected to an AI art knowledge base in the real app.)",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-[#0b1d2e] via-[#122b45] to-[#1b1b1b] text-[#e8e6e3] overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#f9b64e]/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5296d5]/15 blur-3xl rounded-full" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-6 px-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-10 bg-[#0b1d2e]/60 shadow-lg"
      >
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#f9b64e] to-[#e5890a] flex items-center justify-center shadow-lg">
            <Sparkles className="h-6 w-6 text-[#0b1d2e]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#f9b64e] font-playfair">
              AI Curator
            </h1>
            <p className="text-sm text-[#b0c5e8] italic">
              Step into the world of timeless art
            </p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 max-w-screen-md mx-auto w-full px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-lg shadow-lg ${
                message.role === "user"
                  ? "bg-gradient-to-r from-[#f9b64e] to-[#e5890a] text-[#0b1d2e]"
                  : "bg-white/10 text-[#e8e6e3] border border-white/10"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </Card>
          </motion.div>
        ))}

        {/* Quick Questions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-sm text-[#b0c5e8]">Try asking:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="h-auto py-3 text-left justify-start bg-[#173350]/50 border-[#f9b64e]/30 text-[#f9b64e] hover:bg-[#1e4b74]/60"
                  onClick={() => setInput(question)}
                >
                  <span className="text-xs font-medium line-clamp-2">
                    {question}
                  </span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 left-0 right-0 bg-[#0b1d2e]/80 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="max-w-screen-md mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about any artwork..."
            className="flex-1 bg-[#122b45]/70 border-[#f9b64e]/30 text-[#e8e6e3] placeholder:text-[#a5b4cc]"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-gradient-to-r from-[#f9b64e] to-[#e5890a] hover:from-[#eaa540] hover:to-[#cc7a05] text-[#0b1d2e]"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
