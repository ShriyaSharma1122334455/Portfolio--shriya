import { Cloud, Code2, Cpu, ShieldCheck } from 'lucide-react';

export function About() {
  const highlights = [
    {
      icon: Cloud,
      title: 'Cloud & Infrastructure',
      desc: 'Architecting resilient multi-region infrastructure on AWS & GCP with automated CI/CD and container workflows.',
    },
    {
      icon: Code2,
      title: 'Frontend Engineering',
      desc: 'Crafting responsive, accessible, and high-performance interfaces with modern React, TypeScript, and fluid animations.',
    },
    {
      icon: Cpu,
      title: 'Backend Systems',
      desc: 'Building reliable REST/GraphQL microservices, optimizing database queries, and managing distributed caching.',
    },
    {
      icon: ShieldCheck,
      title: 'Reliability & Support',
      desc: 'Deep-dive incident investigation, monitoring with Prometheus/Grafana, and maintaining high SLA availability.',
    },
  ];

  return (
    <section id="about" className="relative py-24 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <span className="text-xs font-medium tracking-widest text-teal-400 uppercase">
            01 &bull; About
          </span>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white"
            style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif" }}
          >
            Engineering with focus & clarity
          </h2>
        </div>

        {/* Narrative */}
        <div className="space-y-4 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
          <p>
            I am <strong className="text-white font-semibold">Shriya Sharma</strong>, a software engineer specializing in scalable cloud architectures, full-stack systems, and polished web interfaces.
          </p>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            I believe great digital tools balance reliability with simplicity. From setting up automated zero-downtime deployments to refining UI interactions, my goal is to build software that is durable, intuitive, and enjoyable to use.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-indigo-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
