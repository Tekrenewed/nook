import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ExplodedBurger from '../components/ExplodedBurger';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/hero1.png', '/hero2.png', '/hero3.png', '/hero4.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Slower, more elegant transitions
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="animate-fade-in bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img 
              src={slide} 
              alt={`Burger slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Editorial gradient overlay for better contrast without muddying the image */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-16 flex flex-col h-full justify-end items-center md:items-start text-center md:text-left">
          <img 
            src="/logo.png" 
            alt="Nook Burgers" 
            className="w-64 md:w-[28rem] mb-8 drop-shadow-2xl brightness-0 invert" // Make logo white for editorial contrast
          />
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-2xl leading-tight drop-shadow-lg">
            Pure smash burgers. Uncompromising quality.
          </h1>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center md:items-start gap-6">
            <Link 
              to="/menu" 
              className="inline-flex items-center justify-center bg-white text-primary font-bold uppercase tracking-widest px-10 py-4 rounded-full shadow-2xl hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              Order Online
            </Link>
            <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full px-6 py-4 border border-white/20 shadow-xl">
               <span className="text-white font-light text-sm md:text-base">
                 Collect in-store for an <strong className="font-bold tracking-wide">exclusive discount</strong>
               </span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Story Introduction */}
      <section className="py-32 bg-background text-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight">
            Our Philosophy
          </h2>
          <p className="text-xl md:text-2xl font-light text-secondary leading-relaxed max-w-[65ch] mx-auto mb-16">
            The smash burgers come in several sizes, from M to XXL, with one to five patties to satisfy all appetites. Toppings like jalapeños and pickles add a spicy kick, while crispy onions bring the perfect crunch. This philosophy fully embodies the "less is more" concept, offering a perfect balance and an outstanding flavour experience from the very first bite.
          </p>

          <div className="text-center">
            <Link 
              to="/story" 
              className="inline-flex border-b-2 border-primary pb-1 text-lg font-bold tracking-wide hover:text-secondary hover:border-secondary transition-colors"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Anatomy - Redesigned Exploded View */}
      <ExplodedBurger />
    </div>
  );
}
