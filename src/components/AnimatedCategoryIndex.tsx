import { Link } from 'react-router-dom';

export default function AnimatedCategoryIndex() {
  const categories = [
    {
      name: 'Burgers',
      hash: 'burgers',
      svg: (
        <svg className="svg-animate-draw w-16 h-16 md:w-20 md:h-20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 13h18"></path>
          <path d="M4.5 13a7.5 7.5 0 0 1 15 0"></path>
          <path d="M4 17h16"></path>
          <path d="M5 17c0 1.5 2 2.5 7 2.5s7-1 7-2.5"></path>
        </svg>
      )
    },
    {
      name: 'Sides',
      hash: 'sides',
      svg: (
        <svg className="svg-animate-draw w-16 h-16 md:w-20 md:h-20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 11l2 11h10l2-11"></path>
          <path d="M3 11h18"></path>
          <path d="M8 11V3"></path>
          <path d="M12 11V2"></path>
          <path d="M16 11V4"></path>
        </svg>
      )
    },
    {
      name: 'Shakes',
      hash: 'shakes',
      svg: (
        <svg className="svg-animate-draw w-16 h-16 md:w-20 md:h-20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8l1.5 13a2 2 0 0 0 2 1.5h5a2 2 0 0 0 2-1.5l1.5-13"></path>
          <path d="M4 8h16"></path>
          <path d="M10 2v6"></path>
          <path d="M14 2v6"></path>
        </svg>
      )
    },
    {
      name: 'Desserts',
      hash: 'desserts',
      svg: (
        <svg className="svg-animate-draw w-16 h-16 md:w-20 md:h-20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a8 8 0 0 0 8-8H4a8 8 0 0 0 8 8z"></path>
          <path d="M12 14v-6"></path>
          <path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          <path d="M6 14h12"></path>
        </svg>
      )
    }
  ];

  const handleScroll = (hash: string) => {
    // If we are already on the menu page, we might just need to scroll
    const element = document.getElementById(hash);
    if (element) {
      const yOffset = -120; // Account for fixed nav
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-16 md:py-24 border-y-2 border-primary/10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter text-primary mb-12">
          Explore Our Menu
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {categories.map((cat) => (
            <Link 
              key={cat.name}
              to={`/menu#${cat.hash}`}
              onClick={() => handleScroll(cat.hash)}
              className="group flex flex-col items-center justify-center text-primary hover:text-danger transition-colors cursor-pointer"
            >
              <div className="relative">
                {cat.svg}
              </div>
              <span className="font-heading font-black uppercase tracking-widest text-lg md:text-xl">
                {cat.name}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mt-2 border-b border-transparent group-hover:border-danger transition-colors">
                Shop Now
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
