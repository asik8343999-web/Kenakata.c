
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

const AdminSetting: React.FC<{lang: Language}> = ({ lang }) => {
  const t = translations[lang];
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API update
    setTimeout(() => {
      setLoading(false);
      setMessage(lang === 'bn' ? 'সেটিং আপডেট সফল হয়েছে!' : 'Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">{lang === 'bn' ? 'সেটিংস' : 'Settings'}</h2>

      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 space-y-4">
        <h3 className="font-bold border-b pb-2 text-sm">{lang === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড পরিবর্তন' : 'Change Admin Password'}</h3>
        
        {message && <p className="text-green-600 text-xs font-bold text-center">{message}</p>}

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400">{lang === 'bn' ? 'বর্তমান পাসওয়ার্ড' : 'Current Password'}</label>
          <input required type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400">{lang === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Password'}</label>
          <input required type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm" />
        </div>

        <button 
          disabled={loading}
          className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : null}
          {lang === 'bn' ? 'আপডেট করুন' : 'Update Password'}
        </button>
      </form>

      <div className="bg-gray-100 p-4 rounded-xl text-[10px] text-gray-400 text-center leading-relaxed">
        {lang === 'bn' ? 
          'কেনাকাটা.কম অ্যাডমিন সিস্টেম। এটি শুধুমাত্র অনুমোদিত কর্মীদের ব্যবহারের জন্য।' : 
          'Kenakata.com Admin System. Authorized personnel only.'}
      </div>
    </div>
  );
};

export default AdminSetting;
