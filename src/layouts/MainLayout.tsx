import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MapPin, Clock, Phone, ArrowRight } from 'lucide-react';

export default function MainLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'OUR STORY', path: '/story' },
    { name: 'OUR MENU', path: '/menu' },
    { name: 'OUR LOCATIONS', path: '/locations' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-primary">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 grid grid-cols-3 items-center">
          
          {/* Left: Logo */}
          <div className="flex justify-start">
            <Link to="/" className="z-50 block">
              <img 
                src="/logo.png" 
                alt="Nook Burgers" 
                className="h-16 md:h-24 scale-125 origin-left object-contain"
              />
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex justify-center items-center space-x-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  className={`text-sm uppercase tracking-wider transition-colors ${
                    location.pathname === link.path 
                      ? 'font-bold border-b-2 border-primary pb-1' 
                      : 'font-normal hover:opacity-70'
                  }`}
                >
                  {link.name}
                </Link>

                {/* MEGA MENU for OUR MENU */}
                {link.name === 'OUR MENU' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                    <div className="bg-white text-primary p-10 shadow-2xl rounded-sm w-[700px] border-t-4 border-primary grid grid-cols-2 gap-12 cursor-default">
                      
                      {/* Left Column: Burgers */}
                      <div>
                        <h3 className="font-heading font-black text-2xl uppercase tracking-tighter mb-6 border-b-2 border-primary/10 pb-2 text-danger">Burgers</h3>
                        <ul className="space-y-4">
                          {[
                            { name: "The Smash", desc: "Single/Double" },
                            { name: "Truffle Smash", desc: "Single/Double" },
                            { name: "Stack'd", desc: "Triple Patty" },
                            { name: "Bacon Smash", desc: "Double Patty" },
                            { name: "Beyond Smash", desc: "Vegan" },
                            { name: "Hot Smash", desc: "Single Patty" },
                            { name: "Cluck'd", desc: "Fried Fillet" }
                          ].map(burger => (
                            <li key={burger.name}>
                              <Link to="/menu" className="group/item flex items-baseline justify-between">
                                <span className="font-bold uppercase tracking-wider group-hover/item:text-danger transition-colors">{burger.name}</span>
                                <span className="text-xs text-secondary/60 uppercase tracking-widest">{burger.desc}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Column: More Than Burgers */}
                      <div>
                        <h3 className="font-heading font-black text-2xl uppercase tracking-tighter mb-6 border-b-2 border-primary/10 pb-2 text-danger">More Than Burgers</h3>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary mb-2">Sides</h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                              {['Fries', 'Loaded Fries', 'Tater Tots'].map(item => (
                                <Link key={item} to="/menu" className="text-sm font-semibold uppercase hover:text-danger transition-colors">{item}</Link>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary mb-2">Desserts</h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                              {['Oreo Dream', 'Matilda Cake'].map(item => (
                                <Link key={item} to="/menu" className="text-sm font-semibold uppercase hover:text-danger transition-colors">{item}</Link>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary mb-2">Drinks & Shakes</h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                              {['Shakes', 'Soda', 'Water', '0% Beer'].map(item => (
                                <Link key={item} to="/menu" className="text-sm font-semibold uppercase hover:text-danger transition-colors">{item}</Link>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Cart (and Mobile Menu Toggle) */}
          <div className="flex justify-end items-center space-x-4">
            <div className="hidden md:flex">
               {/* Cart Button */}
              <button className="flex items-center space-x-2 bg-white border border-black/10 text-primary px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all">
                <ShoppingBag size={18} />
                <span className="font-bold text-sm">0</span>
              </button>
            </div>

            {/* Mobile Toggles */}
            <div className="md:hidden flex items-center space-x-4 z-50">
              <button className="relative">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col justify-center items-center space-y-8 z-40 animate-fade-in">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-2xl font-heading font-black tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Pre-Footer Store Grid */}
      <section className="bg-surface py-20 border-t border-black/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Experience Nook</h2>
              
              <div className="flex flex-wrap items-center gap-4 mt-4 mb-3 text-xs font-bold uppercase tracking-widest text-danger">
                <span className="flex items-center gap-2">
                  <span className="text-sm">🔥</span> Premium UK Beef
                </span>
                <span className="w-1 h-1 bg-black/20 rounded-full hidden sm:block"></span>
                <span>The Flagship Store</span>
                <span className="w-1 h-1 bg-black/20 rounded-full hidden sm:block"></span>
                <span>Open Until 10PM</span>
              </div>

              <p className="text-secondary text-lg max-w-xl">
                Come visit The Hub. 124 Streatham High Rd. Real food, real fire, real people.
              </p>
            </div>
            <Link to="/locations" className="mt-6 md:mt-0 flex items-center space-x-2 font-bold uppercase tracking-widest text-sm hover:text-danger transition-colors">
              <span>View All Locations</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
             {/* Main Big Image */}
             <div className="md:col-span-2 relative group overflow-hidden rounded-sm bg-background p-2">
                <img 
                  src="/store.png" 
                  alt="Inside Nook Store" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>

                {/* Interactive Logo Area (Approximate location in image) */}
                <div className="absolute top-[40%] left-[25%] w-[20%] h-[20%] group/logo cursor-pointer flex items-center justify-center">
                   <div className="absolute inset-0 border-2 border-white/0 group-hover/logo:border-white/50 rounded-lg transition-all duration-300"></div>
                   <div className="bg-danger text-white font-bold tracking-widest px-4 py-2 rounded shadow-2xl opacity-0 group-hover/logo:opacity-100 scale-95 group-hover/logo:scale-100 transition-all duration-300 pointer-events-none">
                     NOOK HUB
                   </div>
                </div>

                {/* Impeccable Typography: Exhibition Kitchen */}
                <div className="absolute top-[15%] left-[8%] pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out delay-75">
                  <h3 className="font-heading font-black text-white text-4xl md:text-5xl uppercase tracking-tighter drop-shadow-lg leading-[0.9]">
                     Exhibition<br/>Kitchen
                  </h3>
                </div>

                {/* Impeccable Typography: Corrugated Metal Frontage */}
                <div className="absolute bottom-[15%] right-[8%] pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out delay-150">
                  <h3 className="font-heading font-black text-white text-4xl md:text-5xl uppercase tracking-tighter drop-shadow-lg leading-[0.9] text-right">
                     Corrugated<br/>Metal Frontage
                  </h3>
                </div>
             </div>
             {/* Two Smaller Images */}
             <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <div className="relative group overflow-hidden rounded-sm bg-background p-2">
                  <img 
                    src="/store.png" 
                    alt="Nook Store Details" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 object-right"
                  />
                  {/* Impeccable Typography */}
                  <div className="absolute top-[15%] left-[10%] pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out">
                     <h3 className="font-heading font-black text-white text-4xl md:text-5xl uppercase tracking-tighter drop-shadow-lg leading-[0.9]">
                        Nook<br/>Corner
                     </h3>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-sm bg-primary text-white p-8 flex flex-col justify-center items-center text-center">
                  <Clock size={40} className="mb-4 text-danger" />
                  <h3 className="font-heading font-black text-2xl uppercase tracking-tight mb-2">We're Open</h3>
                  <p className="text-white/80">Serving until 10pm tonight. Walk-ins always welcome.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Rich Footer */}
      <footer className="bg-primary text-surface pt-20 pb-8 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Logo & About */}
            <div className="md:col-span-1">
              <img src="/logo.png" alt="Nook Burgers" className="h-16 mb-6 invert brightness-0" />
              <p className="text-surface/70 text-sm leading-relaxed">
                Impeccable smash burgers. Uncompromising quality. Brutalist aesthetic. 
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white/50">Explore</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-danger transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white/50">The Hub</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-danger mt-1 flex-shrink-0" size={18} />
                  <p className="text-sm">124 Streatham High Rd<br/>London, SW16 1BW</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="text-danger mt-1 flex-shrink-0" size={18} />
                  <p className="text-sm">020 7123 4567<br/>yo@nookburgers.co.uk</p>
                </div>
                <button className="mt-4 text-xs font-bold uppercase tracking-widest text-danger hover:text-white transition-colors">
                  Get Directions →
                </button>
              </div>
            </div>

            {/* Hours */}
            <div>
               <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white/50">Hours</h4>
               <ul className="text-sm space-y-3">
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>Everyday</span><span>12pm - 10pm</span></li>
               </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/40 pt-8 border-t border-white/10">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Nook Burgers. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
