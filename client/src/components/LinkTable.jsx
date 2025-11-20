import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clipboard } from "lucide-react";

export default function LinkTable({ refresh }) {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState("");

  const handleCopy = (code) => {
    const shortUrl = `http://localhost:4000/api/links/${code}`;
    navigator.clipboard.writeText(shortUrl);
  };

  async function loadLinks() {
    try {
      const res = await fetch("http://localhost:4000/api/links");

      if (!res.ok) {
        console.error("Backend returned error:", res.status);
        setLinks([]);
        return;
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error("Expected array, got:", data);
        setLinks([]);
        return;
      }

      setLinks(data);
    } catch (err) {
      console.error("Error loading links:", err);
      setLinks([]);
    }
  }

  useEffect(() => {
    loadLinks();
  }, [refresh]);

  async function deleteLink(code) {
    await fetch(`http://localhost:4000/api/links/${code}`, {
      method: "DELETE",
    });
    loadLinks();
  }

  // Search Filter
  const filteredLinks = links.filter((link) => {
    const term = search.toLowerCase();
    return (
      link.code.toLowerCase().includes(term) ||
      link.url.toLowerCase().includes(term) ||
      String(link.clickCount).includes(term)
    );
  });

  return (
    <div className="bg-white p-5 sm:p-6 shadow-lg rounded-xl mt-6 w-full border border-gray-100">
      
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
        <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
          All Short Links
        </h2>

        <input
          type="text"
          placeholder="Search by code, URL or clicks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 w-full sm:w-72 text-sm focus:ring-2 focus:ring-blue-300 focus:bg-white transition"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="table-auto w-full">
          <thead className="bg-gray-100">
            <tr className="text-left border-b border-gray-200">
              <th className="p-3 font-semibold text-gray-700">Code</th>
              <th className="p-3 font-semibold text-gray-700">URL</th>
              <th className="p-3 font-semibold text-gray-700">Clicks</th>
              <th className="p-3 font-semibold text-gray-700">Last Clicked</th>
              <th className="p-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLinks.map((link) => (
              <tr
                key={link.code}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <Link
                    to={`/code/${link.code}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {link.code}
                  </Link>
                </td>

                <td className="p-3 max-w-xs whitespace-normal break-words text-gray-700">
                  {link.url}
                </td>

                <td className="p-3 text-gray-700">{link.clickCount}</td>

                <td className="p-3 text-gray-700">
                  {new Date(link.lastClicked).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>

                <td className="p-3 flex items-center gap-4">
                  <button
                    onClick={() => handleCopy(link.code)}
                    className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
                  >
                    <Clipboard size={16} />
                    Copy
                  </button>

                  <button
                    onClick={() => deleteLink(link.code)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredLinks.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 p-5 bg-gray-50"
                >
                  No matching links found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredLinks.map((link) => (
          <div
            key={link.code}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <Link
                to={`/code/${link.code}`}
                className="text-blue-600 font-semibold text-lg"
              >
                {link.code}
              </Link>

              <button
                onClick={() => deleteLink(link.code)}
                className="text-red-600 font-medium hover:underline"
              >
                Delete
              </button>
            </div>

            <p className="text-gray-700">
              <strong>URL:</strong>{" "}
              <span className="break-words">{link.url}</span>
            </p>

            <p className="text-gray-700 mt-1">
              <strong>Clicks:</strong> {link.clickCount}
            </p>

            <p className="text-gray-700 mt-1">
              <strong>Last Clicked:</strong>{" "}
              {new Date(link.lastClicked).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>

            <button
              onClick={() => handleCopy(link.code)}
              className="mt-3 flex items-center gap-1 text-blue-600 font-medium hover:underline"
            >
              <Clipboard size={16} />
              Copy
            </button>
          </div>
        ))}

        {filteredLinks.length === 0 && (
          <p className="text-center text-gray-500 p-4">
            No matching links found.
          </p>
        )}
      </div>
    </div>
  );
}
