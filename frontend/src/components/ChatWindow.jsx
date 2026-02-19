import { useRef, useEffect } from "react";

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
    <div className="flex flex-col flex-1">

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-enter glass-card px-6 py-4 rounded-2xl max-w-[720px] ${
              msg.role === "user"
                ? "self-end bg-white/10"
                : "self-start bg-black/40"
            }`}
          >
            <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="self-start typing text-sm opacity-70">
            AI is thinking
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Section */}
      <div className="px-8 pb-6">
        <div className="flex w-full max-w-[900px] mx-auto">
          <input
            className="flex-1 bg-white/10 backdrop-blur-lg rounded-l-full px-6 py-3 outline-none placeholder-gray-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something futuristic..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-3 rounded-r-full hover:scale-110 transition duration-300 shadow-lg"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
}
