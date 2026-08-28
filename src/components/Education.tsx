import { GraduationCap, Award, CheckCircle2 } from "lucide-react";

export function Education() {
  const credentials = [
    {
      type: "Degree",
      title: "M.S. Computer Science",
      institution: "New Jersey Institute of Technology, Newark, NJ",
      period: "Sept 2022 — May 2026",
      details: "GPA: 3.6/4.0",
      Courses: [
        "Advanced Algorithms",
        "Machine Learning",
        "Cloud Computing",
        "Data Structures",
      ],
    },
    {
      type: "Degree",
      title: "Bachelor's of Engineering, Information Technology",
      institution: "University of Mumbai",
      period: "Completed Jun 2022",
      details: "GPA: 3.5/4.0",
    },
    {
      type: "Certification",
      title: "AWS Certified Cloud Practitioner",
      institution: "Amazon Web Services",
      period: "Feb 2026",
      details: "Hands-on labs with EC2, S3, Lambda, and IAM.",
    },
  ];

  return (
    <section
      id="education"
      className="relative py-24 px-6 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          {/* <span className="text-xs font-medium tracking-widest text-teal-400 uppercase">
            05 &bull; Education & Certifications
          </span> */}
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white"
            style={{
              fontFamily:
                "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            Academic & Credentials
          </h2>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.06] mb-4">
                  <span className="text-[11px] font-medium text-indigo-400">
                    {cred.type}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    {cred.period}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1 leading-snug">
                  {cred.title}
                </h3>
                <div className="text-xs text-zinc-400 mb-3">
                  {cred.institution}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {cred.details}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center gap-1.5 text-xs text-zinc-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/80" />
                <span>Verified Credential</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
