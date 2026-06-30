import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Locations() {
  const markerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (markerRef.current) {
      gsap.to(markerRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "none"
      });
    }

    if (mapRef.current) {
      // Create a grid scanning effect
      gsap.fromTo(mapRef.current, 
        { backgroundPosition: '0px 0px' },
        { backgroundPosition: '40px 40px', duration: 2, repeat: -1, ease: "none" }
      );
    }
  }, []);

  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Details */}
        <div>
          {/* Header */}
          <div className="border-b-4 border-primary pb-8 mb-16 text-center md:text-left">
            <h1 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter text-primary">
              Locations
            </h1>
            <p className="mt-4 text-secondary font-bold tracking-widest uppercase text-sm">Where to find us</p>
          </div>

          {/* Dossier Item */}
          <div className="border-4 border-primary p-8 md:p-12 relative group hover:bg-primary/5 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-danger flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-black text-background">SW16</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-primary/20 pb-8 mb-8">
              <div>
                <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter text-primary">
                  The Hub
                </h2>
                <p className="font-bold uppercase tracking-widest text-sm text-secondary mt-2">Flagship Store</p>
              </div>
              <div className="mt-6 md:mt-0 text-left md:text-right">
                <span className="inline-block bg-primary text-background font-bold uppercase tracking-widest px-4 py-2 text-xs">
                  OPEN NOW
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-bold uppercase tracking-widest text-xs text-secondary mb-4 border-b border-secondary/20 pb-2">Address</h3>
                <p className="font-medium text-lg text-primary uppercase tracking-wide">
                  124 Streatham High Rd<br/>
                  London<br/>
                  SW16 1BW
                </p>
              </div>
              
              <div>
                <h3 className="font-bold uppercase tracking-widest text-xs text-secondary mb-4 border-b border-secondary/20 pb-2">Hours</h3>
                <ul className="font-medium text-lg text-primary uppercase tracking-wide space-y-2">
                  <li className="flex justify-between">
                    <span>Everyday</span>
                    <span>12PM - 10PM</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-bold uppercase tracking-widest text-xs text-secondary mb-4 border-b border-secondary/20 pb-2">Logistics</h3>
                <ul className="font-medium text-sm text-primary uppercase tracking-wide space-y-3">
                  <li className="flex justify-between border-b border-primary/10 pb-3 hover:text-danger cursor-crosshair">
                    <span>Streatham Station</span>
                    <span className="text-secondary font-black tracking-widest">3 MIN WALK</span>
                  </li>
                  <li className="flex justify-between border-b border-primary/10 pb-3 hover:text-danger cursor-crosshair">
                    <span>Streatham Common</span>
                    <span className="text-secondary font-black tracking-widest">5 MIN WALK</span>
                  </li>
                  <li className="flex justify-between border-b border-primary/10 pb-3 hover:text-danger cursor-crosshair">
                    <span>Streatham Ice & Leisure</span>
                    <span className="text-secondary font-black tracking-widest">8 MIN WALK</span>
                  </li>
                  <li className="flex justify-between border-b border-primary/10 pb-3 hover:text-danger cursor-crosshair">
                    <span>Tooting Bec Lido</span>
                    <span className="text-secondary font-black tracking-widest">10 MIN BUS</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-bold uppercase tracking-widest text-xs text-secondary mb-4 border-b border-secondary/20 pb-2">Comm Link</h3>
                <p className="font-medium text-lg text-primary uppercase tracking-wide">
                  020 3751 4759<br/>
                  orders@nookburgers.co.uk
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-primary/20">
              <a 
                href="https://maps.google.com/?q=124+Streatham+High+Rd+London+SW16+1BW" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block w-full text-center bg-primary text-background font-black uppercase tracking-widest py-6 hover:bg-danger transition-colors text-lg"
              >
                Intercept Location
              </a>
            </div>

          </div>
        </div>

        {/* Right Column: Stylized Radar Map */}
        <div className="hidden lg:flex flex-col relative border-4 border-primary bg-primary overflow-hidden min-h-[600px]">
          
          {/* Decorative Map Frame */}
          <div className="absolute inset-0 z-0 opacity-10" ref={mapRef} style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 30%, #000 100%)' }}></div>
          
          <div className="absolute top-4 left-4 z-10 text-background font-bold tracking-widest text-xs uppercase flex items-center space-x-2">
            <span className="w-2 h-2 bg-danger animate-pulse rounded-full"></span>
            <span>Live Telemetry</span>
          </div>
          
          <div className="absolute bottom-4 right-4 z-10 text-background/50 font-bold tracking-widest text-xs uppercase text-right">
            51.4285° N<br/>
            0.1293° W
          </div>

          {/* Central Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative">
               <div className="w-6 h-6 bg-danger rounded-full z-10 relative"></div>
               <div ref={markerRef} className="w-6 h-6 bg-danger rounded-full absolute top-0 left-0"></div>
            </div>
            <div className="mt-4 bg-background text-primary px-4 py-2 font-black uppercase tracking-widest text-xs border-2 border-primary">
              TARGET: THE HUB
            </div>
          </div>

          {/* Map Overlays */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary to-transparent z-10 pointer-events-none"></div>

        </div>

      </div>
    </div>
  );
}
