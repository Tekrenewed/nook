import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { supabase } from '../supabase/config';
import CustomCursor from '../components/CustomCursor';
import TransitionLayer from '../components/TransitionLayer';

export default function MainLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orderingMode, setOrderingMode] = useState<'flipdish' | 'internal'>('flipdish');
  const [flipdishUrl, setFlipdishUrl] = useState('https://nook.flipdish.com');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from('settings').select('*').eq('id', 'general').single().then(({ data }) => {
      if (data) {
        if (data.orderingMode) setOrderingMode(data.orderingMode);
        if (data.flipdishUrl) setFlipdishUrl(data.flipdishUrl);
      }
    });

    const sub = supabase.channel('main_layout_settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings', filter: 'id=eq.general' }, payload => {
        if (payload.new) {
          if ((payload.new as any).orderingMode) setOrderingMode((payload.new as any).orderingMode);
          if ((payload.new as any).flipdishUrl) setFlipdishUrl((payload.new as any).flipdishUrl);
        }
      }).subscribe();

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      supabase.removeChannel(sub);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'MENU', path: '/menu' },
    { name: 'LOCATIONS', path: '/locations' },
    { name: 'THE NOOK BLOG', path: '/blog' },
    { name: 'FAQ / KNOWLEDGE', path: '/knowledge' },
  ];

  const handleOrderClick = (e: React.MouseEvent) => {
    if (orderingMode === 'internal') {
      e.preventDefault();
      navigate('/menu');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-primary">
      <CustomCursor />
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-background border-b-2 border-primary py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="z-50 block">
              <img src="/logo-transparent.png" alt="Nook" className="h-20 md:h-28 object-contain" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex justify-center items-center space-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`text-sm uppercase font-bold tracking-widest transition-colors hover:text-danger ${
                  location.pathname === link.path ? 'border-b-2 border-primary pb-1' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Order Button & Mobile Toggle */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <a 
              href={orderingMode === 'flipdish' ? flipdishUrl : '/menu'}
              target={orderingMode === 'flipdish' ? "_blank" : undefined}
              rel={orderingMode === 'flipdish' ? "noreferrer" : undefined}
              onClick={handleOrderClick}
              className="bg-primary text-background font-bold uppercase tracking-widest text-xs px-6 py-3 md:text-sm md:px-8 md:py-3 hover:bg-danger transition-colors rounded-none hidden md:block"
            >
              Order Now
            </a>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center z-[100] relative">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2">
                {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer Backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-md z-[90]" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Nav Drawer */}
        <div 
          className={`md:hidden fixed top-0 right-0 h-screen w-full sm:w-4/5 max-w-sm bg-background border-l-4 border-primary p-8 z-[95] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-end mb-12 h-10">
            {/* Empty space to align with hamburger */}
          </div>
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-3xl font-heading font-black tracking-tight uppercase hover:text-danger transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col pb-24 md:pb-0">
        <TransitionLayer>
          <Outlet />
        </TransitionLayer>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-background p-4 shadow-[0_-20px_40px_rgba(0,0,0,0.25)] border-t-[6px] border-primary pb-safe">
        <a 
          href={orderingMode === 'flipdish' ? flipdishUrl : '/menu'}
          target={orderingMode === 'flipdish' ? "_blank" : undefined}
          rel={orderingMode === 'flipdish' ? "noreferrer" : undefined}
          onClick={handleOrderClick}
          className="block w-full text-center bg-primary text-background font-black uppercase tracking-widest py-5 text-lg hover:bg-danger transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          {orderingMode === 'flipdish' ? 'Order Online Now' : 'View Full Menu'}
        </a>
      </div>

      {/* Dynamic Brutalist Footer */}
      <footer className="bg-primary text-background mt-auto overflow-hidden">
        {/* Marquee Banner */}
        <div className="border-b border-background/20 py-3 flex overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block text-xl font-heading font-black tracking-widest uppercase">
            {/* Repeat content to ensure seamless scrolling */}
            <span className="mx-8">SMASH BURGERS</span> • 
            <span className="mx-8">100% HALAL</span> • 
            <span className="mx-8">NO GIMMICKS</span> • 
            <span className="mx-8">LONDON</span> • 
            <span className="mx-8">SMASH BURGERS</span> • 
            <span className="mx-8">100% HALAL</span> • 
            <span className="mx-8">NO GIMMICKS</span> • 
            <span className="mx-8">LONDON</span> • 
            <span className="mx-8">SMASH BURGERS</span> • 
            <span className="mx-8">100% HALAL</span> • 
            <span className="mx-8">NO GIMMICKS</span> • 
            <span className="mx-8">LONDON</span> •
            <span className="mx-8">SMASH BURGERS</span> • 
            <span className="mx-8">100% HALAL</span> • 
            <span className="mx-8">NO GIMMICKS</span> • 
            <span className="mx-8">LONDON</span> •
          </div>
        </div>

        <div className="container mx-auto px-6 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">
            
            {/* Left: Newsletter (Takes up 5 columns on desktop) */}
            <div className="md:col-span-5">
              <h3 className="font-heading font-black text-4xl md:text-5xl uppercase mb-4 tracking-tighter">Join The Club</h3>
              <p className="font-bold uppercase tracking-widest text-sm text-background/70 mb-8 max-w-sm leading-relaxed">
                Subscribe to get 10% off your first smash burger and exclusive access to secret menu drops.
              </p>
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL" 
                  className="bg-transparent border-2 border-background/20 text-background placeholder:text-background/40 px-6 py-4 outline-none focus:border-background transition-colors w-full uppercase font-bold tracking-widest text-sm"
                  required
                />
                <button type="submit" className="bg-background text-primary font-black uppercase tracking-widest px-8 py-4 hover:bg-danger hover:text-background transition-colors shrink-0">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Spacer (1 col) */}
            <div className="hidden md:block md:col-span-1"></div>

            {/* Center: Explore Links (Takes up 3 columns) */}
            <div className="md:col-span-3">
              <h3 className="font-heading font-black text-2xl uppercase mb-8 tracking-tighter">Explore</h3>
              <div className="flex flex-col space-y-5">
                <Link to="/" className="font-bold uppercase tracking-widest text-sm hover:text-danger transition-colors flex items-center group">
                  <span className="w-4 h-[2px] bg-danger mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
                <Link to="/menu" className="font-bold uppercase tracking-widest text-sm hover:text-danger transition-colors flex items-center group">
                  <span className="w-4 h-[2px] bg-danger mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Menu
                </Link>
                <Link to="/locations" className="font-bold uppercase tracking-widest text-sm hover:text-danger transition-colors flex items-center group">
                  <span className="w-4 h-[2px] bg-danger mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Locations
                </Link>
                <Link to="/blog" className="font-bold uppercase tracking-widest text-sm hover:text-danger transition-colors flex items-center group">
                  <span className="w-4 h-[2px] bg-danger mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  The Nook Blog
                </Link>
                <Link to="/knowledge" className="font-bold uppercase tracking-widest text-sm hover:text-danger transition-colors flex items-center group">
                  <span className="w-4 h-[2px] bg-danger mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Knowledge Base
                </Link>
              </div>
            </div>

            {/* Right: The Hub / Location (Takes up 3 columns) */}
            <div className="md:col-span-3">
              <h3 className="font-heading font-black text-2xl uppercase mb-8 tracking-tighter">The Hub</h3>
              <p className="font-bold uppercase tracking-widest text-sm mb-1">124 Streatham High Rd</p>
              <p className="font-bold uppercase tracking-widest text-sm mb-8 text-background/70">London, SW16 1BW</p>
              
              <p className="font-bold uppercase tracking-widest text-sm mb-1">Everyday</p>
              <p className="font-bold uppercase tracking-widest text-sm mb-8 text-background/70">12PM - 10PM</p>
              
              <a 
                href="mailto:orders@nookburgers.co.uk" 
                className="font-bold uppercase tracking-widest text-sm hover:text-danger transition-colors block"
              >
                orders@nookburgers.co.uk
              </a>
            </div>

          </div>

          {/* Giant Typography at the bottom */}
          <div className="border-t border-background/20 pt-12 pb-6 flex flex-col md:flex-row justify-between items-end gap-8">
             <div className="w-full md:w-auto text-center md:text-left flex-grow">
               <h1 className="font-heading font-black text-[12vw] md:text-[8rem] leading-[0.8] tracking-tighter uppercase text-background">
                 NOOK BURGERS
               </h1>
             </div>
             
             <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 shrink-0 pb-2">
               <a href="https://www.instagram.com/nookburgers/" target="_blank" rel="noreferrer" className="font-bold tracking-widest uppercase text-xs hover:text-danger transition-colors">Instagram</a>
               <span className="font-bold tracking-widest uppercase text-xs hover:text-danger cursor-pointer transition-colors">Privacy</span>
               <span className="font-bold tracking-widest uppercase text-xs hover:text-danger cursor-pointer transition-colors">Terms</span>
               <span className="font-bold tracking-widest uppercase text-xs text-background/50">© {new Date().getFullYear()}</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
