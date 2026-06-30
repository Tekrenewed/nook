import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabase/config';
import type { MenuItem } from '../../types/menu';
import { Loader2, Upload, X, Filter, ImageIcon } from 'lucide-react';

export default function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [activeSiteId, setActiveSiteId] = useState<string>('all');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.from('menuItems').select('*').then(({ data }) => {
      if (data) setItems(data as MenuItem[]);
      setLoading(false);
    });

    const sub = supabase.channel('menu_manager')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menuItems' }, () => {
        supabase.from('menuItems').select('*').then(({ data }) => {
          if (data) setItems(data as MenuItem[]);
        });
      }).subscribe();
      
    return () => { supabase.removeChannel(sub); };
  }, []);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    await supabase.from('menuItems').update({ isActive: !currentStatus }).eq('id', id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await supabase.from('menuItems').delete().eq('id', id);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    setUploadingImage(true);
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { error } = await supabase.storage.from('menu-items').upload(fileName, file);
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage.from('menu-items').getPublicUrl(fileName);
      setEditingItem({ ...editingItem, imageUrl: publicUrl });
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const itemToSave = {
      ...editingItem,
      price: Number(editingItem.price),
      siteId: editingItem.siteId || 'global'
    };

    const { id, ...dataToSave } = itemToSave as any;

    if (editingItem.id) {
      await supabase.from('menuItems').update(dataToSave).eq('id', editingItem.id);
    } else {
      await supabase.from('menuItems').insert([dataToSave]);
    }
    setEditingItem(null);
  };

  const filteredItems = activeSiteId === 'all' 
    ? items 
    : items.filter(item => item.siteId === activeSiteId || item.siteId === 'global');

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-heading font-black text-4xl uppercase tracking-tighter text-primary">Menu Builder</h2>
          <p className="text-secondary font-bold uppercase tracking-widest text-sm mt-1">Manage global & site-specific items</p>
        </div>
        
        {!editingItem && (
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white border-2 border-primary px-4 py-2">
              <Filter size={16} className="text-primary" />
              <select 
                value={activeSiteId} 
                onChange={e => setActiveSiteId(e.target.value)}
                className="bg-transparent font-bold uppercase tracking-widest text-sm text-primary outline-none"
              >
                <option value="all">All Sites</option>
                <option value="global">Global (All)</option>
                <option value="streatham">Streatham</option>
                <option value="slough">Slough</option>
              </select>
            </div>
            
            <button 
              onClick={() => setEditingItem({ name: '', category: 'Burgers', price: 0, description: '', ingredients: '', isActive: true, isDailyItem: false, siteId: 'global' })}
              className="bg-primary text-background font-bold uppercase tracking-widest px-6 py-2 hover:bg-primary/90 transition-colors border-2 border-primary"
            >
              Add Item
            </button>
          </div>
        )}
      </div>

      {editingItem ? (
        <div className="bg-white border-4 border-primary p-8 max-w-4xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-8 border-b-2 border-primary pb-4">
            <h3 className="font-heading font-black text-2xl uppercase text-primary">
              {editingItem.id ? 'Edit Menu Item' : 'New Menu Item'}
            </h3>
            <button onClick={() => setEditingItem(null)} className="text-secondary hover:text-primary transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8 font-body">
            
            {/* Left Col: Image */}
            <div className="col-span-1 space-y-4">
              <label className="block text-primary font-bold uppercase tracking-widest text-sm">Item Photo</label>
              
              <div 
                className="aspect-square border-4 border-primary border-dashed bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {editingItem.imageUrl ? (
                  <>
                    <img src={editingItem.imageUrl} alt="Menu item" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-primary text-white font-bold uppercase tracking-widest text-xs px-3 py-1">Change Image</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    {uploadingImage ? <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /> : <Upload className="w-8 h-8 mx-auto mb-2 text-primary/50 group-hover:text-primary transition-colors" />}
                    <span className="font-bold uppercase tracking-widest text-xs text-primary/50 group-hover:text-primary block mt-2">
                      {uploadingImage ? 'Uploading...' : 'Click to Upload'}
                    </span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </div>
              <p className="text-xs text-secondary font-medium leading-relaxed">Square images (1080x1080) work best for the menu layout.</p>
            </div>

            {/* Right Col: Details */}
            <div className="col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Name</label>
                  <input required type="text" value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-background border-2 border-primary px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                  <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Price (£)</label>
                  <input required type="number" step="0.01" value={editingItem.price || ''} onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})} className="w-full bg-background border-2 border-primary px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Category</label>
                  <select value={editingItem.category || 'Burgers'} onChange={e => setEditingItem({...editingItem, category: e.target.value as any})} className="w-full bg-background border-2 border-primary px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                    <option value="Burgers">Burgers</option>
                    <option value="Sides">Sides</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Shakes">Shakes</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>
                <div>
                  <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Availability (Site)</label>
                  <select value={editingItem.siteId || 'global'} onChange={e => setEditingItem({...editingItem, siteId: e.target.value})} className="w-full bg-background border-2 border-primary px-4 py-3 font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                    <option value="global">Global (All Sites)</option>
                    <option value="streatham">Streatham Only</option>
                    <option value="slough">Slough Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Description</label>
                <textarea value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-background border-2 border-primary px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all" rows={3} />
              </div>

              <div>
                <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Ingredients (Optional)</label>
                <textarea value={editingItem.ingredients || ''} onChange={e => setEditingItem({...editingItem, ingredients: e.target.value})} className="w-full bg-background border-2 border-primary px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all" rows={2} placeholder="e.g. 100% Angus Beef, American Cheese..." />
              </div>

              <div className="flex gap-8 pt-2 p-4 bg-gray-50 border-2 border-primary/10">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={editingItem.isActive || false} onChange={e => setEditingItem({...editingItem, isActive: e.target.checked})} className="w-5 h-5 accent-primary" />
                  <span className="font-bold uppercase tracking-widest text-sm text-primary">Active on Menu</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={editingItem.isDailyItem || false} onChange={e => setEditingItem({...editingItem, isDailyItem: e.target.checked})} className="w-5 h-5 accent-primary" />
                  <span className="font-bold uppercase tracking-widest text-sm text-primary">Daily Special</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4 border-t-2 border-primary pb-2">
                <button type="submit" disabled={uploadingImage} className="bg-primary text-background font-bold uppercase tracking-widest px-8 py-4 hover:bg-primary/90 flex-1 transition-colors disabled:opacity-50 border-2 border-primary">
                  Save Item
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-12 h-12" /></div>
      ) : (
        <div className="bg-white border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <table className="w-full text-left font-body">
            <thead className="bg-primary text-background uppercase text-sm tracking-widest border-b-4 border-primary">
              <tr>
                <th className="p-5">Item</th>
                <th className="p-5">Category</th>
                <th className="p-5">Site</th>
                <th className="p-5">Price</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} className="border-b-2 border-primary/10 hover:bg-gray-50 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 border-2 border-primary overflow-hidden">
                        {item.imageUrl ? <img src={item.imageUrl} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-primary/30"><ImageIcon size={16}/></div>}
                      </div>
                      <div>
                        <div className="font-bold text-primary text-lg">{item.name}</div>
                        {item.isDailyItem && <span className="inline-block mt-1 text-[10px] bg-primary text-background px-2 py-0.5 uppercase tracking-widest font-bold">Daily Special</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-5 font-bold text-secondary uppercase tracking-widest text-sm">{item.category}</td>
                  <td className="p-5">
                    <span className={`px-2 py-1 text-xs font-bold uppercase tracking-widest border-2 ${item.siteId === 'global' ? 'border-purple-200 text-purple-700 bg-purple-50' : 'border-blue-200 text-blue-700 bg-blue-50'}`}>
                      {item.siteId || 'Global'}
                    </span>
                  </td>
                  <td className="p-5 font-bold text-lg">£{item.price.toFixed(2)}</td>
                  <td className="p-5">
                    <button 
                      onClick={() => toggleStatus(item.id!, item.isActive)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border-2 transition-colors ${item.isActive ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' : 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'}`}
                    >
                      {item.isActive ? 'Live' : 'Hidden'}
                    </button>
                  </td>
                  <td className="p-5 text-right opacity-50 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingItem(item)} className="text-primary hover:bg-primary hover:text-white border-2 border-transparent hover:border-primary px-3 py-1 uppercase tracking-widest text-xs font-bold transition-all mr-2">Edit</button>
                    <button onClick={() => handleDelete(item.id!)} className="text-red-600 hover:bg-red-600 hover:text-white border-2 border-transparent hover:border-red-600 px-3 py-1 uppercase tracking-widest text-xs font-bold transition-all">Del</button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-secondary font-bold uppercase tracking-widest">No menu items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
