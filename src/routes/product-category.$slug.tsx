import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allCategories, productsIn, subcategories } from "@/data/site";
import { ProductTile } from "@/components/site/ProductTile";
import { MaskLines } from "@/components/site/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product-category/$slug")({
  loader: ({ params }) => {
    const category = allCategories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "Category";
    return {
      meta: [
        { title: `${name} — Motomanic` },
        { name: "description", content: `Browse Motomanic ${name}.` },
        { property: "og:title", content: `${name} — Motomanic` },
        { property: "og:description", content: `Browse Motomanic ${name}.` },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="shell py-48 text-center">
      <p className="display-m">Category not found</p>
      <Link to="/all-categories" className="label link-line mt-8">View all categories →</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const list = productsIn(category.slug);
  const parent = allCategories.find((c) => c.slug === category.parent);
  const siblings = subcategories.filter((s) => s.parent === (category.parent ?? category.slug));
  return (
    <div className="pb-24 pt-24 md:pb-32 md:pt-32">
      <section className="shell">
        <nav className="label mobile-scrollbar-none flex gap-2 overflow-x-auto whitespace-nowrap text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>/
          <Link to="/all-categories" className="hover:text-foreground">Categories</Link>/
          {parent && <><Link to="/product-category/$slug" params={{ slug: parent.slug }} className="hover:text-foreground">{parent.name}</Link>/</>}
          <span className="text-foreground">{category.name}</span>
        </nav>
        <MaskLines key={category.slug} className="display-l mt-8 max-w-5xl break-words md:mt-10" lines={[category.name]} />
        <p className="label mt-6 text-muted-foreground">{list.length} products</p>
        {siblings.length > 0 && (
          <div className="mobile-scrollbar-none mt-8 flex gap-2 overflow-x-auto md:mt-10 md:flex-wrap">
            {siblings.map((s) => (
              <Link key={s.slug} to="/product-category/$slug" params={{ slug: s.slug }} className={cn("label shrink-0 rounded-full border px-4 py-3", s.slug === category.slug ? "border-foreground bg-foreground text-background" : "hover:border-foreground")}>{s.name}</Link>
            ))}
          </div>
        )}
      </section>
      <section className="shell mt-10 md:mt-16">
        <div className="grid border-l border-t sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => <ProductTile key={p.slug} p={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
