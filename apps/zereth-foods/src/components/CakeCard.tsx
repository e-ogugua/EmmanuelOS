"use client";
import Link from "next/link";
import Image from "next/image";

export type Cake = {
  id: string;
  name: string;
  slug: string;
  category?: string;
  base_price: number;
  image_url?: string;
};

export default function CakeCard({ cake }: { cake: Cake }) {
  const fallback = "https://placehold.co/1200x900?text=Cake";
  const src = (cake.image_url || fallback) + (cake.image_url?.includes("?") ? "" : "?auto=format&fit=crop&w=1200&q=80");
  return (
    <Link href={`/cakes/${cake.slug}`} className="group block rounded-xl overflow-hidden border bg-white">
      <div className="aspect-[4/3] bg-neutral-100 overflow-hidden relative">
        <Image
          src={src}
          alt={cake.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
          unoptimized
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
