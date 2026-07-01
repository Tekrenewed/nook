import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExplodedBurger() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  const layers = [
    { src: '/layer_bun_top.png', name: 'Toasted potato bun', desc: 'Soft, buttery, perfectly toasted.', zIndex: 50 },
    { src: '/layer_sauce.png', name: 'Homemade Nook sauce', desc: 'Our signature tangy & savory blend.', zIndex: 40 },
    { src: '/layer_cheese.png', name: 'Top-tier cheese', desc: 'Melted to perfection.', zIndex: 30 },
    { src: '/layer_patty.png', name: 'Premium UK-sourced beef', desc: 'Smashed thin for a perfect crust.', zIndex: 20 },
    { src: '/layer_bun_bottom.png', name: 'Toasted potato bun', desc: 'The sturdy foundation.', zIndex: 10 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Open offsets for each layer to explode them outwards
      // 5 layers: index 0 to 4. Center is 2.
      const openOffsets = [-160, -80, 0, 80, 160];

      layersRef.current.forEach((el, idx) => {
        if (!el) return;
        
        // Find the text wrapper within the layer
        const textWrapper = el.querySelector('.burger-text-wrapper');

        // Setup the initial state and animation for the whole layer row
        gsap.fromTo(el, 
          { y: 0 }, // Starts closed (at natural overlapping position)
          { 
            y: openOffsets[idx], // Explodes outwards
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%", // Start expanding when container hits 80% of viewport
              end: "center center", // Fully expanded at center
              scrub: 1, // Smooth scrubbing
            }
          }
        );

        // Fade in text and line as it expands
        if (textWrapper) {
          gsap.fromTo(textWrapper,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%", 
                end: "center center",
                scrub: 1,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
        <div ref={containerRef} className="w-full flex flex-col items-center justify-center relative py-12 lg:py-24">
          {layers.map((layer, idx) => {
            const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;
            const isActive = hoveredIdx === idx;

            return (
              <div 
                key={idx}
                ref={el => { layersRef.current[idx] = el; }}
                className={`w-full flex items-center justify-center transition-all cursor-crosshair group mix-blend-multiply ${
                  idx !== 0 ? '-mt-16 md:-mt-24 lg:-mt-32' : ''
                }`}
                style={{ zIndex: layer.zIndex }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Image Column */}
                <div 
                  className={`w-1/2 flex justify-end relative transition-all duration-300 ease-out ${
                    isDimmed ? 'opacity-20 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <img 
                    src={layer.src} 
                    alt={layer.name} 
                    className="burger-img h-24 md:h-32 lg:h-40 w-auto object-contain contrast-[1.15] brightness-[1.05]" 
                  />
                </div>

                {/* Connecting Line & Text Column */}
                <div className="burger-text-wrapper w-1/2 flex items-center pl-4 md:pl-8">
                  {/* The Connecting Line */}
                  <div 
                    className={`h-[1px] bg-primary/40 mr-4 transition-all duration-500 ease-out hidden md:block ${
                      isActive ? 'w-16 md:w-32 bg-primary' : 'w-12 md:w-20'
                    } ${isDimmed ? 'opacity-20' : 'opacity-100'}`}
                  ></div>

                  {/* The Typography */}
                  <div 
                    className={`burger-text transition-all duration-300 ease-out ${
                      isDimmed ? 'opacity-30' : 'opacity-100'
                    } ${isActive ? 'translate-x-4' : 'translate-x-0'}`}
                  >
                    <h4 className="font-bold text-lg md:text-2xl tracking-tight mb-1">{layer.name}</h4>
                    <p className={`text-secondary text-xs md:text-sm leading-relaxed transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'} hidden sm:block`}>
                      {layer.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
  );
}
