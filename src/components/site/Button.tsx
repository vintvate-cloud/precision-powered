import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-between gap-6 rounded-full border px-5 py-3.5 font-mono text-[11px] uppercase transition-all duration-300";
const variants = {
  solid: "border-foreground bg-foreground text-background hover:border-signal hover:bg-signal hover:text-accent-foreground",
  outline: "border-foreground/20 bg-background/80 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  ink: "border-ink-foreground/30 text-ink-foreground hover:bg-ink-foreground hover:text-ink",
  signal: "border-signal bg-signal text-accent-foreground hover:bg-ink-foreground hover:text-ink hover:border-ink-foreground",
};
export type Variant = keyof typeof variants;

function Arrow() {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
      <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ButtonLink({ variant = "solid", className, children, ...props }: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link {...props} className={cn(base, variants[variant], className)}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

export function ButtonA({ variant = "solid", className, children, ...props }: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a {...props} className={cn(base, variants[variant], className)}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

export function Button({ variant = "solid", className, children, ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button {...props} className={cn(base, variants[variant], "disabled:opacity-50", className)}>
      <span>{children}</span>
      <Arrow />
    </button>
  );
}
