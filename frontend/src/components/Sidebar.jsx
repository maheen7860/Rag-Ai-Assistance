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
    <div className="w-72 h-screen bg-[#ffffff85] text-[#5a5757900] flex flex-col fixed left-0 top-0">

      {/* Header */}
      <div className="py-6 text-xl font-semibold text-center"> 
        Chat History
      </div>

      {/* History List */}
      <div className="flex-1 overflow-hidden px-4 space-y-2">
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div
              key={i}
              className="p-3 text-sm bg-white/60 rounded-lg truncate"
            >
              {msg.content}
            </div>
          ) : null
        )}
      </div>

      {/* Upload Button */}
      <div className="p-4">
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full flex items-center justify-center gap-2 bg-[#2f5ea8] text-white py-2 rounded-lg hover:bg-[#244b87] transition"
        >
          <FaFileUpload />
          Upload PDF
        </button>
      </div>

    </div>
  );
}




