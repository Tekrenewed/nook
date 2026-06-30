import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface TransitionLayerProps {
  children: React.ReactNode;
}

export default function TransitionLayer({ children }: TransitionLayerProps) {
  const location = useLocation();
  const transitionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Previous path ref to prevent triggering animation on initial load if desired
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      
      const tl = gsap.timeline();
      
      // Page wipe in
      tl.set(transitionRef.current, { scaleY: 1, transformOrigin: 'top' })
        .to(transitionRef.current, { 
          scaleY: 0, 
          transformOrigin: 'top', 
          duration: 0.6, 
          ease: 'power3.inOut' 
        });

      // Content fade up
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      // Initial load animation
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [location.pathname]);

  return (
    <>
      <div 
        ref={transitionRef} 
        className="fixed inset-0 z-[100] bg-primary pointer-events-none origin-top" 
        style={{ transform: 'scaleY(0)' }} 
      />
      <div ref={contentRef} className="flex-grow flex flex-col h-full w-full">
        {children}
      </div>
    </>
  );
}
