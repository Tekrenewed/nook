import { useState } from 'react';

export default function Menu() {
  const products = [
    { id: 'b1', name: 'The Smash', description: 'Patty, Cheese, Pickles, House Sauce (Single/Double)', price: 8.99, image: '/plain_single.png' },
    { id: 'b2', name: 'Truffle Smash', description: 'Patty, Cheese, Truffle Mayo, Crispy Onions (Single/Double)', price: 9.99, image: '/plain_double.png' },
    { id: 'b3', name: 'Stack\'d', description: 'Triple Patty, Triple Cheese, House Sauce (pickles)', price: 10.99, image: '/plain_triple.png' },
    { id: 'b4', name: 'Bacon Smash', description: 'Double patty, crispy bacon, pickles, house sauce', price: 10.99, image: '/plain_double.png' },
    { id: 'b5', name: 'Beyond Smash', description: 'Vegan Patty, Vegan Cheese, House Sauce', price: 9.99, image: '/plain_single.png' },
    { id: 'b6', name: 'Hot Smash', description: 'Single patty, jelepenos, pickles, hot sauce', price: 8.99, image: '/plain_single.png' },
    { id: 'b7', name: 'Cluck\'d', description: 'Fried Fillet, Cheese, House Sauce', price: 8.99, image: '/plain_single.png' },
  ];

  return (
    <div className="bg-background min-h-screen pt-[160px] pb-32 animate-fade-in relative">
      
      {/* Menu Header Title */}
      <div className="text-center mb-16">
        <h1 className="font-heading font-extrabold text-5xl md:text-7xl tracking-tight text-primary uppercase">Burgers</h1>
      </div>

      {/* Description Text */}
      <div className="max-w-3xl mx-auto text-center px-6 mb-24">
        <p className="text-secondary font-light text-xl leading-relaxed">
          Our signature smash burgers, pressed crisp on the grill. 
        </p>
      </div>

      {/* Product List — Editorial zig-zag */}
      <div className="max-w-6xl mx-auto px-6 mb-16 space-y-24">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Image side */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-w-md h-auto object-contain drop-shadow-xl group-hover:-translate-y-2 transition-transform duration-500 ease-out mix-blend-multiply relative z-10"
              />
            </div>
            
            {/* Typography side */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-baseline justify-between border-b border-primary/10 pb-4">
                <h3 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-tight uppercase">{product.name}</h3>
                <span className="font-body text-2xl font-bold text-secondary">£{product.price.toFixed(2)}</span>
              </div>
              <p className="text-primary/80 font-light text-lg lg:text-xl leading-relaxed max-w-[45ch] capitalize">
                {product.description}
              </p>
              <div>
                <button className="mt-4 text-sm font-bold tracking-widest uppercase border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors">
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 mb-32 text-center">
        <p className="text-secondary font-bold uppercase tracking-widest text-sm bg-primary/5 py-4 rounded-lg inline-block px-8">
          Extras: Jalapenos, Pickles, Cheese, Bacon, Patty
        </p>
      </div>

      {/* The Rest - Brutalist Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <h2 className="font-heading font-extrabold text-5xl md:text-6xl mb-16 tracking-tight text-center uppercase">More Than Burgers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {/* SIDES */}
          <div>
            <h3 className="font-heading font-extrabold text-3xl uppercase tracking-widest border-b-4 border-primary pb-4 mb-8">Sides</h3>
            <ul className="space-y-6">
              <li className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-xl uppercase tracking-wider group-hover:text-danger transition-colors">Fries</span>
                  <span className="font-body font-bold text-lg text-secondary">£3.99</span>
                </div>
                <p className="text-secondary/80 text-sm tracking-wide">Plain / Cheesy / Truffle</p>
              </li>
              <li className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-xl uppercase tracking-wider group-hover:text-danger transition-colors">Loaded Fries</span>
                  <span className="font-body font-bold text-lg text-secondary">£5.99</span>
                </div>
                <p className="text-secondary/80 text-sm tracking-wide">Beef Patty / Chicken / Vegan</p>
              </li>
              <li className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-xl uppercase tracking-wider group-hover:text-danger transition-colors">Tater Tots</span>
                  <span className="font-body font-bold text-lg text-secondary">£4.50</span>
                </div>
              </li>
            </ul>
          </div>

          {/* DESSERTS */}
          <div>
            <h3 className="font-heading font-extrabold text-3xl uppercase tracking-widest border-b-4 border-primary pb-4 mb-8">Desserts</h3>
            <ul className="space-y-6">
              <li className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-xl uppercase tracking-wider group-hover:text-danger transition-colors">Oreo Dream</span>
                  <span className="font-body font-bold text-lg text-secondary">£5.50</span>
                </div>
              </li>
              <li className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-xl uppercase tracking-wider group-hover:text-danger transition-colors">Matilda Cake</span>
                  <span className="font-body font-bold text-lg text-secondary">£6.50</span>
                </div>
              </li>
            </ul>
          </div>

          {/* SHAKES */}
          <div>
            <h3 className="font-heading font-extrabold text-3xl uppercase tracking-widest border-b-4 border-primary pb-4 mb-8">Shakes</h3>
            <ul className="space-y-6">
              {['Chocolate', 'Strawberry', 'Vanilla', 'Biscoff', "Reese's", 'Oreo'].map(shake => (
                <li key={shake} className="group flex justify-between items-baseline">
                  <span className="font-bold text-xl uppercase tracking-wider group-hover:text-danger transition-colors">{shake}</span>
                  <span className="font-body font-bold text-lg text-secondary">£4.99</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DRINKS */}
          <div>
            <h3 className="font-heading font-extrabold text-3xl uppercase tracking-widest border-b-4 border-primary pb-4 mb-8">Drinks</h3>
            <ul className="space-y-6">
              <li className="group flex justify-between items-baseline">
                <span className="font-bold text-xl uppercase tracking-wider group-hover:text-danger transition-colors">Soda</span>
                <span className="font-body font-bold text-lg text-secondary">£1.99</span>
              </li>
              <li className="group flex justify-between items-baseline">
                <span className="font-bold text-xl uppercase tracking-wider group-hover:text-danger transition-colors">Water</span>
                <span className="font-body font-bold text-lg text-secondary">£1.50</span>
              </li>
              <li className="group flex justify-between items-baseline">
                <span className="font-bold text-xl uppercase tracking-wider group-hover:text-danger transition-colors">0% Beer</span>
                <span className="font-body font-bold text-lg text-secondary">£3.50</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Allergens Guide */}
      <div className="flex justify-center">
        <button className="text-sm font-bold tracking-widest uppercase text-secondary hover:text-primary transition-colors">
          Download Allergens Guide (PDF)
        </button>
      </div>
    </div>
  );
}
