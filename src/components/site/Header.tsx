import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { categories, contact, subcategories } from "@/data/site";
import { cn } from "@/lib/utils";
import { loadGsap, prefersReduced } from "./motion";

const nav = [
  { to: "/", label: "Home" },
  { to: "/all-categories", label: "Categories" },
  { to: "/shop", label: "All Products" },
  { to: "/contact-us", label: "Contact Us" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<{ play: () => void; reverse: () => void; kill: () => void } | null>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 400);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setCatsOpen(false); }, [path]);

  // Mobile menu GSAP timeline
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const t = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      t.set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.inOut" })
        .fromTo(el.querySelectorAll("[data-m-link]"), { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.05 }, "-=0.2")
        .fromTo(el.querySelectorAll("[data-m-meta]"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.4");
      tl.current = t;
    });
    return () => { cancelled = true; tl.current?.kill(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (prefersReduced() && menuRef.current) {
      menuRef.current.style.visibility = open ? "visible" : "hidden";
      menuRef.current.style.clipPath = "none";
    } else if (open) tl.current?.play();
    else tl.current?.reverse();
  }, [open]);

  const isActive = (to: string) => (to === "/" ? path === "/" : path.startsWith(to) || (to === "/all-categories" && path.startsWith("/product-category")));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500",
          scrolled ? "border-b bg-background/85 backdrop-blur-md" : "border-b border-transparent",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div className={cn("shell flex items-center justify-between transition-[height] duration-500", scrolled ? "h-14" : "h-20")}>
          <Link to="/" className="flex items-center gap-3" aria-label="Motomanic home">
            <img src="https://motomanicev.com/wp-content/uploads/2025/08/logo-90x90-1.webp" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-display text-lg font-bold tracking-[-0.02em]">MOTOMANIC</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((n) =>
              n.to === "/all-categories" ? (
                <div key={n.to} className="group relative" onMouseLeave={() => setCatsOpen(false)}>
                  <Link to={n.to} onMouseEnter={() => setCatsOpen(true)} onFocus={() => setCatsOpen(true)} className={cn("label relative py-2", isActive(n.to) ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                    {n.label}
                    <span className={cn("absolute -bottom-0.5 left-0 h-px bg-signal transition-all duration-500", isActive(n.to) ? "w-full" : "w-0 group-hover:w-full")} />
                  </Link>
                  <div className={cn("absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-4 transition-all duration-300", catsOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0")}>
                    <div className="grid grid-cols-2 border bg-card p-2">
                      {categories.map((c, i) => (
                        <div key={c.slug} className={cn(c.slug === "material-handling-solutions" && "row-span-2")}>
                          <Link to="/product-category/$slug" params={{ slug: c.slug }} className="flex gap-3 px-3 py-2.5 text-sm hover:bg-secondary">
                            <span className="label text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                            {c.name}
                          </Link>
                          {c.slug === "material-handling-solutions" &&
                            subcategories.map((s) => (
                              <Link key={s.slug} to="/product-category/$slug" params={{ slug: s.slug }} className="block py-1.5 pl-11 pr-3 text-xs text-muted-foreground hover:text-foreground">
                                — {s.name}
                              </Link>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={n.to} to={n.to} className={cn("group label relative py-2", isActive(n.to) ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {n.label}
                  <span className={cn("absolute -bottom-0.5 left-0 h-px bg-signal transition-all duration-500", isActive(n.to) ? "w-full" : "w-0 group-hover:w-full")} />
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <a href={`tel:${contact.phones[0].tel}`} className="label hidden text-muted-foreground hover:text-foreground xl:block">{contact.phones[0].display}</a>
            <Link to="/contact-us" className="label hidden border border-foreground px-4 py-2.5 transition-colors hover:bg-foreground hover:text-background md:block">Enquire</Link>
            <button onClick={() => setOpen((o) => !o)} className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              <span className={cn("h-px w-6 bg-current transition-transform duration-500", open && "translate-y-[3.5px] rotate-45 text-ink-foreground")} />
              <span className={cn("h-px w-6 bg-current transition-transform duration-500", open && "-translate-y-[3.5px] -rotate-45 text-ink-foreground")} />
            </button>
          </div>
        </div>
      </header>

      <div ref={menuRef} className="invisible fixed inset-0 z-[55] flex flex-col bg-ink pt-24 text-ink-foreground lg:hidden" aria-hidden={!open}>
        <div className="shell flex flex-1 flex-col overflow-y-auto pb-10">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.to} className="overflow-hidden border-b border-ink-border">
                <Link data-m-link to={n.to} className="flex items-baseline gap-4 py-4 font-display text-5xl font-semibold tracking-[-0.03em]">
                  <span className="label text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div data-m-meta className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2">
            {categories.map((c) => (
              <Link key={c.slug} to="/product-category/$slug" params={{ slug: c.slug }} className="py-1 text-sm text-ink-muted">{c.name}</Link>
            ))}
          </div>
          <div data-m-meta className="mt-auto space-y-2 pt-10">
            {contact.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="block font-mono text-sm">{p.label} — {p.display}</a>
            ))}
            <a href={`mailto:${contact.email}`} className="block font-mono text-sm text-signal">{contact.email}</a>
          </div>
        </div>
      </div>
    </>
  );
}
