import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";
import ParticlesBg from "./components/ParticlesBg";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen bg-animated relative overflow-hidden">

      <ParticlesBg />

      {/* Sidebar (Fixed) */}
      <Sidebar messages={messages} />

      {/* Main Content */}
      <div className="ml-72 h-screen flex flex-col">

        {/* Header */}
        <div className="h-20 flex items-center justify-center relative">

          {/* Center Title */}
          <h1 className="text-4xl font-bold text-black">
            ⚡ RAG AI Assistant
          </h1>

          {/* Toggle Right */}
          <div className="absolute right-10">
            <ThemeToggle />
          </div>

        </div>

        {/* Chat Area */}
        <ChatWindow
          messages={messages}
          setMessages={setMessages}
          input={input}
          setInput={setInput}
          loading={loading}
          setLoading={setLoading}
        />

      </div>
    </div>
  );
}
