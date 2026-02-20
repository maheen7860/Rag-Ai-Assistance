import { useRef } from "react";
import { FaFileUpload } from "react-icons/fa";

export default function Sidebar({ messages }) {
  const fileInputRef = useRef(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    alert("PDF uploaded successfully!");
  };

  return (
    <div className="w-72 h-screen fixed left-0 top-0 flex flex-col sidebar-glass">

      {/* Header */}
      <div className="py-6 text-lg font-semibold text-center tracking-wide text-[#bcdcff] border-b border-[#00d4ff33]">
        Chat History
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div
              key={i}
              className="p-3 text-sm bg-[#0d2a4f66] rounded-lg border border-[#00d4ff22] text-[#cfefff] truncate hover:bg-[#0d2a4f99] transition"
            >
              {msg.content}
            </div>
          ) : null
        )}

      </div>

      {/* Upload Button */}
      <div className="p-5 border-t border-[#00d4ff22]">
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[#d8ecff] border border-[#00d4ff44] bg-[#0d2a4f80] hover:bg-[#0d2a4faa] transition neon-glow"
        >
          <FaFileUpload />
          Upload PDF
        </button>
      </div>

    </div>
  );
}