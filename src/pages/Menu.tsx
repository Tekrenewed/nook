import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { MenuItem } from '../types/menu';

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch active menu items
    const q = query(collection(db, 'menuItems'), where('isActive', '==', true));
    const unsub = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
      setItems(fetched);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Group items by category
  const burgers = items.filter(i => i.category === 'Burgers');
  const sides = items.filter(i => i.category === 'Sides');
  const desserts = items.filter(i => i.category === 'Desserts');
  const shakes = items.filter(i => i.category === 'Shakes');
  const drinks = items.filter(i => i.category === 'Drinks');

  if (loading) {
    return (
      <div className="bg-background min-h-screen pt-32 pb-32 flex justify-center items-center">
        <p className="font-heading text-primary text-2xl uppercase tracking-widest">Loading Menu...</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="border-b-4 border-primary pb-8 mb-16 text-center">
          <h1 className="font-heading font-black text-6xl md:text-8xl tracking-tighter text-primary uppercase">Menu</h1>
          <p className="mt-4 text-secondary font-medium tracking-widest uppercase text-sm">Minimalist & Exacting</p>
        </div>

        {/* Burgers Section */}
        {burgers.length > 0 && (
          <div className="mb-24">
            <h2 className="font-heading font-black text-4xl uppercase tracking-tighter mb-12">Burgers</h2>
            <div className="space-y-8">
              {burgers.map((product) => (
                <div key={product.id} className={`flex flex-col md:flex-row md:items-end justify-between border-b border-primary/20 pb-4 ${product.isDailyItem ? 'bg-primary/5 p-4 border-l-4 border-l-primary' : ''}`}>
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading font-bold text-2xl tracking-tight uppercase text-primary">{product.name}</h3>
                      {product.isDailyItem && (
                        <span className="bg-primary text-background text-xs font-bold px-2 py-1 uppercase tracking-widest">Daily Special</span>
                      )}
                    </div>
                    <p className="text-secondary font-medium text-sm mt-1 uppercase tracking-wide">
                      {product.description}
                    </p>
                    {product.ingredients && (
                      <p className="text-secondary/70 italic text-xs mt-2 font-body">
                        Contains: {product.ingredients}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="font-body text-xl font-bold text-primary">£{product.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-primary text-background p-6">
              <p className="font-bold uppercase tracking-widest text-sm text-center">
                Extras: Jalapenos (+£1), Pickles (+£1), Cheese (+£1.50), Bacon (+£2), Patty (+£3)
              </p>
            </div>
          </div>
        )}

        {/* Secondary Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          
          {/* SIDES */}
          {sides.length > 0 && (
            <div>
              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter mb-8">Sides</h2>
              <ul className="space-y-6">
                {sides.map(side => (
                  <li key={side.id} className="flex justify-between items-baseline border-b border-primary/10 pb-2">
                    <div>
                      <span className="font-bold text-lg uppercase tracking-wide text-primary">{side.name}</span>
                      {side.description && <p className="text-xs text-secondary/70 mt-1 uppercase">{side.description}</p>}
                    </div>
                    <span className="font-body font-bold text-lg text-primary">£{side.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* DESSERTS */}
          {desserts.length > 0 && (
            <div>
              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter mb-8">Desserts</h2>
              <ul className="space-y-6">
                {desserts.map(dessert => (
                  <li key={dessert.id} className="flex justify-between items-baseline border-b border-primary/10 pb-2">
                    <div>
                      <span className="font-bold text-lg uppercase tracking-wide text-primary">{dessert.name}</span>
                      {dessert.description && <p className="text-xs text-secondary/70 mt-1 uppercase">{dessert.description}</p>}
                    </div>
                    <span className="font-body font-bold text-lg text-primary">£{dessert.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SHAKES */}
          {shakes.length > 0 && (
            <div>
              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter mb-8">Shakes</h2>
              <ul className="space-y-6">
                {shakes.map(shake => (
                  <li key={shake.id} className="flex justify-between items-baseline border-b border-primary/10 pb-2">
                    <span className="font-bold text-lg uppercase tracking-wide text-primary">{shake.name}</span>
                    <span className="font-body font-bold text-lg text-primary">£{shake.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* DRINKS */}
          {drinks.length > 0 && (
            <div>
              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter mb-8">Drinks</h2>
              <ul className="space-y-6">
                {drinks.map(drink => (
                  <li key={drink.id} className="flex justify-between items-baseline border-b border-primary/10 pb-2">
                    <span className="font-bold text-lg uppercase tracking-wide text-primary">{drink.name}</span>
                    <span className="font-body font-bold text-lg text-primary">£{drink.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
