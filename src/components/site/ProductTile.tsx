import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/site";
import { allCategories } from "@/data/site";

export function ProductTile({ p, index }: { p: Product; index: number }) {
  const cat = allCategories.find((c) => c.slug === p.category);
  return (
    <Link to="/product/$slug" params={{ slug: p.slug }} className="group block border-b border-r bg-card p-5 transition-colors hover:bg-secondary/60 md:p-6">
      <div className="flex items-start justify-between">
        <span className="label text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
        <span className="label text-muted-foreground transition-colors group-hover:text-signal">{cat?.name}</span>
      </div>
      <div className="mt-5 aspect-[4/3] overflow-hidden rounded-lg">
        {p.images[0] && (
          <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-contain p-4 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        )}
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold leading-tight tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1">{p.name}</h3>
      <span className="label link-line mt-4 text-muted-foreground group-hover:text-foreground">View product →</span>
    </Link>
  );
}
