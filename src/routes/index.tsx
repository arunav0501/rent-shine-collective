import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Camera, Car, ChevronRight, Drill, Headphones, MapPin, PartyPopper, Search, ShieldCheck, TentTree, Zap } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/renthub/AppHeader";
import { ListingCard } from "@/components/renthub/ListingCard";
import { Button } from "@/components/ui/button";
import { listings } from "@/lib/renthub-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "RentHub — Rent anything from trusted neighbors" },
    { name: "description", content: "Rent cameras, vehicles, outdoor gear and more from verified owners near you." },
    { property: "og:title", content: "RentHub — Trusted local rentals" },
    { property: "og:description", content: "Discover quality items from verified neighbors." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: DiscoveryPage,
});

const categories = [
  ["All", Zap], ["Electronics", Headphones], ["Photography", Camera], ["Vehicles", Car], ["Tools", Drill], ["Party & Events", PartyPopper], ["Sports", TentTree], ["Audio & Visual", Headphones],
] as const;

function DiscoveryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleListings = activeCategory === "All" ? listings : listings.filter((item) => item.category === activeCategory);
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main>
        <section className="mesh-backdrop relative overflow-hidden border-b border-border px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-trust/25 bg-trust-soft px-3.5 py-2 text-[11px] font-bold uppercase text-trust"><ShieldCheck className="size-4" />100% verified community & trust scores</div>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.08] text-foreground sm:text-6xl lg:text-7xl">Rent anything from <span className="bg-linear-to-r from-primary to-trust bg-clip-text text-transparent">trusted neighbors</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Access remarkable things without owning them. Every owner is verified, every rental is protected.</p>
            <div className="glass-panel mx-auto mt-10 grid max-w-5xl gap-2 rounded-2xl p-2 text-left md:grid-cols-[1.35fr_1fr_1fr_auto] md:rounded-3xl">
              <SearchField icon={<Search />} label="What are you looking for?" placeholder="Sony A7 IV, Tesla, camping gear" />
              <SearchField icon={<MapPin />} label="Location" placeholder="Bengaluru" />
              <SearchField icon={<CalendarDays />} label="Rental dates" placeholder="Sep 18 – Sep 21" />
              <Button size="lg" className="h-full min-h-14 px-7"><Search /> Search</Button>
            </div>
            <div className="mt-5 flex items-center justify-center gap-5 text-xs text-muted-foreground"><span>12,000+ items</span><span className="size-1 rounded-full bg-border" /><span>Protected rentals</span><span className="size-1 rounded-full bg-border" /><span>Local pickup</span></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
            {categories.map(([label, Icon]) => <Button key={label} variant={activeCategory === label ? "default" : "outline"} onClick={() => setActiveCategory(label)} className="shrink-0 rounded-full"><Icon />{label}</Button>)}
          </div>
          <div className="mt-12 flex items-end justify-between gap-4"><div><p className="text-[11px] font-bold uppercase text-primary">Curated near you</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Exceptional finds, ready to rent</h2></div><Button variant="ghost" className="hidden sm:inline-flex">View all <ChevronRight /></Button></div>
          {visibleListings.length > 0 ? <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visibleListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div> : <div className="mt-7 rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">More verified listings are arriving soon.</div>}
        </section>

        <section id="how-it-works" className="border-y border-border bg-surface px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div><p className="text-[11px] font-bold uppercase text-trust">Built on trust</p><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Rent confidently.<br />Every single time.</h2><p className="mt-4 max-w-md leading-7 text-muted-foreground">Identity checks, transparent history and protection are designed into every exchange.</p></div>
            <div className="grid gap-4 sm:grid-cols-3">{[["01", "Find it", "Explore quality items available nearby."], ["02", "Request it", "Choose dates and send a protected request."], ["03", "Enjoy it", "Meet locally, then return when finished."]].map(([number, title, copy]) => <div key={number} className="rounded-2xl border border-border bg-card p-5"><span className="text-xs font-extrabold text-primary">{number}</span><h3 className="mt-8 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><span>© 2026 RentHub. Borrow better.</span><span>Trust & Safety · Protection · Help</span></footer>
    </div>
  );
}

function SearchField({ icon, label, placeholder }: { icon: React.ReactNode; label: string; placeholder: string }) {
  return <label className="flex min-w-0 items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-accent/60"><span className="text-primary [&_svg]:size-5">{icon}</span><span className="min-w-0"><span className="block text-[10px] font-bold uppercase text-muted-foreground">{label}</span><input className="mt-1 w-full bg-transparent text-sm font-semibold text-foreground outline-hidden placeholder:text-muted-foreground" placeholder={placeholder} /></span></label>;
}