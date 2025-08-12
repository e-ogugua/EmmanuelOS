import CakeCard from "@/components/CakeCard";
import { demoCakes } from "@/lib/demoCakes";

async function fetchCakes() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    const res = await fetch(`${base}/api/cakes`, { cache: "no-store" });
    if (!res.ok) return demoCakes as any;
    const json = await res.json();
    return (json.data as Array<{ id: string; name: string; slug: string; base_price: number; image_url?: string; category?: string }>) || demoCakes;
  } catch {
    return demoCakes as any;
  }
}

export default async function HomePage() {
  const cakes = await fetchCakes();
  const featured = cakes.slice(0, 6);
  const hero = featured[0] || demoCakes[0];
  return (
    <main>
      <section className="bg-cream">
        <div className="container py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight">
              Cakes that tell your story
            </h1>
            <p className="mt-4 text-lg text-neutral-700">
              Elegant, playful, and delicious. Custom-made for birthdays, weddings, and every celebration.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="/order" className="px-6 py-3 rounded-xl bg-chocolate text-white hover:opacity-90">Build your cake</a>
              <a href="/gallery" className="px-6 py-3 rounded-xl border border-chocolate text-chocolate hover:bg-white">See gallery</a>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={(hero?.image_url || "https://images.unsplash.com/photo-1541976076758-347942db1970") + ((hero?.image_url && hero.image_url.includes("?")) ? "" : "?auto=format&fit=crop&w=1400&q=80")}
              alt={hero?.name || "Featured cake"}
              className="h-full w-full object-cover"
              loading="eager"
              onError={(e)=>{ (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=1400&q=80"; }}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif">Featured cakes</h2>
            <a href="/gallery" className="text-chocolate hover:underline text-sm">View all →</a>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((c: { id: string; name: string; slug: string; base_price: number; image_url?: string; category?: string })=> (
              <CakeCard key={c.slug} cake={c as any} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
