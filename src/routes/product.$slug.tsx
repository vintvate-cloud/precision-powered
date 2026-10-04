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
  const next = products[(idx + 1) % products.length];

  return (
    <div key={p.slug}>
      <section className="relative pt-28">
        <div className="eng-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="shell relative">
          <nav className="label flex flex-wrap gap-2 text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground">Home</Link>/
            {cat && <><Link to="/product-category/$slug" params={{ slug: cat.slug }} className="hover:text-foreground">{cat.name}</Link>/</>}
            <span className="text-foreground">{p.name}</span>
          </nav>

          <div className="mt-10 grid-12 gap-y-10 pb-20">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <Reveal kind="image" className="product-plate relative aspect-[4/3]">
                {p.images[0] && <img src={p.images[0]} alt={p.name} fetchPriority="high" className="h-full w-full object-contain p-8 mix-blend-multiply md:p-14" />}
                <span className="label absolute bottom-4 left-4 text-muted-foreground">{String(idx + 1).padStart(2, "0")} / {products.length}</span>
              </Reveal>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col">
              <p className="label text-signal">{cat?.name}</p>
              <MaskLines className="mt-5 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.035em] md:text-6xl" lines={[p.name]} />
              <Reveal className="mt-8 space-y-3 text-lg leading-relaxed text-muted-foreground">
                {p.description.length ? p.description.map((d) => <p key={d}>{d}</p>) : <p>Contact us for details on this product.</p>}
              </Reveal>

              {specs && (
                <dl className="mt-10 grid grid-cols-3 border-t">
                  {specs.map(([k, v], j) => (
                    <Reveal key={k} delay={j * 0.08} className={cn("pt-5", j > 0 && "border-l pl-4")}>
                      <dt className="label text-muted-foreground">{k}</dt>
                      <dd className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{v}</dd>
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
        <div className="shell grid-12 gap-y-12 py-24 md:py-32">
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
        <section className="shell py-24">
          <div className="flex items-end justify-between">
            <h2 className="display-m">More in {cat?.name}</h2>
            {cat && <Link to="/product-category/$slug" params={{ slug: cat.slug }} className="label link-line hidden md:inline-flex">View all →</Link>}
          </div>
          <div className="mt-12 grid border-l border-t sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => <ProductTile key={r.slug} p={r} index={i} />)}
          </div>
        </section>
      )}

      <Link to="/product/$slug" params={{ slug: next.slug }} className="group block border-t">
        <div className="shell flex items-center justify-between gap-6 py-14">
          <div>
            <p className="label text-muted-foreground">Next product</p>
            <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">{next.name}</p>
          </div>
          <span className="font-display text-5xl transition-transform duration-500 group-hover:translate-x-2">→</span>
        </div>
      </Link>
    </div>
  );
}
