import { Link } from "@tanstack/react-router";
import { Heart, MapPin, ShieldCheck, Star } from "lucide-react";
import type { Listing } from "@/lib/renthub-data";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
      <Link to="/product/$productId" params={{ productId: listing.id }} className="block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={listing.image} alt={listing.title} loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-border bg-background/75 px-3 py-1.5 text-[10px] font-bold uppercase backdrop-blur-xl">{listing.category}</span>
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-border bg-background/75 px-2.5 py-1.5 text-xs font-bold backdrop-blur-xl"><ShieldCheck className="size-3.5 text-trust" />{listing.trust}</span>
          <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1.5 text-sm font-extrabold text-foreground backdrop-blur-xl">from ${listing.price}<span className="text-xs font-medium text-muted-foreground">/day</span></span>
          <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-background/80 backdrop-blur-xl"><Heart className="size-4" /></span>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3"><h3 className="font-bold text-card-foreground">{listing.title}</h3><span className="flex shrink-0 items-center gap-1 text-xs font-semibold"><Star className="size-3 fill-current" />{listing.rating}</span></div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5" />{listing.location} · {listing.distance}</p>
        </div>
      </Link>
    </article>
  );
}