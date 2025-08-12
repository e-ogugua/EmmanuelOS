import CakeBuilder from "@/components/CakeBuilder";

type CakeDetail = { id: string; name: string; slug: string; base_price: number; description?: string; image_url?: string }

async function fetchCake(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/cakes/${slug}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load cake');
  const json = await res.json();
  return json.data as CakeDetail;
}

export default async function CakeDetailsPage({ params }: { params: { slug: string } }) {
  const cake = await fetchCake(params.slug);
  return (
    <main className="container py-10">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="rounded-xl overflow-hidden border bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cake.image_url || 'https://images.unsplash.com/photo-1541976076758-347942db1970'} alt={cake.name} className="w-full h-auto object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-serif">{cake.name}</h1>
          {cake.description && <p className="mt-2 text-neutral-700">{cake.description}</p>}
          <div className="mt-6 p-4 rounded-xl bg-cream/60 border">
            <div className="text-sm text-neutral-600">Base price</div>
            <div className="text-2xl font-semibold text-chocolate">₦{cake.base_price.toLocaleString()}</div>
          </div>
          <div className="mt-8">
            <CakeBuilder basePrice={cake.base_price} cakeId={cake.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
