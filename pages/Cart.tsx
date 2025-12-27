
import React from 'react';
import { Link } from 'react-router-dom';
import { Language, CartItem } from '../types';
import { translations } from '../translations';

interface CartProps {
  lang: Language;
  cart: CartItem[];
  updateCart: (c: CartItem[]) => void;
}

const Cart: React.FC<CartProps> = ({ lang, cart, updateCart }) => {
  const t = translations[lang];

  const removeItem = (id: string) => {
    updateCart(cart.filter(item => item.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    updateCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.cart_quantity + delta);
        return { ...item, cart_quantity: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.cart_quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center px-10 text-center">
        <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <i className="fas fa-shopping-basket text-5xl text-gray-300"></i>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{t.empty_cart}</h2>
        <Link to="/" className="text-orange-600 font-bold border-b-2 border-orange-600 pb-1">{t.home}</Link>
      </div>
    );
  }

  return (
    <div className="pb-32 px-4 py-6">
      <h2 className="text-xl font-bold mb-6">{t.cart} ({cart.length})</h2>
      
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-2xl flex gap-4 shadow-sm border border-gray-50 relative">
            <button 
              onClick={() => removeItem(item.id)}
              className="absolute top-3 right-3 text-gray-300 hover:text-red-500"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
              <img src={item.image} className="w-full h-full object-cover" alt={item.name[lang]} />
            </div>
            <div className="flex flex-col justify-between grow">
              <div>
                <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name[lang]}</h3>
                <p className="text-orange-600 font-bold text-sm mt-1">{t.currency} {item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1 gap-4">
                  <button onClick={() => updateQty(item.id, -1)} className="text-gray-500"><i className="fas fa-minus text-xs"></i></button>
                  <span className="text-sm font-bold w-4 text-center">{item.cart_quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="text-gray-500"><i className="fas fa-plus text-xs"></i></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 shadow-2xl z-40">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-500 font-medium">{t.total}</span>
          <span className="text-xl font-bold text-orange-600">{t.currency} {total.toLocaleString()}</span>
        </div>
        <Link 
          to="/checkout"
          className="w-full block text-center bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-100 active:scale-95 transition-transform"
        >
          {t.checkout}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
