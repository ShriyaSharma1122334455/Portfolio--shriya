import { motion, useReducedMotion, type Variants } from "motion/react";
import { Award } from "lucide-react";

const CREDENTIALS = [
  "AWS Certified Cloud Practitioner",
  "Google Project Management Certificate",
  "NJIT Entrepreneurial Experience Badge",
  "NSF I-Corps — North Eastern Region",
];

export function About() {
  const reducedMotion = useReducedMotion();

  // With reduced motion every element renders in its resting state; the
  // variants below collapse to plain opacity-1 with no transform.
  const intro: Variants = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, x: 48 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const badgeList: Variants = {
    hidden: {},
    show: {
      transition: reducedMotion
        ? {}
        : { delayChildren: 0.5, staggerChildren: 0.13 },
    },
  };

  const badge: Variants = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="relative py-24 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Ambient wash, kept faint behind the copy */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[620px] h-[440px] rounded-full blur-[160px] opacity-[0.12] bg-teal-400 pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="space-y-2 mb-12">
          <span className="text-xs font-medium tracking-widest text-teal-400 uppercase">
            01 &bull; About
          </span>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white"
            style={{
              fontFamily:
                "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            Engineered with intent.
          </h2>
        </div>

        {/* Intro copy */}
        <motion.div
          variants={intro}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="will-change-transform"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            About Me
          </span>
          <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-zinc-300">
            I'm <strong className="text-white font-semibold">Shriya</strong>, a
            full-stack engineer building systems that hold up in production —
            not just in a demo. I design the architecture and build it myself:
            backend services, data layers, and interfaces that stay fast as they
            scale. I've led Agile teams from concept to deployment with zero
            missed deliverables, and spent two years keeping a 200+ user
            production environment running under real SLAs. I care about how a
            system performs under load as much as how it looks on day one.
          </p>
        </motion.div>

        {/* Credential badges, completing one at a time */}
        <motion.ul
          variants={badgeList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {CREDENTIALS.map((credential) => (
            <motion.li
              key={credential}
              variants={badge}
              className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 will-change-transform"
            >
              <Award className="h-4 w-4 shrink-0 text-teal-400" />
              <span className="text-[13px] leading-snug text-zinc-200">
                {credential}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
