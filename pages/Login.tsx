
import React, { useState } from 'react';
import { Language, User } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

interface LoginProps {
  lang: Language;
  setUser: (u: User) => void;
}

const Login: React.FC<LoginProps> = ({ lang, setUser }) => {
  const t = translations[lang];
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: ''
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate AJAX Request
    setTimeout(() => {
      const users = DB.getUsers();
      if (tab === 'login') {
        const found = users.find(u => (u.email === formData.emailOrPhone || u.phone === formData.emailOrPhone) && formData.password === 'PHOTOSYNTHESIS'); // Using requested password as master/demo
        if (found) {
          DB.setCurrentUser(found);
          setUser(found);
        } else {
          setError(lang === 'bn' ? 'ভুল তথ্য দিয়েছেন' : 'Invalid credentials');
        }
      } else {
        const newUser: User = {
          id: 'u' + Date.now(),
          name: formData.name,
          email: formData.emailOrPhone.includes('@') ? formData.emailOrPhone : '',
          phone: !formData.emailOrPhone.includes('@') ? formData.emailOrPhone : '',
          role: 'user'
        };
        const updated = [...users, newUser];
        localStorage.setItem('kenakata_users', JSON.stringify(updated));
        DB.setCurrentUser(newUser);
        setUser(newUser);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex bg-gray-50 border-b border-gray-100">
          <button 
            onClick={() => setTab('login')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${tab === 'login' ? 'text-orange-600 bg-white border-b-2 border-orange-600' : 'text-gray-400'}`}
          >
            {t.login}
          </button>
          <button 
            onClick={() => setTab('signup')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${tab === 'signup' ? 'text-orange-600 bg-white border-b-2 border-orange-600' : 'text-gray-400'}`}
          >
            {t.signup}
          </button>
        </div>

        <form onSubmit={handleAuth} className="p-8 space-y-4">
          {error && <p className="text-red-500 text-xs text-center font-semibold">{error}</p>}
          
          {tab === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 ml-1">{lang === 'bn' ? 'আপনার নাম' : 'Full Name'}</label>
              <input 
                required
                type="text" 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">{lang === 'bn' ? 'মোবাইল বা ইমেইল' : 'Phone or Email'}</label>
            <input 
              required
              type="text" 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="017XXXXXXXX / user@example.com"
              value={formData.emailOrPhone}
              onChange={e => setFormData({...formData, emailOrPhone: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">{lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}</label>
            <input 
              required
              type="password" 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl mt-6 shadow-lg shadow-orange-200 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : null}
            {tab === 'login' ? t.login : t.signup}
          </button>
        </form>
      </div>
      <p className="mt-8 text-gray-400 text-xs text-center px-8">
        {lang === 'bn' ? 'কেনাকাটা.কম এ আপনাকে স্বাগতম। নিরাপদে কেনাকাটা করুন আমাদের সাথে।' : 'Welcome to Kenakata.com. Experience safe and easy shopping.'}
      </p>
    </div>
  );
};

export default Login;
