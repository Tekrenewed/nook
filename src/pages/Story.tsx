import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef1 = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax images
      if (imageRef1.current) {
        gsap.to(imageRef1.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef1.current.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      if (imageRef2.current) {
        gsap.to(imageRef2.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef2.current.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Text reveal animations
      textRefs.current.forEach((text) => {
        if (!text) return;
        gsap.fromTo(text, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-primary overflow-hidden">
      
      {/* Massive Hero Title */}
      <section className="h-screen flex flex-col justify-center items-center relative px-6">
        <h1 className="font-heading font-black text-[15vw] leading-[0.8] tracking-tighter uppercase text-center z-10 text-primary">
          THE<br/>STORY
        </h1>
        <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 z-0 flex items-center justify-center pointer-events-none">
           <img src="/hero1.png" alt="Smash Burger" className="w-full h-full object-cover scale-110" />
        </div>
      </section>

      {/* Main Narrative */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-32">
        <p 
          ref={el => { textRefs.current[0] = el; }}
          className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight border-l-8 border-primary pl-8 mb-32"
        >
          Quality is an obsession. At Nook, we believe a great burger is the sum of impeccable ingredients.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <p 
              ref={el => { textRefs.current[1] = el; }}
              className="text-xl md:text-2xl font-bold leading-relaxed mb-8"
            >
              It started with a simple observation: the local burger scene was drowning in sauces, gimmicks, and distractions.
            </p>
            <p 
              ref={el => { textRefs.current[2] = el; }}
              className="text-lg md:text-xl font-medium leading-relaxed text-secondary"
            >
              We wanted to strip it back to the absolute fundamentals. Meat, fire, and a bun. No hiding behind dozens of toppings.
            </p>
          </div>
          <div className="relative h-[60vh] overflow-hidden bg-primary/5">
            <img 
              ref={imageRef1}
              src="/store.png" 
              alt="Nook Burgers Interior" 
              className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32 flex-col-reverse md:flex-row-reverse">
          <div className="md:pl-8">
            <h2 className="font-heading font-black text-4xl uppercase tracking-tighter mb-6">The Maillard Reaction</h2>
            <p 
              ref={el => { textRefs.current[3] = el; }}
              className="text-xl md:text-2xl font-bold leading-relaxed mb-8"
            >
              By using a specific high-heat smash technique on our flat-top grills, we force a chemical reaction on the premium UK beef.
            </p>
            <p 
              ref={el => { textRefs.current[4] = el; }}
              className="text-lg md:text-xl font-medium leading-relaxed text-secondary"
            >
              This creates a deeply caramelized, crispy edge that holds immense flavor. You don't need ten sauces when the meat speaks for itself.
            </p>
          </div>
          <div className="relative h-[60vh] overflow-hidden bg-primary/5">
            <img 
              ref={imageRef2}
              src="/hero2.png" 
              alt="Smashed Beef" 
              className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]" 
            />
          </div>
        </div>

        {/* Conclusion */}
        <div className="text-center py-32 border-t-4 border-primary/20">
          <p 
            ref={el => { textRefs.current[5] = el; }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-12 max-w-3xl mx-auto"
          >
            The Hub in Streatham is our testing ground. Open kitchen, raw metal, no hiding.
          </p>
          <p 
            ref={el => { textRefs.current[6] = el; }}
            className="text-xl font-bold uppercase tracking-widest text-primary bg-primary/10 inline-block px-8 py-4"
          >
            What you see is exactly what you get.
          </p>
        </div>

      </section>
    </div>
  )
}
