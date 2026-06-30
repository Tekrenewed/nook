import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/config';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import type { CartItem } from './Menu';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state as { cart: CartItem[], total: number } || { cart: [], total: 0 };
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (cart.length === 0 && !success) {
    return (
      <div className="bg-background min-h-screen pt-32 flex flex-col items-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Your cart is empty</h1>
        <button onClick={() => navigate('/menu')} className="bg-primary text-white px-8 py-3 font-bold uppercase hover:bg-danger transition-colors">Return to Menu</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // 1. Save to Supabase
      const { data: orderData, error: orderError } = await supabase.from('orders').insert([{
        customer: formData,
        items: cart.map(i => ({ id: i.id, name: i.name, quantity: i.cartQuantity, price: i.price })),
        total,
        status: 'pending' // pending, accepted, ready, completed
      }]).select().single();

      if (orderError) throw orderError;

      // 2. Trigger our Vercel Serverless Email Function
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          subject: 'We received your Nook Burgers order!',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="text-transform: uppercase;">Order Received</h1>
              <p>Hi ${formData.name},</p>
              <p>We've received your order and are preparing it now. Please pay <strong>£${total.toFixed(2)}</strong> in-store when you collect it.</p>
              <h3>Order Details (ID: ${orderData.id.slice(-6).toUpperCase()})</h3>
              <ul>
                ${cart.map(item => `<li>${item.cartQuantity}x ${item.name}</li>`).join('')}
              </ul>
              <p>We will email you again when it's ready for collection!</p>
            </div>
          `
        })
      });

      setSuccess(true);
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-background min-h-screen pt-32 pb-32 flex flex-col items-center justify-center text-center px-6">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-8" />
        <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">Order Received</h1>
        <p className="text-secondary font-medium text-lg max-w-md mb-8">
          Thank you! We've sent a confirmation email to <strong>{formData.email}</strong>. 
          Please head to the store and pay upon collection.
        </p>
        <button onClick={() => navigate('/')} className="bg-primary text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-danger transition-colors">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Form */}
        <div>
          <button onClick={() => navigate('/menu')} className="flex items-center text-secondary hover:text-primary font-bold uppercase tracking-widest text-sm mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Menu
          </button>
          
          <h1 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter mb-8">Checkout</h1>
          <div className="bg-primary/5 p-6 border-l-4 border-primary mb-12">
            <h3 className="font-bold uppercase tracking-widest mb-2">Pay In-Store Only</h3>
            <p className="text-sm text-secondary">You will pay for this order when you come to collect it. We will notify you via email when it's ready.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Full Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white border-2 border-primary/20 px-4 py-3 outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Email Address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white border-2 border-primary/20 px-4 py-3 outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Phone Number</label>
              <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border-2 border-primary/20 px-4 py-3 outline-none focus:border-primary transition-colors" />
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-primary text-white font-bold uppercase tracking-widest py-5 mt-8 hover:bg-danger transition-colors flex justify-center items-center disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : `Place Order (£${total.toFixed(2)})`}
            </button>
          </form>
        </div>

        {/* Right: Summary */}
        <div className="bg-gray-50 p-8 lg:p-12 border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] self-start sticky top-32">
          <h2 className="font-heading font-black text-2xl uppercase tracking-tighter mb-8 border-b-2 border-primary pb-4">Order Summary</h2>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm font-bold uppercase tracking-wide">
                <span>{item.cartQuantity}x {item.name}</span>
                <span>£{(item.price * item.cartQuantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-primary pt-6 flex justify-between items-center">
            <span className="font-bold uppercase tracking-widest">Total to pay in-store</span>
            <span className="font-black text-3xl">£{total.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
