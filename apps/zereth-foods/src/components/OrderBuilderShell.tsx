"use client";
import { useMemo, useState } from "react";
import CakeBuilder from "@/components/CakeBuilder";
import type { Cake } from "@/components/CakeCard";

export default function OrderBuilderShell({ cakes }: { cakes: Cake[] }) {
  const [slug, setSlug] = useState<string>(cakes[0]?.slug || "");
  const selected = useMemo(() => cakes.find(c => c.slug === slug) || cakes[0], [cakes, slug]);

  if (!selected) return <div>No cakes available.</div>;

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white border">
        <label className="block text-sm mb-1">Choose a cake</label>
        <select className="w-full border rounded-xl px-3 py-2" value={slug} onChange={(e)=>setSlug(e.target.value)}>
          {cakes.map(c => (
            <option key={c.slug} value={c.slug}>{c.name} — ₦{c.base_price.toLocaleString()}</option>
          ))}
        </select>
      </div>
      <CakeBuilder basePrice={selected.base_price} cakeId={selected.id} />
    </div>
  );
}
