import { useState, type FormEvent } from "react";
import { z } from "zod";
import { contact } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

// Mirrors the original contact form fields: Name (first/last), Email,
// Contact Number, Requirement. Submission opens the visitor's email app
// addressed to Motomanic's published email.
const schema = z.object({
  first: z.string().trim().min(1, "Enter your first name").max(60),
  last: z.string().trim().max(60).optional(),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,16}$/, "Enter a valid contact number"),
  requirement: z.string().trim().min(5, "Tell us what you need").max(1500),
});
type Values = z.infer<typeof schema>;

export function InquiryForm({ product, tone = "light" }: { product?: string; tone?: "light" | "ink" }) {
  const [values, setValues] = useState<Values>({ first: "", last: "", email: "", phone: "", requirement: product ? `Interested in: ${product}\n\n` : "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      const fe: typeof errors = {};
      r.error.issues.forEach((i) => (fe[i.path[0] as keyof Values] = i.message));
      setErrors(fe);
      return;
    }
    const d = r.data;
    const subject = product ? `Enquiry: ${product}` : "Enquiry from website";
    const body = `Name: ${d.first} ${d.last ?? ""}\nEmail: ${d.email}\nContact Number: ${d.phone}\n\nRequirement:\n${d.requirement}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  const ink = tone === "ink";
  const field = cn(
    "peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-6 text-lg outline-none transition-colors placeholder:text-transparent focus:border-signal",
    ink ? "border-ink-border text-ink-foreground" : "border-input",
  );
  const lab = cn("label pointer-events-none absolute left-0 top-0", ink ? "text-ink-muted" : "text-muted-foreground");

  const F = ({ k, label, type = "text", area = false, span = false }: { k: keyof Values; label: string; type?: string; area?: boolean; span?: boolean }) => (
    <div className={cn("relative", span && "md:col-span-2")}>
      <label htmlFor={`f-${k}`} className={lab}>{label}</label>
      {area ? (
        <textarea id={`f-${k}`} rows={4} value={values[k] ?? ""} onChange={set(k)} className={cn(field, "resize-none")} aria-invalid={!!errors[k]} />
      ) : (
        <input id={`f-${k}`} type={type} value={values[k] ?? ""} onChange={set(k)} className={field} aria-invalid={!!errors[k]} />
      )}
      {errors[k] && <p className="mt-2 font-mono text-xs text-destructive" role="alert">{errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-8 md:grid-cols-2">
      {F({ k: "first", label: "First name *" })}
      {F({ k: "last", label: "Last name" })}
      {F({ k: "email", label: "Email *", type: "email" })}
      {F({ k: "phone", label: "Contact number *", type: "tel" })}
      {F({ k: "requirement", label: "Requirement *", area: true, span: true })}
      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className={cn("max-w-sm text-xs", ink ? "text-ink-muted" : "text-muted-foreground")}>
          {status === "sent"
            ? "Your email app should open with your enquiry ready to send. If it didn't, write to us at " + contact.email + "."
            : "Sending opens your email app with your details filled in."}
        </p>
        <Button type="submit" variant={ink ? "signal" : "solid"} className="md:min-w-64">Send enquiry</Button>
      </div>
    </form>
  );
}
