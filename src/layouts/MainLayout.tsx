import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function MainLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'MENU', path: '/menu' },
    { name: 'LOCATIONS', path: '/locations' },
    { name: 'STORY', path: '/story' },
    { name: 'FAQ / KNOWLEDGE', path: '/knowledge' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-primary">
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
              <h1 className="font-heading font-black text-3xl md:text-4xl tracking-tighter uppercase">Nook</h1>
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

          {/* Flipdish Order Button (Desktop) & Mobile Toggle */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://nook.flipdish.com" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:inline-block bg-primary text-background text-xs font-bold uppercase tracking-widest px-8 py-3 hover:bg-danger transition-colors"
            >
              Order Now
            </a>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center z-50">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col justify-center items-center space-y-8 z-40">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-4xl font-heading font-black tracking-tight uppercase"
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://nook.flipdish.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-4xl font-heading font-black tracking-tight uppercase text-danger mt-8"
            >
              ORDER NOW
            </a>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Minimalist Footer */}
      <footer className="bg-background border-t-4 border-primary pt-16 pb-8 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            
            <div>
              <h2 className="font-heading font-black text-6xl md:text-8xl tracking-tighter uppercase mb-4">Nook</h2>
              <p className="font-bold uppercase tracking-widest text-sm text-secondary">
                Pure smash burgers. Uncompromising quality.
              </p>
            </div>

            <div className="md:text-right flex flex-col justify-end">
              <p className="font-bold uppercase tracking-widest text-sm mb-2">124 Streatham High Rd, London</p>
              <p className="font-bold uppercase tracking-widest text-sm text-secondary mb-8">020 7123 4567</p>
              
              <div className="flex flex-col md:flex-row md:justify-end gap-6 md:gap-12">
                <Link to="/menu" className="font-bold uppercase tracking-widest text-xs hover:text-danger transition-colors">Menu</Link>
                <Link to="/locations" className="font-bold uppercase tracking-widest text-xs hover:text-danger transition-colors">Locations</Link>
                <Link to="/knowledge" className="font-bold uppercase tracking-widest text-xs hover:text-danger transition-colors">Knowledge Base</Link>
                <a href="https://nook.flipdish.com" target="_blank" rel="noreferrer" className="font-bold uppercase tracking-widest text-xs text-danger hover:text-primary transition-colors">Order (Flipdish)</a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center text-xs font-bold tracking-widest uppercase text-secondary">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Nook Burgers.
            </div>
            <div className="flex space-x-6">
              <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
