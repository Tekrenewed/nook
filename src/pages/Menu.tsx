import { useState, useEffect } from 'react';
import { supabase } from '../supabase/config';
import type { MenuItem } from '../types/menu';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CartItem extends MenuItem {
  cartQuantity: number;
}

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderingMode, setOrderingMode] = useState<'flipdish' | 'internal'>('flipdish');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const fallbackMenuItems: MenuItem[] = [
    { id: '1', name: 'The Smash', description: 'Patty, Cheese, Pickles, House Sauce (Single/Double)', price: 8.99, ingredients: '100% Angus Beef, American Cheese, House Pickles, Secret Smash Sauce, Brioche Bun', category: 'Burgers', isDailyItem: false, isActive: true },
    { id: '2', name: 'Truffle Smash', description: 'Patty, Cheese, Truffle Mayo, Crispy Onions (Single/Double)', price: 9.99, category: 'Burgers', isDailyItem: false, isActive: true },
    { id: '3', name: 'Stack\'d', description: 'Triple Patty, Triple Cheese, House Sauce, Pickles', price: 10.99, category: 'Burgers', isDailyItem: false, isActive: true },
    { id: '7', name: 'Cluck\'d', description: 'Fried Fillet, Cheese, House Sauce', price: 8.99, category: 'Burgers', isDailyItem: false, isActive: true },
    { id: '5', name: 'Beyond Smash', description: 'Vegan Patty, Vegan Cheese, House Sauce', price: 9.99, ingredients: 'Beyond Meat Patty, Vegan Cheddar, House Sauce, Vegan Brioche Bun', category: 'Burgers', isDailyItem: false, isActive: true },
    { id: '6', name: 'Hot smash', description: 'single patty, jelepenos, pickles, hot sauce', price: 8.99, category: 'Burgers', isDailyItem: false, isActive: true },
    { id: '8', name: 'Fries', description: 'Plain/Cheesy/Truffle', price: 3.99, category: 'Sides', isDailyItem: false, isActive: true },
    { id: '9', name: 'Loaded Fries', description: 'Beef Patty/Chicken/vegan', price: 5.99, category: 'Sides', isDailyItem: false, isActive: true },
    { id: '10', name: 'Tater tots', description: '', price: 4.50, category: 'Sides', isDailyItem: false, isActive: true },
    { id: '11', name: 'Oreo Dream', description: '', price: 5.50, category: 'Desserts', isDailyItem: false, isActive: true },
    { id: '12', name: 'Matilda Cake', description: '', price: 6.50, category: 'Desserts', isDailyItem: false, isActive: true },
    { id: '13', name: 'Chocolate', description: '', price: 4.99, category: 'Shakes', isDailyItem: false, isActive: true },
    { id: '14', name: 'Strawberry', description: '', price: 4.99, category: 'Shakes', isDailyItem: false, isActive: true },
    { id: '15', name: 'Vanilla', description: '', price: 4.99, category: 'Shakes', isDailyItem: false, isActive: true },
    { id: '19', name: 'Biscoff', description: '', price: 4.99, category: 'Shakes', isDailyItem: false, isActive: true },
    { id: '20', name: 'Reese\'s', description: '', price: 4.99, category: 'Shakes', isDailyItem: false, isActive: true },
    { id: '21', name: 'Oreo', description: '', price: 4.99, category: 'Shakes', isDailyItem: false, isActive: true },
    { id: '16', name: 'Soda', description: '', price: 1.99, category: 'Drinks', isDailyItem: false, isActive: true },
    { id: '17', name: 'Water', description: '', price: 1.50, category: 'Drinks', isDailyItem: false, isActive: true },
    { id: '18', name: '0% Beer', description: '', price: 3.50, category: 'Drinks', isDailyItem: false, isActive: true },
  ];

  useEffect(() => {
    // Fetch Settings
    supabase.from('settings').select('*').eq('id', 'general').single().then(({ data }) => {
      if (data && data.orderingMode) {
        setOrderingMode(data.orderingMode);
      }
    });

    const settingsSub = supabase.channel('settings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, payload => {
        if (payload.new && (payload.new as any).orderingMode) {
          setOrderingMode((payload.new as any).orderingMode);
        }
      }).subscribe();

    let isResolved = false;
    const timeoutId = setTimeout(() => {
      if (!isResolved) {
        console.warn("Supabase fetch timeout, using fallback items.");
        setItems(fallbackMenuItems);
        setLoading(false);
      }
    }, 2500);

    // Fetch active menu items
    supabase.from('menuItems').select('*').eq('isActive', true).then(({ data }) => {
      isResolved = true;
      clearTimeout(timeoutId);
      if (data && data.length > 0) {
        setItems(data as MenuItem[]);
      } else {
        setItems(fallbackMenuItems);
      }
      setLoading(false);
    });

    const menuSub = supabase.channel('menu_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menuItems' }, () => {
        supabase.from('menuItems').select('*').eq('isActive', true).then(({ data }) => {
          if (data) setItems(data as MenuItem[]);
        });
      }).subscribe();

    return () => {
      supabase.removeChannel(settingsSub);
      supabase.removeChannel(menuSub);
    };
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, cartQuantity: i.cartQuantity + 1 } : i);
      }
      return [...prev, { ...item, cartQuantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string | undefined, delta: number) => {
    if (!id) return;
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQ = item.cartQuantity + delta;
          return newQ > 0 ? { ...item, cartQuantity: newQ } : item;
        }
        return item;
      }).filter(item => item.cartQuantity > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

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
    <div className="bg-background bg-pattern-dots min-h-screen pt-32 pb-32 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="mb-16 md:mb-24 flex flex-col items-start">
          <h1 className="font-heading font-black text-5xl md:text-6xl tracking-tighter text-primary uppercase mb-6">Our Menu</h1>
          <a 
            href={orderingMode === 'flipdish' ? 'https://nook.flipdish.com' : '#'} 
            target={orderingMode === 'flipdish' ? '_blank' : undefined}
            rel={orderingMode === 'flipdish' ? 'noreferrer' : undefined}
            className="bg-primary text-background font-bold text-center px-10 py-4 rounded-full uppercase tracking-widest hover:bg-danger transition-colors md:w-auto w-full max-w-sm"
          >
            Order Now
          </a>
        </div>

        {/* Burgers Section */}
        {burgers.length > 0 && (
          <div id="burgers" className="mb-24 pt-8">
            <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4 text-primary">Smash Burgers</h2>
            <div className="text-secondary/80 font-medium text-sm md:text-base leading-relaxed max-w-3xl mb-12">
              <p>Available in several sizes, from M to XXL, with one to five patties to satisfy all appetites.</p>
              <p>Jalapenos and pickles add a spicy kick, while crispy onions bring the perfect crunch.</p>
              <p>Embraces the "less is more" concept, offering a perfect balance and an outstanding flavour experience from the very first bite.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:gap-12">
              {burgers.map((product) => (
                <div key={product.id} className={`flex flex-col md:flex-row md:items-center justify-between pb-8 border-b-2 border-primary/10 ${product.isDailyItem ? 'opacity-80' : ''}`}>
                  <div className="md:w-3/4">
                    <div className="flex items-center gap-4">
                      <h3 className="font-heading font-black text-3xl md:text-4xl tracking-tighter uppercase text-primary">{product.name}</h3>
                      {product.isDailyItem && (
                        <span className="bg-primary text-background text-xs font-bold px-2 py-1 rounded-full uppercase tracking-widest">Daily Special</span>
                      )}
                    </div>
                    <p className="text-secondary font-medium text-sm mt-2 uppercase tracking-wide">
                      {product.description}
                    </p>
                    {product.ingredients && (
                      <p className="text-secondary/70 italic text-xs mt-2 font-body">
                        Contains: {product.ingredients}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
                    <span className="font-heading text-3xl font-black text-primary">£{product.price.toFixed(2)}</span>
                    {orderingMode === 'internal' && (
                      <button onClick={() => addToCart(product)} className="bg-primary text-white p-3 hover:bg-danger transition-colors rounded-none">
                        <Plus className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-primary text-background p-6">
              <p className="font-bold uppercase tracking-widest text-sm text-center">
                Extras: jalapenos, pickles, cheese , bacon, patty
              </p>
            </div>
          </div>
        )}

        {/* Secondary Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto">
          
          {/* SIDES */}
          {sides.length > 0 && (
            <div id="sides" className="pt-8">
              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter mb-8">Sides</h2>
              <ul className="space-y-6">
                {sides.map(side => (
                  <li key={side.id} className="flex justify-between items-center border-b border-primary/10 pb-4">
                    <div>
                      <span className="font-bold text-lg uppercase tracking-wide text-primary block">{side.name}</span>
                      {side.description && <p className="text-xs text-secondary/70 mt-1 uppercase">{side.description}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-body font-bold text-lg text-primary">£{side.price.toFixed(2)}</span>
                      {orderingMode === 'internal' && (
                        <button onClick={() => addToCart(side)} className="bg-primary text-white p-2 hover:bg-danger transition-colors rounded">
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* DESSERTS */}
          {desserts.length > 0 && (
            <div id="desserts" className="pt-8">
              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter mb-8">Desserts</h2>
              <ul className="space-y-6">
                {desserts.map(dessert => (
                  <li key={dessert.id} className="flex justify-between items-center border-b border-primary/10 pb-4">
                    <div>
                      <span className="font-bold text-lg uppercase tracking-wide text-primary block">{dessert.name}</span>
                      {dessert.description && <p className="text-xs text-secondary/70 mt-1 uppercase">{dessert.description}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-body font-bold text-lg text-primary">£{dessert.price.toFixed(2)}</span>
                      {orderingMode === 'internal' && (
                        <button onClick={() => addToCart(dessert)} className="bg-primary text-white p-2 hover:bg-danger transition-colors rounded">
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SHAKES */}
          {shakes.length > 0 && (
            <div id="shakes" className="pt-8">
              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter mb-8">Shakes</h2>
              <ul className="space-y-6">
                {shakes.map(shake => (
                  <li key={shake.id} className="flex justify-between items-center border-b border-primary/10 pb-4">
                    <span className="font-bold text-lg uppercase tracking-wide text-primary block">{shake.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-body font-bold text-lg text-primary">£{shake.price.toFixed(2)}</span>
                      {orderingMode === 'internal' && (
                        <button onClick={() => addToCart(shake)} className="bg-primary text-white p-2 hover:bg-danger transition-colors rounded">
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* DRINKS */}
          {drinks.length > 0 && (
            <div id="drinks" className="pt-8">
              <h2 className="font-heading font-black text-3xl uppercase tracking-tighter mb-8">Drinks</h2>
              <ul className="space-y-6">
                {drinks.map(drink => (
                  <li key={drink.id} className="flex justify-between items-center border-b border-primary/10 pb-4">
                    <span className="font-bold text-lg uppercase tracking-wide text-primary block">{drink.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-body font-bold text-lg text-primary">£{drink.price.toFixed(2)}</span>
                      {orderingMode === 'internal' && (
                        <button onClick={() => addToCart(drink)} className="bg-primary text-white p-2 hover:bg-danger transition-colors rounded">
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Panel (Only if internal ordering) */}
      {orderingMode === 'internal' && cart.length > 0 && (
        <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 bg-primary text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                <h2 className="font-bold uppercase tracking-widest text-lg">Your Order</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="hover:text-danger transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <p className="font-bold uppercase tracking-wide text-sm">{item.name}</p>
                    <p className="text-secondary font-bold">£{(item.price * item.cartQuantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 rounded p-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold w-4 text-center">{item.cartQuantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t-4 border-primary bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold uppercase tracking-widest">Total</span>
                <span className="font-black text-2xl">£{cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => navigate('/checkout', { state: { cart, total: cartTotal } })}
                className="w-full bg-primary text-white font-bold uppercase tracking-widest py-4 hover:bg-danger transition-colors flex justify-center items-center gap-2"
              >
                Go To Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Toggle Button */}
      {orderingMode === 'internal' && cart.length > 0 && !isCartOpen && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 bg-danger text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 z-40"
        >
          <ShoppingCart className="w-6 h-6" />
          <div className="bg-white text-danger font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
            {cartItemCount}
          </div>
        </button>
      )}
    </div>
  );
}
