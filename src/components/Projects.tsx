import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExternalLink, Github, ArrowUpRight, TrendingUp } from "lucide-react";

interface Project {
  id: string;
  categories: string[];
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  impact: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const CATEGORIES = [
  "All",
  "Cloud / DevOps",
  "Frontend",
  "Backend",
  "Data / ML",
  "Support Ops",
];

const projects: Project[] = [
  {
    id: "service-hub",
    categories: ["Backend", "Cloud / DevOps"],
    categoryLabel: "Backend",
    title: "Service Hub",
    tagline:
      "AI-First Home Services Marketplace — Validated Through NSF I-Corps",
    description:
      "A two-sided marketplace connecting verified service professionals with customers, built end-to-end as Product Owner across a 5-person Agile team. Validated the product idea through NSF I-Corps Northeastern's customer discovery program, running 6 sprints from requirements to deployment with zero missed deliverables.",
    impact: "Zero Missed Deliverables Across 6 Sprints",
    tech: [
      "React",
      "TypeScript",
      "Node/Express",
      "FastAPI",
      "Supabase",
      "Docker",
      "GitHub Actions",
    ],
    githubUrl:
      "https://github.com/ShriyaSharma1122334455/Service-Hub-A-Home-Service-Market-Place-",
  },
  {
    id: "veridyn",
    categories: ["Frontend"],
    categoryLabel: "Frontend",
    title: "Veridyn",
    tagline: "AI Code Governance Tool with Severity-Ranked Risk Scoring",
    description:
      "A repo-health scanner that flags governance risk in AI-assisted commits and PRs. Owned the full application flow and frontend — a React dashboard with visual analytics and multi-tenant GitLab OAuth — on top of a FastAPI backend integrated with Google ADK.",
    impact: "CI Pipeline Passing on 100% of Builds",
    tech: ["TypeScript", "FastAPI", "Google ADK", "GitLab MCP", "Firestore"],
    githubUrl: "https://github.com/ShriyaSharma1122334455/orgpulse",
  },
  {
    id: "procurement-decision-fabric",
    categories: ["Data / ML", "Backend"],
    categoryLabel: "Data / ML",
    title: "Procurement Decision Fabric",
    tagline: "Multi-Agent System for Explainable Procurement Recommendations",
    description:
      "A multi-agent decision system where specialized agents analyze procurement scenarios and generate explainable recommendations. Designed the backend architecture on DynamoDB and integrated AWS Bedrock to power AI-driven retrieval and decision workflows.",
    impact: "Multi-Agent Architecture via LangGraph + AWS Bedrock",
    tech: ["Python/Node.js", "LangGraph", "DynamoDB", "AWS Bedrock", "React"],
    githubUrl: "",
  },
  {
    id: "fifa-prediction",
    categories: ["Data / ML"],
    categoryLabel: "Data / ML",
    title: "FIFA World Cup Match Outcome Prediction",
    tagline: "Statistical Modeling Across 90+ Years of Match Data",
    description:
      "Built a full predictive pipeline integrating 964 historical matches, FIFA rankings, and tournament metadata spanning 1930–2022. Trained and tuned XGBoost, LightGBM, and a Dixon-Coles statistical model with a chronological train/test split to prevent data leakage.",
    impact: "83.85% Prediction Accuracy",
    tech: ["Python", "XGBoost", "LightGBM", "Statistical Modeling"],
    liveUrl:
      "https://colab.research.google.com/drive/10ZQJD5R_9LDEL2zMKT6QNK1HbOWGm8MH?usp=sharing",
  },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const reducedMotion = useReducedMotion();

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <section
      id="projects"
      className="relative py-24 px-6 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            {/* <span className="text-xs font-medium tracking-widest text-teal-400 uppercase">
              03 &bull; Projects
            </span> */}
            <h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white"
              style={{
                fontFamily:
                  "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
              }}
            >
              Selected Work
            </h2>
          </div>

          {/* Filter tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                    isActive
                      ? "bg-white font-medium text-zinc-950"
                      : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {filteredProjects.length === 0 ? (
          <p className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-16 text-center text-sm text-zinc-500">
            No projects in {activeFilter} yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* popLayout pulls exiting cards out of flow immediately, so the
                survivors reflow while the old ones are still fading. */}
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const viewUrl = project.liveUrl || project.githubUrl;

                return (
                  <motion.article
                    key={project.id}
                    layout={!reducedMotion}
                    initial={
                      reducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 0.95 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      reducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.95 }
                    }
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors duration-300 hover:border-zinc-700"
                  >
                    {/* Top row: category + outbound links */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-teal-400">
                        {project.categoryLabel}
                      </span>

                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} on GitHub`}
                            className="text-zinc-500 transition-colors hover:text-zinc-200"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} live`}
                            className="text-zinc-500 transition-colors hover:text-zinc-200"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-white">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      {project.tagline}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {project.description}
                    </p>

                    {/* Impact badge */}
                    <div className="mt-4 flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                      <TrendingUp className="h-3 w-3" />
                      <span>{project.impact}</span>
                    </div>

                    {/* Everything below is pinned to the card foot so cards in a
                        row line up regardless of description length. */}
                    <div className="mt-auto">
                      <div className="mt-6 border-t border-zinc-800" />

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.map((item) => (
                          <span
                            key={item}
                            className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {viewUrl && (
                        <a
                          href={viewUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-300 transition-colors hover:text-white hover:underline"
                        >
                          <span>View</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
