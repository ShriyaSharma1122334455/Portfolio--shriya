import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Github, Linkedin, Mail, Share2, X } from "lucide-react";

interface SocialLink {
  label: string;
  href: string;
  icon: typeof Github;
  /** mailto links must not open a blank tab. */
  external: boolean;
}

const LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/ShriyaSharma1122334455",
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shriyasharmacs26/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:shriyasharma2152@gmail.com",
    icon: Mail,
    external: false,
  },
];

/**
 * A floating dock in the bottom-right corner. Collapsed it is a single button;
 * opening it fans the profiles upward.
 *
 * Sits at z-40 — above section content, below the contact modal at z-50, so it
 * never floats over a dialog.
 */
export function SocialDock() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Escape closes, and so does a click anywhere outside the dock.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="flex flex-col items-end gap-3"
            initial="hidden"
            animate="shown"
            exit="hidden"
            variants={{
              shown: {
                transition: reducedMotion
                  ? {}
                  : { staggerChildren: 0.06, staggerDirection: -1 },
              },
              hidden: {
                transition: reducedMotion
                  ? {}
                  : { staggerChildren: 0.04 },
              },
            }}
          >
            {LINKS.map(({ label, href, icon: Icon, external }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 12, scale: 0.85 },
                  shown: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex items-center gap-2.5"
              >
                {/* Name rides alongside so the icons never have to be guessed */}
                <span className="rounded-full border border-white/[0.08] bg-[#0b0d13]/90 px-2.5 py-1 text-[11px] text-zinc-300 backdrop-blur-md">
                  {label}
                </span>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.1] bg-[#0b0d13]/90 text-zinc-300 backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close social links" : "Open social links"}
        className="grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-[#0b0d13]/90 text-accent shadow-[0_0_24px_-6px_rgba(96,130,182,0.55)] backdrop-blur-md transition-colors hover:border-accent/70 hover:bg-accent/10 cursor-pointer"
      >
        <motion.span
          animate={reducedMotion ? undefined : { rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid place-items-center"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
        </motion.span>
      </button>
    </div>
  );
}
