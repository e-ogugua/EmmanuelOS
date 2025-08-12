"use client";

import { useState } from "react";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch (e) {
      alert("Could not subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container py-10 max-w-2xl">
      <h1 className="text-3xl font-serif">Contact us</h1>
      <p className="mt-2 text-neutral-700">Have a question or a special request? Send us a note and we’ll get back to you.</p>

      <div className="mt-8 p-6 rounded-xl bg-white border">
        {sent ? (
          <div className="text-green-700">Thanks! We’ll be in touch shortly.</div>
        ) : (
          <form onSubmit={subscribe} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" required className="w-full border rounded-xl px-3 py-2" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <button disabled={loading} className="px-6 py-3 rounded-xl bg-chocolate text-white hover:opacity-90 disabled:opacity-50">
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
