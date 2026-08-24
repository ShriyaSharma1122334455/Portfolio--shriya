import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Layout,
  Server,
  Database,
  Cloud,
  Bot,
  ShieldCheck,
  BarChart3,
  Users,
  Palette,
  Sparkles,
  Pause,
  Play,
  RotateCw,
  Layers,
  CheckCircle2,
  Cpu,
  ChevronRight,
  Workflow
} from 'lucide-react';

export interface SkillCategory {
  id: string;
  number: string;
  name: string;
  icon: typeof Terminal;
  accentColor: string;
  accentGlow: string;
  tagline: string;
  previewSkills: string[];
  allSkills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    number: '01',
    name: 'Languages',
    icon: Terminal,
    accentColor: '#38bdf8', // Sky
    accentGlow: 'rgba(56, 189, 248, 0.25)',
    tagline: 'Core languages & structured programming syntax',
    previewSkills: ['Python', 'TypeScript', 'JavaScript'],
    allSkills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'],
  },
  {
    id: 'frontend',
    number: '02',
    name: 'Frontend',
    icon: Layout,
    accentColor: '#818cf8', // Indigo
    accentGlow: 'rgba(129, 140, 248, 0.25)',
    tagline: 'Modern component systems, reactive state & fluid UX',
    previewSkills: ['React 19', 'Next.js', 'Tailwind CSS'],
    allSkills: [
      'React.js / React 19',
      'React Native',
      'Next.js',
      'Tailwind CSS',
      'Vite',
      'Zustand',
      'Recharts',
      'JWT',
    ],
  },
  {
    id: 'backend',
    number: '03',
    name: 'Backend',
    icon: Server,
    accentColor: '#2dd4bf', // Teal
    accentGlow: 'rgba(45, 212, 191, 0.25)',
    tagline: 'Resilient APIs, microservices & distributed caching',
    previewSkills: ['Node.js', 'FastAPI', 'REST APIs'],
    allSkills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Redis'],
  },
  {
    id: 'databases',
    number: '04',
    name: 'Databases',
    icon: Database,
    accentColor: '#fbbf24', // Amber
    accentGlow: 'rgba(251, 191, 36, 0.25)',
    tagline: 'Relational schemas, NoSQL & transactional integrity',
    previewSkills: ['PostgreSQL', 'MongoDB', 'Supabase'],
    allSkills: [
      'PostgreSQL / Supabase',
      'MongoDB',
      'MySQL',
      'CockroachDB',
      'DynamoDB',
    ],
  },
  {
    id: 'cloud-devops',
    number: '05',
    name: 'Cloud & DevOps',
    icon: Cloud,
    accentColor: '#38bdf8', // Cyan/Sky
    accentGlow: 'rgba(56, 189, 248, 0.25)',
    tagline: 'Cloud infrastructure, CI/CD automation & containers',
    previewSkills: ['AWS', 'Docker', 'GitHub Actions'],
    allSkills: [
      'AWS',
      'EC2',
      'S3',
      'Lambda',
      'IAM',
      'Docker',
      'GitHub Actions',
      'GitLab CI/CD',
      'Terraform',
      'Vercel',
    ],
  },
  {
    id: 'ai-llm',
    number: '06',
    name: 'AI / LLM',
    icon: Bot,
    accentColor: '#f472b6', // Pink
    accentGlow: 'rgba(244, 114, 182, 0.25)',
    tagline: 'Multi-agent orchestration, RAG & LLM integration',
    previewSkills: ['Multi-Agent', 'LangGraph', 'Gemini'],
    allSkills: [
      'Multi-Agent Systems',
      'LangGraph',
      'RAG',
      'Google ADK',
      'AWS Bedrock',
      'Gemini',
      'Vector Search',
    ],
  },
  {
    id: 'itsm-support',
    number: '07',
    name: 'ITSM & IT Support',
    icon: ShieldCheck,
    accentColor: '#c084fc', // Purple
    accentGlow: 'rgba(192, 132, 252, 0.25)',
    tagline: 'Incident management, ITIL standards & runbook authoring',
    previewSkills: ['ServiceNow', 'ITIL', 'IAM'],
    allSkills: [
      'ServiceNow',
      'Active Directory',
      'IAM',
      'ITIL',
      'Application Management & Support',
      'SLA Management',
      'Ticketing Systems',
      'Tier 1 & 2 Support',
      'System Health Monitoring',
      'Root-Cause Analysis',
      'SOP & Runbook Authoring',
    ],
  },
  {
    id: 'reporting-analytics',
    number: '08',
    name: 'Reporting & Analytics',
    icon: BarChart3,
    accentColor: '#34d399', // Emerald
    accentGlow: 'rgba(52, 211, 153, 0.25)',
    tagline: 'BI dashboards, KPI metrics & operational visibility',
    previewSkills: ['Tableau', 'Power BI', 'JIRA'],
    allSkills: [
      'Tableau',
      'Power BI',
      'Excel',
      'Dashboard Development',
      'JIRA',
    ],
  },
  {
    id: 'project-management',
    number: '09',
    name: 'Project & Team Management',
    icon: Users,
    accentColor: '#fb923c', // Orange
    accentGlow: 'rgba(251, 146, 60, 0.25)',
    tagline: 'Agile sprints, cross-functional delivery & SDLC leadership',
    previewSkills: ['Agile / Scrum', 'SDLC', 'Sprint Planning'],
    allSkills: [
      'Agile',
      'Sprint Planning',
      'Scrum',
      'SDLC',
      'Test-Driven Development',
      'Jira',
      'Cross-Functional Collaboration',
      'Stakeholder Communication',
      'Team Leadership & Delegation',
      'Onboarding/Offboarding',
      'Mentorship',
      'Process Improvement',
    ],
  },
  {
    id: 'design-systems-ux',
    number: '10',
    name: 'Design Systems & UX',
    icon: Palette,
    accentColor: '#2dd4bf', // Teal
    accentGlow: 'rgba(45, 212, 191, 0.25)',
    tagline: 'Heuristic evaluation, accessibility & token architectures',
    previewSkills: ['UI/UX Heuristics', 'Gestalt', 'Accessibility'],
    allSkills: [
      'UI/UX Heuristics',
      'Nielsen',
      'Gestalt',
      'Norman',
      'Accessibility-Aware Design',
      'Component-System Design',
      'Visual Hierarchy',
      'Data-Density Design',
    ],
  },
];

const TOOLS_AND_PLATFORMS = [
  'Power Automate',
  'Microsoft 365',
  'Microsoft Suite',
  'Google Workspace',
  'PyTest',
  'GitHub',
];

export function Skills() {
  const [angle, setAngle] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const angleRef = useRef(0);
  const isPausedRef = useRef(false);
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const [orbitDimensions, setOrbitDimensions] = useState({ rx: 380, ry: 155 });

  // Detect user's reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Update orbital radii dynamically based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (!orbitContainerRef.current) return;
      const width = orbitContainerRef.current.clientWidth;
      if (width < 640) {
        setOrbitDimensions({ rx: Math.min(width * 0.42, 170), ry: 80 });
      } else if (width < 1024) {
        setOrbitDimensions({ rx: Math.min(width * 0.44, 300), ry: 120 });
      } else {
        setOrbitDimensions({ rx: 400, ry: 150 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Continuous, smooth 60fps orbital rotation loop
  // Rotation takes ~26 seconds for a full 360-degree cycle (calm, slow, non-distracting)
  useEffect(() => {
    if (isReducedMotion) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const loop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Only advance rotation if neither mouse hover nor manual pause is active
      if (!isPausedRef.current && !isManualPaused) {
        const speed = (2 * Math.PI) / 26000; // ~26 seconds full cycle
        angleRef.current = (angleRef.current + speed * deltaTime) % (2 * Math.PI);
        setAngle(angleRef.current);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isReducedMotion, isManualPaused]);

  // Compute 3D position, depth, opacity and scale for each category card along the ellipse
  const totalCards = SKILL_CATEGORIES.length;
  const cardsData = useMemo(() => {
    return SKILL_CATEGORIES.map((cat, idx) => {
      // Angular offset for 10 uniformly spaced cards
      const cardAngle = (angle + (idx * (2 * Math.PI)) / totalCards) % (2 * Math.PI);

      // Orbital ellipse trigonometry
      // x: horizontal translation
      // y: vertical translation (squished for tilted 3D perspective)
      // z: depth factor where +1 is front/closest and -1 is back/farthest
      const x = Math.sin(cardAngle) * orbitDimensions.rx;
      const y = -Math.cos(cardAngle) * orbitDimensions.ry;
      const z = Math.cos(cardAngle); // Front: +1, Back: -1

      // Normalized depth factor from 0 (back) to 1 (front)
      const depthRatio = (z + 1) / 2;

      // Subtle scale and opacity gradients for depth of field
      const scale = 0.82 + 0.26 * depthRatio;
      const opacity = 0.42 + 0.58 * Math.pow(depthRatio, 1.25);
      const zIndex = Math.round(depthRatio * 40) + 10;
      const blur = Math.max(0, (1 - depthRatio) * 1.8);

      return {
        ...cat,
        index: idx,
        cardAngle,
        x,
        y,
        z,
        depthRatio,
        scale,
        opacity,
        zIndex,
        blur,
      };
    });
  }, [angle, totalCards, orbitDimensions]);

  // Find the natural front-most focal card (highest z)
  const frontCard = useMemo(() => {
    return cardsData.reduce((prev, curr) => (curr.z > prev.z ? curr : prev), cardsData[0]);
  }, [cardsData]);

  // Determine which category is currently focused (hovered, clicked, or front-most)
  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex !== null ? selectedIndex : frontCard.index;
  const activeCategory = SKILL_CATEGORIES[activeIndex];

  // Pause and resume handlers that preserve exact current rotation position
  const handleCardMouseEnter = useCallback((index: number) => {
    isPausedRef.current = true;
    setHoveredIndex(index);
  }, []);

  const handleCarouselMouseLeave = useCallback(() => {
    isPausedRef.current = false;
    setHoveredIndex(null);
  }, []);

  const handleSelectCategory = (index: number) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#030407] text-[#e4e4e7] overflow-hidden select-none"
    >
      {/* Background Soft Atmospheric Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle radial center glow matching active category */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[450px] sm:h-[600px] rounded-full blur-[140px] opacity-25 transition-colors duration-1000"
          style={{ backgroundColor: activeCategory.accentColor }}
        />
        {/* Soft edge vignetting */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#030407]/50 to-[#030407] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-white/[0.06] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-teal-400 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>04 &bull; Technical Repertoire</span>
            </div>
            <h2
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
            >
              Technical Stack
            </h2>
          </div>

          {/* Quick Stats & Controls Bar */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              <span>10 Core Domains &bull; Continuous Orbit</span>
            </div>

            {/* Accessible Pause/Play Button */}
            {!isReducedMotion && (
              <button
                onClick={() => {
                  setIsManualPaused((prev) => {
                    const next = !prev;
                    isPausedRef.current = next || hoveredIndex !== null;
                    return next;
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
                title={isManualPaused ? 'Resume Carousel' : 'Pause Carousel'}
                aria-label={isManualPaused ? 'Resume Carousel' : 'Pause Carousel'}
              >
                {isManualPaused ? (
                  <>
                    <Play className="h-3 w-3 text-teal-400" />
                    <span className="hidden sm:inline text-[11px]">Resume</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-3 w-3 text-zinc-400" />
                    <span className="hidden sm:inline text-[11px]">Pause</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET: AUTOMATIC ROTATING ARC / RADIAL CAROUSEL */}
        {/* ========================================================================= */}
        <div
          ref={orbitContainerRef}
          onMouseLeave={handleCarouselMouseLeave}
          className="relative w-full h-[520px] sm:h-[560px] md:h-[600px] flex items-center justify-center hidden sm:flex my-2"
        >
          {/* Orbital Ambient SVG Rings and Depth Ellipses */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Outer Subtle Orbit Guide Ring */}
            <div
              className="absolute rounded-full border border-white/[0.05] pointer-events-none"
              style={{
                width: `${orbitDimensions.rx * 2 + 100}px`,
                height: `${orbitDimensions.ry * 2 + 60}px`,
                transform: 'rotateX(0deg)',
              }}
            />
            {/* Main Elliptical Orbit Track */}
            <div
              className="absolute rounded-full border border-teal-500/[0.12] shadow-[0_0_50px_rgba(45,212,191,0.04)] pointer-events-none"
              style={{
                width: `${orbitDimensions.rx * 2}px`,
                height: `${orbitDimensions.ry * 2}px`,
                borderStyle: 'dashed',
                borderDasharray: '4 8',
              }}
            />
            {/* Inner Core Guide Ring */}
            <div
              className="absolute rounded-full border border-white/[0.04] pointer-events-none"
              style={{
                width: `${orbitDimensions.rx * 1.2}px`,
                height: `${orbitDimensions.ry * 1.2}px`,
              }}
            />
          </div>

          {/* Central Calming Anchor Element */}
          <div className="relative z-20 pointer-events-none flex flex-col items-center justify-center text-center max-w-[280px] sm:max-w-[340px] px-6 py-5 rounded-2xl bg-[#07090e]/80 border border-white/[0.08] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono uppercase tracking-widest text-teal-400 mb-2">
              <Layers className="h-3 w-3" />
              <span>What I Work With</span>
            </div>

            <h3
              className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-1.5"
              style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
            >
              Technical Skills
            </h3>

            <p className="font-sans text-xs text-zinc-400 font-normal leading-relaxed">
              Building across applications, cloud infrastructure, AI systems, and technical support.
            </p>

            {/* Currently Active Indicator Cue */}
            <div className="mt-3 pt-2.5 border-t border-white/[0.06] w-full flex items-center justify-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: activeCategory.accentColor }}
              />
              <span className="text-[11px] font-mono text-zinc-300 truncate">
                {activeCategory.name}
              </span>
            </div>
          </div>

          {/* 10 Orbiting Category Cards */}
          {cardsData.map((card) => {
            const Icon = card.icon;
            const isHovered = hoveredIndex === card.index;
            const isSelected = selectedIndex === card.index;
            const isFocal = (hoveredIndex === null && selectedIndex === null && card.index === frontCard.index);
            const isProminent = isHovered || isSelected || isFocal;

            return (
              <div
                key={card.id}
                onMouseEnter={() => handleCardMouseEnter(card.index)}
                onClick={() => handleSelectCategory(card.index)}
                style={{
                  transform: `translate3d(${card.x}px, ${card.y}px, 0) scale(${
                    isProminent ? card.scale * 1.05 : card.scale
                  })`,
                  opacity: isProminent ? 1 : isHovered === false && hoveredIndex !== null ? 0.35 : card.opacity,
                  zIndex: isProminent ? 50 : card.zIndex,
                  filter: isProminent ? 'none' : `blur(${card.blur}px)`,
                  transition: 'opacity 0.25s ease, filter 0.25s ease, border-color 0.25s ease',
                }}
                className="absolute w-[180px] sm:w-[210px] md:w-[230px] rounded-xl cursor-pointer will-change-transform"
                role="button"
                tabIndex={0}
                aria-label={`Category ${card.name}`}
              >
                <div
                  className={`relative p-3.5 sm:p-4 rounded-xl backdrop-blur-md transition-all duration-300 ${
                    isProminent
                      ? 'bg-[#0c0f17]/95 border shadow-[0_15px_35px_rgba(0,0,0,0.85)]'
                      : 'bg-[#080a10]/85 border border-white/[0.06] shadow-lg'
                  }`}
                  style={{
                    borderColor: isProminent ? card.accentColor : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isProminent
                      ? `0 0 24px -4px ${card.accentGlow}, 0 20px 30px -10px rgba(0,0,0,0.8)`
                      : undefined,
                  }}
                >
                  {/* Card Header: Icon + Category Number & Name */}
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="p-1.5 rounded-lg border flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: isProminent ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                        borderColor: isProminent ? card.accentColor : 'rgba(255,255,255,0.06)',
                        color: card.accentColor,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500">
                      {card.number}
                    </span>
                  </div>

                  {/* Category Title */}
                  <h4
                    className={`text-xs sm:text-sm font-semibold tracking-tight transition-colors line-clamp-1 ${
                      isProminent ? 'text-white' : 'text-zinc-300'
                    }`}
                  >
                    {card.name}
                  </h4>

                  {/* Representative Skills Preview Chips */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {card.previewSkills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-[10px] px-1.5 py-0.5 rounded transition-colors whitespace-nowrap ${
                          isProminent
                            ? 'bg-white/[0.08] text-zinc-200 border border-white/[0.12]'
                            : 'bg-white/[0.03] text-zinc-400 border border-white/[0.04]'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Subtle active indicator bar */}
                  {isProminent && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute -bottom-px left-4 right-4 h-0.5 rounded-full"
                      style={{ backgroundColor: card.accentColor }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MOBILE / REDUCED MOTION: REFINED INTERACTIVE CATEGORY CAROUSEL & GRID */}
        {/* ========================================================================= */}
        <div className="w-full sm:hidden flex flex-col gap-4 my-2">
          {/* Mobile Category Horizontal Pill Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`snap-start shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-white/[0.1] text-white border border-teal-400/40 shadow-[0_0_12px_rgba(45,212,191,0.15)]'
                      : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: cat.accentColor }} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE / FOCUSED CATEGORY DETAILED BREAKDOWN HUD */}
        {/* Clean, high-contrast, reveals all individual technologies clearly */}
        {/* ========================================================================= */}
        <div className="w-full mt-4 sm:mt-6">
          <div className="relative rounded-2xl bg-[#090c13]/90 border border-white/[0.08] backdrop-blur-xl p-5 sm:p-7 md:p-8 shadow-2xl overflow-hidden">
            {/* Accent Ambient Glow in Detail Panel */}
            <div
              className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-[90px] opacity-15 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: activeCategory.accentColor }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left: Category Info & Tagline */}
                <div className="space-y-2 md:max-w-md">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="p-2 rounded-xl border flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        borderColor: activeCategory.accentColor,
                        color: activeCategory.accentColor,
                      }}
                    >
                      <activeCategory.icon className="h-5 w-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                        Category {activeCategory.number} / 10
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {activeCategory.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                    {activeCategory.tagline}
                  </p>
                </div>

                {/* Right: Full Skill Tech Badges */}
                <div className="flex-1 md:max-w-2xl">
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>Individual Technologies & Protocols</span>
                    <span className="text-zinc-400">{activeCategory.allSkills.length} Skills</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeCategory.allSkills.map((skill, sIdx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: sIdx * 0.02 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-200 transition-colors"
                      >
                        <CheckCircle2
                          className="h-3 w-3"
                          style={{ color: activeCategory.accentColor }}
                        />
                        <span>{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Category Quick Selector Track */}
            <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline-block whitespace-nowrap">
                Jump to category:
              </span>

              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all whitespace-nowrap cursor-pointer ${
                      idx === activeIndex
                        ? 'bg-white/[0.12] text-white border border-white/[0.2] font-semibold'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                    }`}
                  >
                    {cat.number} {cat.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPLEMENTARY TOOLS & PLATFORMS FOOTER BAR */}
        {/* ========================================================================= */}
        <div className="w-full mt-6 rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Workflow className="h-4 w-4 text-teal-400" />
            <span className="uppercase tracking-wider text-zinc-300 font-semibold">
              Tools & Platforms
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {TOOLS_AND_PLATFORMS.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 font-normal"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

