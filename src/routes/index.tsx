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
    loadGsap().then(({ gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo("[data-h-grid]", { opacity: 0 }, { opacity: 1, duration: 0.6 })
          .fromTo("[data-h-label]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
          .fromTo("[data-h-line]", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.07 }, 0.2)
          .fromTo("[data-h-img]", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 1.1, ease: "expo.inOut" }, 0.35)
          .fromTo("[data-h-meta]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.6)
          .fromTo("[data-h-cta]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.8);
        gsap.to("[data-h-img] img", { yPercent: 12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        gsap.to("[data-h-grid]", { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      }, el);
    });
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden pt-20">
      <div data-h-grid className="eng-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="shell relative grid-12 min-h-[calc(100svh-5rem)] content-between gap-y-10 py-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <p data-h-label className="label flex items-center gap-3 text-muted-foreground">
            <span className="h-2 w-2 bg-signal" /> Bhopal, Madhya Pradesh — Est. {company.established}
          </p>
        </div>

        <div className="relative z-10 col-span-4 md:col-span-8 lg:col-span-7">
          <h1 className="display-xl">
            {["Powering", "the future", "of electric", "mobility"].map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <span data-h-line className={cn("block", i === 3 && "text-signal")}>{l}</span>
              </span>
            ))}
          </h1>
        </div>

        <div data-h-img className="col-span-4 md:col-span-6 md:col-start-3 lg:absolute lg:right-14 lg:top-1/2 lg:w-[46vw] lg:-translate-y-1/2">
          <div className="product-plate relative aspect-[16/10] overflow-hidden">
            <img src={heroImg} alt="45kW Liquid Cooled Motor and Controller" fetchPriority="high" className="h-full w-full scale-110 object-contain p-6 mix-blend-multiply" />
            <span className="label absolute bottom-4 left-4 text-muted-foreground">Fig. 01 — 45kW Liquid Cooled Motor and Controller</span>
          </div>
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-12 grid-12 items-end gap-y-8 border-t pt-8">
          <p data-h-meta className="col-span-4 md:col-span-5 lg:col-span-5 text-base leading-relaxed text-muted-foreground">
            A leading supplier of high-performance <span className="text-foreground">PMSM motors</span>, <span className="text-foreground">controllers</span>, and <span className="text-foreground">EV conversion kits</span> — reliable, efficient, and affordable EV solutions backed by real-world performance.
          </p>
          <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-7 flex flex-col gap-3 sm:flex-row">
            <div data-h-cta className="flex-1"><ButtonLink to="/shop" className="w-full">Explore products</ButtonLink></div>
            <div data-h-cta className="flex-1"><ButtonLink to="/contact-us" variant="outline" className="w-full">Custom quote</ButtonLink></div>
          </div>
          <div data-h-meta className="hidden lg:col-span-2 lg:col-start-11 lg:flex lg:items-end lg:justify-end lg:gap-3">
            <span className="label text-muted-foreground">Scroll</span>
            <span className="relative block h-16 w-px bg-border">
              <span className="animate-scroll-dot absolute -left-[2px] top-0 h-[5px] w-[5px] bg-signal" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...company.marquee, ...company.marquee];
  return (
    <div className="overflow-hidden border-y bg-ink py-5 text-ink-foreground" aria-label={company.marquee.join(", ")}>
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
              <span className="label absolute bottom-5 left-5 text-muted-foreground">{list[active].name}</span>
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
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      ctx = gsap.context(() => {
        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": () => {
            ScrollTrigger.create({
              trigger: el,
              start: "top top",
              end: () => `+=${window.innerHeight * chapters.length * 0.8}`,
              pin: "[data-pin]",
              onUpdate: (s) => setStep(Math.min(chapters.length - 1, Math.floor(s.progress * chapters.length))),
            });
          },
        });
      }, el);
    });
    return () => ctx?.revert();
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
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      ctx = gsap.context(() => {
        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": () => {
            gsap.to(tr, {
              x: () => -(tr.scrollWidth - window.innerWidth),
              ease: "none",
              scrollTrigger: {
                trigger: el, start: "top top", end: () => `+=${tr.scrollWidth - window.innerWidth}`,
                pin: true, scrub: 0.6, invalidateOnRefresh: true,
                onUpdate: (s) => setIdx(Math.min(items.length - 1, Math.round(s.progress * (items.length - 1)))),
              },
            });
          },
        });
      }, el);
    });
    return () => ctx?.revert();
  }, [items.length]);

  return (
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
  const t = testimonials[i];
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
