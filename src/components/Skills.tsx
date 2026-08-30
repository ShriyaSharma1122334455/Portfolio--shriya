import { useState } from "react";
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
} from "lucide-react";
import { Marquee } from "./Marquee";

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
    accentColor: "#6082b6", // Sky
    tagline: "Core languages & structured syntax",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
  },
  {
    id: "frontend",
    number: "02",
    name: "Frontend",
    icon: Layout,
    accentColor: "#6082b6", // Indigo
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
    accentColor: "#6082b6", // Teal
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
    accentColor: "#6082b6", // Amber
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
    accentColor: "#6082b6", // Pink
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
    accentColor: "#6082b6", // Cyan
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
    accentColor: "#6082b6", // Green
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
    accentColor: "#6082b6", // Purple
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
    accentColor: "#6082b6", // Violet
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
    accentColor: "#6082b6", // Emerald
    tagline: "BI dashboards, KPI metrics & operational visibility",
    skills: ["Tableau", "Power BI", "Excel", "Dashboard Development", "JIRA"],
  },
  {
    id: "project-team-management",
    number: "11",
    name: "Project & Team Management",
    icon: Users,
    accentColor: "#6082b6", // Orange
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
    accentColor: "#6082b6", // Fuchsia
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
    accentColor: "#6082b6", // Slate
    tagline: "Automation & everyday delivery tooling",
    skills: ["Power Automate", "Microsoft 365", "Google Workspace", "GitHub"],
  },
];

export function Skills() {
  // Whichever card the reader is pointing at (or tabbed to) drives the panel.
  // Falls back to the first so the panel is never empty on load.
  const [focusedId, setFocusedId] = useState<string>(SKILL_CATEGORIES[0].id);

  const focused =
    SKILL_CATEGORIES.find((category) => category.id === focusedId) ??
    SKILL_CATEGORIES[0];

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-28 bg-[#030407] text-[#e4e4e7] overflow-hidden"
    >
      {/* Ambient wash tinted by the focused category */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[520px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: focused.accentColor }}
      />

      <div className="relative">
        {/* Header */}
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 mb-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-accent uppercase">
                {/* <Sparkles className="h-3.5 w-3.5" />
                <span>04 &bull; Technical Repertoire</span> */}
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

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-400 shrink-0">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span>
                {SKILL_CATEGORIES.length} Domains &bull; Hover to pause
              </span>
            </div>
          </div>
        </div>

        {/* Auto-scrolling rail */}
        <Marquee speed={38} showControls step={347} controlsLabel="skill categories">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isFocused = category.id === focused.id;

            return (
              <button
                key={category.id}
                type="button"
                onMouseEnter={() => setFocusedId(category.id)}
                onFocus={() => setFocusedId(category.id)}
                aria-label={`${category.name}: ${category.skills.join(", ")}`}
                // Spacing lives here, not as a flex gap — see Marquee.
                className="mr-5 sm:mr-7 w-[240px] sm:w-[280px] lg:w-[320px] h-[340px] sm:h-[360px] lg:h-[380px] shrink-0 text-left cursor-pointer"
              >
                <div
                  className="h-full rounded-2xl border bg-[#080a10]/90 backdrop-blur-md p-5 flex flex-col gap-3 overflow-hidden shadow-[0_25px_60px_-20px_rgba(0,0,0,0.9)] transition-colors duration-300"
                  style={{
                    borderColor: isFocused
                      ? `${category.accentColor}66`
                      : "rgba(255,255,255,0.08)",
                    boxShadow: isFocused
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
                          className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-[3px] text-[11px] leading-tight text-zinc-300"
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
        </Marquee>

        {/* Full skill list for whichever card is being pointed at */}
        {/* <div className="px-6 sm:px-10 md:px-16 lg:px-24 mt-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3">
              <span
                className="font-mono text-xs tabular-nums"
                style={{ color: focused.accentColor }}
              >
                {focused.number}
              </span>
              <span className="font-sans text-sm text-zinc-300">
                {focused.name}
              </span>
            </div>

            <div
              aria-live="polite"
              className="mt-4 min-h-[68px] flex flex-wrap items-start justify-center gap-1.5"
            >
              {focused.skills.map((skill) => (
                <span
                  key={`${focused.id}-${skill}`}
                  className="rounded-full border px-2.5 py-1 text-[11.5px] leading-tight text-zinc-300"
                  style={{
                    borderColor: `${focused.accentColor}33`,
                    backgroundColor: `${focused.accentColor}12`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
