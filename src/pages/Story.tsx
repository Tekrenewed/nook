export default function Story() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="border-b-4 border-primary pb-8 mb-16">
          <h1 className="font-heading font-black text-5xl md:text-7xl tracking-tighter text-primary uppercase">
            The Story
          </h1>
          <p className="mt-4 text-secondary font-medium tracking-widest uppercase text-sm">Zeeshan / Founder</p>
        </div>

        {/* Editorial Body */}
        <div className="prose prose-lg max-w-none text-primary font-medium leading-relaxed space-y-8">
          <p className="text-2xl font-bold uppercase tracking-wide border-l-8 border-primary pl-6">
            Quality is an obsession. At Nook, we believe a great burger is the sum of impeccable ingredients.
          </p>
          <p>
            It started with a simple observation: the local burger scene was drowning in sauces, gimmicks, and distractions. We wanted to strip it back to the absolute fundamentals. Meat, fire, and a bun.
          </p>
          <p>
            By using a specific high-heat smash technique on our flat-top grills, we force a Maillard reaction on the premium UK beef. This creates a deeply caramelized, crispy edge that holds immense flavor. You don't need ten sauces when the meat speaks for itself.
          </p>
          <p>
            The Hub in Streatham is our testing ground. Everything we do is transparent. Open kitchen, raw metal, no hiding. What you see is exactly what you get. 
          </p>
        </div>

      </div>
    </div>
  )
}
