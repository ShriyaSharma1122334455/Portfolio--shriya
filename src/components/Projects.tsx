import { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  metrics: string;
  stack: string[];
  github?: string;
  demo?: string;
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const projects: Project[] = [
    {
      id: 'aurora-cloud',
      title: 'Aurora Cloud Mesh',
      category: 'Cloud / DevOps',
      tagline: 'Multi-Region Kubernetes Observability & Gateway Controller',
      description: 'An automated container orchestration dashboard that monitors ingress health, latency metrics, and Canary deployment traffic routing with automatic rollback heuristics.',
      metrics: '30% Reduction in Incident Triage Time',
      stack: ['Go', 'Kubernetes', 'Prometheus', 'React', 'TypeScript', 'AWS ECS'],
      github: 'https://github.com/shriyasharma/aurora-cloud-mesh',
      demo: 'https://aurora-mesh.example.com',
    },
    {
      id: 'nexus-frontend',
      title: 'Nexus Design Engine',
      category: 'Frontend',
      tagline: 'Editorial Component System with Fluid Typography & Spring Physics',
      description: 'A headless UI design system with accessible keyboard navigation, GPU-accelerated motion choreography, and automatic dark/light theme tokens.',
      metrics: '100% Lighthouse Accessibility & SEO',
      stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Radix UI'],
      github: 'https://github.com/shriyasharma/nexus-engine',
      demo: 'https://nexus-ui.example.com',
    },
    {
      id: 'pulse-telemetry',
      title: 'Pulse Telemetry Hub',
      category: 'Backend',
      tagline: 'High-Throughput WebSocket Log Streamer & Diagnostic Inspector',
      description: 'Engineered a real-time event pipeline capable of aggregating, parsing, and visualizing 50,000+ incoming log events per second with instant regex queries.',
      metrics: '50k+ Events/sec Handled at <15ms Latency',
      stack: ['Node.js', 'Redis Pub/Sub', 'PostgreSQL', 'WebSockets', 'Tailwind'],
      github: 'https://github.com/shriyasharma/pulse-telemetry',
      demo: 'https://pulse-telemetry.example.com',
    },
    {
      id: 'support-ops',
      title: 'SentryAssist SLA Bot',
      category: 'Support Ops',
      tagline: 'Automated Root-Cause Diagnostic & Incident Escalation Bot',
      description: 'Automates customer support triage by executing automated network pings, SSL cert validation, and database connection checks directly in Slack/Discord.',
      metrics: 'Automated 65% of Tier 1 Escalations',
      stack: ['Python', 'FastAPI', 'Docker', 'Slack Bolt API', 'PostgreSQL'],
      github: 'https://github.com/shriyasharma/sentry-assist',
      demo: 'https://sentryassist.example.com',
    },
  ];

  const categories = ['All', 'Cloud / DevOps', 'Frontend', 'Backend', 'Support Ops'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-medium tracking-widest text-teal-400 uppercase">
              03 &bull; Projects
            </span>
            <h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
            >
              Selected Work
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-white text-zinc-950 font-medium'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-medium text-indigo-400">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-3">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mt-4">
                  {proj.title}
                </h3>
                <p className="text-xs text-zinc-400 font-medium mt-1 mb-3">
                  {proj.tagline}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {proj.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                  <span>{proj.metrics}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {proj.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white/[0.03] px-2 py-0.5 text-[10px] text-zinc-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.demo || proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-zinc-200 hover:text-white transition-colors"
                >
                  <span>View</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
