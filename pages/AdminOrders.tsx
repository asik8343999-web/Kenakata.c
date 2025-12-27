
import React, { useState } from 'react';
import { Language, Order } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

const AdminOrders: React.FC<{lang: Language}> = ({ lang }) => {
  const t = translations[lang];
  const [orders, setOrders] = useState<Order[]>(DB.getOrders());

  const updateStatus = (id: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    localStorage.setItem('kenakata_orders', JSON.stringify(updated));
    setOrders(updated);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">{t.orders} ({orders.length})</h2>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xs font-bold text-gray-400">#{order.id}</h4>
                <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {order.status.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-sm font-bold text-orange-600">{t.currency} {order.total_amount}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => updateStatus(order.id, 'dispatched')}
                  className="text-[10px] bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold"
                >
                  Dispatch
                </button>
                <button 
                  onClick={() => updateStatus(order.id, 'delivered')}
                  className="text-[10px] bg-green-500 text-white px-3 py-1.5 rounded-lg font-bold"
                >
                  Deliver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
