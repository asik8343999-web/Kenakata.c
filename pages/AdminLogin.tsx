
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language, User } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

interface AdminLoginProps {
  lang: Language;
  setUser: (u: User) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ lang, setUser }) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate Admin AJAX Authentication
    setTimeout(() => {
      const users = DB.getUsers();
      // Specifically check for admin role and requested credentials
      const foundAdmin = users.find(u => 
        u.role === 'admin' && 
        u.email === formData.email && 
        formData.password === 'PHOTOSYNTHESIS'
      );

      if (foundAdmin) {
        DB.setCurrentUser(foundAdmin);
        setUser(foundAdmin);
        navigate('/admin');
      } else {
        setError(lang === 'bn' ? 'অ্যাডমিন এক্সেস রিফিউজড। সঠিক তথ্য দিন।' : 'Admin Access Refused. Please check credentials.');
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="fas fa-shield-halved text-2xl"></i>
          </div>
          <h1 className="text-xl font-bold text-white uppercase tracking-widest">{lang === 'bn' ? 'অ্যাডমিন পোর্টাল' : 'Admin Portal'}</h1>
          <p className="text-gray-500 text-xs mt-1">Kenakata.com Security Management</p>
        </div>

        <form onSubmit={handleAdminLogin} className="p-8 pt-0 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold py-3 px-4 rounded-xl text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-wider">
              {lang === 'bn' ? 'অ্যাডমিন ইমেইল' : 'Admin Email'}
            </label>
            <input 
              required
              type="email" 
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-600 transition-all placeholder:text-gray-700"
              placeholder="admin@kenakata.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-wider">
              {lang === 'bn' ? 'সিকিউরিটি কী' : 'Security Key'}
            </label>
            <input 
              required
              type="password" 
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-600 transition-all placeholder:text-gray-700"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl mt-6 shadow-xl shadow-orange-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:bg-gray-700 disabled:text-gray-500"
          >
            {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-lock"></i>}
            {lang === 'bn' ? 'প্রবেশ করুন' : 'Authenticate'}
          </button>

          <div className="mt-8 flex justify-center">
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="text-gray-600 text-[10px] font-bold hover:text-orange-500 uppercase tracking-widest transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i> {lang === 'bn' ? 'মূল ওয়েবসাইট' : 'Main Website'}
            </button>
          </div>
        </form>
      </div>
      
      <p className="mt-10 text-gray-700 text-[9px] uppercase tracking-[0.2em] font-bold text-center">
        Protected by Kenakata.com Security Shield
      </p>
    </div>
  );
};

export default AdminLogin;
