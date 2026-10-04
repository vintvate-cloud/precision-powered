import { createFileRoute } from "@tanstack/react-router";
import { contact } from "@/data/site";
import { InquiryForm } from "@/components/site/InquiryForm";
import { DrawLine, MaskLines, Reveal } from "@/components/site/motion";
import { SocialPreviewLink } from "@/components/site/SocialPreviewLink";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — Motomanic" },
      { name: "description", content: "Contact Motomanic, Bhopal. Ordering +91-9229110501, Sales & Marketing +91-6376224631, motomanic.evs@gmail.com." },
      { property: "og:title", content: "Contact Us — Motomanic" },
      { property: "og:description", content: "Get in touch with Motomanic for orders, custom quotes and product enquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="pt-24 md:pt-32">
      <section className="shell">
        <p className="label text-muted-foreground">Contact information</p>
        <MaskLines className="display-xl mt-6" lines={["Get in", "touch"]} />
      </section>

      <section className="shell mt-12 grid-12 gap-y-12 pb-24 md:mt-20 md:gap-y-16 md:pb-28">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <dl>
            {contact.phones.map((p, i) => (
              <Reveal key={p.tel} delay={i * 0.08} className="border-t py-6 md:py-8">
                <dt className="label text-muted-foreground">{p.label}</dt>
                <dd className="mt-3"><a href={`tel:${p.tel}`} className="font-display text-[clamp(1.9rem,9vw,2.25rem)] font-semibold leading-none transition-colors hover:text-signal md:text-5xl">{p.display}</a></dd>
              </Reveal>
            ))}
            <Reveal className="border-t py-8">
              <dt className="label text-muted-foreground">Email</dt>
              <dd className="mt-3 break-all"><a href={`mailto:${contact.email}`} className="link-line text-lg md:text-2xl">{contact.email}</a></dd>
            </Reveal>
            <Reveal className="grid gap-8 border-t py-8 sm:grid-cols-2">
              <div>
                <dt className="label text-muted-foreground">Registered office</dt>
                <dd className="mt-3 leading-relaxed">{contact.registeredOffice}</dd>
              </div>
              <div>
                <dt className="label text-muted-foreground">Plant address</dt>
                <dd className="mt-3 leading-relaxed">{contact.plant}</dd>
              </div>
            </Reveal>
          </dl>
          <DrawLine className="text-foreground/20" />
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            {contact.social.map((s) => <SocialPreviewLink key={s.label} {...s} />)}
          </div>
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <div className="rounded-[18px] border bg-card p-5 shadow-sm md:p-10">
            <p className="label text-signal">Get in touch</p>
            <h2 className="display-m mt-4 mb-10">Fill the form to get in touch.</h2>
            <InquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
