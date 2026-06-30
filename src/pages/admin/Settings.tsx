import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/config';
import { Save, Loader2 } from 'lucide-react';

export default function Settings() {
  const [orderingMode, setOrderingMode] = useState<'flipdish' | 'internal'>('flipdish');
  const [flipdishUrl, setFlipdishUrl] = useState('https://nook.flipdish.com');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.from('settings').select('*').eq('id', 'general').single().then(({ data }) => {
      if (data) {
        if (data.orderingMode) setOrderingMode(data.orderingMode);
        if (data.flipdishUrl) setFlipdishUrl(data.flipdishUrl);
      }
      setLoading(false);
    });

    const sub = supabase.channel('settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings', filter: 'id=eq.general' }, payload => {
        if (payload.new) {
          if ((payload.new as any).orderingMode) setOrderingMode((payload.new as any).orderingMode);
          if ((payload.new as any).flipdishUrl) setFlipdishUrl((payload.new as any).flipdishUrl);
        }
      }).subscribe();

    return () => { supabase.removeChannel(sub); };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const { error } = await supabase.from('settings').upsert({
        id: 'general',
        orderingMode,
        flipdishUrl
      });
      if (error) throw error;
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black uppercase tracking-tight">System Settings</h1>
      </div>

      <div className="bg-white p-8 border-4 border-primary rounded-xl max-w-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-primary pb-2">Ordering System</h2>
        
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-widest text-secondary">Ordering Mode</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`cursor-pointer border-2 p-4 rounded-lg flex items-center justify-center font-bold tracking-wide transition-all ${orderingMode === 'flipdish' ? 'bg-primary text-white border-primary' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-primary'}`}>
                <input 
                  type="radio" 
                  className="hidden" 
                  name="orderingMode" 
                  value="flipdish" 
                  checked={orderingMode === 'flipdish'} 
                  onChange={() => setOrderingMode('flipdish')} 
                />
                Use Flipdish
              </label>
              
              <label className={`cursor-pointer border-2 p-4 rounded-lg flex items-center justify-center font-bold tracking-wide transition-all ${orderingMode === 'internal' ? 'bg-primary text-white border-primary' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-primary'}`}>
                <input 
                  type="radio" 
                  className="hidden" 
                  name="orderingMode" 
                  value="internal" 
                  checked={orderingMode === 'internal'} 
                  onChange={() => setOrderingMode('internal')} 
                />
                Internal (Pay In-Store)
              </label>
            </div>
          </div>

          {orderingMode === 'flipdish' && (
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-secondary mb-2">Flipdish URL</label>
              <input 
                type="url" 
                value={flipdishUrl}
                onChange={(e) => setFlipdishUrl(e.target.value)}
                className="w-full bg-background border-2 border-primary px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-danger transition-all"
                placeholder="https://your-flipdish-url.com"
                required
              />
            </div>
          )}

          <div className="pt-4 border-t-2 border-primary flex items-center justify-between">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-primary text-white font-bold uppercase tracking-widest px-8 py-4 hover:bg-danger transition-colors flex items-center disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
              Save Settings
            </button>
            {message && (
              <span className={`font-bold tracking-wide ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
