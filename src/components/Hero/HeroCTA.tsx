import { motion, MotionValue, useTransform } from 'motion/react';
import { ArrowUpRight, Mail, FileText, ArrowDown } from 'lucide-react';
import { RoleRotator } from './RoleRotator';

interface HeroCTAProps {
  scrollYProgress: MotionValue<number>;
  onContactClick?: () => void;
}

export function HeroCTA({ scrollYProgress, onContactClick }: HeroCTAProps) {
  const yOffset = useTransform(scrollYProgress, [0, 0.8], [0, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  return (
    <motion.div
      style={{ y: yOffset, opacity }}
      className="flex flex-col gap-6 pt-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
        {/* Role rotator with active status */}
        <RoleRotator />

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onContactClick}
            data-cursor-text="TALK"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-zinc-950 shadow-sm transition-all duration-200 hover:bg-zinc-200 hover:shadow-indigo-500/10 cursor-pointer"
          >
            <Mail className="h-3.5 w-3.5 text-zinc-700 group-hover:text-black transition-colors" />
            <span>Get in touch</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <a
            href="#projects"
            data-cursor-text="WORK"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            <span>View Work</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
