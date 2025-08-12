import CakeCard, { type Cake } from "@/components/CakeCard";
import { demoCakes } from "@/lib/demoCakes";

async function fetchCakes(category?: string): Promise<Cake[]> {
  const url = category ? `/api/cakes?category=${encodeURIComponent(category)}` : "/api/cakes";
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return (category ? demoCakes.filter(c=>c.category===category) : demoCakes) as any;
    const json = await res.json();
    return (json.data as Cake[]) || ((category ? demoCakes.filter(c=>c.category===category) : demoCakes) as any);
  } catch {
    return (category ? demoCakes.filter(c=>c.category===category) : demoCakes) as any;
  }
}

export default async function GalleryPage({ searchParams }: { searchParams?: { category?: string } }) {
  const category = searchParams?.category;
  const cakes = await fetchCakes(category);
  const categories = ["All","Birthday","Wedding","Kids","Seasonal"];

  return (
    <main className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif">Cake Gallery</h1>
        <div className="flex gap-2 text-sm">
          {categories.map((c)=>{
            const isAll = c === "All";
            const href = isAll ? "/gallery" : `/gallery?category=${encodeURIComponent(c)}`;
            const active = (isAll && !category) || category === c;
            return (
              <a key={c} href={href} className={`px-3 py-1 rounded-full border ${active ? 'bg-chocolate text-white border-chocolate' : 'border-chocolate text-chocolate hover:bg-white'}`}>{c}</a>
            )
          })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cakes.map((cake)=> (
          <CakeCard key={cake.slug} cake={cake} />
        ))}
      </div>
    </main>
  )
}
