import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, categoryImage, productsIn, subcategories } from "@/data/site";
import { MaskLines, Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/all-categories")({
  head: () => ({
    meta: [
      { title: "All Categories — Motomanic" },
      { name: "description", content: "Motomanic product categories: PMSM Motor and Controller, Differentials, Front Axles, Material Handling Solutions, Golf Carts, Li-Ion Battery Packs and R&D projects." },
      { property: "og:title", content: "All Categories — Motomanic" },
      { property: "og:description", content: "Explore every Motomanic product category." },
    ],
  }),
  component: AllCategories,
});

function AllCategories() {
  return (
    <div className="pt-32 pb-32">
      <section className="shell">
        <p className="label text-muted-foreground">{categories.length} categories</p>
        <MaskLines className="mt-6 font-display text-[13vw] font-medium uppercase leading-[0.88] md:text-[10vw] lg:text-[7vw]" lines={["All", "categories"]} />
      </section>
      <section className="shell mt-20">
        {categories.map((c, i) => {
          const subs = subcategories.filter((s) => s.parent === c.slug);
          return (
            <Reveal key={c.slug}>
              <Link to="/product-category/$slug" params={{ slug: c.slug }} className="group grid-12 items-center gap-y-6 border-t py-10 last:border-b">
                <span className="label col-span-1 text-muted-foreground group-hover:text-signal">{String(i + 1).padStart(2, "0")}</span>
                <div className="col-span-3 md:col-span-4 lg:col-span-6">
                  <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:text-6xl">{c.name}</h2>
                  {subs.length > 0 && <p className="label mt-4 text-muted-foreground">{subs.map((s) => s.name).join(" · ")}</p>}
                </div>
                <span className="label col-span-4 md:col-span-1 lg:col-span-2 text-muted-foreground">{productsIn(c.slug).length} products</span>
                <div className="col-span-4 aspect-[4/3] overflow-hidden rounded-lg md:col-span-2 lg:col-span-3">
                  <img src={categoryImage(c)} alt="" loading="lazy" className="h-full w-full object-contain p-4 mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
