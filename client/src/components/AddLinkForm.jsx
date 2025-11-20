import { useState } from "react";

export default function AddLinkForm({ onCreated }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("http://localhost:4000/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setUrl("");
    setCode("");
    setLoading(false);
    onCreated();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white shadow rounded 
        p-4 sm:p-6 md:p-8 
        w-full 
        max-w-md sm:max-w-lg md:max-w-xl 
        mx-auto 
        space-y-4
      "
    >
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-center text-blue-600">
        Create Short Link
      </h2>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 text-center text-sm md:text-base">
          {error}
        </p>
      )}

      {/* Inputs */}
      <div className="space-y-3">
        <input
          type="text"
          className="
            border p-2 rounded w-full 
            text-sm sm:text-base 
            focus:outline-none 
            focus:ring-2 focus:ring-blue-500
          "
          placeholder="Enter long URL"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="text"
          className="
            border p-2 rounded w-full 
            text-sm sm:text-base 
            focus:outline-none 
            focus:ring-2 focus:ring-blue-500
          "
          placeholder="Optional custom code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {/* Button */}
      <div className="flex justify-center sm:justify-start">
        <button
          type="submit"
          disabled={loading}
          className="
            bg-blue-600 hover:bg-blue-700 
            disabled:opacity-50 
            text-white font-medium 
            px-4 py-2 
            rounded 
            w-full sm:w-auto
            transition 
            duration-200
          "
        >
          {loading ? "Creating..." : "Create Link"}
        </button>
      </div>
    </form>
  );
}
