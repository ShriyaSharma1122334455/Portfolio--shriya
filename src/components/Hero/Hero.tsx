import { useState, useEffect, useRef } from "react";
import {
  useScroll,
  useMotionValue,
  useSpring,
  motion,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { HeroBackground } from "./HeroBackground";
import { ArrowDown, Sparkles } from "lucide-react";
import portraitImg from "../../assets/images/shriya_portrait_1787528786641.jpg";

interface HeroProps {
  onContactClick: () => void;
}

const ROLES = [
  "SOFTWARE DEVELOPER",
  "CLOUD ENGINEER",
  "FRONTEND DEVELOPER",
  "TECHNICAL SUPPORT ENGINEER",
  "FULL-STACK ARCHITECT",
];

export function Hero({ onContactClick }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Role rotator interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120, mass: 0.6 };
  const mouseXOffset = useSpring(rawMouseX, springConfig);
  const mouseYOffset = useSpring(rawMouseY, springConfig);

  // Scroll animations:
  // As user scrolls, the hero section becomes prominent and ENLARGES (scales 1 -> 1.28)
  const heroScale = useTransform(scrollYProgress, [0, 0.9], [1, 1.28]);
  const heroY = useTransform(scrollYProgress, [0, 0.9], [0, 80]);
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 0.95, 0.1],
  );

  // Subtle Parallax on elements with mouse
  const portraitParallaxX = useTransform(mouseXOffset, [-1, 1], [-14, 14]);
  const portraitParallaxY = useTransform(mouseYOffset, [-1, 1], [-12, 12]);

  const textParallaxX = useTransform(mouseXOffset, [-1, 1], [8, -8]);
  const textParallaxY = useTransform(mouseYOffset, [-1, 1], [6, -6]);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      rawMouseX.set((e.clientX / innerWidth) * 2 - 1);
      rawMouseY.set((e.clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[110vh] w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 md:px-12 pt-24 pb-20 select-none"
    >
      {/* Background with Atmospheric Fog & Cyan Lights (shrinks and fades away on scroll) */}
      <HeroBackground
        scrollYProgress={scrollYProgress}
        mouseXOffset={mouseXOffset}
        mouseYOffset={mouseYOffset}
      />

      {/* Center Cinematic Composition: Hero section enlarges and zooms in as you scroll */}
      <motion.div
        style={{
          scale: heroScale,
          y: heroY,
          opacity: heroOpacity,
          transformOrigin: "center 40%",
        }}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center my-auto will-change-transform"
      >
        {/* Profile Silhouette / Portrait Element with atmospheric blending */}
        <motion.div
          style={{ x: portraitParallaxX, y: portraitParallaxY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-64 sm:w-72 md:w-84 h-72 sm:h-80 md:h-96 mx-auto mb-[-80px] sm:mb-[-100px] md:mb-[-120px] pointer-events-none"
        >
          {/* Subtle teal rim light behind head */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-52 h-52 bg-teal-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* Masked Portrait Image with gentle fade at edges and bottom */}
          <div
            className="w-full h-full relative"
            style={{
              maskImage:
                "radial-gradient(ellipse 85% 75% at 50% 40%, black 45%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 75% at 50% 40%, black 45%, transparent 95%)",
            }}
          >
            <img
              src={portraitImg}
              alt="Shriya Sharma"
              className="w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.08]"
              loading="eager"
            />
          </div>

          {/* Soft atmospheric mist overlay on bottom of portrait */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030407] via-[#030407]/70 to-transparent pointer-events-none" />
        </motion.div>

        {/* Cinematic Headline (Matching Yaroslav: "I'm Shriya" + "WEB DEVELOPER") */}
        <motion.div
          style={{ x: textParallaxX, y: textParallaxY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 space-y-1 sm:space-y-2 mt-4"
        >
          {/* Line 1: I'm Shriya (Serif + Elegant Italic) */}
          <h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight"
            style={{
              fontFamily:
                "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            I'm{" "}
            <span className="italic font-normal tracking-wide text-zinc-100">
              Shriya
            </span>
          </h1>

          {/* Line 2: Role with Smooth Vertical Crossfade */}
          <div className="h-10 sm:h-12 md:h-14 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={ROLES[roleIndex]}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase tracking-[0.06em] text-zinc-200"
                style={{
                  fontFamily:
                    "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                {ROLES[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Button & Badge with Neon Blue Shadow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mt-8 sm:mt-10 flex flex-col items-center gap-5"
        >
          {/* Neon Blue Glowing Pill Button matching reference screenshot */}
          <div className="relative inline-flex items-center justify-center">
            <button
              onClick={onContactClick}
              data-cursor-text="TALK"
              className="neon-blue-btn relative rounded-full px-9 py-2.5 text-xs sm:text-sm font-medium tracking-wide text-white cursor-pointer select-none"
            >
              <span className="relative z-10 font-normal">Contact</span>

              {/* Glowing accent indicator dot at the bottom center (matching screenshot) */}
              <span
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-[#c9ab86] shadow-[0_0_8px_rgba(201,171,134,0.8)] border border-[#dfc3a2] pointer-events-none"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Sub-badge: "✦ AWS Certified Solutions Architect • Software Engineer" */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md text-[11px] sm:text-xs text-zinc-400 font-normal">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span className="text-zinc-300">
              AWS Certified &bull; Software Engineer
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle Bottom Scroll Cue */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-auto">
        <button
          onClick={scrollToAbout}
          className="group flex flex-col items-center gap-1 text-[11px] font-normal tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors uppercase cursor-pointer"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
        </button>
      </div>
    </section>
  );
}
