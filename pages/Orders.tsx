
import React, { useState } from 'react';
import { Language, User, Order } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

interface OrdersProps {
  lang: Language;
  user: User;
}

const Orders: React.FC<OrdersProps> = ({ lang, user }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  
  const allOrders = DB.getOrders().filter(o => o.user_id === user.id);
  const orders = activeTab === 'active' 
    ? allOrders.filter(o => o.status !== 'delivered') 
    : allOrders.filter(o => o.status === 'delivered');

  const getStatusStep = (status: string) => {
    if (status === 'placed') return 1;
    if (status === 'dispatched') return 2;
    if (status === 'delivered') return 3;
    return 1;
  };

  return (
    <div className="p-4 space-y-6 animate-fadeIn">
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl shadow-inner">
        <button 
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 ${activeTab === 'active' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
        >
          {t.active_orders}
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 ${activeTab === 'history' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
        >
          {t.order_history}
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="py-24 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-box-open text-3xl text-gray-200"></i>
          </div>
          <p className="text-gray-400 text-sm font-medium">{lang === 'bn' ? 'কোনো অর্ডার পাওয়া যায়নি' : 'No orders found'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const step = getStatusStep(order.status);
            return (
              <div key={order.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 transform transition-all active:scale-[0.98]">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest">#{order.id}</h4>
                    <p className="text-xs text-gray-400 font-medium">{new Date(order.created_at).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-gray-800">{t.currency} {order.total_amount.toLocaleString()}</span>
                    <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'CASH ON DELIVERY'}</p>
                  </div>
                </div>

                {/* Status Progress Bar - Amazon Style */}
                <div className="relative mt-10 mb-6 px-4">
                  <div className="h-1 bg-gray-100 w-full absolute top-2.5 left-0 rounded-full"></div>
                  <div 
                    className="h-1 bg-green-500 absolute top-2.5 left-0 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: step === 1 ? '10%' : step === 2 ? '50%' : '100%' }}
                  ></div>
                  
                  <div className="flex justify-between relative z-10">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 transition-all duration-500 ${step >= 1 ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                        {step >= 1 ? <i className="fas fa-check"></i> : <i className="fas fa-circle text-[4px]"></i>}
                      </div>
                      <span className={`text-[9px] mt-2 font-black uppercase tracking-tighter ${step >= 1 ? 'text-green-600' : 'text-gray-300'}`}>{t.placed}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 transition-all duration-500 ${step >= 2 ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                        {step >= 2 ? <i className="fas fa-check"></i> : <i className="fas fa-circle text-[4px]"></i>}
                      </div>
                      <span className={`text-[9px] mt-2 font-black uppercase tracking-tighter ${step >= 2 ? 'text-green-600' : 'text-gray-300'}`}>{t.dispatched}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 transition-all duration-500 ${step >= 3 ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                        {step >= 3 ? <i className="fas fa-check"></i> : <i className="fas fa-circle text-[4px]"></i>}
                      </div>
                      <span className={`text-[9px] mt-2 font-black uppercase tracking-tighter ${step >= 3 ? 'text-green-600' : 'text-gray-300'}`}>{t.delivered}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
