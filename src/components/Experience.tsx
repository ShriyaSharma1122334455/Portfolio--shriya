import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePinnedTrack } from "../hooks/usePinnedTrack";

interface Achievement {
  text: string;
  /** Free-form facet labels, e.g. "leadership", "ops", "data", "dev". */
  tags: string[];
}

interface Credential {
  title: string;
  issuer: string;
  note: string;
}

interface TimelineEntry {
  id: string;
  /** Roles carry achievements and a stack; education nodes carry credentials. */
  kind: "role" | "education";
  title: string;
  org: string;
  period: string;
  /** Short label for the marker above the spine, e.g. "2024". */
  marker: string;
  location: string;
  /** Employment type for roles; omitted on education nodes. */
  type?: string;
  description: string;
  achievements?: Achievement[];
  skills?: string[];
  credentials?: Credential[];
  /** Clubs, societies and volunteering — education nodes only. */
  activities?: string[];
  accentColor: string;
}

/** Strict chronological order, oldest first: the track reads left-to-right as
 *  time moving forward, so the spine's progress fill tracks the passing years. */
const TIMELINE: TimelineEntry[] = [
  {
    id: "education-be",
    kind: "education",
    title: "Bachelor's of Engineering, Information Technology",
    org: "University of Mumbai",
    period: "Completed Jun 2022",
    marker: "2018",
    location: "Mumbai, India",
    description: "GPA: 3.5/4.0",
    credentials: [],
    activities: ["Sponsorship Manager", "Member, Badminton Club"],
    accentColor: "#f59e0b",
  },
  {
    id: "software-developer-tcs",
    kind: "role",
    title: "Software Developer / Systems Engineer",
    org: "Tata Consultancy Services (TetraPak)",
    period: "Aug 2022 — Aug 2024",
    marker: "2022",
    location: "India",
    type: "Full-Time",
    description:
      "Delivered backend services, incident resolution, and change management for a 200+ user production environment.",
    achievements: [
      {
        text: "Planned and coordinated ~80–100 monthly change deployments across IT, Operations, Finance, and vendor teams via ServiceNow with zero SLA breaches.",
        tags: ["leadership", "ops"],
      },
      {
        text: "Owned incident resolution for a 200+ user production environment; authored SOPs/runbooks cutting resolution time ~20% and recurring incidents ~30%.",
        tags: ["ops", "leadership"],
      },
      {
        text: "Improved system performance via Redis caching and SQL query optimization, sustaining 99%+ uptime.",
        tags: ["dev"],
      },
      {
        text: "Developed backend services and REST API features for enterprise applications.",
        tags: ["dev"],
      },
      {
        text: "Automated log monitoring and Change Transport Request (CTR) processes with Python scripting.",
        tags: ["dev", "ops"],
      },
    ],
    skills: [
      "Python",
      "JavaScript",
      "REST APIs",
      "SQL",
      "Redis",
      "PyTest",
      "ServiceNow",
    ],
    accentColor: "#818cf8",
  },
  {
    id: "education-msc",
    kind: "education",
    title: "M.S. Computer Science",
    org: "New Jersey Institute of Technology, Newark, NJ",
    period: "2024 — 2026",
    marker: "2024",
    location: "Newark, NJ",
    description: "GPA: 3.6/4.0",
    // Certifications now live in the About section's credential badges.
    credentials: [],
    activities: [
      "President — GWICS (Graduate Women in Computer Science)",
      "Volunteer, NJIT Food Pantry",
    ],
    accentColor: "#fbbf24",
  },
  {
    id: "grad-assistant-resident-life",
    kind: "role",
    title: "Graduate Assistant, Resident Life",
    org: "New Jersey Institute of Technology",
    period: "May 2025 — Present",
    marker: "2025",
    location: "Newark, NJ",
    type: "Part-Time",
    description:
      "Coordinating IT support, data reporting, and workflow automation for a 2,000+ resident community.",
    achievements: [
      {
        text: "Served as first point of contact for 14 Resident Coordinators — onboarding, task tracking, and offboarding.",
        tags: ["leadership", "ops"],
      },
      {
        text: "Resolved 40–60 IT/administrative inquiries per month, independently troubleshooting hardware, software, and network issues.",
        tags: ["ops"],
      },
      {
        text: "Built Tableau dashboards from 10,000+ MySQL records, cutting weekly reporting time by 2–3 hours.",
        tags: ["data"],
      },
      {
        text: "Automated the reimbursement workflow with Power Automate, cutting processing time and error by 40%.",
        tags: ["dev", "ops"],
      },
      {
        text: "Trained and onboarded a newly hired Graduate Assistant on systems and support procedures.",
        tags: ["leadership"],
      },
    ],
    skills: [
      "MySQL",
      "Tableau",
      "Python",
      "Power Automate",
      "Active Directory",
    ],
    accentColor: "#2dd4bf",
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(440);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Card width lives in JS because the track's end padding is derived from it.
  useEffect(() => {
    const pick = () => {
      const w = window.innerWidth;
      setCardWidth(w < 640 ? Math.round(w * 0.78) : w < 1024 ? 420 : 440);
    };
    pick();
    window.addEventListener("resize", pick);
    return () => window.removeEventListener("resize", pick);
  }, []);

  const { distance, progress, offset, sectionHeight } = usePinnedTrack(
    sectionRef,
    trackRef,
    !reducedMotion,
    0.85,
  );

  /**
   * Half a viewport minus half a card. Without this the first and last cards
   * can never reach the middle of the stage — the last one used to stop ~150px
   * short and stay dimmed, so the final entry never came into focus.
   */
  const endPadding = `calc(50vw - ${cardWidth / 2}px)`;

  // Whichever card sits nearest the middle of the viewport is the focused one.
  useEffect(() => {
    const centre = window.innerWidth / 2;
    let nearest = 0;
    let best = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const delta = Math.abs(rect.left + rect.width / 2 - centre);
      if (delta < best) {
        best = delta;
        nearest = index;
      }
    });

    setActiveIndex(nearest);
  }, [offset]);

  const activeEntry = TIMELINE[activeIndex];

  // Several education entries can exist, but only one node may carry the
  // #education id the Navbar links to — duplicate ids are invalid.
  const anchorEducationIndex = TIMELINE.findIndex(
    (entry) => entry.kind === "education",
  );

  /** Scroll the page so `index` comes to rest in the middle of the stage. */
  const goToIndex = (index: number) => {
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
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToIndex(Math.min(TIMELINE.length - 1, activeIndex + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToIndex(Math.max(0, activeIndex - 1));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-[#050609]"
      style={{ height: sectionHeight }}
    >
      {/* Pinned stage. It holds while the track slides beneath it and releases
          on its own once the track runs out, so the page continues normally. */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Ambient wash picking up the focused entry */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[520px] rounded-full blur-[170px] opacity-[0.13] pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: activeEntry.accentColor }}
        />

        {/* Header */}
        <div className="relative z-20 px-6 sm:px-10 md:px-16 lg:px-24 pt-10 sm:pt-14 shrink-0">
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-6">
            <div className="space-y-2">
              {/* <span className="text-xs font-medium tracking-widest text-teal-400 uppercase">
                02 &bull; Experience
              </span> */}
              <h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white"
                style={{
                  fontFamily:
                    "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
                }}
              >
                Career Journey
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400 shrink-0">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <span>Scroll to travel &rarr;</span>
            </div>
          </div>
        </div>

        {/* Horizontal rail */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Career journey timeline"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className={`relative z-10 my-auto min-h-0 outline-none focus-visible:ring-1 focus-visible:ring-teal-400/40 ${
            reducedMotion ? "overflow-x-auto" : ""
          }`}
        >
          <div
            ref={trackRef}
            className="relative flex items-stretch gap-8 sm:gap-14 w-max py-4"
            style={{
              paddingLeft: endPadding,
              paddingRight: endPadding,
              transform: reducedMotion
                ? undefined
                : `translate3d(${offset}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {/* Spine running the length of the track, behind the cards */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[84px] h-px bg-white/[0.08]"
            />
            <div
              aria-hidden="true"
              className="absolute left-0 top-[84px] h-px bg-gradient-to-r from-teal-400/70 to-teal-400/20"
              style={{ width: `${progress * 100}%` }}
            />

            {TIMELINE.map((entry, index) => {
              const isEducation = entry.kind === "education";
              const isActive = index === activeIndex;

              return (
                <article
                  key={entry.id}
                  id={index === anchorEducationIndex ? "education" : undefined}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className="relative shrink-0 flex flex-col"
                  style={{
                    width: `${cardWidth}px`,
                    opacity: isActive ? 1 : 0.55,
                    transform: `scale(${isActive ? 1 : 0.96})`,
                    transition: reducedMotion
                      ? "none"
                      : "opacity 400ms ease-out, transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Marker year above the spine */}
                  <div className="h-[68px] flex flex-col justify-end pb-2">
                    <span
                      className="font-serif text-3xl sm:text-4xl leading-none transition-colors duration-500"
                      style={{
                        fontFamily:
                          "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
                        color: isActive ? entry.accentColor : "#52525b",
                      }}
                    >
                      {entry.marker}
                    </span>
                  </div>

                  {/* Node on the spine — hollow for education, filled for roles */}
                  <div className="h-7 flex items-start">
                    <span
                      aria-hidden="true"
                      className={`block rounded-full ring-4 ring-[#050609] -mt-[5px] transition-colors duration-500 ${
                        isEducation
                          ? "h-[11px] w-[11px] border-2 bg-[#050609]"
                          : "h-[9px] w-[9px]"
                      }`}
                      style={
                        isEducation
                          ? {
                              borderColor: isActive
                                ? entry.accentColor
                                : "#3f3f46",
                            }
                          : {
                              backgroundColor: isActive
                                ? entry.accentColor
                                : "#3f3f46",
                              boxShadow: isActive
                                ? `0 0 12px ${entry.accentColor}80`
                                : undefined,
                            }
                      }
                    />
                  </div>

                  {/* Entry card */}
                  <div
                    className="glass-card rounded-2xl p-5 sm:p-6 flex-1 flex flex-col overflow-hidden max-h-[52vh]"
                    style={{
                      borderColor: isActive
                        ? `${entry.accentColor}40`
                        : undefined,
                    }}
                  >
                    <div className="pb-3 border-b border-white/[0.06] shrink-0">
                      {isEducation && (
                        <span
                          className="block font-mono text-[10px] uppercase tracking-widest mb-1"
                          style={{ color: entry.accentColor }}
                        >
                          Education
                        </span>
                      )}
                      <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                        {entry.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-[13px] font-medium text-zinc-300">
                        {isEducation ? (
                          <GraduationCap className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                        ) : (
                          <Briefcase className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                        )}
                        <span className="truncate">{entry.org}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {entry.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {entry.location}
                        </span>
                        {entry.type && <span>{entry.type}</span>}
                      </div>
                    </div>

                    <p className="mt-3 text-[13px] leading-relaxed text-zinc-300 shrink-0">
                      {entry.description}
                    </p>

                    {entry.achievements && entry.achievements.length > 0 && (
                      <ul className="mt-3 space-y-2 min-h-0 flex-1 overflow-y-auto pr-1">
                        {entry.achievements.map((achievement) => (
                          <li
                            key={achievement.text}
                            className="flex gap-2 text-[12.5px] text-zinc-300"
                          >
                            <CheckCircle2
                              className="h-3.5 w-3.5 mt-0.5 shrink-0"
                              style={{ color: entry.accentColor }}
                            />
                            <span className="leading-relaxed">
                              {achievement.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.credentials && entry.credentials.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {entry.credentials.map((credential) => (
                          <li
                            key={credential.title}
                            className="flex gap-2 text-[12.5px] text-zinc-300"
                          >
                            <Award
                              className="h-3.5 w-3.5 mt-0.5 shrink-0"
                              style={{ color: entry.accentColor }}
                            />
                            <span className="leading-relaxed">
                              {credential.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.activities && entry.activities.length > 0 && (
                      <div className="mt-4 min-h-0">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                          Involvement
                        </span>
                        <ul className="mt-2 space-y-1.5">
                          {entry.activities.map((activity) => (
                            <li
                              key={activity}
                              className="flex gap-2 text-[12.5px] text-zinc-300"
                            >
                              <Users
                                className="h-3.5 w-3.5 mt-0.5 shrink-0"
                                style={{ color: entry.accentColor }}
                              />
                              <span className="leading-relaxed">
                                {activity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.skills && entry.skills.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5 shrink-0">
                        {entry.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Progress readout + direct navigation */}
        <div className="relative z-20 px-6 sm:px-10 md:px-16 lg:px-24 pb-10 sm:pb-14 shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <span
              className="font-mono text-xs tabular-nums"
              style={{ color: activeEntry.accentColor }}
            >
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(TIMELINE.length).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                aria-label="Previous entry"
                className="h-8 w-8 grid place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {TIMELINE.map((entry, index) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => goToIndex(index)}
                    aria-label={`Show ${entry.title}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className="p-1 cursor-pointer"
                  >
                    <span
                      className="block h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: index === activeIndex ? "22px" : "6px",
                        backgroundColor:
                          index === activeIndex ? entry.accentColor : "#3f3f46",
                      }}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  goToIndex(Math.min(TIMELINE.length - 1, activeIndex + 1))
                }
                disabled={activeIndex === TIMELINE.length - 1}
                aria-label="Next entry"
                className="h-8 w-8 grid place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
