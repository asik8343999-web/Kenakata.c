
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Language, Product } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

interface ProductListProps {
  lang: Language;
  addToCart: (p: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ lang, addToCart }) => {
  const [searchParams] = useSearchParams();
  const catId = searchParams.get('cat');
  const query = searchParams.get('q')?.toLowerCase() || '';
  const t = translations[lang];
  
  const [sort, setSort] = useState<'newest' | 'price_low' | 'price_high'>('newest');

  const filteredProducts = useMemo(() => {
    let list = DB.getProducts();
    if (catId) {
      list = list.filter(p => p.cat_id === catId);
    }
    if (query) {
      list = list.filter(p => 
        p.name.bn.toLowerCase().includes(query) || 
        p.name.en.toLowerCase().includes(query) ||
        p.description.bn.toLowerCase().includes(query) ||
        p.description.en.toLowerCase().includes(query)
      );
    }

    // Sorting logic
    return [...list].sort((a, b) => {
      if (sort === 'price_low') return a.price - b.price;
      if (sort === 'price_high') return b.price - a.price;
      return 0; // default newest
    });
  }, [catId, query, sort]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          {query ? (lang === 'bn' ? `'${query}' এর ফলাফল` : `Results for '${query}'`) : t.products}
        </h2>
        <select 
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="bg-gray-100 text-xs font-bold py-2 px-3 rounded-lg focus:outline-none"
        >
          <option value="newest">{lang === 'bn' ? 'নতুন পণ্য' : 'Newest'}</option>
          <option value="price_low">{lang === 'bn' ? 'কম দাম' : 'Price: Low'}</option>
          <option value="price_high">{lang === 'bn' ? 'বেশি দাম' : 'Price: High'}</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <i className="fas fa-search text-4xl text-gray-200 mb-4"></i>
          <p className="text-gray-400 text-sm">{lang === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No products found'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <Link to={`/product/${product.id}`} className="h-40 relative">
                <img src={product.image} className="w-full h-full object-cover" alt={product.name[lang]} />
              </Link>
              <div className="p-3">
                <Link to={`/product/${product.id}`} className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name[lang]}</Link>
                <p className="text-orange-600 font-bold mt-1">{t.currency} {product.price.toLocaleString()}</p>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className="mt-3 w-full border border-orange-500 text-orange-600 text-[10px] py-1.5 rounded-lg font-bold disabled:opacity-50"
                >
                  {t.add_to_cart}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
