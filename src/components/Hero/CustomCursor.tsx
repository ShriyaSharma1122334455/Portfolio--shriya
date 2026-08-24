import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isHovering = false;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('a, button, input, textarea, [data-cursor-text]');
      isHovering = !!interactiveEl;
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    let animationFrameId: number;

    const render = () => {
      const speed = 0.2;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) ${
        isHovering ? 'scale(1.8)' : 'scale(1)'
      }`;

      if (isHovering) {
        cursor.classList.add('bg-white/15', 'border-white/40');
      } else {
        cursor.classList.remove('bg-white/15', 'border-white/40');
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-50 h-5 w-5 rounded-full border border-white/30 bg-transparent opacity-0 transition-transform duration-100 ease-out will-change-transform backdrop-blur-[1px]"
    />
  );
}
