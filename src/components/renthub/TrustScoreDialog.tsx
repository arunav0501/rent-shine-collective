import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const metrics = [
  ["Profile Completeness", 20, 20],
  ["Listing Quality", 22, 25],
  ["Rental History & Fulfillment", 32, 35],
  ["Reliability & Cancellations", 18, 20],
] as const;

export function TrustScoreDialog({ trigger }: { trigger?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger ?? <Button variant="outline">View breakdown</Button>}</DialogTrigger>
      <DialogContent className="glass-panel max-h-[90vh] overflow-y-auto border-border sm:max-w-xl sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl"><ShieldCheck className="text-trust" /> RentHub Trust Score Breakdown</DialogTitle>
          <DialogDescription>Transparent signals built from verified activity.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-5 rounded-2xl bg-secondary p-5">
          <div className="relative grid size-24 shrink-0 place-items-center rounded-full bg-[conic-gradient(var(--color-trust)_92%,var(--color-muted)_0)]">
            <div className="grid size-19 place-items-center rounded-full bg-card"><span className="text-2xl font-extrabold">92</span></div>
          </div>
          <div><p className="text-2xl font-extrabold">Excellent</p><p className="mt-1 text-sm text-muted-foreground">Top 8% of RentHub owners</p></div>
        </div>
        <div className="space-y-4">
          {metrics.map(([label, value, max]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{label}</span><span className="text-muted-foreground">{value} / {max}</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-trust" style={{ width: `${(value / max) * 100}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {["Verified Email", "Phone Linked", "18 Completed Rentals", "0 Owner Cancellations"].map((label) => <div key={label} className="flex items-center gap-2 rounded-xl border border-border bg-background/50 p-3 text-sm font-medium"><Check className="size-4 text-trust" />{label}</div>)}
        </div>
        <p className="rounded-xl border border-primary/20 bg-accent/50 p-4 text-sm leading-6 text-muted-foreground">Scores are computed securely from verified transaction history and cannot be artificially gamed.</p>
      </DialogContent>
    </Dialog>
  );
}