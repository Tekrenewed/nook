import { useState } from 'react';

export default function ExplodedBurger() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const layers = [
    { src: '/layer_bun_top.png', name: 'Toasted brioche bun', desc: 'Soft, buttery, perfectly toasted.', zIndex: 50 },
    { src: '/layer_sauce.png', name: 'Homemade Nook sauce', desc: 'Our signature tangy & savory blend.', zIndex: 40 },
    { src: '/layer_cheese.png', name: 'Top-tier cheese', desc: 'Melted to perfection.', zIndex: 30 },
    { src: '/layer_patty.png', name: 'Premium UK-sourced beef', desc: 'Smashed thin for a perfect crust.', zIndex: 20 },
    { src: '/layer_bun_bottom.png', name: 'Toasted brioche bun', desc: 'The sturdy foundation.', zIndex: 10 },
  ];

  return (
    <section className="min-h-screen py-24 w-full bg-surface text-primary flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Side: Static Title & Intro */}
        <div className="w-full lg:w-1/3 z-50 mb-16 lg:mb-0 text-center lg:text-left">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            The Anatomy of Perfect
          </h2>
          <p className="text-secondary font-light text-lg lg:text-xl leading-relaxed">
            Hover over the meticulously selected ingredients that make up the brand's true signature.
          </p>
        </div>

        {/* Right Side: The Interactive Stacked Burger */}
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center relative">
          {layers.map((layer, idx) => {
            // Determine if this specific layer should be dimmed
            const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;
            // Determine if this specific layer is actively hovered
            const isActive = hoveredIdx === idx;

            return (
              <div 
                key={idx}
                className="w-full flex items-center justify-center transition-all duration-300 py-2 md:py-4 cursor-crosshair group"
                style={{ zIndex: layer.zIndex }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Image Column */}
                <div 
                  className={`w-1/2 flex justify-end relative transition-all duration-500 ease-out ${
                    isDimmed ? 'opacity-20 scale-95' : 'opacity-100 scale-100'
                  } ${isActive ? 'drop-shadow-2xl' : 'drop-shadow-md'}`}
                >
                  <img 
                    src={layer.src} 
                    alt={layer.name} 
                    className="h-24 md:h-32 lg:h-40 w-auto object-contain mix-blend-multiply contrast-[1.15] brightness-[1.05]" 
                  />
                </div>

                {/* Connecting Line & Text Column */}
                <div className="w-1/2 flex items-center pl-4 md:pl-8">
                  {/* The Connecting Line */}
                  <div 
                    className={`h-[1px] bg-primary/20 mr-4 transition-all duration-500 ease-out hidden md:block ${
                      isActive ? 'w-16 md:w-24 bg-primary/60' : 'w-8 md:w-12'
                    } ${isDimmed ? 'opacity-20' : 'opacity-100'}`}
                  ></div>
                  
                  {/* The Typography */}
                  <div 
                    className={`transition-all duration-500 ease-out ${
                      isDimmed ? 'opacity-30 translate-x-0' : 'opacity-100'
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

      </div>
    </section>
  );
}
