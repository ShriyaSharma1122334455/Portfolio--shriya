import { useState, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onContactClick: () => void;
}

export function Navbar({ onContactClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Career Journey", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#030407]/80 backdrop-blur-md py-4 border-b border-white/[0.04]"
            : "bg-transparent py-7 sm:py-9"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
          {/* Signature Brand Mark (Matching Yaroslav script logo) */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-2xl sm:text-3xl text-white font-script tracking-wide hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'MonteCarlo', cursive" }}
          >
            <span>Shriya</span>
          </a>

          {/* Desktop Minimal Nav & Action */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-normal tracking-wide text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              onClick={onContactClick}
              className="rounded-full bg-white/10 hover:bg-white text-zinc-200 hover:text-black border border-white/15 hover:border-white px-4 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Minimal 2-Line Hamburger Menu Icon (Exact yaros.me style) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 p-1 group cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-transform duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-transform duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Minimal Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-[#030407]/95 backdrop-blur-xl flex flex-col justify-center items-center px-6 animate-fade-in">
          <nav className="flex flex-col items-center gap-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl sm:text-4xl text-zinc-300 hover:text-white transition-colors"
                style={{
                  fontFamily: "'Instrument Serif', 'Cormorant Garamond', serif",
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onContactClick();
              }}
              className="mt-6 rounded-full bg-white text-black px-8 py-3 text-sm font-semibold tracking-wide hover:bg-zinc-200 transition-colors"
            >
              Get in Touch
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
