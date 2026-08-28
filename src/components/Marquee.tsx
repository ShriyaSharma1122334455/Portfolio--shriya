import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MarqueeProps {
  /** One copy of the items. The component renders the second copy itself. */
  children: ReactNode;
  /** Drift speed in pixels per second. */
  speed?: number;
  /** Show prev/next arrows that nudge the rail by one step. */
  showControls?: boolean;
  /** How far one arrow press travels, in px. Roughly one card plus its gap. */
  step?: number;
  controlsLabel?: string;
}

/**
 * An edge-to-edge rail that drifts on its own, loops seamlessly, and pauses on
 * hover or keyboard focus.
 *
 * It is a real scroll container driven by rAF rather than a CSS animation, so
 * the reader can swipe or drag it directly and the arrows have something to
 * act on. The loop works because the item list is rendered twice: once
 * scrollLeft passes the halfway mark we subtract half the width, which lands on
 * the identical position in the first copy — invisible to the eye.
 *
 * Spacing must live on the items themselves (e.g. `mr-5` per card), never as a
 * flex `gap` here: a gap would also apply between the two copies, so half the
 * scroll width would no longer equal one copy and the seam would jump.
 */
export function Marquee({
  children,
  speed = 40,
  showControls = false,
  step = 340,
  controlsLabel = "items",
}: MarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  /** Non-null while an arrow press is gliding to a destination. */
  const targetRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || reducedMotion) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;

      const half = el.scrollWidth / 2;

      if (half > 0) {
        if (targetRef.current !== null) {
          // Arrow press: ease toward the destination, then hand back to drift.
          const remaining = targetRef.current - el.scrollLeft;
          if (Math.abs(remaining) < 1) {
            el.scrollLeft = targetRef.current;
            targetRef.current = null;
          } else {
            el.scrollLeft += remaining * Math.min(1, delta * 7);
          }
        } else if (!pausedRef.current) {
          el.scrollLeft += speed * delta;
        }

        // Wrap in both directions so the rail never hits an end.
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
          if (targetRef.current !== null) targetRef.current -= half;
        } else if (el.scrollLeft < 0) {
          el.scrollLeft += half;
          if (targetRef.current !== null) targetRef.current += half;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, speed]);

  const nudge = useCallback(
    (direction: 1 | -1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const from = targetRef.current ?? el.scrollLeft;
      targetRef.current = from + direction * step;
    },
    [step],
  );

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar relative w-full overflow-x-auto overscroll-x-contain"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        onFocusCapture={() => {
          pausedRef.current = true;
        }}
        onBlurCapture={() => {
          pausedRef.current = false;
        }}
        // A real gesture takes over from any arrow glide in flight.
        onPointerDown={() => {
          targetRef.current = null;
        }}
        onWheel={() => {
          targetRef.current = null;
        }}
      >
        <div className="flex w-max">
          <div className="flex shrink-0">{children}</div>
          <div className="flex shrink-0" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>

      {showControls && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label={`Previous ${controlsLabel}`}
            className="h-9 w-9 grid place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label={`Next ${controlsLabel}`}
            className="h-9 w-9 grid place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
