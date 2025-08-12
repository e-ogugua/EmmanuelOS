import CakeCard from "@/components/CakeCard";

async function fetchCakes() {
  const res = await fetch("/api/cakes", { cache: "no-store" });
  const json = await res.json();
  return json.data as Array<{ id: string; name: string; slug: string; base_price: number; image_url?: string; category?: string }>;
}

export default async function HomePage() {
  const cakes = await fetchCakes();
  const featured = cakes.slice(0, 6);
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
          <div className="aspect-[4/3] bg-white rounded-xl shadow-inner" />
        </div>
      </section>

      <section>
        <div className="container py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif">Featured cakes</h2>
            <a href="/gallery" className="text-chocolate hover:underline text-sm">View all →</a>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((c)=> (
              <CakeCard key={c.slug} cake={c as any} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
