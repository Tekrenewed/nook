import { MapPin, Clock, Phone } from 'lucide-react';

export default function Locations() {
  return (
    <div className="bg-background min-h-screen pt-[105px] animate-fade-in pb-32">
      <div className="container mx-auto px-6 pt-12">
        <h1 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter mb-12">
          The Hub
        </h1>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Store Image */}
          <div className="relative group overflow-hidden rounded-sm bg-surface p-2">
            <div className="absolute inset-0 bg-danger/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
            <img 
              src="/store.png" 
              alt="Nook Storefront" 
              className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 relative z-0"
            />
            <div className="absolute bottom-6 right-6 z-20 bg-primary text-surface px-4 py-2 font-bold uppercase tracking-widest text-sm shadow-xl">
              Flagship Store
            </div>
          </div>

          {/* Details */}
          <div className="bg-surface text-primary p-8 md:p-12 rounded-sm shadow-2xl">
            <h2 className="font-heading font-black text-4xl uppercase tracking-tight mb-8 text-white">
              Nook Central
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="text-danger mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1 text-secondary">Address</h4>
                  <p className="text-lg">124 Streatham High Rd<br/>London, SW16 1BW</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="text-danger mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1 text-secondary">Hours</h4>
                  <ul className="text-lg space-y-2">
                    <li className="flex justify-between w-48 border-b border-white/10 pb-1"><span>Everyday</span><span>12pm - 10pm</span></li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-danger mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1 text-secondary">Contact</h4>
                  <p className="text-lg">020 7123 4567</p>
                  <p className="text-sm text-secondary mt-1">yo@nookburgers.co.uk</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-12 bg-danger text-white font-heading font-black text-xl uppercase tracking-tighter py-5 rounded-sm hover:bg-white hover:text-surface transition-colors">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
