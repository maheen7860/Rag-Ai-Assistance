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
    <div className="h-screen relative overflow-hidden">

      {/* Background Particles */}
      <ParticlesBg />

      {/* Sidebar */}
      <Sidebar messages={messages} />

      {/* Cyber streak */}
      <div className="cyber-streak"></div>

      {/* Main Layout */}
      <div className="ml-72 h-screen flex flex-col">

        {/* Header */}
        <div className="h-20 flex items-center justify-center relative shrink-0">

          <h1 className="text-3xl font-semibold tracking-wide text-[#d8ecff]">
             RAG AI ASSISTANCE
          </h1>

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