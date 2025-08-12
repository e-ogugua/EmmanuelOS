"use client";

import { useMemo, useState } from "react";
import { calcPrice, type BuilderState } from "@/lib/pricing";

export type BuilderProps = {
  basePrice: number;
  cakeId?: string | number;
  defaultFlavor?: string;
};

export default function CakeBuilder({ basePrice, cakeId, defaultFlavor = "vanilla" }: BuilderProps) {
  const [size, setSize] = useState<BuilderState["size"]>("8\"");
  const [flavor, setFlavor] = useState(defaultFlavor);
  const [icing, setIcing] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");
  const [addPlaque, setAddPlaque] = useState(false);
  const [addCandles, setAddCandles] = useState(false);
  const [addDelivery, setAddDelivery] = useState(false);
  const [deliveryDateTime, setDeliveryDateTime] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [note, setNote] = useState("");
  const [refImage, setRefImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | number | null>(null);

  const price = useMemo(() => calcPrice({
    basePrice,
    size,
    flavor,
    icing,
    addOns: { plaque: addPlaque, candles: addCandles, delivery: addDelivery },
  }), [basePrice, size, flavor, icing, addPlaque, addCandles, addDelivery]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      let uploadedUrl: string | undefined;
      if (refImage) {
        const form = new FormData();
        form.append("file", refImage);
        const up = await fetch("/api/upload", { method: "POST", body: form });
        const upJson = await up.json();
        uploadedUrl = upJson.url as string | undefined;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: customerName, phone: customerPhone, email: customerEmail },
          items: [{
            cake_id: typeof cakeId === 'number' ? cakeId : 1,
            custom_size: size,
            flavor,
            icing_style: icing,
            custom_text: customText,
            price,
          }],
          delivery_datetime: deliveryDateTime,
          notes: [note, uploadedUrl ? `Ref: ${uploadedUrl}` : ""].filter(Boolean).join("\n"),
          channel: "web",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json));
      setOrderId(json.id);
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Size</label>
            <select className="w-full border rounded-xl px-3 py-2" value={size} onChange={(e)=>setSize(e.target.value as BuilderState["size"])}>
              <option>6"</option>
              <option>8"</option>
              <option>10"</option>
              <option>12"</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Flavor</label>
            <select className="w-full border rounded-xl px-3 py-2" value={flavor} onChange={(e)=>setFlavor(e.target.value)}>
              <option value="vanilla">Vanilla</option>
              <option value="chocolate">Chocolate</option>
              <option value="red-velvet">Red Velvet</option>
              <option value="lemon">Lemon</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Icing/Decor</label>
            <input className="w-full border rounded-xl px-3 py-2" placeholder="e.g., buttercream, flowers" value={icing} onChange={(e)=>setIcing(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Custom Message</label>
            <input className="w-full border rounded-xl px-3 py-2" placeholder="Happy Birthday Ada!" value={customText} onChange={(e)=>setCustomText(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={addPlaque} onChange={(e)=>setAddPlaque(e.target.checked)} /> Message plaque</label>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={addCandles} onChange={(e)=>setAddCandles(e.target.checked)} /> Candles</label>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={addDelivery} onChange={(e)=>setAddDelivery(e.target.checked)} /> Delivery</label>
          </div>
          <div>
            <label className="block text-sm mb-1">Reference Image (optional)</label>
            <input type="file" accept="image/*" onChange={(e)=>setRefImage(e.target.files?.[0] ?? null)} />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Delivery date & time</label>
            <input type="datetime-local" className="w-full border rounded-xl px-3 py-2" value={deliveryDateTime} onChange={(e)=>setDeliveryDateTime(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Your name</label>
              <input className="w-full border rounded-xl px-3 py-2" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input className="w-full border rounded-xl px-3 py-2" value={customerPhone} onChange={(e)=>setCustomerPhone(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Email (optional)</label>
              <input className="w-full border rounded-xl px-3 py-2" value={customerEmail} onChange={(e)=>setCustomerEmail(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Notes</label>
            <textarea className="w-full border rounded-xl px-3 py-2" rows={4} value={note} onChange={(e)=>setNote(e.target.value)} />
          </div>
          <div className="p-4 rounded-xl bg-white border flex items-center justify-between">
            <div className="text-neutral-600">Instant quote</div>
            <div className="text-2xl font-semibold text-chocolate">₦{price.toLocaleString()}</div>
          </div>
          <button disabled={submitting} className="w-full px-6 py-3 rounded-xl bg-chocolate text-white hover:opacity-90 disabled:opacity-50">
            {submitting ? "Placing order..." : "Place order"}
          </button>
          {orderId && (
            <div className="text-sm text-green-700">Order placed! ID: {String(orderId)}</div>
          )}
        </div>
      </div>
    </form>
  );
}
