
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Language, User } from '../types';
import { translations } from '../translations';

interface ProfileProps {
  lang: Language;
  user: User;
  logout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ lang, user, logout }) => {
  const t = translations[lang];
  const [showDevModal, setShowDevModal] = useState(false);

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-400 text-xs mt-1">{user.email || user.phone}</p>
        {user.role === 'admin' && (
          <Link to="/admin" className="mt-4 bg-gray-800 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {t.admin_panel}
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50">
        <Link to="/orders" className="flex items-center justify-between p-5 border-b border-gray-50 active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <span className="text-sm font-bold text-gray-700">{t.orders}</span>
          </div>
          <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
        </Link>
        
        <div className="flex items-center justify-between p-5 border-b border-gray-50 active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <span className="text-sm font-bold text-gray-700">{lang === 'bn' ? 'ঠিকানা পরিবর্তন' : 'Edit Address'}</span>
          </div>
          <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
        </div>

        {/* About Developer Button */}
        <button 
          onClick={() => setShowDevModal(true)}
          className="w-full flex items-center justify-between p-5 border-b border-gray-50 active:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-laptop-code"></i>
            </div>
            <span className="text-sm font-bold text-gray-700">{t.about_dev}</span>
          </div>
          <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
        </button>

        <button 
          onClick={logout}
          className="w-full flex items-center justify-between p-5 text-red-500 active:bg-red-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <span className="text-sm font-bold">{t.logout}</span>
          </div>
        </button>
      </div>

      {/* Developer Info Modal */}
      {showDevModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDevModal(false)}
          ></div>
          <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden relative z-10 animate-scaleUp">
            <div className="bg-orange-600 p-8 text-center text-white relative">
              <button 
                onClick={() => setShowDevModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 rounded-full text-white"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="w-20 h-20 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-xl">
                <i className="fas fa-code text-orange-600 text-3xl"></i>
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest">{t.about_dev}</h3>
            </div>
            <div className="p-8 text-center">
              <h4 className="text-xl font-bold text-gray-800 mb-2">{t.dev_name}</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {t.dev_desc}
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-50 text-gray-800 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
              <button 
                onClick={() => setShowDevModal(false)}
                className="mt-8 w-full bg-gray-900 text-white font-bold py-4 rounded-2xl active:scale-95 transition-transform"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;