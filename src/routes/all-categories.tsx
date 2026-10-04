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
    <div className="pb-24 pt-24 md:pb-32 md:pt-32">
      <section className="shell">
        <p className="label text-muted-foreground">{categories.length} categories</p>
        <MaskLines className="mt-6 font-display text-[13vw] font-medium uppercase leading-[0.88] md:text-[10vw] lg:text-[7vw]" lines={["All", "categories"]} />
      </section>
       <section className="shell mt-12 md:mt-20">
        {categories.map((c, i) => {
          const subs = subcategories.filter((s) => s.parent === c.slug);
          return (
            <Reveal key={c.slug}>
              <Link to="/product-category/$slug" params={{ slug: c.slug }} className="group grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-x-3 gap-y-5 border-t py-8 last:border-b md:grid-cols-8 md:items-center md:gap-x-6 md:py-10 lg:grid-cols-12">
                <span className="label pt-1 text-muted-foreground group-hover:text-signal md:col-span-1 md:pt-0">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0 md:col-span-4 lg:col-span-6">
                  <h2 className="font-display text-[clamp(2rem,10vw,2.75rem)] font-semibold leading-[0.96] transition-transform duration-500 group-hover:translate-x-2 md:text-6xl">{c.name}</h2>
                  {subs.length > 0 && <p className="label mt-4 text-muted-foreground">{subs.map((s) => s.name).join(" · ")}</p>}
                </div>
                <span className="label col-start-2 text-muted-foreground md:col-span-1 md:col-start-auto lg:col-span-2">{productsIn(c.slug).length} products</span>
                <div className="col-start-2 aspect-[4/3] overflow-hidden rounded-lg bg-secondary/40 md:col-span-2 md:col-start-auto lg:col-span-3">
                  <img src={categoryImage(c)} alt="" loading="lazy" className="h-full w-full object-contain p-3 mix-blend-multiply transition-transform duration-700 group-hover:scale-105 md:p-4" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
