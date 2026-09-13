import { useRef, useState } from "react";
import { Camera, Check, ImagePlus, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import cameraImage from "@/assets/camera.jpg";

export function AddProductDialog({ trigger }: { trigger: React.ReactNode }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();
  const [stage, setStage] = useState(0);
  const [generated, setGenerated] = useState(false);
  const statuses = ["Identifying product...", "Generating title...", "Writing description...", "Matching category..."];

  const generate = () => {
    setGenerated(false);
    setStage(1);
    statuses.forEach((_, index) => window.setTimeout(() => setStage(index + 1), index * 650));
    window.setTimeout(() => { setGenerated(true); setStage(0); }, 2700);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="glass-panel max-h-[92vh] overflow-y-auto border-border p-0 sm:max-w-3xl sm:rounded-3xl">
        <div className="border-b border-border bg-accent/60 p-6 sm:p-8">
          <DialogHeader><DialogTitle className="flex items-center gap-2 text-xl"><Sparkles className="text-primary" /> AI Image → Listing</DialogTitle><DialogDescription>Powered by Google Gemini · turn a photo into a polished listing</DialogDescription></DialogHeader>
        </div>
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)); }} />
            <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} className="relative aspect-square h-auto w-full overflow-hidden whitespace-normal rounded-2xl border-dashed border-primary/40 bg-accent/30 p-0 text-center hover:bg-accent/60">
              {preview || generated ? <img src={preview ?? cameraImage} alt="Product preview" className="h-full w-full object-cover" /> : <span className="grid h-full place-items-center p-6"><span><ImagePlus className="mx-auto mb-3 size-9 text-primary" /><span className="block font-bold">Drop a product photo</span><span className="mt-1 block text-xs text-muted-foreground">or click to browse</span></span></span>}
              {stage > 0 && <span className="scanner absolute inset-x-0 top-0 h-1/4" />}
            </Button>
            <Button className="mt-3 w-full" onClick={generate} disabled={stage > 0}><Sparkles />{stage > 0 ? "Creating listing..." : "Generate with AI"}</Button>
            {stage > 0 && <div className="mt-4 space-y-2">{statuses.map((status, index) => <p key={status} className={`flex items-center gap-2 text-xs ${index < stage ? "text-trust" : "text-muted-foreground"}`}>{index < stage ? <Check className="size-3.5" /> : <span className="size-3.5 rounded-full border border-border" />}{status}</p>)}</div>}
          </div>
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            {generated && <p className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground"><Sparkles className="size-3.5" /> AI suggestions — review and set your price & location.</p>}
            <Field label="Title"><Input className="h-11 rounded-xl" defaultValue={generated ? "Sony A7 IV Creator Kit" : ""} placeholder="What are you listing?" /></Field>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="Category"><Input className="h-11 rounded-xl" defaultValue={generated ? "Photography" : ""} placeholder="Category" /></Field><Field label="Brand & model"><Input className="h-11 rounded-xl" defaultValue={generated ? "Sony · A7 IV" : ""} placeholder="Brand · Model" /></Field></div>
            <Field label="Description"><Textarea className="min-h-24 rounded-xl" defaultValue={generated ? "Full-frame mirrorless camera in excellent condition. Includes 28–70mm lens, two batteries and carrying case." : ""} placeholder="Describe your item" /></Field>
            <div className="grid grid-cols-3 gap-3"><Field label="Price / day"><Input type="number" className="h-11 rounded-xl" placeholder="$45" /></Field><Field label="Location"><Input className="h-11 rounded-xl" placeholder="Area" /></Field><Field label="Quantity"><Input type="number" className="h-11 rounded-xl" defaultValue="1" /></Field></div>
            <Button className="w-full" size="lg"><Upload /> Publish listing</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[11px] font-bold uppercase text-muted-foreground">{label}</span>{children}</label>;
}