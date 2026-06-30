import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ExplodedBurger from '../components/ExplodedBurger';
import AnimatedCategoryIndex from '../components/AnimatedCategoryIndex';

export default function Home() {
  const [orderingMode, setOrderingMode] = useState<'flipdish' | 'internal'>('flipdish');
  const [flipdishUrl, setFlipdishUrl] = useState('https://nook.flipdish.com');

  useEffect(() => {
    // Fetch global setting
    import('../supabase/config').then(({ supabase }) => {
      supabase.from('settings').select('*').eq('id', 'general').single().then(({ data }) => {
        if (data) {
          if (data.orderingMode) setOrderingMode(data.orderingMode);
          if (data.flipdishUrl) setFlipdishUrl(data.flipdishUrl);
        }
      });
      supabase.channel('home_settings')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'settings', filter: 'id=eq.general' }, payload => {
          if (payload.new) {
            if ((payload.new as any).orderingMode) setOrderingMode((payload.new as any).orderingMode);
            if ((payload.new as any).flipdishUrl) setFlipdishUrl((payload.new as any).flipdishUrl);
          }
        }).subscribe();
    });
  }, []);

  return (
    <div className="animate-fade-in bg-background">
      {/* Minimal Junk-Style Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="text-center md:text-left z-10 flex flex-col justify-center">
            <h1 className="font-heading font-black text-6xl md:text-[8rem] leading-[0.8] tracking-tighter uppercase text-primary mb-6">
              SMASH<br/>BURGERS
            </h1>
            <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-primary/80 max-w-md mx-auto md:mx-0 mb-12 leading-relaxed">
              Premium ingredients. Flawless technique. The essentials, nothing more.
            </p>
            
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            {orderingMode === 'flipdish' ? (
              <a 
                href={flipdishUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-background font-black uppercase tracking-widest px-10 py-5 hover:bg-danger transition-colors text-lg"
              >
                Order Online
              </a>
            ) : (
              <Link 
                to="/menu" 
                className="bg-primary text-background font-black uppercase tracking-widest px-10 py-5 hover:bg-danger transition-colors text-lg"
              >
                Order Online
              </Link>
            )}
          </div>
          </div>
          <div className="relative w-full h-[50vh] md:h-full min-h-[400px]">
            <img src="/hero1.png" alt="Smash Burger" className="w-full h-full object-cover object-center" />
          </div>
        </div>
      </section>

      {/* Animated Category Navigation Index */}
      <AnimatedCategoryIndex />

      {/* Philosophy / Story Introduction */}
      <section className="py-24 bg-background text-primary border-t-2 border-primary/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-6">
              OUR STORY
            </h2>
            <p className="text-lg md:text-xl font-medium text-secondary leading-relaxed mb-8">
              The smash burgers come in several sizes, from M to XXL, with one to five patties to satisfy all appetites. Toppings like jalapeños and pickles add a spicy kick, while crispy onions bring the perfect crunch. This philosophy fully embodies the "less is more" concept, offering a perfect balance and an outstanding flavour experience from the very first bite.
            </p>
            <Link 
              to="/story" 
              className="inline-block bg-primary text-background font-black uppercase tracking-widest px-8 py-4 hover:bg-danger transition-colors"
            >
              Read Our Story
            </Link>
          </div>
          <div className="bg-primary/5 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden">
            <img src="/hero2.png" alt="The Nook Story" className="w-full h-full object-cover object-center absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Anatomy / Menu Section (Junk Burger Layout) */}
      <section className="py-24 bg-surface text-primary border-t-2 border-primary/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-6">
              OUR MENU
            </h2>
            <p className="text-lg font-medium text-secondary leading-relaxed mb-4">
              The Smash burgers are made with toasted brioche buns, premium UK-sourced meats, top-tier cheese and a secret homemade sauce, the brand's true signature.
            </p>
            <p className="text-lg font-medium text-secondary leading-relaxed mb-8">
              Each ingredient is meticulously selected to ensure a delicious experience.
            </p>
            {orderingMode === 'flipdish' ? (
              <a 
                href={flipdishUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-primary text-background font-black uppercase tracking-widest px-8 py-4 hover:bg-danger transition-colors"
              >
                Explore menu
              </a>
            ) : (
              <Link 
                to="/menu" 
                className="inline-block bg-primary text-background font-black uppercase tracking-widest px-8 py-4 hover:bg-danger transition-colors"
              >
                Explore menu
              </Link>
            )}
          </div>
          <div className="relative w-full h-[600px]">
            <ExplodedBurger />
          </div>
        </div>
      </section>

      {/* Locations Section (Junk Burger Layout) */}
      <section className="py-24 bg-background text-primary border-t-2 border-primary/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-6">
              OUR LOCATIONS
            </h2>
            <p className="text-lg font-medium text-secondary leading-relaxed mb-4">
              Find your nearest Nook Burgers and experience the perfect smash.
            </p>
            <Link 
              to="/locations" 
              className="inline-block bg-primary text-background font-black uppercase tracking-widest px-8 py-4 hover:bg-danger transition-colors"
            >
              See all locations
            </Link>
          </div>
          <div className="bg-primary/5 h-full min-h-[400px] flex items-center justify-center">
             <img src="/store.png" alt="Nook Burgers Store" className="w-full h-full object-cover object-center" />
          </div>
        </div>
      </section>

    </div>
  );
}
