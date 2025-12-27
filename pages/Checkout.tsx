
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language, CartItem, User, Order } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

interface CheckoutProps {
  lang: Language;
  cart: CartItem[];
  user: User;
  updateCart: (c: CartItem[]) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ lang, cart, user, updateCart }) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const total = cart.reduce((acc, item) => acc + (item.price * item.cart_quantity), 0);

  const placeOrder = () => {
    setLoading(true);
    setTimeout(() => {
      const order: Order = {
        id: 'ORD' + Math.floor(Math.random() * 1000000),
        user_id: user.id,
        items: cart.map(i => ({ product_id: i.id, quantity: i.cart_quantity, price: i.price })),
        total_amount: total,
        status: 'placed',
        created_at: new Date().toISOString()
      };
      DB.saveOrder(order);
      updateCart([]);
      setLoading(false);
      navigate('/orders');
    }, 2000);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">{t.checkout}</h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 space-y-4">
        <h3 className="font-bold border-b pb-2">{lang === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Delivery Address'}</h3>
        <div className="space-y-1">
          <p className="text-sm font-bold text-gray-800">{user.name}</p>
          <p className="text-xs text-gray-500">{user.phone}</p>
          <textarea 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm mt-2" 
            placeholder={lang === 'bn' ? 'সম্পূর্ণ ঠিকানা লিখুন' : 'Enter full address'}
            rows={3}
          ></textarea>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 space-y-4">
        <h3 className="font-bold border-b pb-2">{lang === 'bn' ? 'পেমেন্ট মেথড' : 'Payment Method'}</h3>
        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <i className="fas fa-truck"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-orange-800">{t.cod}</p>
            <p className="text-[10px] text-orange-600">{lang === 'bn' ? 'পণ্য হাতে পেয়ে টাকা পরিশোধ করুন' : 'Pay when you receive the product'}</p>
          </div>
          <i className="fas fa-check-circle ml-auto text-orange-600"></i>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{lang === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
          <span>{t.currency} {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{lang === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Charge'}</span>
          <span>{t.currency} 0</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
          <span>{t.total}</span>
          <span className="text-orange-600">{t.currency} {total.toLocaleString()}</span>
        </div>
      </div>

      <button 
        onClick={placeOrder}
        disabled={loading}
        className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3"
      >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-check"></i>}
        {t.place_order}
      </button>
    </div>
  );
};

export default Checkout;
