import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { MenuItem } from '../../types/menu';

export default function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'menuItems'), (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
      setItems(fetched);
      setLoading(false);
    });
    return unsub;
  }, []);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    await updateDoc(doc(db, 'menuItems', id), { isActive: !currentStatus });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteDoc(doc(db, 'menuItems', id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    // ensure price is a number
    const itemToSave = {
      ...editingItem,
      price: Number(editingItem.price),
    };

    if (editingItem.id) {
      await updateDoc(doc(db, 'menuItems', editingItem.id), itemToSave);
    } else {
      await addDoc(collection(db, 'menuItems'), itemToSave);
    }
    setEditingItem(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-heading font-black text-4xl uppercase tracking-tighter text-primary">Menu Manager</h2>
        {!editingItem && (
          <button 
            onClick={() => setEditingItem({ name: '', category: 'Burgers', price: 0, description: '', ingredients: '', isActive: true, isDailyItem: false })}
            className="bg-primary text-background font-bold uppercase px-4 py-2 hover:bg-primary/90"
          >
            Add Item
          </button>
        )}
      </div>

      {editingItem ? (
        <div className="bg-white border-4 border-primary p-6 max-w-2xl">
          <h3 className="font-heading font-bold text-2xl uppercase mb-6 text-primary">
            {editingItem.id ? 'Edit Item' : 'New Item'}
          </h3>
          <form onSubmit={handleSave} className="space-y-4 font-body">
            <div>
              <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-1">Name</label>
              <input required type="text" value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full border-2 border-primary/20 p-2 focus:border-primary outline-none" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-1">Category</label>
                <select value={editingItem.category || 'Burgers'} onChange={e => setEditingItem({...editingItem, category: e.target.value as any})} className="w-full border-2 border-primary/20 p-2 focus:border-primary outline-none bg-white">
                  <option value="Burgers">Burgers</option>
                  <option value="Sides">Sides</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Shakes">Shakes</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>
              <div>
                <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-1">Price (£)</label>
                <input required type="number" step="0.01" value={editingItem.price || ''} onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})} className="w-full border-2 border-primary/20 p-2 focus:border-primary outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-1">Description</label>
              <textarea value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full border-2 border-primary/20 p-2 focus:border-primary outline-none" rows={2} />
            </div>

            <div>
              <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-1">Ingredients (Optional)</label>
              <textarea value={editingItem.ingredients || ''} onChange={e => setEditingItem({...editingItem, ingredients: e.target.value})} className="w-full border-2 border-primary/20 p-2 focus:border-primary outline-none" rows={2} placeholder="e.g. 100% Angus Beef, American Cheese..." />
            </div>

            <div className="flex gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editingItem.isActive || false} onChange={e => setEditingItem({...editingItem, isActive: e.target.checked})} className="w-5 h-5 accent-primary" />
                <span className="font-bold uppercase tracking-wide text-sm text-primary">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editingItem.isDailyItem || false} onChange={e => setEditingItem({...editingItem, isDailyItem: e.target.checked})} className="w-5 h-5 accent-primary" />
                <span className="font-bold uppercase tracking-wide text-sm text-primary">Daily Special</span>
              </label>
            </div>

            <div className="flex gap-4 pt-6">
              <button type="submit" className="bg-primary text-background font-bold uppercase px-6 py-3 hover:bg-primary/90 flex-1">Save Item</button>
              <button type="button" onClick={() => setEditingItem(null)} className="border-2 border-primary text-primary font-bold uppercase px-6 py-3 hover:bg-primary/5">Cancel</button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white border-4 border-primary">
          <table className="w-full text-left font-body">
            <thead className="bg-primary text-background uppercase text-sm tracking-widest">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-t-2 border-primary/20">
                  <td className="p-4 font-bold text-primary">
                    {item.name}
                    {item.isDailyItem && <span className="ml-2 text-[10px] bg-primary text-background px-1 uppercase tracking-widest">Daily</span>}
                  </td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">£{item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleStatus(item.id!, item.isActive)}
                      className={`px-3 py-1 text-xs font-bold uppercase ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {item.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button onClick={() => setEditingItem(item)} className="text-blue-600 hover:underline mr-4 uppercase text-sm font-bold">Edit</button>
                    <button onClick={() => handleDelete(item.id!)} className="text-red-600 hover:underline uppercase text-sm font-bold">Delete</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-secondary">No menu items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
