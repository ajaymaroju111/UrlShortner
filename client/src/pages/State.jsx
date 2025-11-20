import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Stats() {
  const { code } = useParams();

  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadStats() {
    try {
      const res = await fetch(
        `https://urlshortner-1-4jlb.onrender.com/api/links/code/${code}`
      );

      if (!res.ok) {
        setLoading(false);
        setLink(null);
        return;
      }

      const data = await res.json();
      setLink(data);
    } catch (err) {
      console.error("Error loading stats:", err);
      setLink(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, [code]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 text-xl">Loading…</div>
    );
  }

  if (!link) {
    return (
      <div className="p-6 text-center text-red-500 text-xl">
        No stats found for this code.
      </div>
    );
  }

  return (
    <div
      className="
      max-w-xl mx-auto 
      p-4 sm:p-6 md:p-8 
      bg-white shadow rounded 
      space-y-4
      w-full
    "
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-left text-gray-800">
        Stats for: {code}
      </h1>

      <div className="space-y-3 text-gray-700 text-sm sm:text-base">
        <p>
          <strong className="text-gray-900">Original URL:</strong>
          <br />
          <span className="break-all">{link.url}</span>
        </p>

        <p>
          <strong className="text-gray-900">Total Clicks:</strong>{" "}
          {link.clickCount}
        </p>

        <p>
          <strong>Last Clicked:</strong>{" "}
          {link.last_clicked
            ? new Date(link.last_clicked).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : "—"}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {link.created_at
            ? new Date(link.created_at).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : "—"}
        </p>
      </div>

      <div className="flex justify-center md:justify-start">
        <a
          href={`https://urlshortner-1-4jlb.onrender.com/api/links/${code}`}
          className="
            bg-blue-600 hover:bg-blue-700 
            text-white px-4 py-2 
            rounded 
            text-center
            w-full sm:w-auto
            transition duration-200
          "
        >
          Visit Short URL
        </a>
      </div>
    </div>
  );
}
