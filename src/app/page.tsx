"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) setError(data.error);
    else setResult(data.url);
  }

  return (
    <main className=" sm:p-20 p-4 flex flex-col">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded-md w-full h-40 p-2"
        placeholder="Enter your content"
      />
      <br />
      <div className=" w-full flex gap-3 mt-4">
        <input
          placeholder="Enter the TTL in seconds (optional)"
          className="border w-full rounded-md p-2"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />
        <input
          placeholder="Enter Max views count (optional)"
          className="border w-full rounded-md p-2"
          value={views}
          onChange={(e) => setViews(e.target.value)}
        />
      </div>
      <br />
      <button
        className="bg-blue-900 p-2 px-4 cursor-pointer mx-auto mt-4 rounded-md"
        onClick={submit}
      >
        Create Paste
      </button>
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      {result && (
        <p className="mt-5 text-blue-600">
          Link: <a href={result}>{result}</a>
        </p>
      )}
    </main>
  );
}
