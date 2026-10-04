import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/site";
import { cn } from "@/lib/utils";

type SocialPreviewLinkProps = {
  label: string;
  href: string;
  theme?: "light" | "dark";
};

function accountHandle(href: string) {
  try {
    const path = new URL(href).pathname.replace(/^\/+|\/+$/g, "");
    return path.startsWith("@") ? path : `@${path.split("/").filter(Boolean).pop() ?? "motomanic"}`;
  } catch {
    return "@motomanic";
  }
}

export function SocialPreviewLink({ label, href, theme = "light" }: SocialPreviewLinkProps) {
  const isDark = theme === "dark";
  return (
    <span className="group/social relative inline-flex">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn("label link-line inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:text-signal", isDark ? "text-ink-muted hover:text-ink-foreground" : "text-muted-foreground hover:text-foreground")}
        aria-label={`Open Motomanic on ${label}`}
      >
        {label}<ArrowUpRight className="h-3 w-3" aria-hidden />
      </a>

      <span
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 w-64 -translate-x-1/2 translate-y-2 scale-95 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/social:translate-y-0 group-hover/social:scale-100 group-hover/social:opacity-100 group-focus-within/social:translate-y-0 group-focus-within/social:scale-100 group-focus-within/social:opacity-100",
          "max-md:fixed max-md:bottom-5 max-md:left-1/2 max-md:mb-0",
        )}
        role="presentation"
      >
        <span className={cn("block overflow-hidden rounded-lg border p-4 shadow-2xl", isDark ? "border-ink-border bg-ink text-ink-foreground" : "border-border bg-card text-card-foreground")}>
          <span className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-signal p-1.5">
              <img src={company.logo} alt="" width={40} height={40} className="h-full w-full object-contain" />
            </span>
            <span className="min-w-0 text-left">
              <span className="block font-display text-base font-semibold">Motomanic</span>
              <span className={cn("mt-0.5 block truncate font-mono text-[10px]", isDark ? "text-ink-muted" : "text-muted-foreground")}>{accountHandle(href)}</span>
            </span>
            <span className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-signal text-accent-foreground">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </span>
          <span className={cn("mt-4 flex items-center justify-between border-t pt-3", isDark ? "border-ink-border" : "border-border")}>
            <span className="label">{label}</span>
            <span className={cn("font-mono text-[10px]", isDark ? "text-ink-muted" : "text-muted-foreground")}>View account</span>
          </span>
        </span>
        <span className={cn("absolute left-1/2 top-full hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r md:block", isDark ? "border-ink-border bg-ink" : "border-border bg-card")} />
      </span>
    </span>
  );
}