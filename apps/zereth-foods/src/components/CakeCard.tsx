import Link from "next/link";

export type Cake = {
  id: string;
  name: string;
  slug: string;
  category?: string;
  base_price: number;
  image_url?: string;
};

export default function CakeCard({ cake }: { cake: Cake }) {
  const fallback =
    "https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=1200&q=80";
  const src = (cake.image_url || fallback) + (cake.image_url?.includes("?") ? "" : "?auto=format&fit=crop&w=1200&q=80");
  return (
    <Link href={`/cakes/${cake.slug}`} className="group block rounded-xl overflow-hidden border bg-white">
      <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={cake.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e)=>{ (e.currentTarget as HTMLImageElement).src = fallback; }}
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <div className="font-medium">{cake.name}</div>
          <div className="text-xs text-neutral-500">{cake.category}</div>
        </div>
        <div className="text-chocolate font-semibold">
          ₦{cake.base_price.toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
