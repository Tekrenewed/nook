export default function Locations() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="border-b-4 border-primary pb-8 mb-16 text-center md:text-left">
          <h1 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter text-primary">
            Locations
          </h1>
          <p className="mt-4 text-secondary font-medium tracking-widest uppercase text-sm">Where to find us</p>
        </div>

        {/* Dossier Item */}
        <div className="border-2 border-primary p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-primary/20 pb-8 mb-8">
            <div>
              <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter text-primary">
                The Hub
              </h2>
              <p className="font-bold uppercase tracking-widest text-sm text-secondary mt-2">Flagship Store</p>
            </div>
            <div className="mt-6 md:mt-0 text-left md:text-right">
              <span className="inline-block bg-primary text-background font-bold uppercase tracking-widest px-4 py-1 text-xs">
                OPEN NOW
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm text-secondary mb-4 border-b border-secondary/20 pb-2">Address</h3>
              <p className="font-medium text-lg text-primary uppercase tracking-wide">
                124 Streatham High Rd<br/>
                London<br/>
                SW16 1BW
              </p>
            </div>
            
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm text-secondary mb-4 border-b border-secondary/20 pb-2">Hours</h3>
              <ul className="font-medium text-lg text-primary uppercase tracking-wide space-y-2">
                <li className="flex justify-between">
                  <span>Everyday</span>
                  <span>12PM - 10PM</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-bold uppercase tracking-widest text-sm text-secondary mb-4 border-b border-secondary/20 pb-2">Contact</h3>
              <p className="font-medium text-lg text-primary uppercase tracking-wide">
                020 7123 4567<br/>
                yo@nookburgers.co.uk
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-primary/20">
            <a 
              href="https://maps.google.com/?q=124+Streatham+High+Rd+London+SW16+1BW" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block w-full text-center bg-primary text-background font-bold uppercase tracking-widest py-5 hover:bg-danger transition-colors"
            >
              Get Directions
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
