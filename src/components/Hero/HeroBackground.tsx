import { motion, MotionValue, useTransform } from 'motion/react';

interface HeroBackgroundProps {
  scrollYProgress: MotionValue<number>;
  mouseXOffset: MotionValue<number>;
  mouseYOffset: MotionValue<number>;
}

export function HeroBackground({ scrollYProgress, mouseXOffset, mouseYOffset }: HeroBackgroundProps) {
  // As user scrolls, the background shrinks (scale 1 -> 0.75) and fades away (opacity 1 -> 0)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 0.5, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.78]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Parallax on mist and glow layers
  const glowX = useTransform(mouseXOffset, [-1, 1], [-20, 20]);
  const glowY = useTransform(mouseYOffset, [-1, 1], [-15, 15]);

  const mistX = useTransform(mouseXOffset, [-1, 1], [30, -30]);
  const mistY = useTransform(mouseYOffset, [-1, 1], [20, -20]);

  return (
    <motion.div
      style={{
        opacity: bgOpacity,
        scale: bgScale,
        y: bgY,
        transformOrigin: 'center center',
      }}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none will-change-transform"
    >
      {/* Deep dark canvas */}
      <div className="absolute inset-0 bg-[#030407]" />

      {/* Atmospheric teal/cyan volumetric glowing orbs (Behind subject) */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-[18%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] sm:h-[650px] sm:w-[650px] rounded-full bg-gradient-to-b from-cyan-900/30 via-teal-950/20 to-transparent blur-[130px] will-change-transform"
      />

      <motion.div
        style={{ x: mistX, y: mistY }}
        className="absolute top-[30%] right-1/4 h-[380px] w-[380px] rounded-full bg-sky-900/20 blur-[110px] will-change-transform"
      />

      <motion.div
        style={{ x: useTransform(mouseXOffset, [-1, 1], [-15, 15]), y: useTransform(mouseYOffset, [-1, 1], [15, -15]) }}
        className="absolute top-[40%] left-1/4 h-[320px] w-[320px] rounded-full bg-indigo-950/25 blur-[100px] will-change-transform"
      />

      {/* Soft Fog & Mist Layer at Lower Half */}
      <div className="absolute inset-x-0 bottom-0 h-[65vh] hero-fog-layer pointer-events-none" />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 hero-vignette pointer-events-none" />

      {/* Seamless bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 hero-bottom-fade pointer-events-none" />
    </motion.div>
  );
}
