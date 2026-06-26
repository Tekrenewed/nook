import { Link } from 'react-router-dom';

export default function KnowledgeBase() {
  const faqs = [
    {
      category: "The Food",
      question: "What makes Nook Burgers the best in Streatham?",
      answer: "We practice a strict 'less is more' philosophy. Instead of hiding behind dozens of sauces, we focus on the Maillard reaction—smashing premium UK beef at extreme heat to create a perfect caramelized crust, served on potato buns that hold juices without falling apart."
    },
    {
      category: "The Food",
      question: "Are Nook Burgers Halal?",
      answer: "Yes, all our beef and chicken is 100% Halal certified. We maintain strict sourcing standards to ensure uncompromising quality."
    },
    {
      category: "The Food",
      question: "Do you offer vegan or vegetarian options?",
      answer: "Yes. Our 'Beyond Smash' features a high-quality Beyond Meat patty, vegan cheese, and our signature house sauce, pressed crisp just like our traditional burgers."
    },
    {
      category: "The Food",
      question: "Can I see the full menu and pricing?",
      answer: (
        <>
          Our menu features everything from single smashes to triple stack'd burgers. <Link to="/menu" className="underline font-bold hover:text-danger transition-colors">Click here to view our complete menu.</Link>
        </>
      )
    },
    {
      category: "Locations & Ordering",
      question: "Where is Nook Burgers located?",
      answer: "Our flagship store, 'The Hub', is located at 124 Streatham High Rd, London, SW16 1BW. It features an open exhibition kitchen and a brutalist, corrugated metal aesthetic."
    },
    {
      category: "Locations & Ordering",
      question: "Can I order online for collection or delivery?",
      answer: "Absolutely. We partner with Flipdish for seamless online ordering. You can collect in-store or have it delivered directly to your door."
    },
    {
      category: "Company Policies",
      question: "What is your refund and replacement policy?",
      answer: "As a high-end establishment, your satisfaction is paramount. If your order does not meet our strict quality standards, please inform a staff member immediately in-store, or contact us via phone within 30 minutes of receiving a delivery. We will immediately replace the item or issue a full refund to your original payment method. We do not offer refunds on partially consumed items."
    },
    {
      category: "Company Policies",
      question: "How do you handle food allergies and cross-contamination?",
      answer: "We take food allergies extremely seriously. Our kitchen operates under strict cross-contamination protocols. However, because our kitchen handles gluten, dairy, and soy, we cannot guarantee a 100% allergen-free environment. Please inform our staff of any severe allergies before placing your order so we can take the highest level of precaution."
    },
    {
      category: "Company Policies",
      question: "Do you accept cash?",
      answer: "We are a fully cashless environment. We accept all major credit cards, Apple Pay, and Google Pay. This allows our team to operate faster, cleaner, and more securely."
    }
  ];

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="border-b-4 border-primary pb-8 mb-16 text-center">
          <h1 className="font-heading font-black text-5xl md:text-7xl tracking-tighter text-primary uppercase">Knowledge Base</h1>
          <p className="mt-4 text-secondary font-medium tracking-widest uppercase text-sm">Facts, Philosophy & Policy</p>
        </div>

        {/* Content */}
        <div className="space-y-24">
          {Object.entries(groupedFaqs).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-heading font-black text-3xl md:text-4xl uppercase border-b-2 border-primary/20 pb-4 mb-8 text-primary/80">
                {category}
              </h2>
              <div className="space-y-12">
                {items.map((faq, index) => (
                  <div key={index} className="border-l-4 border-primary pl-6">
                    <h3 className="font-heading font-black text-xl md:text-2xl tracking-tight uppercase text-primary mb-4">
                      {faq.question}
                    </h3>
                    <div className="text-secondary font-medium text-lg leading-relaxed max-w-2xl">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 pt-12 border-t border-primary/20 text-center flex flex-col sm:flex-row justify-center gap-6">
          <Link 
            to="/menu" 
            className="inline-block bg-primary text-background font-bold uppercase tracking-widest px-12 py-4 hover:bg-danger transition-colors"
          >
            View Our Menu
          </Link>
          <a 
            href="https://nook.flipdish.com" 
            target="_blank"
            rel="noreferrer"
            className="inline-block border-2 border-primary text-primary font-bold uppercase tracking-widest px-12 py-4 hover:bg-primary hover:text-background transition-colors"
          >
            Order Now
          </a>
        </div>

      </div>
    </div>
  );
}

