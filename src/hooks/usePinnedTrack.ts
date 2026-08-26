import { useEffect, useState, type RefObject } from "react";

/**
 * Drives a horizontally-scrolling section that is pinned while it is being read.
 *
 * The section is made tall enough to absorb the track's horizontal overflow, and
 * an inner `sticky` child stays put while that height scrolls past. Vertical
 * scroll therefore reads as horizontal travel — and the moment the track runs
 * out, the section un-pins on its own and the page continues to the next one.
 * No wheel hijacking, so trackpads, touch and keyboard all behave normally.
 *
 * @param sectionRef   the tall outer section
 * @param trackRef     the horizontal strip living inside the sticky child
 * @param enabled      false falls back to a natively scrollable track
 * @param scrollFactor vertical scroll needed per pixel of horizontal travel.
 *                     1 is 1:1. Below 1 shortens the pinned stretch and moves
 *                     the track faster, so a long rail does not hold the reader
 *                     captive for screens on end.
 */
export function usePinnedTrack(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  enabled = true,
  scrollFactor = 1,
) {
  /** Horizontal pixels the track must travel to reveal its far edge. */
  const [distance, setDistance] = useState(0);
  /** 0 → 1 across the pinned stretch. */
  const [progress, setProgress] = useState(0);

  // Measure how far the track overflows its viewport.
  useEffect(() => {
    if (!enabled) {
      setDistance(0);
      return;
    }

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled, trackRef]);

  // Track progress from live geometry each frame, so sections above this one
  // changing height as they load can't leave the mapping skewed.
  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;

      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      // rect.top is 0 as the pin begins and -scrollable as it ends.
      const travelled = -el.getBoundingClientRect().top / scrollable;
      setProgress(Math.min(1, Math.max(0, travelled)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, sectionRef]);

  return {
    distance,
    progress,
    /** Current horizontal offset in px (negative = travelled). */
    offset: -progress * distance,
    /** Height the section needs so the pin lasts exactly as long as the track. */
    sectionHeight: enabled
      ? `calc(100vh + ${Math.round(distance * scrollFactor)}px)`
      : "auto",
  };
}
