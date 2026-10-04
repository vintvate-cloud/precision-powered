import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { categories, products, productsIn } from "@/data/site";
import { ProductTile } from "@/components/site/ProductTile";
import { MaskLines } from "@/components/site/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "All Products — Motomanic" },
      { name: "description", content: "Browse all Motomanic products: PMSM motors and controllers, differentials, front axles, golf carts, material handling EVs and Li-ion battery packs." },
      { property: "og:title", content: "All Products — Motomanic" },
      { property: "og:description", content: "The complete Motomanic EV component and vehicle range." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [filter, setFilter] = useState<string>("all");
  const list = filter === "all" ? products : productsIn(filter);
  return (
    <div className="pt-32">
      <section className="shell">
        <p className="label text-muted-foreground">Index — {products.length} products</p>
        <MaskLines className="display-xl mt-6" lines={["All", "products"]} />
      </section>
      <div className="sticky top-14 z-30 mt-16 border-y bg-background/90 backdrop-blur-md">
        <div className="shell flex gap-2 overflow-x-auto py-3">
          {[{ slug: "all", name: "All" }, ...categories].map((c) => (
            <button key={c.slug} onClick={() => setFilter(c.slug)} className={cn("label shrink-0 border px-3 py-2 transition-colors", filter === c.slug ? "border-foreground bg-foreground text-background" : "border-transparent text-muted-foreground hover:text-foreground")}>
              {c.name} <span className="opacity-60">{c.slug === "all" ? products.length : productsIn(c.slug).length}</span>
            </button>
          ))}
        </div>
      </div>
      <section className="shell pb-32">
        <div className="grid border-l sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => <ProductTile key={p.slug} p={p} index={i} />)}
        </div>
        {list.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No products in this category yet. <Link to="/contact-us" className="link-line text-foreground">Ask us</Link></p>
        )}
      </section>
    </div>
  );
}
