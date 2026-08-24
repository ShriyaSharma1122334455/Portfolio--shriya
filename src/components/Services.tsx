import { useState, useRef } from 'react';
import { useScroll, motion, useTransform, useMotionValueEvent, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Terminal,
  Activity,
  ArrowUpRight,
  Cloud,
  Layers,
  Cpu,
  Server,
  Database,
  Bot,
  ShieldCheck,
  Zap,
  Lock,
  GitBranch,
  Search,
  Workflow
} from 'lucide-react';

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
    id: 'web-frontend-development',
    number: '01',
    title: 'Web & Frontend Development',
    description:
      'I build user-facing web applications that are fast, accessible, and easy to maintain — from component architecture to the interactions that make an interface feel right.',
    features: [
      'React & Next.js Development',
      'TypeScript Component Systems',
      'State Management (Zustand)',
      'UI/UX Heuristics & Accessibility',
      'Responsive, Data-Dense Interfaces',
    ],
    ambientGlow: 'rgba(99, 102, 241, 0.16)', // Indigo
    badge: 'Frontend & UI',
  },
  {
    id: 'api-backend-systems',
    number: '02',
    title: 'API & Backend Systems',
    description:
      'I design and build the backend logic that powers an app — clean APIs, secure auth, and services that hold up under real traffic.',
    features: [
      'REST API Design',
      'Authentication (JWT, OAuth)',
      'Backend Services (Node.js, FastAPI)',
      'Performance Optimization (Redis Caching)',
      'Query & Query-Layer Tuning',
    ],
    ambientGlow: 'rgba(56, 189, 248, 0.16)', // Cyan / Sky
    badge: 'API & Backend',
  },
  {
    id: 'cloud-devops',
    number: '03',
    title: 'Cloud & DevOps',
    description:
      'I set up the infrastructure and pipelines that get code from a laptop to production reliably and repeatably.',
    features: [
      'AWS Infrastructure (EC2, S3, Lambda, IAM)',
      'Docker Containerization',
      'CI/CD Pipelines (GitHub Actions, GitLab CI/CD)',
      'Environment & Deployment Management',
      'Automated Build/Test/Deploy Workflows',
    ],
    ambientGlow: 'rgba(45, 212, 191, 0.16)', // Teal
    badge: 'Cloud & CI/CD',
  },
  {
    id: 'database-architecture',
    number: '04',
    title: 'Database Architecture',
    description:
      'I design schemas and data layers that stay fast and consistent as an app grows.',
    features: [
      'Schema Design (PostgreSQL/Supabase, MongoDB, MySQL)',
      'Row-Level Security',
      'Indexing & Query Performance',
      'Data Validation & Integrity Checks',
      'Migration Planning',
    ],
    ambientGlow: 'rgba(245, 158, 11, 0.15)', // Amber
    badge: 'Data & Schemas',
  },
  {
    id: 'tech-support-observability',
    number: '05',
    title: 'Technical Support, Monitoring & Observability',
    description:
      "I keep production systems healthy — catching issues early, resolving incidents fast, and documenting fixes so they don't repeat.",
    features: [
      'System Health Monitoring',
      'Incident Management (ITIL)',
      'Root-Cause Analysis',
      'SOP & Runbook Authoring',
      'Tier 1/2 Application Support',
    ],
    ambientGlow: 'rgba(168, 85, 247, 0.16)', // Violet / Purple
    badge: 'Reliability & Ops',
  },
  {
    id: 'ai-systems-automation',
    number: '06',
    title: 'AI-Powered Systems & Automation',
    description:
      'I build AI-driven features and automate manual processes, replacing repetitive work with systems that run themselves.',
    features: [
      'AI Agent & RAG Systems',
      'Multi-Agent Workflows (LangGraph, AWS Bedrock)',
      'LLM Integration (Gemini, Google ADK)',
      'Workflow Automation (Power Automate, Python)',
      'Process Optimization',
    ],
    ambientGlow: 'rgba(236, 72, 153, 0.16)', // Pink / Magenta
    badge: 'AI & Automation',
  },
];

interface ServicesProps {
  onContactClick?: () => void;
}

export function Services({ onContactClick }: ServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active index based on scroll progress through the sticky track (6 services)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.min(Math.max(latest, 0), 0.999);
    const newIndex = Math.floor(clamped * SERVICES.length);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  const currentService = SERVICES[activeIndex];

  const scrollToService = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const stepHeight = containerHeight / SERVICES.length;
    const targetScroll = containerTop + stepHeight * index + 40;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative h-[480vh] bg-[#030407] text-[#e4e4e7]"
    >
      {/* Sticky Fullscreen Presentation Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 py-8 sm:py-12 select-none">
        
        {/* Subtle Horizontal Laser / Ambient Glow Beam */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Glowing horizontal laser streak across center */}
          <div className="absolute top-[50%] inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent blur-[1px]" />
          <div className="absolute top-[50%] inset-x-0 h-20 bg-gradient-to-r from-transparent via-teal-500/10 to-transparent blur-2xl" />

          {/* Dynamic Responsive Ambient Orb */}
          <motion.div
            animate={{
              backgroundColor: currentService.ambientGlow,
              x: activeIndex % 2 === 0 ? '-10%' : '12%',
              y: activeIndex < 3 ? '-6%' : '8%',
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] sm:h-[680px] sm:w-[680px] rounded-full blur-[140px] opacity-70 will-change-transform"
          />

          {/* Edge Vignettes */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#030407]/30 to-[#030407] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#030407] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#030407] to-transparent pointer-events-none" />
        </div>

        {/* Section Header (Editorial Italic Serif "Services" + "Where I put that to work") */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-2 sm:pt-4">
          <h2
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic font-normal text-white tracking-tight leading-none"
            style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
          >
            Services
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg font-normal text-zinc-300 mt-2 tracking-normal">
            Where I put that to work
          </p>
        </div>

        {/* Main Content Layout: Left Dynamic Visuals + Right Storytelling Column */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Rich Dark Visual / Mockup Canvas that smoothly crossfades */}
          <div className="lg:col-span-6 hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-[480px] aspect-[4/3.5] rounded-2xl bg-[#090b11]/85 border border-white/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden p-6 flex flex-col justify-between backdrop-blur-md">
              
              {/* Inner ambient glow */}
              <div
                className="absolute inset-0 transition-opacity duration-700 pointer-events-none opacity-30"
                style={{
                  background: `radial-gradient(circle at 70% 30%, ${currentService.ambientGlow}, transparent 70%)`,
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 h-full flex flex-col justify-between"
                >
                  {/* Top Mockup Toolbar Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.07]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {currentService.id}.workspace
                      </span>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full">
                      {currentService.badge}
                    </span>
                  </div>

                  {/* Bespoke Interactive UI / Node Graphic for each of the 6 Services */}
                  <div className="my-auto py-2">
                    {activeIndex === 0 && (
                      /* 01: Web & Frontend Development */
                      <div className="space-y-3 font-mono text-xs">
                        <div className="rounded-xl bg-black/60 border border-white/[0.08] p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-200 flex items-center gap-1.5">
                              <Layers className="h-3.5 w-3.5 text-indigo-400" />
                              <span>ZustandStore.tsx</span>
                            </span>
                            <span className="text-indigo-400">60 FPS &bull; Fast</span>
                          </div>
                          
                          {/* Visual Design Tokens & Spring Physics Blocks */}
                          <div className="grid grid-cols-4 gap-1.5 py-1">
                            <div className="h-6 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[9px] text-indigo-200">#Next15</div>
                            <div className="h-6 rounded bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-[9px] text-teal-200">#TypeScript</div>
                            <div className="h-6 rounded bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-[9px] text-sky-200">#Zustand</div>
                            <div className="h-6 rounded bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-[9px] text-purple-200">#WCAG_AA</div>
                          </div>

                          <p className="text-[11px] font-sans text-zinc-400">
                            Fast, accessible, and type-safe component systems with responsive state sync.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Lighthouse Score</span>
                            <span className="text-white font-semibold">100 / 100</span>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Accessibility</span>
                            <span className="text-emerald-400 font-semibold">WCAG AA Pass</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeIndex === 1 && (
                      /* 02: API & Backend Systems */
                      <div className="space-y-3 font-mono text-xs">
                        <div className="rounded-xl bg-black/60 border border-white/[0.08] p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                            <span className="text-zinc-200 flex items-center gap-1.5">
                              <Server className="h-3.5 w-3.5 text-sky-400" />
                              <span>fastapi_auth_router.py</span>
                            </span>
                            <span className="text-emerald-400">HTTP 200 &bull; 8ms</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                            <div className="h-full w-4/5 bg-sky-400/80 rounded-full" />
                          </div>
                          <p className="text-[11px] font-sans text-zinc-400">
                            JWT/OAuth secure token verification with sub-10ms Redis caching tier.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Throughput</span>
                            <span className="text-white font-semibold">15,000 req/s</span>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Cache Hit Rate</span>
                            <span className="text-emerald-400 font-semibold">96.4%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeIndex === 2 && (
                      /* 03: Cloud & DevOps */
                      <div className="space-y-3 font-mono text-xs">
                        <div className="rounded-xl bg-black/60 border border-white/[0.08] p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-200 flex items-center gap-1.5">
                              <Cloud className="h-3.5 w-3.5 text-teal-400" />
                              <span>aws-cdk-pipeline.yml</span>
                            </span>
                            <span className="text-teal-400">AWS + Docker</span>
                          </div>

                          {/* Node Connectors */}
                          <div className="flex items-center justify-between text-[10px] bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                            <span className="text-zinc-300">Lambda &bull; S3 &bull; EC2 Fargate</span>
                            <span className="text-emerald-400">&bull; Passing</span>
                          </div>

                          <p className="text-[11px] font-sans text-zinc-400">
                            Automated GitHub Actions CI/CD with immutable containerized artifacts.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Build/Deploy Time</span>
                            <span className="text-white font-semibold">&lt; 2.5 Mins</span>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Rollback SLA</span>
                            <span className="text-emerald-400 font-semibold">Instant (0s)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeIndex === 3 && (
                      /* 04: Database Architecture */
                      <div className="space-y-3 font-mono text-xs">
                        <div className="rounded-xl bg-black/60 border border-white/[0.08] p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-200 flex items-center gap-1.5">
                              <Database className="h-3.5 w-3.5 text-amber-400" />
                              <span>schema_rls_policy.sql</span>
                            </span>
                            <span className="text-amber-400">PostgreSQL</span>
                          </div>

                          <div className="text-[10px] text-zinc-400 space-y-1 font-mono">
                            <div className="text-emerald-400">✓ Row-Level Security Enforced</div>
                            <div className="text-zinc-300">✓ B-Tree Composite Index Active</div>
                          </div>

                          <p className="text-[11px] font-sans text-zinc-400">
                            Normalized schema design, atomic transaction safety, and migration planning.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Query Time</span>
                            <span className="text-white font-semibold">&lt; 4ms Index Scan</span>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Data Integrity</span>
                            <span className="text-emerald-400 font-semibold">100% ACID</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeIndex === 4 && (
                      /* 05: Technical Support, Monitoring & Observability */
                      <div className="space-y-3 font-mono text-xs">
                        <div className="rounded-xl bg-black/60 border border-white/[0.08] p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-200 flex items-center gap-1.5">
                              <Activity className="h-3.5 w-3.5 text-purple-400" />
                              <span>itil_incident_stream.log</span>
                            </span>
                            <span className="text-purple-400">Observability</span>
                          </div>

                          <div className="text-[10px] text-zinc-400 space-y-1 font-mono">
                            <div className="text-emerald-400">[Resolved] Zero Production Deadlocks</div>
                            <div className="text-zinc-300">[SOP] Automated Diagnostic Runbook Executed</div>
                          </div>

                          <p className="text-[11px] font-sans text-zinc-400">
                            Root-cause incident triage, real-time health metrics, and comprehensive SOPs.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">SLA Compliance</span>
                            <span className="text-white font-semibold">99.9% Uptime</span>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">MTTR</span>
                            <span className="text-emerald-400 font-semibold">&lt; 10 Mins</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeIndex === 5 && (
                      /* 06: AI-Powered Systems & Automation */
                      <div className="space-y-3 font-mono text-xs">
                        <div className="rounded-xl bg-black/60 border border-white/[0.08] p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-200 flex items-center gap-1.5">
                              <Bot className="h-3.5 w-3.5 text-pink-400" />
                              <span>langgraph_agent_pipeline.py</span>
                            </span>
                            <span className="text-pink-400">RAG Agent</span>
                          </div>

                          <div className="text-[10px] text-zinc-400 space-y-1 font-mono">
                            <div className="text-emerald-400">✓ Vector Store Retrieval &bull; Top-k: 5</div>
                            <div className="text-zinc-300">✓ Autonomous Tool Call Executed</div>
                          </div>

                          <p className="text-[11px] font-sans text-zinc-400">
                            Multi-agent orchestration (LangGraph, AWS Bedrock) and workflow automation.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Time Saved</span>
                            <span className="text-white font-semibold">85%+ Manual Work</span>
                          </div>
                          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2.5">
                            <span className="text-[10px] text-zinc-500 block uppercase font-sans">Accuracy</span>
                            <span className="text-emerald-400 font-semibold">Grounded (Zero Hallucination)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Details */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.07] text-[11px] text-zinc-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-3 w-3 text-teal-400" />
                      <span>{currentService.title}</span>
                    </span>
                    <span>Ready for Production</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Clean, Non-Overlapping Scroll-Driven Storytelling */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Dynamic Service Text with AnimatePresence mode="wait" to eliminate ghosting/overlap */}
            <div className="min-h-[300px] sm:min-h-[330px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(3px)' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {/* Service Title (Clean, bold, prominent) */}
                  <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                    {currentService.title}
                  </h3>

                  {/* Concise Description Paragraph */}
                  <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed max-w-xl">
                    {currentService.description}
                  </p>

                  {/* Subtle Divider Line */}
                  <div className="w-full h-px bg-white/[0.12] my-4" />

                  {/* Features List with `// ` prefix */}
                  <div className="space-y-2 font-sans">
                    {currentService.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-normal tracking-wide"
                      >
                        <span className="font-mono text-teal-400 font-medium select-none">
                          //
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Persistent Section Skeleton: Single Contact Button & Step Navigation */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between gap-4 mt-2">
              
              {/* Persistent Neon Blue Glowing Contact Button */}
              <div className="relative inline-flex items-center justify-center">
                <button
                  onClick={onContactClick}
                  data-cursor-text="TALK"
                  className="neon-blue-btn relative rounded-full px-8 py-2.5 text-xs sm:text-sm font-medium tracking-wide text-white cursor-pointer select-none"
                >
                  <span className="relative z-10 font-normal">Contact</span>

                  {/* Glowing accent indicator dot at the bottom center */}
                  <span
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-[#c9ab86] shadow-[0_0_8px_rgba(201,171,134,0.8)] border border-[#dfc3a2] pointer-events-none"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Step Navigation Dots for all 6 services */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500 mr-2">
                  0{activeIndex + 1} / 0{SERVICES.length}
                </span>
                {SERVICES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToService(idx)}
                    className="group p-1 cursor-pointer"
                    aria-label={`Jump to ${s.title}`}
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? 'w-6 bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]'
                          : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                      }`}
                    />
                  </button>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Section Bottom Sub-navigation Cue */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-white/[0.05]">
          <span className="hidden sm:inline-block">Scroll down to explore capabilities</span>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-zinc-400 font-mono">{currentService.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
