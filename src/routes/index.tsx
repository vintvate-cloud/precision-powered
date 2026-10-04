import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { categories, categoryImage, chapters, clients, company, founder, products, productsIn, testimonials, trending } from "@/data/site";
import { ButtonLink } from "@/components/site/Button";
import { DrawLine, loadGsap, MaskLines, prefersReduced, Reveal } from "@/components/site/motion";
import { cn } from "@/lib/utils";

const heroImg = "https://motomanicev.com/wp-content/uploads/2025/10/45Kw-Liquid-Cooled-Motor-and-Controller-1024x576.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Motomanic — Powering the Future of Electric Mobility" },
      { name: "description", content: "PMSM motors, controllers, differentials, Li-ion battery packs and EV conversion kits from Motomanic, Bhopal. Serving 100+ clients across India since 2020." },
      { property: "og:title", content: "Motomanic — Powering the Future of Electric Mobility" },
      { property: "og:description", content: "PMSM motors, controllers, battery packs and EV solutions from Bhopal, Madhya Pradesh." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Motomanic",
          url: "https://motomanicev.com/",
          email: "motomanic.evs@gmail.com",
          foundingDate: "2020",
          address: { "@type": "PostalAddress", streetAddress: "G-2/241, Gulmohar, Colony E-8, Arera Colony, Shahpura", addressLocality: "Bhopal", postalCode: "462039", addressRegion: "Madhya Pradesh", addressCountry: "IN" },
          contactPoint: [
            { "@type": "ContactPoint", telephone: "+91-9229110501", contactType: "sales", name: "Ordering" },
            { "@type": "ContactPoint", telephone: "+91-6376224631", contactType: "sales", name: "Sales & Marketing" },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <CategoryIndex />
      <Story />
      <TrendingTrack />
      <Founder />
      <Voices />
      <Clients />
    </>
  );
}

function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo("[data-h-grid]", { opacity: 0 }, { opacity: 1, duration: 0.6 })
          .fromTo("[data-h-label]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
          .fromTo("[data-h-line]", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.07 }, 0.2)
          .fromTo("[data-h-panel]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.35)
          .fromTo("[data-h-img]", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.inOut" }, 0.35)
          .fromTo("[data-h-meta]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.6)
          .fromTo("[data-h-cta]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.8);
        gsap.to("[data-h-img] img", { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      }, el);
    });
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section ref={root} className="shell pb-5 pt-24 md:pb-8 md:pt-28">
      <div className="reference-grid relative isolate min-h-[calc(100svh-7rem)] overflow-hidden rounded-[24px] border bg-card shadow-sm">
        <div data-h-grid className="pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative z-10 grid gap-8 px-5 pb-[48vw] pt-10 md:px-8 md:pb-[36vw] md:pt-14 lg:grid-cols-12 lg:px-10 lg:pb-[23vw] lg:pt-20">
          <div className="lg:col-span-7">
            <p data-h-label className="label flex items-center gap-3 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-signal" /> Bhopal, Madhya Pradesh — Est. {company.established}
            </p>
            <h1 className="mt-10 font-display text-[12vw] font-medium uppercase leading-[0.88] md:text-[8.2vw] lg:text-[5.25vw]">
              {["Engineering", "the electric", "road ahead"].map((line, index) => (
                <span key={line} className="block overflow-hidden"><span data-h-line className={cn("block", index === 2 && "relative inline-block after:absolute after:-right-5 after:top-2 after:h-3 after:w-3 after:rounded-full after:bg-signal md:after:h-4 md:after:w-4")}>{line}</span></span>
              ))}
            </h1>
          </div>

          <div data-h-panel className="lg:col-span-5 lg:pt-4">
            <div className="rounded-[20px] bg-background/92 p-5 shadow-sm backdrop-blur-sm md:p-7">
              <p className="label text-muted-foreground">EV systems / product range</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["PMSM motors", "Controllers", "Battery packs", "Drivetrains"].map((item, index) => (
                  <span key={item} className={cn("rounded-full px-3 py-2 text-xs", index === 1 ? "bg-signal" : "bg-secondary")}>{item}</span>
                ))}
              </div>
              <div className="mt-7 grid grid-cols-[minmax(0,1fr)_8rem] items-end gap-5">
                <div className="min-w-0">
                  <p className="font-display text-2xl font-semibold leading-tight md:text-3xl">High-performance components for electric mobility.</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Motors, controllers and EV conversion systems engineered for real-world use.</p>
                </div>
                <div className="product-plate aspect-square overflow-hidden">
                  <img src={heroImg} alt="45kW Liquid Cooled Motor and Controller" className="h-full w-full object-contain p-2 mix-blend-multiply" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[43vw] max-h-[430px] min-h-[250px] bg-signal md:h-[34vw] lg:h-[24vw]" />
        <div data-h-img className="absolute bottom-0 left-1/2 z-20 h-[44vw] min-h-[250px] w-[86vw] -translate-x-1/2 md:h-[36vw] md:w-[72vw] lg:h-[29vw] lg:w-[60vw]">
          <img src={heroImg} alt="45kW Liquid Cooled Motor and Controller" fetchPriority="high" className="h-full w-full object-contain object-bottom mix-blend-multiply drop-shadow-2xl" />
        </div>

        <div data-h-panel className="absolute bottom-[19vw] left-5 z-30 hidden rounded-[18px] bg-foreground/80 p-5 text-background backdrop-blur-md md:block lg:bottom-[11vw] lg:left-10">
          <p className="font-display text-3xl font-semibold">{company.clients}</p>
          <p className="mt-1 max-w-36 text-xs text-background/70">clients nationwide</p>
        </div>
        <div data-h-cta className="absolute bottom-6 right-5 z-30 md:bottom-8 md:right-8 lg:right-10">
          <ButtonLink to="/shop" className="shadow-lg">Explore products</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...company.marquee, ...company.marquee];
  return (
    <div className="overflow-hidden border-y bg-signal py-5 text-accent-foreground" aria-label={company.marquee.join(", ")}>
      <div className="animate-marquee flex w-max gap-10" aria-hidden>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-semibold uppercase tracking-[-0.01em] md:text-3xl">
            {t}<span className="h-2 w-2 rotate-45 bg-signal" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="shell py-28 md:py-40">
      <div className="grid-12 gap-y-12">
        <p className="label col-span-4 md:col-span-2 text-muted-foreground">(01) About Motomanic</p>
        <div className="col-span-4 md:col-span-6 lg:col-span-9">
          <MaskLines className="display-m" lines={["Empowering India's", "shift to electric", "mobility."]} />
        </div>
      </div>

      <div className="mt-20 grid-12 gap-y-14">
        <Reveal kind="image" className="col-span-4 md:col-span-4 lg:col-span-6">
          <img src={company.plantImage} alt="Motomanic plant" loading="lazy" className="aspect-[4/3] w-full object-cover" />
        </Reveal>
        <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8 flex flex-col justify-between gap-12">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {company.about.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
          <div className="grid grid-cols-2 border-t">
            {[[company.established, "Established"], [company.clients, "Clients nationwide"]].map(([n, l], i) => (
              <Reveal key={l} delay={i * 0.1} className={cn("pt-6", i === 1 && "border-l pl-6")}>
                <p className="font-display text-6xl font-semibold tracking-[-0.04em] md:text-7xl">{n}</p>
                <p className="label mt-3 text-muted-foreground">{l}</p>
              </Reveal>
            ))}
          </div>
          <ButtonLink to="/contact-us" variant="outline" className="self-start">Schedule a call now</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function CategoryIndex() {
  const [active, setActive] = useState(0);
  const list = categories;
  return (
    <section className="border-t">
      <div className="shell py-24 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="label text-muted-foreground">(02) Categories</p>
            <h2 className="display-l mt-6">The range.</h2>
          </div>
          <Link to="/all-categories" className="label link-line">View all categories →</Link>
        </div>

        <div className="mt-16 grid-12 gap-y-10">
          <ol className="col-span-4 md:col-span-8 lg:col-span-7">
            {list.map((c, i) => (
              <li key={c.slug} className="border-t last:border-b">
                <Link
                  to="/product-category/$slug"
                  params={{ slug: c.slug }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-6 md:py-7"
                >
                  <span className={cn("label transition-colors", active === i ? "text-signal" : "text-muted-foreground")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("font-display text-3xl font-semibold tracking-[-0.03em] transition-all duration-500 md:text-5xl", active === i ? "translate-x-2 text-foreground" : "text-foreground/45")}>{c.name}</span>
                  <span className="label text-muted-foreground">{productsIn(c.slug).length} items</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 product-plate aspect-[4/5] overflow-hidden">
              {list.map((c, i) => (
                <img key={c.slug} src={categoryImage(c)} alt="" loading="lazy" className={cn("absolute inset-0 h-full w-full object-contain p-10 mix-blend-multiply transition-all duration-700", active === i ? "scale-100 opacity-100" : "scale-105 opacity-0")} />
              ))}
              <span className="label absolute bottom-5 left-5 text-muted-foreground">{list[active]?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * chapters.length * 0.8}`,
          pin: el.querySelector<HTMLElement>("[data-pin]"),
          onUpdate: (s) => setStep(Math.min(chapters.length - 1, Math.floor(s.progress * chapters.length))),
        });
      });
      ctx = mm;
    });
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section ref={root} className="bg-ink text-ink-foreground">
      <div data-pin className="relative overflow-hidden lg:h-screen">
        <div className="ink-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="shell relative grid-12 h-full gap-y-16 py-24 lg:items-center lg:py-0">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="label text-signal">(03) The company</p>
            <h2 className="display-m mt-6">From legacy mobility to a sustainable future.</h2>
            <div className="mt-10 hidden space-y-1 lg:block">
              {chapters.map((c, i) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className={cn("h-px transition-all duration-500", step === i ? "w-12 bg-signal" : "w-4 bg-ink-border")} />
                  <span className={cn("label transition-colors", step === i ? "text-ink-foreground" : "text-ink-muted")}>{String(i + 1).padStart(2, "0")} {c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:h-[60vh]">
            {chapters.map((c, i) => (
              <article
                key={c.label}
                className={cn(
                  "mb-16 transition-all duration-700 lg:absolute lg:inset-0 lg:mb-0",
                  step === i ? "lg:translate-y-0 lg:opacity-100" : "lg:pointer-events-none lg:translate-y-8 lg:opacity-0",
                )}
              >
                <p className="font-display text-[22vw] font-semibold leading-none tracking-[-0.06em] text-ink-foreground/10 lg:text-[9vw]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="label -mt-4 text-signal">{c.label}</h3>
                {c.body?.map((p) => <p key={p} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/85 md:text-xl">{p}</p>)}
                {c.list && (
                  <dl className="mt-6 grid gap-x-10 border-t border-ink-border md:grid-cols-2">
                    {c.list.map(([k, v]) => (
                      <div key={k} className="border-b border-ink-border py-5">
                        <dt className="font-display text-lg font-semibold">{k}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendingTrack() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const items = trending.map((t) => ({ ...t, p: products.find((p) => p.slug === t.slug)! })).filter((t) => t.p);

  useEffect(() => {
    const el = root.current, tr = track.current;
    if (!el || !tr || prefersReduced()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(tr, {
          x: () => -(tr.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: el, start: "top top", end: () => `+=${tr.scrollWidth - window.innerWidth}`,
            pin: true, scrub: 0.6, invalidateOnRefresh: true,
            onUpdate: (s) => setIdx(Math.min(items.length - 1, Math.round(s.progress * (items.length - 1)))),
          },
        });
      });
      ctx = mm;
    });
    return () => { cancelled = true; ctx?.revert(); };
  }, [items.length]);

  return (
    <div>
    <section ref={root} className="overflow-hidden border-b lg:h-screen">
      <div className="flex h-full flex-col">
        <div className="shell flex items-end justify-between pb-8 pt-24 lg:pt-28">
          <div>
            <p className="label text-muted-foreground">(04) Trending products</p>
            <h2 className="display-m mt-4 max-w-2xl">Most in-demand components.</h2>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <span className="label">{String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            <span className="relative h-px w-40 bg-border"><span className="absolute inset-y-0 left-0 bg-signal transition-all duration-300" style={{ width: `${((idx + 1) / items.length) * 100}%` }} /></span>
          </div>
        </div>
        <p className="shell max-w-3xl pb-10 text-muted-foreground">Trusted by OEMs, fleet operators, and system integrators across India. All products are tested for performance, compatibility, and long-term reliability.</p>
        <div ref={track} className="flex flex-1 snap-x snap-mandatory gap-0 overflow-x-auto px-5 pb-16 md:px-10 lg:snap-none lg:overflow-visible lg:px-14 lg:pb-14">
          {items.map(({ p, specs }, i) => (
            <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group flex w-[85vw] shrink-0 snap-start flex-col border-l pr-6 pl-6 first:border-l-0 first:pl-0 md:w-[60vw] lg:w-[44vw] lg:pr-10 lg:pl-10">
              <div className="flex justify-between">
                <span className="label text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="label text-muted-foreground group-hover:text-signal">View →</span>
              </div>
              <div className="product-plate mt-4 flex-1 overflow-hidden">
                <img src={p.images[0]} alt={p.name} loading="lazy" className="aspect-[16/10] h-full w-full object-contain p-6 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.04] lg:aspect-auto" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em]">{p.name}</h3>
              <dl className="mt-5 grid grid-cols-3 border-t">
                {specs.map(([k, v], j) => (
                  <div key={k} className={cn("pt-4", j > 0 && "border-l pl-4")}>
                    <dt className="label text-muted-foreground">{k}</dt>
                    <dd className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}

function Founder() {
  return (
    <section className="shell py-28 md:py-40">
      <div className="grid-12 gap-y-12">
        <Reveal kind="image" className="col-span-4 md:col-span-3 lg:col-span-4">
          <img src={founder.image} alt={founder.name} loading="lazy" className="aspect-[3/4] w-full object-cover grayscale" />
        </Reveal>
        <div className="col-span-4 md:col-span-5 lg:col-span-6 lg:col-start-7 flex flex-col justify-end">
          <p className="label text-muted-foreground">(05) Founder</p>
          <MaskLines className="display-m mt-6" lines={["Over 20 years", "in the automobile", "industry."]} />
          <DrawLine className="mt-10 text-foreground/30" />
          <Reveal className="mt-8 text-lg leading-relaxed text-muted-foreground"><p>{founder.bio}</p></Reveal>
          <div className="mt-10">
            <p className="font-display text-2xl font-semibold">{founder.name}</p>
            <p className="label mt-2 text-muted-foreground">{founder.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Voices() {
  const [i, setI] = useState(0);
  const t = testimonials[i]!;
  return (
    <section className="border-t bg-card">
      <div className="shell grid-12 gap-y-10 py-24 md:py-32">
        <div className="col-span-4 md:col-span-2 lg:col-span-3">
          <p className="label text-muted-foreground">(06) What our customers say</p>
          <div className="mt-8 flex gap-2">
            {testimonials.map((x, j) => (
              <button key={x.name} onClick={() => setI(j)} aria-label={`Testimonial ${j + 1}`} className={cn("label border px-3 py-2 transition-colors", i === j ? "border-foreground bg-foreground text-background" : "hover:border-foreground")}>
                {String(j + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
        <figure key={i} className="col-span-4 md:col-span-6 lg:col-span-8 lg:col-start-5 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <blockquote className="font-display text-2xl font-medium leading-snug tracking-[-0.02em] md:text-4xl">“{t.quote}”</blockquote>
          <figcaption className="mt-10 flex items-center gap-4 border-t pt-6">
            <span className="h-2 w-2 bg-signal" />
            <span className="font-semibold">{t.name}</span>
            <span className="text-sm text-muted-foreground">{t.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className="border-t">
      <div className="shell py-24">
        <div className="flex items-end justify-between">
          <p className="label text-muted-foreground">(07) Our esteemed clients</p>
          <p className="label text-muted-foreground">{clients.length}</p>
        </div>
        <ul className="mt-10 grid grid-cols-2 border-l border-t sm:grid-cols-4 lg:grid-cols-5">
          {clients.map((c) => (
            <li key={c.name} className="flex aspect-[3/2] items-center justify-center border-b border-r p-6">
              <img src={c.logo} alt={c.name} loading="lazy" className="max-h-14 w-auto max-w-full object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
