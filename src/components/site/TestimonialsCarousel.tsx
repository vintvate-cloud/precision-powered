import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

const AUTOPLAY_DELAY = 5200;

function getPosition(index: number, active: number) {
  const total = testimonials.length;
  const distance = (index - active + total) % total;
  if (distance === 0) return "active";
  return distance === 1 ? "next" : "previous";
}

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const goTo = (index: number) => setActive((index + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % testimonials.length), AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="overflow-hidden border-t bg-ink text-ink-foreground">
      <div className="shell py-16 md:py-28">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-signal">(06) Customer voices</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.75rem,13vw,3.5rem)] font-semibold leading-[0.92] md:text-7xl lg:text-8xl">
              What our customers say.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="label mr-3 text-ink-muted" aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <Button variant="outline" size="icon" onClick={() => goTo(active - 1)} aria-label="Previous testimonial" className="h-11 w-11 rounded-full border-ink-border bg-transparent text-ink-foreground shadow-none hover:border-signal hover:bg-signal hover:text-accent-foreground">
              <ArrowLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={() => goTo(active + 1)} aria-label="Next testimonial" className="h-11 w-11 rounded-full border-ink-border bg-transparent text-ink-foreground shadow-none hover:border-signal hover:bg-signal hover:text-accent-foreground">
              <ArrowRight />
            </Button>
          </div>
        </div>

        <div
          className="relative mt-10 h-[29rem] touch-pan-y [perspective:1400px] md:mt-20 md:h-[34rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            const end = event.changedTouches[0]?.clientX;
            touchStart.current = null;
            if (start === null || end === undefined || Math.abs(start - end) < 45) return;
            goTo(active + (start > end ? 1 : -1));
          }}
        >
          {testimonials.map((testimonial, index) => {
            const position = getPosition(index, active);
            const isActive = position === "active";
            return (
              <article
                key={testimonial.name}
                aria-hidden={!isActive}
                className={cn(
                  "absolute left-1/2 top-0 flex h-[27rem] w-[82vw] max-w-[46rem] -translate-x-1/2 flex-col justify-between overflow-hidden rounded-[20px] border p-6 transition-[transform,opacity,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[32rem] md:rounded-[24px] md:p-12",
                  position === "active" && "z-30 translate-x-[-50%] rotate-y-0 scale-100 border-border bg-card text-card-foreground opacity-100 shadow-2xl",
                  position === "previous" && "z-10 translate-x-[-115%] rotate-y-[38deg] scale-[0.82] border-ink-border bg-ink text-ink-foreground opacity-55 brightness-75 md:translate-x-[-112%]",
                  position === "next" && "z-20 translate-x-[15%] rotate-y-[-38deg] scale-[0.82] border-ink-border bg-ink text-ink-foreground opacity-55 brightness-75 md:translate-x-[12%]",
                )}
                onClick={() => !isActive && goTo(index)}
              >
                <div className="flex items-start justify-between">
                  <Quote className={cn("h-10 w-10", isActive ? "text-signal" : "text-ink-muted")} strokeWidth={1.25} aria-hidden />
                  <span className={cn("label", isActive ? "text-muted-foreground" : "text-ink-muted")}>Verified customer</span>
                </div>
                <blockquote className="font-display text-[clamp(1.15rem,2vw,1.75rem)] font-medium leading-[1.18]">
                  “{testimonial.quote}”
                </blockquote>
                <footer className={cn("border-t pt-5", isActive ? "border-border" : "border-ink-border")}>
                  <p className="font-display text-lg font-semibold">{testimonial.name}</p>
                  <p className={cn("mt-1 text-xs leading-relaxed md:text-sm", isActive ? "text-muted-foreground" : "text-ink-muted")}>{testimonial.role}</p>
                </footer>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-2 flex max-w-[46rem] items-center gap-3" role="tablist" aria-label="Select testimonial">
          {testimonials.map((testimonial, index) => (
            <Button key={testimonial.name} variant="ghost" size="sm" onClick={() => goTo(index)} aria-label={`Show testimonial from ${testimonial.name}`} aria-selected={active === index} role="tab" className="group h-8 flex-1 rounded-none px-0 hover:bg-transparent">
              <span className="relative h-px w-full overflow-hidden bg-ink-border">
                {active === index && <span key={`${active}-${paused}`} className={cn("absolute inset-y-0 left-0 bg-signal", paused ? "w-full" : "testimonial-progress")} />}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}