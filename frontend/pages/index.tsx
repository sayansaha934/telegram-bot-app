import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/set-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Bot token set successfully!");
    } catch (error) {
      console.error("Failed to set bot token:", error);
      alert("Failed to set bot token. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Enter Your Telegram Bot Token</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Telegram Bot Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Token
        </button>
      </form>
    </div>
  );
}
