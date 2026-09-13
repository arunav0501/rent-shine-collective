import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Check, ChevronRight, Heart, MapPin, MessageCircle, Share2, ShieldCheck, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/renthub/AppHeader";
import { TrustScoreDialog } from "@/components/renthub/TrustScoreDialog";
import { Button } from "@/components/ui/button";
import { listings } from "@/lib/renthub-data";

export const Route = createFileRoute("/product/$productId")({
  head: () => ({ meta: [
    { title: "Premium rental details — RentHub" },
    { name: "description", content: "Review verified owner details, availability and transparent rental pricing on RentHub." },
    { property: "og:title", content: "Premium rentals on RentHub" },
    { property: "og:description", content: "Book protected rentals from verified local owners." },
    { property: "og:type", content: "product" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const fallbackItem = listings[0];
  if (!fallbackItem) return null;
  const item = listings.find((listing) => listing.id === productId) ?? fallbackItem;
  const [days, setDays] = useState(3);
  const costs = useMemo(() => ({ rental: item.price * days, fee: Math.round(item.price * days * 0.12), deposit: 120 }), [days, item.price]);
  return <div className="min-h-screen bg-background"><AppHeader /><main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to explore</Link>
    <div className="grid gap-3 lg:grid-cols-[1.55fr_0.75fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[560px]"><img src={item.image} alt={item.title} width={1200} height={900} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" /><div className="absolute right-4 top-4 flex gap-2"><Button variant="outline" size="icon" className="bg-background/75 backdrop-blur-xl" aria-label="Share"><Share2 /></Button><Button variant="outline" size="icon" className="bg-background/75 backdrop-blur-xl" aria-label="Save"><Heart /></Button></div></div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">{listings.slice(1,3).map((listing) => <div key={listing.id} className="overflow-hidden rounded-2xl"><img src={listing.image} alt="Additional product view" loading="lazy" width={1200} height={900} className="h-full min-h-40 w-full object-cover" /></div>)}</div>
    </div>
    <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_390px]">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-7"><div><span className="text-[11px] font-bold uppercase text-primary">{item.category}</span><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{item.title}</h1><p className="mt-3 flex items-center gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-1"><Star className="size-4 fill-current text-primary" /> {item.rating} ({item.reviews})</span><span className="flex items-center gap-1"><MapPin className="size-4" />{item.location}</span></p></div></div>
        <div className="border-b border-border py-7"><div className="grid grid-cols-[auto_1fr_auto] items-center gap-4"><div className="relative grid size-14 place-items-center rounded-full bg-accent text-lg font-bold">MR<span className="absolute bottom-0 right-0 size-4 rounded-full border-2 border-background bg-trust" /></div><div className="min-w-0"><p className="font-bold">Owned by {item.owner}</p><p className="mt-1 text-xs text-muted-foreground">Usually responds in 12 minutes</p></div><Button variant="outline" size="icon" aria-label="Message owner"><MessageCircle /></Button></div>
          <TrustScoreDialog trigger={<button className="mt-5 flex w-full items-center gap-4 rounded-2xl border border-trust/20 bg-trust-soft p-4 text-left transition-colors hover:border-trust/40"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-trust text-lg font-extrabold text-primary-foreground">{item.trust}</span><span className="min-w-0 flex-1"><span className="block font-bold">Excellent Trust Score</span><span className="block truncate text-xs text-muted-foreground">Verified profile · 18 rentals · 0 cancellations</span></span><ChevronRight className="size-5 shrink-0 text-trust" /></button>} />
        </div>
        <div className="py-7"><h2 className="text-xl font-bold">About this rental</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">A meticulously maintained, professional-grade kit ready for your next project. Includes the essential accessories, a protective carrying case, and a quick walkthrough at pickup.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{["Verified condition", "Flexible pickup", "Damage protection"].map((feature) => <div key={feature} className="flex items-center gap-2 rounded-xl bg-secondary p-3 text-sm font-semibold"><Check className="size-4 text-trust" />{feature}</div>)}</div></div>
      </div>
      <aside className="lg:sticky lg:top-24 lg:self-start"><div className="glass-panel rounded-3xl p-6"><div className="flex items-end justify-between"><p><span className="text-3xl font-extrabold">${item.price}</span><span className="text-sm text-muted-foreground"> / day</span></p><span className="flex items-center gap-1 text-sm font-semibold"><Star className="size-4 fill-current" />{item.rating}</span></div><div className="mt-6 rounded-xl border border-border"><div className="grid grid-cols-2 divide-x divide-border"><label className="p-3"><span className="block text-[10px] font-bold uppercase text-muted-foreground">Start</span><input type="date" className="mt-1 w-full bg-transparent text-xs font-semibold outline-hidden" /></label><label className="p-3"><span className="block text-[10px] font-bold uppercase text-muted-foreground">Days</span><select value={days} onChange={(event) => setDays(Number(event.target.value))} className="mt-1 w-full bg-transparent text-xs font-semibold outline-hidden">{[1,2,3,4,5,6,7].map((day) => <option key={day} value={day}>{day} days</option>)}</select></label></div></div><div className="mt-6 space-y-3 text-sm"><CostRow label={`$${item.price} × ${days} days`} value={`$${costs.rental}`} /><CostRow label="Service & protection" value={`$${costs.fee}`} /><CostRow label="Refundable deposit" value={`$${costs.deposit}`} muted /><div className="border-t border-border pt-4"><CostRow label="Total estimated price" value={`$${costs.rental + costs.fee + costs.deposit}`} strong /></div></div><Button size="lg" className="mt-6 w-full"><CalendarDays /> Request to rent</Button><p className="mt-3 text-center text-xs text-muted-foreground">You won’t be charged yet</p></div></aside>
    </div>
  </main></div>;
}

function CostRow({ label, value, muted, strong }: { label: string; value: string; muted?: boolean; strong?: boolean }) { return <div className={`flex justify-between gap-3 ${muted ? "text-muted-foreground" : ""} ${strong ? "text-base font-extrabold" : ""}`}><span>{label}</span><span>{value}</span></div>; }