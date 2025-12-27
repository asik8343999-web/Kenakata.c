
import React, { useState } from 'react';
import { Language, Category } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

const AdminCategory: React.FC<{lang: Language}> = ({ lang }) => {
  const t = translations[lang];
  const [categories, setCategories] = useState<Category[]>(DB.getCategories());
  const [isAdding, setIsAdding] = useState(false);
  const [newCat, setNewCat] = useState({ bn: '', en: '' });

  const addCategory = () => {
    const cat: Category = {
      id: 'c' + Date.now(),
      name: { bn: newCat.bn, en: newCat.en },
      image: 'https://picsum.photos/seed/cat' + Date.now() + '/200/200'
    };
    const updated = [...categories, cat];
    DB.saveCategories(updated);
    setCategories(updated);
    setIsAdding(false);
    setNewCat({ bn: '', en: '' });
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    DB.saveCategories(updated);
    setCategories(updated);
  };

  return (
    <div className="p-4 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{t.categories} ({categories.length})</h2>
        <button onClick={() => setIsAdding(true)} className="bg-orange-600 text-white w-10 h-10 rounded-2xl shadow-lg flex items-center justify-center active:scale-90 transition-transform">
          <i className="fas fa-plus"></i>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-3xl shadow-xl space-y-4 border border-orange-50 animate-scaleUp">
          <input 
            className="w-full bg-gray-50 p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
            placeholder="Bangla Name" 
            value={newCat.bn} 
            onChange={e => setNewCat({...newCat, bn: e.target.value})}
          />
          <input 
            className="w-full bg-gray-50 p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
            placeholder="English Name" 
            value={newCat.en} 
            onChange={e => setNewCat({...newCat, en: e.target.value})}
          />
          <div className="flex gap-3">
            <button onClick={addCategory} className="flex-1 bg-orange-600 text-white font-bold py-4 rounded-2xl active:scale-95 transition-transform">Save</button>
            <button onClick={() => setIsAdding(false)} className="flex-1 bg-gray-100 text-gray-500 font-bold py-4 rounded-2xl active:scale-95 transition-transform">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
        {categories.map(cat => (
          <div key={cat.id} className="flex items-center gap-4 p-5 border-b border-gray-50 last:border-0">
            <img src={cat.image} className="w-12 h-12 rounded-2xl object-cover" alt="" />
            <div className="grow">
              <p className="text-sm font-bold text-gray-800">{cat.name.bn}</p>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-tight">{cat.name.en}</p>
            </div>
            <button onClick={() => deleteCategory(cat.id)} className="w-10 h-10 bg-red-50 text-red-400 rounded-xl flex items-center justify-center active:bg-red-500 active:text-white transition-colors">
              <i className="fas fa-trash-alt text-sm"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategory;