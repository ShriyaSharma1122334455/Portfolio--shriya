import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] py-10 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="font-medium text-zinc-300">Shriya Sharma</span>
          <span>&bull;</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <span>Back to top</span>
          <ArrowUp className="h-3 w-3" />
        </button>
      </div>
    </footer>
  );
}
