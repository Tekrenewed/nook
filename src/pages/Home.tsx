import { Link } from 'react-router-dom';
import ExplodedBurger from '../components/ExplodedBurger';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      
      {/* Stark Minimalist Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-32 pb-16">
        <div className="text-center w-full max-w-7xl mx-auto border-b-8 border-primary pb-12 mb-12">
          <h1 className="font-heading font-black text-[12vw] leading-[0.8] tracking-tighter text-primary uppercase mb-8">
            Nook <br/> Burgers
          </h1>
          <p className="font-bold uppercase tracking-widest text-secondary text-sm md:text-base mb-12">
            Streatham / London / UK
          </p>
          <a 
            href="https://nook.flipdish.com" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block bg-primary text-background font-bold uppercase tracking-widest px-12 py-5 hover:bg-danger transition-colors"
          >
            Order Collection
          </a>
        </div>
      </section>

      {/* Philosophy Statement - Pure Typography */}
      <section className="py-24 bg-background border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tighter uppercase mb-12">
            The Philosophy
          </h2>
          <p className="text-xl md:text-2xl font-medium text-primary leading-relaxed max-w-[55ch] mx-auto mb-16">
            We reject the idea that a burger needs ten sauces to be good. We rely on the Maillard reaction—smashing premium UK beef at extreme heat to create a perfect caramelized crust. Less is more.
          </p>

          <Link 
            to="/story" 
            className="inline-block border-b-4 border-primary pb-2 text-lg font-bold tracking-widest uppercase hover:text-danger hover:border-danger transition-colors"
          >
            Read Our Story
          </Link>
        </div>
      </section>

      {/* Anatomy */}
      <ExplodedBurger />
    </div>
  );
}
