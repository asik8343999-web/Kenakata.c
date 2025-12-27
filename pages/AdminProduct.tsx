
import React, { useState } from 'react';
import { Language, Product } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

const AdminProduct: React.FC<{lang: Language}> = ({ lang }) => {
  const t = translations[lang];
  const [products, setProducts] = useState<Product[]>(DB.getProducts());
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ bn: '', en: '', price: '', stock: '' });

  const addProduct = () => {
    const p: Product = {
      id: 'p' + Date.now(),
      cat_id: '1',
      name: { bn: form.bn, en: form.en },
      description: { bn: 'নতুন পণ্য', en: 'New Arrival' },
      price: Number(form.price),
      stock: Number(form.stock),
      image: 'https://picsum.photos/seed/p' + Date.now() + '/400/400',
      created_at: new Date().toISOString()
    };
    const updated = [...products, p];
    DB.saveProducts(updated);
    setProducts(updated);
    setIsAdding(false);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    DB.saveProducts(updated);
    setProducts(updated);
  };

  return (
    <div className="p-4 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{t.products} ({products.length})</h2>
        <button onClick={() => setIsAdding(true)} className="bg-orange-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
          Add New
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-3xl shadow-xl space-y-4 border border-orange-50 animate-scaleUp">
          <input className="w-full bg-gray-50 p-4 rounded-2xl text-sm focus:outline-none" placeholder="Bangla Name" onChange={e => setForm({...form, bn: e.target.value})} />
          <input className="w-full bg-gray-50 p-4 rounded-2xl text-sm focus:outline-none" placeholder="English Name" onChange={e => setForm({...form, en: e.target.value})} />
          <div className="flex gap-3">
            <input className="w-full bg-gray-50 p-4 rounded-2xl text-sm focus:outline-none" placeholder="Price" onChange={e => setForm({...form, price: e.target.value})} />
            <input className="w-full bg-gray-50 p-4 rounded-2xl text-sm focus:outline-none" placeholder="Stock" onChange={e => setForm({...form, stock: e.target.value})} />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={addProduct} className="flex-1 bg-orange-600 text-white font-bold py-4 rounded-2xl">Add Product</button>
            <button onClick={() => setIsAdding(false)} className="flex-1 bg-gray-100 text-gray-500 font-bold py-4 rounded-2xl">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-3xl flex gap-4 shadow-sm border border-gray-50 group">
            <img src={p.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
            <div className="grow flex flex-col justify-center">
              <h4 className="text-sm font-bold text-gray-800">{p.name[lang]}</h4>
              <p className="text-orange-600 font-black text-sm mt-1">{t.currency} {p.price.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">Stock: {p.stock}</p>
            </div>
            <button onClick={() => deleteProduct(p.id)} className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center self-center opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity">
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;