import { useState, type FormEvent } from "react";
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  Github,
  Linkedin,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { sendContactMessage } from "../lib/sendContactMessage";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot
  });

  const emailAddress = "shriyasharma2152@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    const result = await sendContactMessage(formData);

    if (result.ok) {
      setStatus("sent");
      // Only clear once it has actually been delivered, so a failed send
      // never costs the visitor what they typed.
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
      });
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <span className="text-xs font-medium tracking-widest text-teal-400 uppercase">
            06 &bull; Contact
          </span>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white"
            style={{
              fontFamily:
                "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            Let's connect & build
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg">
            Have an open software or cloud engineering role, or a project in
            mind? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider block">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-sm font-medium text-white hover:text-indigo-300 transition-colors"
                >
                  {emailAddress}
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              {copied && (
                <span className="text-xs text-emerald-400 font-mono block">
                  Copied to clipboard!
                </span>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider px-1 block">
                Profiles
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href="https://github.com/ShriyaSharma1122334455"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card glass-card-hover rounded-xl p-3.5 flex items-center justify-between text-xs text-zinc-300 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="h-4 w-4" />
                    <span>github.com/ShriyaSharma</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                </a>

                <a
                  href="https://www.linkedin.com/in/shriyasharmacs26/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card glass-card-hover rounded-xl p-3.5 flex items-center justify-between text-xs text-zinc-300 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="h-4 w-4" />
                    <span>linkedin.com/in/shriyasharma</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs text-zinc-300 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">
                  Current Availability
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Open for full-time Software Engineer, Data Analyst, Frontend
                roles and freelance projects. Feel free to reach out with any
                opportunities or collaborations.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 glass-card rounded-2xl p-6 sm:p-8">
            <h3 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-indigo-400" />
              Send a Message
            </h3>

            {status === "sent" ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                <div className="inline-flex p-2.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Message sent
                </h4>
                <p className="text-xs text-zinc-300 max-w-xs mx-auto">
                  Thank you for reaching out. Shriya will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
                {/* Honeypot — hidden from people, irresistible to bots. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="hidden"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Alex Morgan"
                      className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:border-indigo-400/60 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@company.com"
                      className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:border-indigo-400/60 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Role Opportunity / Project inquiry"
                    className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:border-indigo-400/60 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project, timeline, or team..."
                    className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:border-indigo-400/60 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-200"
                  >
                    <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-red-400" />
                    <span className="leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-xl bg-white hover:bg-zinc-200 disabled:bg-zinc-400 disabled:cursor-not-allowed text-zinc-950 py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
