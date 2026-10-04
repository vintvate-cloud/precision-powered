import { Link } from "@tanstack/react-router";
import { categories, company, contact } from "@/data/site";
import { ButtonLink } from "./Button";
import { SocialPreviewLink } from "./SocialPreviewLink";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="shell relative pt-16 md:pt-32">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <p className="label text-signal">Need help finding the right product?</p>
            <a href={`tel:${contact.phones[1].tel}`} className="mt-5 block font-display text-[clamp(2rem,10vw,3rem)] font-semibold leading-[0.9] transition-colors hover:text-signal md:mt-6 md:text-[8vw] lg:text-[7.5vw]">
              {contact.phones[1].display}
            </a>
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-10">
            <ButtonLink to="/contact-us" variant="signal" className="w-full">Get a custom quote</ButtonLink>
          </div>
        </div>

        <div className="mt-16 grid-12 gap-y-12 border-t border-ink-border pt-10 md:mt-24 md:pt-12">
          <div className="col-span-4 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-signal p-2">
                <img src={company.logo} alt="Motomanic" width={56} height={56} className="h-full w-full object-contain" />
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-muted">
              Motomanic is a leading supplier of high-performance PMSM motors, controllers, and EV conversion kits, helping businesses and individuals transition to smarter, cleaner electric vehicles.
            </p>
          </div>
          <div className="col-span-2 lg:col-span-2">
            <p className="label text-ink-muted">Quick links</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/" className="link-line">Home</Link></li>
              <li><Link to="/shop" className="link-line">All Products</Link></li>
              <li><Link to="/all-categories" className="link-line">Categories</Link></li>
              <li><Link to="/contact-us" className="link-line">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-3">
            <p className="label text-ink-muted">Categories</p>
            <ul className="mt-5 space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.slug}><Link to="/product-category/$slug" params={{ slug: c.slug }} className="link-line">{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 lg:col-span-3">
            <p className="label text-ink-muted">Contact</p>
            <ul className="mt-5 space-y-4 text-sm">
              {contact.phones.map((p) => (
                <li key={p.tel}><span className="label block text-ink-muted">{p.label}</span><a href={`tel:${p.tel}`} className="link-line font-mono">{p.display}</a></li>
              ))}
              <li><a href={`mailto:${contact.email}`} className="link-line font-mono">{contact.email}</a></li>
              <li><span className="label block text-ink-muted">Registered office</span>{contact.registeredOffice}</li>
              <li><span className="label block text-ink-muted">Plant address</span>{contact.plant}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink-border py-8 md:flex-row md:items-center md:justify-between">
          <p className="label text-ink-muted">© 2026 Motomanic — All rights reserved.</p>
          <div className="flex gap-6">
            {contact.social.map((s) => (
              <SocialPreviewLink key={s.label} {...s} theme="dark" />
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[21vw] font-bold leading-[0.75] tracking-[-0.06em] text-ink-foreground/[0.06]">MOTOMANIC</div>
    </footer>
  );
}
