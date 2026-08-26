import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RoleRotatorProps {
  roles?: string[];
  intervalMs?: number;
}

const DEFAULT_ROLES = [
  "Software Developer",
  "Cloud Engineer",
  "Full-Stack Developer",
  "Product/Project Manager",
  "Technical Support Engineer",
];

export function RoleRotator({
  roles = DEFAULT_ROLES,
  intervalMs = 3000,
}: RoleRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [roles.length, intervalMs]);

  return (
    <div className="inline-flex items-center gap-2.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
      </span>

      <div className="h-6 sm:h-7 overflow-hidden flex items-center min-w-[200px] sm:min-w-[240px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-xs sm:text-sm font-medium text-zinc-300"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
