import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/config';
import { Loader2, Mail, Check, Clock } from 'lucide-react';

interface Order {
  id: string;
  customer: { name: string; email: string; phone: string; };
  items: { id: string; name: string; quantity: number; price: number; }[];
  total: number;
  status: 'pending' | 'accepted' | 'ready' | 'completed';
  created_at: string;
}

export default function OrderTracker() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('orders').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setOrders(data as Order[]);
      setLoading(false);
    });

    const sub = supabase.channel('orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        supabase.from('orders').select('*').order('created_at', { ascending: false }).then(({ data }) => {
          if (data) setOrders(data as Order[]);
        });
      }).subscribe();

    return () => { supabase.removeChannel(sub); };
  }, []);

  const updateStatus = async (order: Order, newStatus: Order['status']) => {
    setUpdating(order.id);
    try {
      await supabase.from('orders').update({ status: newStatus }).eq('id', order.id);
      
      // If marked as ready, notify customer via email
      if (newStatus === 'ready') {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: order.customer.email,
            subject: 'Your Nook Burgers order is ready for collection!',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="text-transform: uppercase; color: #1a1a1a;">Order Ready!</h1>
                <p>Hi ${order.customer.name},</p>
                <p>Your order (ID: ${order.id.slice(-6).toUpperCase()}) is hot and ready for collection.</p>
                <p>Please head to the store and pay <strong>£${order.total.toFixed(2)}</strong> at the till.</p>
                <p>See you soon!</p>
              </div>
            `
          })
        });
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update order status.');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  const activeOrders = orders.filter(o => o.status !== 'completed');
  const pastOrders = orders.filter(o => o.status === 'completed');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-heading font-black uppercase tracking-tight mb-8">Live Orders</h1>

      <div className="grid grid-cols-1 gap-6 mb-12">
        {activeOrders.length === 0 ? (
          <div className="bg-gray-50 border-4 border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-500 font-bold uppercase tracking-widest">
            No active orders right now
          </div>
        ) : (
          activeOrders.map(order => (
            <div key={order.id} className="bg-white p-6 border-4 border-primary rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between gap-8">
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4 border-b-2 border-gray-100 pb-4">
                  <span className="font-heading font-black text-2xl uppercase">#{order.id.slice(-6)}</span>
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest text-white rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-500' :
                    order.status === 'accepted' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-secondary text-sm font-bold ml-auto">
                    {new Date(order.created_at).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="mb-4 text-sm font-bold text-gray-600">
                  <p>{order.customer.name}</p>
                  <p>{order.customer.phone}</p>
                  <p>{order.customer.email}</p>
                </div>

                <ul className="space-y-2 mb-4">
                  {order.items.map(item => (
                    <li key={item.id} className="font-bold uppercase tracking-wide text-sm flex justify-between border-b border-gray-100 pb-2">
                      <span>{item.quantity}x {item.name}</span>
                      <span>£{(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="font-black text-xl text-primary text-right">
                  Total: £{order.total.toFixed(2)}
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center border-t-2 md:border-t-0 md:border-l-2 border-gray-100 pt-4 md:pt-0 md:pl-8">
                {order.status === 'pending' && (
                  <button 
                    onClick={() => updateStatus(order, 'accepted')}
                    disabled={updating === order.id}
                    className="bg-blue-500 text-white font-bold uppercase tracking-widest px-6 py-3 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {updating === order.id ? <Loader2 className="animate-spin w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    Accept Order
                  </button>
                )}
                {order.status === 'accepted' && (
                  <button 
                    onClick={() => updateStatus(order, 'ready')}
                    disabled={updating === order.id}
                    className="bg-green-500 text-white font-bold uppercase tracking-widest px-6 py-3 hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {updating === order.id ? <Loader2 className="animate-spin w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    Mark Ready & Email
                  </button>
                )}
                {order.status === 'ready' && (
                  <button 
                    onClick={() => updateStatus(order, 'completed')}
                    disabled={updating === order.id}
                    className="bg-gray-800 text-white font-bold uppercase tracking-widest px-6 py-3 hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    {updating === order.id ? <Loader2 className="animate-spin w-4 h-4" /> : <Check className="w-4 h-4" />}
                    Complete (Collected)
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {pastOrders.length > 0 && (
        <div>
          <h2 className="text-xl font-heading font-black uppercase tracking-tight mb-4 text-gray-500">Recent Completed Orders</h2>
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-500">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pastOrders.map(order => (
                  <tr key={order.id} className="text-sm font-medium">
                    <td className="px-6 py-4 uppercase font-bold">#{order.id.slice(-6)}</td>
                    <td className="px-6 py-4">{order.customer.name}</td>
                    <td className="px-6 py-4">£{order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(order.created_at).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
