
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Language, Product } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

interface ProductDetailProps {
  lang: Language;
  addToCart: (p: Product, q: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ lang, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = translations[lang];
  const products = DB.getProducts();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);

  if (!product) return <div className="p-10 text-center">Product not found</div>;

  const related = products.filter(p => p.cat_id === product.cat_id && p.id !== product.id).slice(0, 4);

  return (
    <div className="pb-32 animate-fadeIn">
      <div className="relative h-80 bg-white">
        <img src={product.image} className="w-full h-full object-contain" alt={product.name[lang]} />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>

      <div className="p-6 bg-white -mt-6 rounded-t-3xl shadow-2xl relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${product.stock > 0 ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50'}`}>
              {product.stock > 0 ? t.stock_in : t.stock_out}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">{product.name[lang]}</h1>
          </div>
          <p className="text-2xl font-black text-orange-600">{t.currency} {product.price.toLocaleString()}</p>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {product.description[lang]}
        </p>

        <div className="flex items-center justify-between mb-8">
          <span className="font-bold text-gray-700">{lang === 'bn' ? 'পরিমাণ' : 'Quantity'}</span>
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 gap-6">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gray-500"><i className="fas fa-minus"></i></button>
            <span className="text-lg font-bold w-6 text-center">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="text-gray-500"><i className="fas fa-plus"></i></button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-gray-800 mb-4">{lang === 'bn' ? 'অনুরূপ পণ্য' : 'Related Products'}</h3>
            <div className="grid grid-cols-2 gap-4">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="bg-gray-50 p-2 rounded-xl">
                  <img src={p.image} className="w-full h-24 object-cover rounded-lg mb-2" alt="" />
                  <p className="text-[10px] font-bold line-clamp-1">{p.name[lang]}</p>
                  <p className="text-orange-600 text-[10px] font-bold">{t.currency} {p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t p-6 flex gap-4 z-40">
        <button 
          onClick={() => addToCart(product, qty)}
          disabled={product.stock <= 0}
          className="flex-1 border-2 border-orange-500 text-orange-600 font-bold py-4 rounded-2xl active:scale-95 transition-transform disabled:opacity-50"
        >
          {t.add_to_cart}
        </button>
        <Link 
          to="/cart"
          onClick={() => addToCart(product, qty)}
          className={`flex-1 bg-orange-600 text-white font-bold py-4 rounded-2xl text-center shadow-lg active:scale-95 transition-transform ${product.stock <= 0 ? 'pointer-events-none opacity-50' : ''}`}
        >
          {t.buy_now}
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;