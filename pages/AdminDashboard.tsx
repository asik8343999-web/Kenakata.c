
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

interface AdminDashboardProps {
  lang: Language;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang }) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const products = DB.getProducts();
  const users = DB.getUsers();
  const orders = DB.getOrders();
  const revenue = orders.reduce((acc, curr) => acc + curr.total_amount, 0);

  const stats = [
    { label: t.users, value: users.length, icon: 'fa-users', color: 'bg-indigo-600', shadow: 'shadow-indigo-100' },
    { label: t.orders, value: orders.length, icon: 'fa-shopping-cart', color: 'bg-orange-500', shadow: 'shadow-orange-100' },
    { label: t.revenue, value: `${t.currency}${revenue.toLocaleString()}`, icon: 'fa-bangladeshi-taka-sign', color: 'bg-emerald-600', shadow: 'shadow-emerald-100' },
    { label: t.products, value: products.length, icon: 'fa-box-archive', color: 'bg-rose-500', shadow: 'shadow-rose-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10 animate-fadeIn">
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-10 rounded-b-[40px] shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-800">{t.dashboard}</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Admin Control Center</p>
          </div>
          <button 
            onClick={() => navigate('/admin/settings')}
            className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <i className="fas fa-cog text-lg"></i>
          </button>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg ${stat.shadow}`}>
                <i className={`fas ${stat.icon} text-lg`}></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h4 className="text-lg font-black text-gray-800 mt-1">{stat.value}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Quick Actions Title */}
        <div className="flex items-center justify-between">
          <h3 className="font-black text-gray-800 text-sm uppercase tracking-widest">{lang === 'bn' ? 'কুইক একশন' : 'Quick Actions'}</h3>
          <Link to="/" className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full uppercase">
            {lang === 'bn' ? 'লাইভ সাইট' : 'Live Site'}
          </Link>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { to: '/admin/categories', icon: 'fa-layer-group', label: t.categories },
            { to: '/admin/products', icon: 'fa-plus-circle', label: lang === 'bn' ? 'পণ্য' : 'Products' },
            { to: '/admin/orders', icon: 'fa-truck-fast', label: t.orders },
            { to: '/admin/users', icon: 'fa-user-gear', label: lang === 'bn' ? 'ইউজার' : 'Users' },
            { to: '/admin/settings', icon: 'fa-shield-halved', label: lang === 'bn' ? 'সেটিং' : 'Safety' },
            { to: '/profile', icon: 'fa-sign-out-alt', label: t.logout }
          ].map((action, idx) => (
            <Link 
              key={idx} 
              to={action.to} 
              className="bg-white aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 border border-gray-100 shadow-sm active:scale-90 transition-transform"
            >
              <i className={`fas ${action.icon} text-orange-500 text-xl`}></i>
              <span className="text-[9px] font-black text-gray-600 uppercase tracking-tighter">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-4">{lang === 'bn' ? 'সাম্প্রতিক তথ্য' : 'Recent Activity'}</h3>
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                    <i className="fas fa-receipt text-xs"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-800">#{order.id}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">{order.status}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-emerald-600">+{t.currency}{order.total_amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
