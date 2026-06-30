import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/config';
import type { SiteConfig } from '../../types/site';
import { Loader2, Plus, Trash2, Save } from 'lucide-react';

const DEFAULT_CONFIG: SiteConfig = {
  address: '',
  phone: '',
  email: '',
  openingHours: {
    monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: ''
  },
  faq: []
};

export default function SiteContentManager() {
  const [activeSiteId, setActiveSiteId] = useState('streatham');
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase.from('siteConfigs').select('*').eq('id', activeSiteId).single().then(({ data }) => {
      if (data) {
        const { id, ...configData } = data;
        setConfig({ ...DEFAULT_CONFIG, ...configData } as SiteConfig);
      } else {
        setConfig(DEFAULT_CONFIG);
      }
      setLoading(false);
    });

    const sub = supabase.channel('siteConfigs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'siteConfigs', filter: `id=eq.${activeSiteId}` }, payload => {
        if (payload.new) {
          const { id, ...configData } = payload.new as any;
          setConfig({ ...DEFAULT_CONFIG, ...configData } as SiteConfig);
        } else {
          setConfig(DEFAULT_CONFIG);
        }
      }).subscribe();

    return () => { supabase.removeChannel(sub); };
  }, [activeSiteId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.from('siteConfigs').upsert({ id: activeSiteId, ...config });
      if (error) throw error;
      alert('Content saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save content.');
    } finally {
      setSaving(false);
    }
  };

  const addFaq = () => {
    setConfig({ ...config, faq: [...config.faq, { question: '', answer: '' }] });
  };

  const removeFaq = (index: number) => {
    const newFaq = [...config.faq];
    newFaq.splice(index, 1);
    setConfig({ ...config, faq: newFaq });
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaq = [...config.faq];
    newFaq[index][field] = value;
    setConfig({ ...config, faq: newFaq });
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-12 h-12" /></div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tighter text-primary">Site Content</h2>
          <p className="text-secondary font-bold uppercase tracking-widest text-sm mt-1">Manage website text, FAQs, and hours</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white border-2 border-primary px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <select 
            value={activeSiteId} 
            onChange={e => setActiveSiteId(e.target.value)}
            className="bg-transparent font-bold uppercase tracking-widest text-sm text-primary outline-none cursor-pointer"
          >
            <option value="streatham">Streatham (HQ)</option>
            <option value="slough">Slough</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8 font-body pb-20">
        
        {/* Contact & Location */}
        <div className="bg-white border-4 border-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-heading font-black text-2xl uppercase text-primary mb-6 border-b-2 border-primary pb-2">Location & Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Address</label>
              <textarea value={config.address} onChange={e => setConfig({...config, address: e.target.value})} className="w-full bg-background border-2 border-primary px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" rows={2} />
            </div>
            <div>
              <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Phone</label>
              <input type="text" value={config.phone} onChange={e => setConfig({...config, phone: e.target.value})} className="w-full bg-background border-2 border-primary px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div>
              <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Email</label>
              <input type="email" value={config.email} onChange={e => setConfig({...config, email: e.target.value})} className="w-full bg-background border-2 border-primary px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-white border-4 border-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-heading font-black text-2xl uppercase text-primary mb-6 border-b-2 border-primary pb-2">Opening Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(DEFAULT_CONFIG.openingHours).map((day) => (
              <div key={day}>
                <label className="block text-primary font-bold uppercase tracking-widest text-xs mb-1">{day}</label>
                <input 
                  type="text" 
                  value={config.openingHours[day as keyof typeof config.openingHours]} 
                  onChange={e => setConfig({
                    ...config, 
                    openingHours: { ...config.openingHours, [day]: e.target.value }
                  })} 
                  placeholder="e.g. 12:00 - 23:00 or Closed"
                  className="w-full bg-background border-2 border-primary px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white border-4 border-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-6 border-b-2 border-primary pb-2">
            <h3 className="font-heading font-black text-2xl uppercase text-primary">FAQ & Knowledge Base</h3>
            <button type="button" onClick={addFaq} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-white border-2 border-transparent hover:border-primary px-3 py-1 transition-all">
              <Plus size={16} /> Add FAQ
            </button>
          </div>
          
          <div className="space-y-6">
            {config.faq.map((item, index) => (
              <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 border-2 border-primary/20">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-primary font-bold uppercase tracking-widest text-xs mb-1">Question</label>
                    <input type="text" value={item.question} onChange={e => updateFaq(index, 'question', e.target.value)} className="w-full bg-white border-2 border-primary px-3 py-2 font-bold outline-none" />
                  </div>
                  <div>
                    <label className="block text-primary font-bold uppercase tracking-widest text-xs mb-1">Answer</label>
                    <textarea value={item.answer} onChange={e => updateFaq(index, 'answer', e.target.value)} className="w-full bg-white border-2 border-primary px-3 py-2 font-medium outline-none" rows={2} />
                  </div>
                </div>
                <button type="button" onClick={() => removeFaq(index)} className="mt-6 p-2 text-red-500 hover:bg-red-500 hover:text-white transition-colors border-2 border-transparent hover:border-red-500">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {config.faq.length === 0 && (
              <p className="text-secondary font-bold uppercase tracking-widest text-center py-8">No FAQs added yet.</p>
            )}
          </div>
        </div>

        {/* Fixed Save Bar */}
        <div className="fixed bottom-0 left-64 right-0 p-4 bg-white border-t-4 border-primary flex justify-end px-12 z-50">
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-background font-black uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            {saving ? <Loader2 className="animate-spin w-6 h-6" /> : <Save className="w-6 h-6" />}
            Save All Content
          </button>
        </div>
      </form>
    </div>
  );
}
