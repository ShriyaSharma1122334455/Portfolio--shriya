import type { ReactNode } from "react";

interface MarqueeProps {
  /** One copy of the items. The component renders the second copy itself. */
  children: ReactNode;
  /** Seconds for one full pass. Longer = slower. */
  duration?: number;
  reverse?: boolean;
}

/**
 * An edge-to-edge auto-scrolling rail that loops seamlessly and pauses on
 * hover or keyboard focus.
 *
 * The seam trick: the track holds the item list twice and the CSS animation
 * translates it by exactly -50%. At the end of a pass the second copy sits
 * precisely where the first started, so the restart is invisible.
 *
 * Spacing must live on the items themselves (e.g. `mr-5` per card), never as
 * a flex `gap` here: a gap would also apply between the two copies, making the
 * track wider than 2x one copy and pushing -50% off the seam.
 */
export function Marquee({
  children,
  duration = 60,
  reverse = false,
}: MarqueeProps) {
  return (
    <div className="marquee relative w-full overflow-hidden">
      <div
        className={`marquee-track flex w-max ${reverse ? "is-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
