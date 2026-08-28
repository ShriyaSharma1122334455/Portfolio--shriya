import { useState } from "react";
import {
  Activity,
  Bot,
  Cloud,
  Database,
  Layers,
  Server,
  Zap,
} from "lucide-react";
import { Marquee } from "./Marquee";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  ambientGlow: string;
  badge: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "software-development",
    number: "01",
    title: "Software Development",
    description:
      "I design and build full-stack systems end-to-end — from architecture decisions to implementation and deployment — with an eye for how components scale and communicate as an app grows past its first version.",
    features: [
      "System Design & Architecture",
      "Distributed & Multi-Service Systems",
      "Docker Containerization",
      "CI/CD Pipelines (GitHub Actions, GitLab CI/CD)",
      "Full SDLC Ownership (Requirements → Deployment)",
      "React, Node.js, FastAPI",
    ],
    ambientGlow: "rgba(99, 102, 241, 0.16)", // Indigo
    badge: "Software Development",
  },
  {
    id: "ai-full-stack-engineer",
    number: "02",
    title: "AI Full-Stack Engineer",
    description:
      "I build products with AI features baked into the full stack — not just a model call bolted onto an app, but the UI, backend, and data layer designed around what the AI actually needs to work well.",
    features: [
      "AI-Integrated Product Development",
      "Multimodal Model Integration (Gemini, Google ADK)",
      "RAG & Agent-Backed Features",
      "React + FastAPI/Node.js",
      "Human-in-the-Loop Review Flows",
    ],
    ambientGlow: "rgba(236, 72, 153, 0.16)", // Pink / Magenta
    badge: "AI Full-Stack",
  },
  {
    id: "backend-engineer",
    number: "03",
    title: "Backend Engineer",
    description:
      "I build the backend logic that powers an app — clean APIs, secure auth, and services designed to hold up under real production traffic and SLAs.",
    features: [
      "REST API Design",
      "Authentication (JWT, OAuth)",
      "Backend Services (Node.js, FastAPI)",
      "Redis Caching & Performance Tuning",
      "Production Debugging Under SLA",
    ],
    ambientGlow: "rgba(56, 189, 248, 0.16)", // Cyan / Sky
    badge: "Backend",
  },
  {
    id: "data-analyst",
    number: "04",
    title: "Data Analyst",
    description:
      'I turn raw data into dashboards and reports that non-technical stakeholders can actually act on — cutting the time between "we have data" and "we made a decision."',
    features: [
      "Tableau & Power BI Dashboards",
      "SQL Querying & Aggregation",
      "Trend & Occupancy/Usage Analysis",
      "Data Validation & Anomaly Detection",
      "Stakeholder Reporting",
    ],
    ambientGlow: "rgba(245, 158, 11, 0.15)", // Amber
    badge: "Data Analysis",
  },
  {
    id: "data-architect",
    number: "05",
    title: "Data Architect",
    description:
      "I design schemas and data layers that stay fast and consistent as an application scales — thinking through indexing, security, and access patterns before they become a bottleneck.",
    features: [
      "Schema Design (PostgreSQL/Supabase, MongoDB, DynamoDB)",
      "Row-Level Security",
      "Indexing & Query Performance",
      "Migration Planning",
      "Multi-Database Architecture Decisions",
    ],
    ambientGlow: "rgba(52, 211, 153, 0.16)", // Emerald
    badge: "Data Architecture",
  },
  {
    id: "ai-systems-automation",
    number: "06",
    title: "AI Systems & Automation",
    description:
      "I build multi-agent AI systems and automate the repetitive parts of a workflow — replacing manual processes with systems that run themselves.",
    features: [
      "Multi-Agent Workflows (LangGraph, AWS Bedrock)",
      "Explainable AI Recommendations",
      "Workflow Automation (Power Automate, Python)",
      "Process Optimization",
      "LLM Integration",
    ],
    ambientGlow: "rgba(168, 85, 247, 0.16)", // Violet / Purple
    badge: "AI & Automation",
  },
  {
    id: "tech-support-observability",
    number: "07",
    title: "Technical Support & Observability",
    description:
      "I keep production systems healthy after launch — catching issues early, resolving incidents fast, and documenting fixes so the same problem doesn't come back.",
    features: [
      "System Health Monitoring",
      "Incident Management (ITIL)",
      "Root-Cause Analysis",
      "SOP & Runbook Authoring",
      "Tier 1/2 Application Support",
    ],
    ambientGlow: "rgba(45, 212, 191, 0.16)", // Teal
    badge: "Reliability & Ops",
  },
];

/** Per-service glyph, keyed by id so the data stays untouched. */
const SERVICE_ICONS: Record<string, typeof Layers> = {
  "software-development": Layers,
  "ai-full-stack-engineer": Bot,
  "backend-engineer": Server,
  "data-analyst": Activity,
  "data-architect": Database,
  "ai-systems-automation": Zap,
  "tech-support-observability": Cloud,
};

/**
 * The data carries glow colours as low-alpha rgba, which is too faint for text
 * or borders. Strip the alpha to recover the solid hue.
 */
function solidHue(rgba: string): string {
  const parts = rgba.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return "#2dd4bf";
  return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
}

interface ServicesProps {
  onContactClick?: () => void;
}

export function Services({ onContactClick }: ServicesProps) {
  const [focusedId, setFocusedId] = useState<string>(SERVICES[0].id);

  const focused =
    SERVICES.find((service) => service.id === focusedId) ?? SERVICES[0];
  const focusedHue = solidHue(focused.ambientGlow);

  return (
    <section
      id="services"
      className="relative py-24 sm:py-28 bg-[#030407] text-[#e4e4e7] overflow-hidden"
    >
      {/* Ambient wash tinted by the focused service */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[520px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: focusedHue }}
      />

      <div className="relative">
        {/* Header */}
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 mb-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-teal-400 uppercase">
                {/* <Zap className="h-3.5 w-3.5" /> */}
                {/* <span>Services</span> */}
              </div>
              <h2
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight"
                style={{
                  fontFamily:
                    "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                Where I put that to work
              </h2>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400 shrink-0">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <span>{SERVICES.length} Disciplines &bull; Hover to pause</span>
            </div>
          </div>
        </div>

        {/* Auto-scrolling rail */}
        <Marquee speed={42}>
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id] ?? Layers;
            const hue = solidHue(service.ambientGlow);
            const isFocused = service.id === focused.id;

            return (
              <button
                key={service.id}
                type="button"
                onMouseEnter={() => setFocusedId(service.id)}
                onFocus={() => setFocusedId(service.id)}
                aria-label={`${service.title}: ${service.features.join(", ")}`}
                // Spacing lives here, not as a flex gap — see Marquee.
                className="mr-5 sm:mr-7 w-[240px] sm:w-[280px] lg:w-[320px] h-[340px] sm:h-[360px] lg:h-[380px] shrink-0 text-left cursor-pointer"
              >
                <div
                  className="h-full rounded-2xl border bg-[#080a10]/90 backdrop-blur-md p-5 flex flex-col gap-3 overflow-hidden shadow-[0_25px_60px_-20px_rgba(0,0,0,0.9)] transition-colors duration-300"
                  style={{
                    borderColor: isFocused
                      ? `${hue.replace("rgb", "rgba").replace(")", ", 0.4)")}`
                      : "rgba(255,255,255,0.08)",
                    boxShadow: isFocused
                      ? `0 0 40px -12px ${hue.replace("rgb", "rgba").replace(")", ", 0.35)")}, 0 25px 60px -20px rgba(0,0,0,0.9)`
                      : undefined,
                  }}
                >
                  <div className="flex items-center justify-between shrink-0">
                    <span className="font-mono text-[11px] tracking-widest text-zinc-500">
                      {service.number}
                    </span>
                    <span
                      className="h-8 w-8 rounded-lg grid place-items-center border"
                      style={{
                        borderColor: hue
                          .replace("rgb", "rgba")
                          .replace(")", ", 0.2)"),
                        backgroundColor: service.ambientGlow,
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: hue }} />
                    </span>
                  </div>

                  <div className="space-y-1 shrink-0">
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-white leading-snug">
                      {service.title}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      {service.badge}
                    </p>
                  </div>

                  <div className="h-px bg-white/[0.08] shrink-0" />

                  {/* Longer lists are cut off behind a fade — the panel below
                      the rail always carries the full list. */}
                  <div className="relative flex-1 min-h-0">
                    <div className="flex flex-wrap gap-1.5 h-full overflow-hidden content-start">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-[3px] font-mono text-[9.5px] leading-tight text-zinc-300"
                        >
                          {feature}
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

        {/* Full detail for whichever card is being pointed at */}
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 mt-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3">
              <span
                className="font-mono text-xs tabular-nums"
                style={{ color: focusedHue }}
              >
                {focused.number}
              </span>
              <span className="font-sans text-sm text-zinc-300">
                {focused.title}
              </span>
            </div>

            <div aria-live="polite">
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {focused.description}
              </p>

              {/* <div className="mt-5 min-h-[68px] flex flex-wrap items-start justify-center gap-1.5">
                {focused.features.map((feature) => (
                  <span
                    key={`${focused.id}-${feature}`}
                    className="rounded-full border px-2.5 py-1 font-mono text-[10px] leading-tight text-zinc-300"
                    style={{
                      borderColor: focusedHue
                        .replace("rgb", "rgba")
                        .replace(")", ", 0.2)"),
                      backgroundColor: focused.ambientGlow,
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div> */}
            </div>

            {onContactClick && (
              <div className="mt-8 flex justify-center">
                <div className="relative inline-flex items-center justify-center">
                  <button
                    onClick={onContactClick}
                    data-cursor-text="TALK"
                    className="neon-blue-btn relative rounded-full px-8 py-2.5 text-xs sm:text-sm font-medium tracking-wide text-white cursor-pointer select-none"
                  >
                    <span className="relative z-10 font-normal">Contact</span>
                    <span
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-[#c9ab86] shadow-[0_0_8px_rgba(201,171,134,0.8)] border border-[#dfc3a2] pointer-events-none"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
