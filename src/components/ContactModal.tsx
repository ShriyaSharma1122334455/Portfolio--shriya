import { useState, useEffect, type FormEvent } from 'react';
import { X, Send, Check, Mail, Copy, Loader2, AlertCircle } from 'lucide-react';
import { sendContactMessage } from '../lib/sendContactMessage';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '', // honeypot
  });

  const emailAddress = 'shriyasharma2152@gmail.com';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setErrorMessage('');

    const result = await sendContactMessage(formData);

    if (result.ok) {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '', company: '' });
      // Give the confirmation a beat to be read before the dialog closes.
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2500);
    } else {
      setStatus('error');
      setErrorMessage(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div
        className="relative w-full max-w-md glass-card rounded-2xl p-6 sm:p-7 shadow-2xl bg-[#0f121a] border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          <h3 className="font-display text-lg font-bold text-white">Get in touch</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Email Copy */}
        <div className="mb-5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-200">{emailAddress}</span>
          </div>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {status === 'sent' ? (
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
            <Check className="h-5 w-5 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-semibold text-white">Thank you!</h4>
            <p className="text-xs text-zinc-300">Shriya Sharma will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Honeypot — hidden from people, irresistible to bots. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="hidden"
            />
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-indigo-400/60 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-indigo-400/60 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Message</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can Shriya assist your team?"
                className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-indigo-400/60 focus:outline-none resize-none"
              />
            </div>
            {status === 'error' && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2 text-[11px] text-red-200"
              >
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-red-400" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-xl bg-white hover:bg-zinc-200 disabled:bg-zinc-400 disabled:cursor-not-allowed text-zinc-950 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span>Send Inquiry</span>
                  <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
