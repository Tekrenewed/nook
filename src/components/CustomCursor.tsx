import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.3, ease: "back.out(1.7)" });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" });
    };

    window.addEventListener('mousemove', moveCursor);

    // Attach hover effects to all links and buttons
    const attachHoverEffects = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, [role="button"]');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Initial attachment
    attachHoverEffects();

    // Use a MutationObserver to attach to dynamically rendered elements
    const observer = new MutationObserver(() => {
      attachHoverEffects();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll('a, button, input, [role="button"]');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      style={{ transform: 'translate(-50%, -50%)', left: 0, top: 0 }}
    />
  );
}
