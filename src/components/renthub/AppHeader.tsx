import { Link } from "@tanstack/react-router";
import { Bell, Menu, Moon, Plus, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { AddProductDialog } from "./AddProductDialog";

export function AppHeader() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="RentHub home"><BrandMark /></Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          <Link to="/" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Explore</Link>
          <Link to="/dashboard" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Dashboard</Link>
          <a href="#how-it-works" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">How it works</a>
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="hidden sm:inline-flex"><Bell /></Button>
          <Button variant="ghost" size="icon" aria-label={dark ? "Use light theme" : "Use dark theme"} onClick={() => setDark((value) => !value)}>
            {dark ? <Sun /> : <Moon />}
          </Button>
          <AddProductDialog trigger={<Button className="hidden sm:inline-flex"><Plus /> List an item</Button>} />
          <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden" onClick={() => setMenuOpen((value) => !value)}><Menu /></Button>
        </div>
      </div>
      {menuOpen && (
        <nav className="grid gap-1 border-t border-border bg-background p-3 md:hidden">
          <Link to="/" className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-accent">Explore</Link>
          <Link to="/dashboard" className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-accent">Dashboard</Link>
        </nav>
      )}
    </header>
  );
}