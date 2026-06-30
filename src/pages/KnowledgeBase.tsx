import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function KnowledgeBase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      category: "Locations & Ordering",
      question: "Where is Nook Burgers located?",
      answer: "Our flagship store, 'The Hub', is located at 124 Streatham High Rd, London, SW16 1BW. We are a short walk from Streatham Station and Streatham Common."
    },
    {
      category: "Locations & Ordering",
      question: "Can I order online for collection or delivery?",
      answer: "Absolutely. We partner with Flipdish for seamless online ordering. You can collect in-store or have it delivered directly to your door anywhere in the local Streatham and Tooting area."
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

  // Generate JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  let globalIndexCounter = 0;

  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      {/* JSON-LD Schema Injection for Local SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="border-b-4 border-primary pb-8 mb-16 text-center">
          <h1 className="font-heading font-black text-5xl md:text-7xl tracking-tighter text-primary uppercase">Knowledge Base</h1>
          <p className="mt-4 text-secondary font-medium tracking-widest uppercase text-sm">Facts, Philosophy & Policy</p>
        </div>

        {/* Content */}
        <div className="space-y-16">
          {Object.entries(groupedFaqs).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tighter border-b-2 border-primary/20 pb-4 mb-6 text-primary/80">
                {category}
              </h2>
              <div className="divide-y-2 divide-primary/10">
                {items.map((faq) => {
                  const currentIndex = globalIndexCounter++;
                  const isOpen = openIndex === currentIndex;
                  
                  return (
                    <div key={currentIndex} className="py-6">
                      <button 
                        className="w-full flex justify-between items-center text-left group"
                        onClick={() => setOpenIndex(isOpen ? null : currentIndex)}
                      >
                        <h3 className={`font-heading font-black text-xl md:text-2xl tracking-tight uppercase transition-colors pr-8 ${isOpen ? 'text-danger' : 'text-primary group-hover:text-danger'}`}>
                          {faq.question}
                        </h3>
                        <div className={`flex-shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180 text-danger' : 'group-hover:text-danger'}`}>
                          {isOpen ? <Minus size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                        </div>
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="text-secondary font-medium text-lg leading-relaxed max-w-3xl pr-8 border-l-4 border-danger pl-6 py-2">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 pt-12 border-t-4 border-primary/20 text-center flex flex-col sm:flex-row justify-center gap-6">
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
