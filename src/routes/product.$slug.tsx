import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allCategories, contact, products, trending } from "@/data/site";
import { ButtonA } from "@/components/site/Button";
import { InquiryForm } from "@/components/site/InquiryForm";
import { MaskLines, Reveal } from "@/components/site/motion";
import { ProductTile } from "@/components/site/ProductTile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product — Motomanic" }] };
    const desc = (p.description[0] ?? `${p.name} by Motomanic.`).slice(0, 158);
    const meta = [
      { title: `${p.name} — Motomanic` },
      { name: "description", content: desc },
      { property: "og:title", content: `${p.name} — Motomanic` },
      { property: "og:description", content: desc },
      { property: "og:type", content: "product" },
    ];
    if (p.images[0]) meta.push({ property: "og:image", content: p.images[0] }, { name: "twitter:image", content: p.images[0] });
    return {
      meta,
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: p.name, image: p.images, description: p.description.join(" "), brand: { "@type": "Brand", name: "Motomanic" } }) }],
    };
  },
  notFoundComponent: () => (
    <div className="shell py-48 text-center">
      <p className="display-m">Product not found</p>
      <Link to="/shop" className="label link-line mt-8">View all products →</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const cat = allCategories.find((c) => c.slug === p.category);
  const specs = trending.find((t) => t.slug === p.slug)?.specs;
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const idx = products.findIndex((x) => x.slug === p.slug);
  const next = products[(idx + 1) % products.length]!;

  return (
    <div key={p.slug}>
      <section className="relative pt-24 md:pt-28">
        <div className="shell relative">
          <nav className="label mobile-scrollbar-none flex gap-2 overflow-x-auto whitespace-nowrap text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground">Home</Link>/
            {cat && <><Link to="/product-category/$slug" params={{ slug: cat.slug }} className="hover:text-foreground">{cat.name}</Link>/</>}
            <span className="text-foreground">{p.name}</span>
          </nav>

          <div className="mt-6 grid-12 gap-y-8 pb-16 md:mt-10 md:gap-y-10 md:pb-20">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <Reveal kind="image" className="relative aspect-square overflow-hidden rounded-[20px] border bg-secondary/40 md:aspect-[4/3] md:rounded-[24px] md:bg-card">
                {p.images[0] && <img src={p.images[0]} alt={p.name} fetchPriority="high" className="h-full w-full object-contain p-5 mix-blend-multiply md:p-14" />}
                <span className="label absolute bottom-4 left-4 text-muted-foreground">{String(idx + 1).padStart(2, "0")} / {products.length}</span>
              </Reveal>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col">
              <p className="label text-signal">{cat?.name}</p>
              <MaskLines className="mt-4 break-words font-display text-[clamp(2.35rem,11vw,3.25rem)] font-semibold leading-[0.92] md:mt-5 md:text-6xl" lines={[p.name]} />
              <Reveal className="mt-8 space-y-3 text-lg leading-relaxed text-muted-foreground">
                {p.description.length ? p.description.map((d) => <p key={d}>{d}</p>) : <p>Contact us for details on this product.</p>}
              </Reveal>

              {specs && (
                <dl className="mt-8 grid grid-cols-3 border-t md:mt-10">
                  {specs.map(([k, v], j) => (
                    <Reveal key={k} delay={j * 0.08} className={cn("pt-5", j > 0 && "border-l pl-4")}>
                      <dt className="label text-muted-foreground">{k}</dt>
                      <dd className="mt-2 break-words font-display text-lg font-semibold leading-tight md:text-3xl">{v}</dd>
                    </Reveal>
                  ))}
                </dl>
              )}

              <dl className="mt-10 border-t text-sm">
                <div className="flex justify-between border-b py-3"><dt className="label text-muted-foreground">Brand</dt><dd>Motomanic</dd></div>
                {cat && <div className="flex justify-between border-b py-3"><dt className="label text-muted-foreground">Category</dt><dd><Link to="/product-category/$slug" params={{ slug: cat.slug }} className="link-line">{cat.name}</Link></dd></div>}
              </dl>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonA href="#enquire" className="flex-1">Enquire now</ButtonA>
                <ButtonA href={`tel:${contact.phones[0].tel}`} variant="outline" className="flex-1">Call {contact.phones[0].display}</ButtonA>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-20 bg-ink text-ink-foreground">
        <div className="shell grid-12 gap-y-10 py-20 md:gap-y-12 md:py-32">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="label text-signal">Product enquiry</p>
            <h2 className="display-m mt-6">Interested in this product?</h2>
            <p className="mt-6 text-ink-muted">Tell us about your requirement and our team will get back to you.</p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <InquiryForm product={p.name} tone="ink" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="shell py-20 md:py-24">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <h2 className="display-m">More in {cat?.name}</h2>
            {cat && <Link to="/product-category/$slug" params={{ slug: cat.slug }} className="label link-line hidden md:inline-flex">View all →</Link>}
          </div>
          <div className="mt-12 grid border-l border-t sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => <ProductTile key={r.slug} p={r} index={i} />)}
          </div>
        </section>
      )}

      <Link to="/product/$slug" params={{ slug: next.slug }} className="group block border-t">
        <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-12 md:gap-6 md:py-14">
          <div className="min-w-0">
            <p className="label text-muted-foreground">Next product</p>
            <p className="mt-3 font-display text-[clamp(1.75rem,8vw,2.35rem)] font-semibold leading-none transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">{next.name}</p>
          </div>
          <span className="font-display text-5xl transition-transform duration-500 group-hover:translate-x-2">→</span>
        </div>
      </Link>
    </div>
  );
}
