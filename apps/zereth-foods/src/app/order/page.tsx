import OrderBuilderShell from "@/components/OrderBuilderShell";
import type { Cake } from "@/components/CakeCard";

async function fetchCakes(): Promise<Cake[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/cakes`, { cache: 'no-store' });
  const json = await res.json();
  return json.data as Cake[];
}

export default async function OrderPage() {
  const cakes = await fetchCakes();
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-serif">Build your cake</h1>
      <p className="mt-2 text-neutral-700">Pick a base design, customize size, flavor, decor, and get an instant quote.</p>
      <div className="mt-8">
        <OrderBuilderShell cakes={cakes} />
      </div>
    </main>
  );
}
