import { useCallback, useEffect, useRef, useState } from "react";
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
import njitLogo from "../../assets/NJIT.png";
import tcsLogo from "../../assets/tcs.webp";
import mumbaiLogo from "../../assets/mu.svg";

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
  /** Org mark. Falls back to a glyph when absent. */
  logo?: string;
  /** Overrides the default monochrome treatment for a mark that needs it. */
  logoFilter?: string;
  accentColor: string;
  /** Courses for education nodes only. */
  courses?: string[];
}

/** Reverse chronological, newest first: the rail reads 2025 back to 2018. */
const TIMELINE: TimelineEntry[] = [
  {
    id: "grad-assistant-resident-life",
    kind: "role",
    title: "Graduate Assistant, Resident Life",
    org: "New Jersey Institute of Technology",
    period: "May 2025 — Present",
    marker: "2025",
    location: "Newark, NJ",
    type: "Part-Time",
    logo: njitLogo,
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
    accentColor: "#6082b6",
  },
  {
    id: "education-msc",
    kind: "education",
    title: "M.S. Computer Science",
    org: "New Jersey Institute of Technology, Newark, NJ",
    period: "2024 — 2026",
    marker: "2024",
    location: "Newark, NJ",
    logo: njitLogo,
    description: "GPA: 3.6/4.0",
    // Certifications now live in the About section's credential badges.
    credentials: [],
    activities: [
      "President — GWICS (Graduate Women in Computer Science)",
      "Volunteer, NJIT Food Pantry",
    ],
    courses: [
      "AdvancedData Structures & Algorithms",
      "Machine Learning",
      "Artificial Intelligence",
      "Cloud Computing",
      "DataBase Systems Design",
      "Web Application Development",
      "Software Design and Product Methodologies",
      "Internet and Highlayer Protocols",
      "Java Programming",
    ],
    accentColor: "#6082b6",
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
    logo: tcsLogo,
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
    accentColor: "#6082b6",
  },
  {
    id: "education-be",
    kind: "education",
    title: "Bachelor's of Engineering, Information Technology",
    org: "University of Mumbai",
    period: "2018 — 2022",
    marker: "2018",
    location: "Mumbai, India",
    logo: mumbaiLogo,
    description: "GPA: 3.5/4.0",
    credentials: [],
    activities: ["Sponsorship Manager", "Member, Badminton Club"],
    accentColor: "#6082b6",
    courses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Internet of Things",
      "Software Engineering",
      "Computer Networks",
      "Operating Systems",
      "Web Development",
      "Cloud Computing",
      "",
    ],
  },
];

export function Experience() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const animationRef = useRef(0);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cardWidth, setCardWidth] = useState(460);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Card width lives in JS because the rail's end padding is derived from it.
  useEffect(() => {
    const pick = () => {
      const w = window.innerWidth;
      setCardWidth(w < 640 ? Math.round(w * 0.84) : w < 1024 ? 430 : 460);
    };
    pick();
    window.addEventListener("resize", pick);
    return () => window.removeEventListener("resize", pick);
  }, []);

  // The rail is a plain horizontal scroll container, so vertical page scroll is
  // never intercepted — the reader can pass the section without exhausting it.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const travel = el.scrollWidth - el.clientWidth;
      setProgress(travel > 0 ? el.scrollLeft / travel : 0);

      const centre = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const middle = card.offsetLeft + card.offsetWidth / 2;
        const delta = Math.abs(middle - centre);
        if (delta < best) {
          best = delta;
          nearest = index;
        }
      });

      setActiveIndex(nearest);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // A real gesture cancels any glide in flight, so the reader always wins.
    const cancelGlide = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }
    };

    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", cancelGlide, { passive: true });
    el.addEventListener("touchstart", cancelGlide, { passive: true });
    el.addEventListener("pointerdown", cancelGlide, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      cancelGlide();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", cancelGlide);
      el.removeEventListener("touchstart", cancelGlide);
      el.removeEventListener("pointerdown", cancelGlide);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeEntry = TIMELINE[activeIndex];

  // Several education entries can exist, but only one node may carry the
  // #education id the Navbar links to — duplicate ids are invalid.
  const anchorEducationIndex = TIMELINE.findIndex(
    (entry) => entry.kind === "education",
  );

  /** Half the rail minus half a card, so the ends can still reach the middle. */
  const endPadding = `calc(50vw - ${cardWidth / 2}px)`;

  /**
   * Drive the glide ourselves rather than using behavior:"smooth".
   *
   * Tracking scroll position re-renders this component on every frame, and that
   * reliably aborts the browser's own smooth scroll part-way — a jump to the
   * last card would stall in the middle, and backward jumps did not move at
   * all. Setting scrollLeft per frame is immune to that.
   */
  const animateTo = useCallback(
    (target: number) => {
      const el = scrollerRef.current;
      if (!el) return;

      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      if (reducedMotion) {
        el.scrollLeft = target;
        return;
      }

      const from = el.scrollLeft;
      const delta = target - from;
      if (Math.abs(delta) < 1) return;

      const duration = Math.min(700, 260 + Math.abs(delta) * 0.3);
      const started = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const t = Math.min(1, (now - started) / duration);
        el.scrollLeft = from + delta * easeOutCubic(t);
        animationRef.current = t < 1 ? requestAnimationFrame(step) : 0;
      };

      animationRef.current = requestAnimationFrame(step);
    },
    [reducedMotion],
  );

  const goToIndex = useCallback(
    (index: number) => {
      const el = scrollerRef.current;
      const card = cardRefs.current[index];
      if (!el || !card) return;

      animateTo(card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2);
    },
    [animateTo],
  );

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
      id="experience"
      className="relative py-24 sm:py-28 bg-[#050609] overflow-hidden"
    >
      {/* Ambient wash picking up the focused entry */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[520px] rounded-full blur-[170px] opacity-[0.13] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeEntry.accentColor }}
      />

      <div className="relative">
        {/* Header */}
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 mb-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              {/* <span className="text-xs font-medium tracking-widest text-accent uppercase">
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

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-400 shrink-0">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span>Swipe or drag sideways &rarr;</span>
            </div>
          </div>
        </div>

        {/* Horizontal rail — native scrolling, so the page scroll passes through */}
        <div
          ref={scrollerRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Career journey timeline"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="no-scrollbar overflow-x-auto overscroll-x-contain outline-none focus-visible:ring-1 focus-visible:ring-accent/40"
        >
          <div
            className="relative flex items-stretch gap-8 sm:gap-14 w-max py-4"
            style={{ paddingLeft: endPadding, paddingRight: endPadding }}
          >
            {/* Spine running the length of the rail, behind the cards */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[84px] h-px bg-white/[0.08]"
            />
            <div
              aria-hidden="true"
              className="absolute left-0 top-[84px] h-px bg-gradient-to-r from-accent/70 to-accent/20"
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
                  className="relative shrink-0 flex flex-col scroll-mt-24"
                  style={{
                    width: `${cardWidth}px`,
                    opacity: isActive ? 1 : 0.55,
                    transform: `scale(${isActive ? 1 : 0.97})`,
                    transition: reducedMotion
                      ? "none"
                      : "opacity 300ms ease-out, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
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

                  {/* Entry card. No max-height and no inner scrolling — the card
                      grows to fit its content, and the row stretches to match
                      the tallest so the rail stays level. */}
                  <div
                    className="glass-card rounded-2xl p-5 sm:p-6 flex-1 flex flex-col"
                    style={{
                      borderColor: isActive
                        ? `${entry.accentColor}40`
                        : undefined,
                    }}
                  >
                    <div className="pb-3 border-b border-white/[0.06]">
                      {/* Org mark sits above the role, the way a masthead
                          would. Entries without artwork fall back to the
                          glyph rather than leaving a hole in the layout. */}
                      <div className="h-9 mb-2.5 flex items-center">
                        {entry.logo ? (
                          <img
                            src={entry.logo}
                            alt={entry.org}
                            loading="lazy"
                            className="h-full w-auto max-w-[150px] object-contain object-left"
                            style={{
                              // These marks arrive in wildly different inks —
                              // NJIT red, TCS full-rainbow, and the Mumbai
                              // crest in solid black, which is invisible here.
                              // Rendering them all as white silhouettes makes
                              // the set consistent and keeps the page to its
                              // single accent.
                              filter:
                                entry.logoFilter ??
                                "brightness(0) invert(1) opacity(0.85)",
                            }}
                          />
                        ) : isEducation ? (
                          <GraduationCap className="h-5 w-5 text-zinc-600" />
                        ) : (
                          <Briefcase className="h-5 w-5 text-zinc-600" />
                        )}
                      </div>

                      {isEducation && (
                        <span
                          className="block text-[10px] font-medium uppercase tracking-widest mb-1"
                          style={{ color: entry.accentColor }}
                        >
                          Education
                        </span>
                      )}
                      <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                        {entry.title}
                      </h3>
                      <div className="mt-1 text-[13px] font-medium text-zinc-300">
                        {entry.org}
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

                    <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">
                      {entry.description}
                    </p>

                    {entry.achievements && entry.achievements.length > 0 && (
                      <ul className="mt-3 space-y-2">
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
                      <div className="mt-4">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
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

                    {entry.courses && entry.courses.length > 0 && (
                      <div className="mt-4">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                          Coursework
                        </span>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {entry.courses.map((course) => (
                            <span
                              key={course}
                              className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-[3px] text-[11px] leading-tight text-zinc-300"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.skills && entry.skills.length > 0 && (
                      <div className="mt-auto pt-4">
                        <div className="border-t border-white/[0.06] pt-3 flex flex-wrap gap-1.5">
                          {entry.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-zinc-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Progress readout + direct navigation */}
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 mt-8">
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
