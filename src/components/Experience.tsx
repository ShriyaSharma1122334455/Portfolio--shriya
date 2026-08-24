import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      role: 'Cloud & Software Engineer',
      company: 'Apex Cloud Solutions',
      period: '2024 — Present',
      location: 'San Francisco, CA (Remote)',
      type: 'Full-Time',
      description: 'Designing distributed microservices, infrastructure-as-code deployments (Terraform, AWS ECS/Fargate), and multi-tenant architectures.',
      achievements: [
        'Reduced deployment latency by 45% using Dockerized automated GitHub Actions pipelines.',
        'Architected serverless API gateways processing 1.5M+ daily requests with 99.98% reliability.',
        'Spearheaded frontend design system migration to Next.js and Tailwind with sub-second page loads.',
      ],
      skills: ['AWS', 'TypeScript', 'Node.js', 'Terraform', 'React', 'Docker', 'PostgreSQL'],
    },
    {
      role: 'Frontend Developer & UI Engineer',
      company: 'Veloce Digital Labs',
      period: '2023 — 2024',
      location: 'Remote',
      type: 'Contract',
      description: 'Developed responsive, high-performance dashboards, creative web applications, and real-time state management interfaces.',
      achievements: [
        'Built dynamic interactive data visualization modules with Framer Motion and D3 charts.',
        'Optimized core Web Vitals from 68 to 98 across 6 high-traffic client portals.',
        'Authored reusable UI component library used across 8 distributed team members.',
      ],
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs'],
    },
    {
      role: 'Technical Support Engineer',
      company: 'CloudScale Technologies',
      period: '2022 — 2023',
      location: 'Hybrid',
      type: 'Full-Time',
      description: 'Provided Tier 3 technical escalations, root-cause bug debugging, network diagnostic investigations, and enterprise SLA management.',
      achievements: [
        'Resolved 350+ complex technical incidents including DNS anomalies, SSL handshakes, and database deadlocks.',
        'Authored 25+ comprehensive diagnostic runbooks and internal knowledge base articles.',
        'Awarded Top Technical Problem Solver for maintaining a 98.6% positive customer satisfaction rating.',
      ],
      skills: ['Linux/Unix', 'Bash Scripting', 'SQL', 'Postman', 'Log Analysis', 'Incident Management'],
    },
  ];

  return (
    <section id="experience" className="relative py-24 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <span className="text-xs font-medium tracking-widest text-teal-400 uppercase">
            02 &bull; Experience
          </span>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white"
            style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
          >
            Career Journey
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-medium text-zinc-300">
                    {exp.company}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                    {exp.period}
                  </span>
                  <span>&bull;</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400/80 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
