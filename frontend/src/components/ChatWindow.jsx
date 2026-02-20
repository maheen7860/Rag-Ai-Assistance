import { useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";

export default function ChatWindow({
  messages,
  setMessages,
  input,
  setInput,
  loading,
  setLoading,
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let assistantMessage = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage.content += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...assistantMessage };
          return updated;
        });
      }
    } catch (error) {
      console.error("Streaming error:", error);
    }

    setLoading(false);
  };
return (
  <div className="flex flex-col flex-1 min-h-0">

    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto px-16 py-10 flex flex-col gap-8 chat-scroll">

      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-enter px-6 py-4 rounded-xl max-w-[720px] border ${
            msg.role === "user"
              ? "self-end bg-[#0d2a4f88] border-[#00d4ff33]"
              : "self-start bg-[#071426cc] border-[#00d4ff22]"
          }`}
        >
          <div className="whitespace-pre-wrap text-[#cfefff] text-sm md:text-base leading-relaxed">
            {msg.content}
          </div>
        </div>
      ))}

      {loading && (
        <div className="self-start text-[#7fbfff] text-sm opacity-80">
          AI is thinking...
        </div>
      )}

      <div ref={chatEndRef}></div>

    </div>

    {/* Futuristic Input */}
    <div className="px-16 pb-8 shrink-0">

      <div className="futuristic-input flex items-center max-w-[900px] mx-auto neon-glow">

        <div className="pl-5 text-[#00d4ff] text-lg">
          <FaMicrophone />
        </div>

        <input
          className="flex-1 bg-transparent px-5 py-3 outline-none text-[#d8ecff] placeholder-[#6eaed6]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something futuristic..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="neon-button px-8 py-3 text-white mr-2"
        >
          Send
        </button>

      </div>

    </div>

  </div>
);
}