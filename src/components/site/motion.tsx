import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Lazily loads GSAP + ScrollTrigger on the client only. */
export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth scrolling (Lenis) synced with ScrollTrigger. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    let destroy = () => {};
    (async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import("lenis"), loadGsap()]);
      const lenis = new Lenis({ duration: 1.1 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      destroy = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();
    return () => destroy();
  }, []);
  return null;
}

type RevealProps = { children: ReactNode; className?: string | undefined; as?: "div" | "section"; kind?: "up" | "mask" | "image"; delay?: number };

/** Scroll-triggered reveal. Content is visible without JS. */
export function Reveal({ children, className, kind = "up", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    let ctx: { revert: () => void } | undefined;
    loadGsap().then(({ gsap }) => {
      ctx = gsap.context(() => {
        const st = { trigger: el, start: "top 88%", once: true };
        if (kind === "image") {
          gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.inOut", delay, scrollTrigger: st });
          const img = el.querySelector("img");
          if (img) gsap.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.4, ease: "expo.out", delay, scrollTrigger: st });
        } else if (kind === "mask") {
          gsap.fromTo(el.querySelectorAll("[data-line]"), { yPercent: 105 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.08, delay, scrollTrigger: st });
        } else {
          gsap.fromTo(el, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay, scrollTrigger: st });
        }
      }, el);
    });
    return () => ctx?.revert();
  }, [kind, delay]);
  return (
    <div ref={ref} className={cn(kind === "image" && "overflow-hidden", className)}>
      {children}
    </div>
  );
}

/** Splits text lines for mask reveals. Pass an array of lines. */
export function MaskLines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <Reveal kind="mask" className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span data-line className="block">{l}</span>
        </span>
      ))}
    </Reveal>
  );
}

/** Animated SVG line drawn on scroll. */
export function DrawLine({ className, d = "M0 1 H1000" }: { className?: string; d?: string }) {
  const ref = useRef<SVGPathElement>(null);
  useEffect(() => {
    const p = ref.current;
    if (!p || prefersReduced()) return;
    let ctx: { revert: () => void } | undefined;
    loadGsap().then(({ gsap }) => {
      const len = p.getTotalLength();
      ctx = gsap.context(() => {
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: p, start: "top 92%", once: true } });
      });
    });
    return () => ctx?.revert();
  }, []);
  return (
    <svg className={cn("h-px w-full overflow-visible", className)} viewBox="0 0 1000 2" preserveAspectRatio="none" aria-hidden>
      <path ref={ref} d={d} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" />
    </svg>
  );
}
