
import React from 'react';
import { Link } from 'react-router-dom';
import { Language, Product, Category } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

interface HomeProps {
  lang: Language;
  addToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ lang, addToCart }) => {
  const t = translations[lang];
  const categories = DB.getCategories();
  const products = DB.getProducts();

  return (
    <div className="pb-8">
      {/* Banner */}
      <div className="px-4 py-3">
        <div className="w-full h-40 bg-orange-100 rounded-2xl overflow-hidden relative">
          <img src="https://picsum.photos/seed/offer/800/400" className="w-full h-full object-cover opacity-80" alt="Banner" />
          <div className="absolute inset-0 flex flex-col justify-center p-6 bg-gradient-to-r from-orange-500/50 to-transparent">
            <h2 className="text-white text-2xl font-bold drop-shadow-md">
              {lang === 'bn' ? '৫০০৳ ডিসকাউন্ট!' : '500৳ Discount!'}
            </h2>
            <p className="text-white text-sm">
              {lang === 'bn' ? 'প্রথম অর্ডারে দারুণ সুযোগ' : 'Great offer on first order'}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Categories */}
      <div className="mt-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h3 className="font-bold text-gray-800">{t.categories}</h3>
          <Link to="/products" className="text-xs text-orange-600 font-semibold">
            {lang === 'bn' ? 'সব দেখুন' : 'View All'}
          </Link>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-4 px-4">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/products?cat=${cat.id}`} className="flex flex-col items-center shrink-0 gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src={cat.image} className="w-full h-full object-cover" alt={cat.name[lang]} />
              </div>
              <span className="text-xs font-medium text-gray-600">{cat.name[lang]}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mt-8 px-4">
        <h3 className="font-bold text-gray-800 mb-4">{t.featured}</h3>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <Link to={`/product/${product.id}`} className="relative h-40">
                <img src={product.image} className="w-full h-full object-cover" alt={product.name[lang]} />
                {product.stock <= 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                    {t.stock_out}
                  </div>
                )}
              </Link>
              <div className="p-3 flex flex-col grow">
                <Link to={`/product/${product.id}`} className="text-sm font-semibold text-gray-800 line-clamp-1 h-5">
                  {product.name[lang]}
                </Link>
                <p className="text-orange-600 font-bold mt-1">
                  {t.currency} {product.price.toLocaleString()}
                </p>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className="mt-3 w-full bg-orange-500 text-white text-xs py-2 rounded-lg font-bold active:scale-95 transition-transform disabled:bg-gray-300"
                >
                  {t.add_to_cart}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
