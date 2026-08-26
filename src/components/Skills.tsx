import { useState, useEffect, useRef, useCallback } from "react";
import {
  Terminal,
  Layout,
  Server,
  Database,
  Bot,
  Cloud,
  Network,
  ShieldCheck,
  LifeBuoy,
  BarChart3,
  Users,
  Palette,
  Wrench,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePinnedTrack } from "../hooks/usePinnedTrack";

export interface SkillCategory {
  id: string;
  number: string;
  name: string;
  icon: typeof Terminal;
  accentColor: string;
  tagline: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    number: "01",
    name: "Languages",
    icon: Terminal,
    accentColor: "#38bdf8", // Sky
    tagline: "Core languages & structured syntax",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
  },
  {
    id: "frontend",
    number: "02",
    name: "Frontend",
    icon: Layout,
    accentColor: "#818cf8", // Indigo
    tagline: "Component systems, reactive state & fluid UX",
    skills: [
      "React (incl. React 19)",
      "React Native",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "Recharts",
      "HTML5",
    ],
  },
  {
    id: "backend",
    number: "03",
    name: "Backend",
    icon: Server,
    accentColor: "#2dd4bf", // Teal
    tagline: "Resilient APIs, services & caching tiers",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "Redis",
      "JWT Authentication",
    ],
  },
  {
    id: "databases",
    number: "04",
    name: "Databases",
    icon: Database,
    accentColor: "#fbbf24", // Amber
    tagline: "Relational schemas, NoSQL & data integrity",
    skills: [
      "PostgreSQL / Supabase",
      "MongoDB",
      "MySQL",
      "DynamoDB",
      "CockroachDB",
    ],
  },
  {
    id: "ai-llm",
    number: "05",
    name: "AI / LLM",
    icon: Bot,
    accentColor: "#f472b6", // Pink
    tagline: "Multi-agent orchestration, RAG & LLM integration",
    skills: [
      "Multi-Agent Systems (LangGraph)",
      "RAG",
      "Google ADK",
      "AWS Bedrock",
      "Gemini",
      "Vector Search",
    ],
  },
  {
    id: "cloud-devops",
    number: "06",
    name: "Cloud & DevOps",
    icon: Cloud,
    accentColor: "#22d3ee", // Cyan
    tagline: "Cloud infrastructure, CI/CD & containers",
    skills: [
      "AWS (EC2, S3, Lambda, IAM, DynamoDB) — Certified Cloud Practitioner",
      "Docker",
      "GitHub Actions",
      "GitLab CI/CD",
      "Terraform",
      "Vercel",
    ],
  },
  {
    id: "networking",
    number: "07",
    name: "Networking",
    icon: Network,
    accentColor: "#4ade80", // Green
    tagline: "Troubleshooting & production environment support",
    skills: [
      "Network & System Troubleshooting",
      "Production Environment Support",
      "System Health Monitoring",
      "High-Availability Environments",
    ],
  },
  {
    id: "itsm-application-management",
    number: "08",
    name: "ITSM & Application Management",
    icon: ShieldCheck,
    accentColor: "#c084fc", // Purple
    tagline: "Service management, identity & access governance",
    skills: [
      "ServiceNow",
      "Active Directory (IAM, Group & Permission Management)",
      "ITIL Practices",
      "SLA Management",
      "Ticketing Systems",
      "Access Management",
    ],
  },
  {
    id: "technical-support",
    number: "09",
    name: "Technical Support",
    icon: LifeBuoy,
    accentColor: "#a78bfa", // Violet
    tagline: "Incident triage, root-cause analysis & runbooks",
    skills: [
      "Tier 1 & 2 Support",
      "System Health Monitoring",
      "Root-Cause Analysis",
      "SOP & Runbook Authoring",
    ],
  },
  {
    id: "reporting-analytics",
    number: "10",
    name: "Reporting & Analytics",
    icon: BarChart3,
    accentColor: "#34d399", // Emerald
    tagline: "BI dashboards, KPI metrics & operational visibility",
    skills: ["Tableau", "Power BI", "Excel", "Dashboard Development", "JIRA"],
  },
  {
    id: "project-team-management",
    number: "11",
    name: "Project & Team Management",
    icon: Users,
    accentColor: "#fb923c", // Orange
    tagline: "Agile delivery, SDLC & cross-functional leadership",
    skills: [
      "Agile & Scrum",
      "SDLC",
      "Sprint Planning",
      "Cross-Functional Collaboration",
      "Stakeholder Communication",
      "Team Leadership & Delegation",
      "Conflict Management",
      "Onboarding/Offboarding",
      "Mentorship",
      "Process Improvement",
      "Test-Driven Development",
    ],
  },
  {
    id: "design-ux",
    number: "12",
    name: "Design & UX",
    icon: Palette,
    accentColor: "#f0abfc", // Fuchsia
    tagline: "Heuristics, accessibility & component systems",
    skills: [
      "UI/UX Heuristics (Nielsen, Gestalt, Norman)",
      "Accessibility-Aware Design",
      "Component-System Design",
      "State Management",
      "Figma",
    ],
  },
  {
    id: "tools-platforms",
    number: "13",
    name: "Tools & Platforms",
    icon: Wrench,
    accentColor: "#94a3b8", // Slate
    tagline: "Automation & everyday delivery tooling",
    skills: ["Power Automate", "Microsoft 365", "Google Workspace", "GitHub"],
  },
];

/** Card size per breakpoint, and how far a card may sit from the stage centre
 *  before it is fully dimmed. */
interface RailGeometry {
  cardWidth: number;
  cardHeight: number;
  falloff: number;
}

// falloff is ~1.4x the card pitch (width + gap): the centred card is sharp, its
// neighbour sits about half-dim, and anything beyond fades out. Much wider and
// every card is half-blurred at once, which reads as slow to focus.
const RAIL_DESKTOP: RailGeometry = {
  cardWidth: 320,
  cardHeight: 380,
  falloff: 490,
};
const RAIL_TABLET: RailGeometry = {
  cardWidth: 280,
  cardHeight: 360,
  falloff: 430,
};
const RAIL_MOBILE: RailGeometry = {
  cardWidth: 240,
  cardHeight: 340,
  falloff: 360,
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const [rail, setRail] = useState<RailGeometry>(RAIL_DESKTOP);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focus, setFocus] = useState<number[]>(() =>
    SKILL_CATEGORIES.map((_, index) => (index === 0 ? 1 : 0)),
  );

  const total = SKILL_CATEGORIES.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const pick = () => {
      const w = window.innerWidth;
      setRail(w < 640 ? RAIL_MOBILE : w < 1024 ? RAIL_TABLET : RAIL_DESKTOP);
    };
    pick();
    window.addEventListener("resize", pick);
    return () => window.removeEventListener("resize", pick);
  }, []);

  // 13 cards at 1:1 meant ~4,500px of scrolling before the page moved on.
  // 0.5 halves that and doubles how fast the rail travels per scroll.
  const { distance, progress, offset, sectionHeight } = usePinnedTrack(
    sectionRef,
    trackRef,
    !reducedMotion,
    0.5,
  );

  /** Lets the first and last card reach the middle of the stage. */
  const endPadding = `calc(50vw - ${rail.cardWidth / 2}px)`;

  // Emphasis follows distance from the centre of the stage, so the card being
  // read is the sharp one and its neighbours fall away gently.
  useEffect(() => {
    const centre = window.innerWidth / 2;
    let nearest = 0;
    let best = Infinity;

    const next = cardRefs.current.map((card, index) => {
      if (!card) return 0;
      const rect = card.getBoundingClientRect();
      const delta = Math.abs(rect.left + rect.width / 2 - centre);
      if (delta < best) {
        best = delta;
        nearest = index;
      }
      return Math.max(0, 1 - delta / rail.falloff);
    });

    setFocus(next);
    setActiveIndex(nearest);
  }, [offset, rail]);

  const activeCategory = SKILL_CATEGORIES[activeIndex];

  /** Scroll the page so `index` comes to rest in the middle of the stage. */
  const goToIndex = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      const card = cardRefs.current[index];
      if (!section || !card || distance <= 0) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const cardCentre =
        card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2;
      const target = Math.min(1, Math.max(0, cardCentre / distance));

      window.scrollTo({
        top: sectionTop + target * distance,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [distance, reducedMotion],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToIndex(Math.min(total - 1, activeIndex + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToIndex(Math.max(0, activeIndex - 1));
      }
    },
    [activeIndex, goToIndex, total],
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[#030407] text-[#e4e4e7]"
      style={{ height: sectionHeight }}
    >
      {/* Pinned stage — releases itself once the rail is exhausted. */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Ambient wash tinted by the focused category */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[560px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: activeCategory.accentColor }}
        />

        {/* Header */}
        <div className="relative z-20 px-4 sm:px-8 md:px-12 lg:px-20 pt-10 sm:pt-14 shrink-0">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-teal-400 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>04 &bull; Technical Repertoire</span>
              </div>
              <h2
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight"
                style={{
                  fontFamily:
                    "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                Technical Stack
              </h2>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400 shrink-0">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <span>
                {total} Domains &bull; Scroll to explore &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal rail */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Technical skill categories"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className={`relative z-10 my-auto min-h-0 outline-none focus-visible:ring-1 focus-visible:ring-teal-400/40 ${
            reducedMotion ? "overflow-x-auto" : ""
          }`}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-5 sm:gap-7 w-max py-6"
            style={{
              paddingLeft: endPadding,
              paddingRight: endPadding,
              transform: reducedMotion
                ? undefined
                : `translate3d(${offset}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {SKILL_CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              const sharpness = focus[index] ?? 0;
              const isActive = index === activeIndex;

              return (
                <button
                  key={category.id}
                  type="button"
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  onClick={() => goToIndex(index)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`${category.name}: ${category.skills.join(", ")}`}
                  className="shrink-0 text-left cursor-pointer"
                  style={{
                    width: `${rail.cardWidth}px`,
                    height: `${rail.cardHeight}px`,
                    opacity: reducedMotion ? 1 : 0.3 + 0.7 * sharpness,
                    transform: reducedMotion
                      ? undefined
                      : `scale(${0.9 + 0.1 * sharpness})`,
                    filter: reducedMotion
                      ? undefined
                      : `blur(${(1 - sharpness) * 1.6}px)`,
                    // Focus is recomputed every scroll frame, so a long
                    // transition just lags behind the pointer. Keep it short
                    // enough to only smooth the jumps from dot/arrow jumps.
                    transition: reducedMotion
                      ? "none"
                      : "opacity 120ms linear, transform 120ms ease-out, filter 120ms linear",
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className="h-full rounded-2xl border bg-[#080a10]/90 backdrop-blur-md p-5 flex flex-col gap-3 overflow-hidden shadow-[0_25px_60px_-20px_rgba(0,0,0,0.9)]"
                    style={{
                      borderColor: isActive
                        ? `${category.accentColor}66`
                        : "rgba(255,255,255,0.08)",
                      boxShadow: isActive
                        ? `0 0 40px -12px ${category.accentColor}59, 0 25px 60px -20px rgba(0,0,0,0.9)`
                        : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between shrink-0">
                      <span className="font-mono text-[11px] tracking-widest text-zinc-500">
                        {category.number}
                      </span>
                      <span
                        className="h-8 w-8 rounded-lg grid place-items-center border"
                        style={{
                          borderColor: `${category.accentColor}33`,
                          backgroundColor: `${category.accentColor}1a`,
                        }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{ color: category.accentColor }}
                        />
                      </span>
                    </div>

                    <div className="space-y-1 shrink-0">
                      <h3 className="font-sans text-base sm:text-lg font-semibold text-white leading-snug">
                        {category.name}
                      </h3>
                      <p className="font-sans text-[11px] leading-relaxed text-zinc-400">
                        {category.tagline}
                      </p>
                    </div>

                    <div className="h-px bg-white/[0.08] shrink-0" />

                    {/* Longer lists are cut off behind a fade — the panel below
                        the rail always carries the full list. */}
                    <div className="relative flex-1 min-h-0">
                      <div className="flex flex-wrap gap-1.5 h-full overflow-hidden content-start">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-[3px] font-mono text-[9.5px] leading-tight text-zinc-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#080a10] to-transparent"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full skill list for the focused category */}
        <div className="relative z-20 px-4 sm:px-8 md:px-12 lg:px-20 shrink-0">
          <div
            aria-live="polite"
            className="max-w-3xl mx-auto min-h-[68px] flex flex-wrap items-start justify-center gap-1.5"
          >
            {activeCategory.skills.map((skill) => (
              <span
                key={`${activeCategory.id}-${skill}`}
                className="rounded-full border px-2.5 py-1 font-mono text-[10px] leading-tight text-zinc-300"
                style={{
                  borderColor: `${activeCategory.accentColor}33`,
                  backgroundColor: `${activeCategory.accentColor}12`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Position readout + direct navigation */}
        <div className="relative z-20 px-4 sm:px-8 md:px-12 lg:px-20 pb-10 sm:pb-12 mt-4 shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="font-mono text-xs tabular-nums"
                style={{ color: activeCategory.accentColor }}
              >
                {activeCategory.number} / {String(total).padStart(2, "0")}
              </span>
              <span className="truncate font-sans text-sm text-zinc-300">
                {activeCategory.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                aria-label="Previous skill category"
                className="h-8 w-8 grid place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="hidden sm:flex items-center gap-1.5 px-1">
                {SKILL_CATEGORIES.map((category, index) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => goToIndex(index)}
                    aria-label={`Show ${category.name}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className="p-1 cursor-pointer"
                  >
                    <span
                      className="block h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: index === activeIndex ? "22px" : "6px",
                        backgroundColor:
                          index === activeIndex
                            ? category.accentColor
                            : "#3f3f46",
                      }}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goToIndex(Math.min(total - 1, activeIndex + 1))}
                disabled={activeIndex === total - 1}
                aria-label="Next skill category"
                className="h-8 w-8 grid place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Rail progress */}
          <div className="max-w-7xl mx-auto mt-3 h-px bg-white/[0.07]">
            <div
              className="h-px transition-colors duration-500"
              style={{
                width: `${progress * 100}%`,
                backgroundColor: activeCategory.accentColor,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
