
import React, { useState } from 'react';
import { Language, User } from '../types';
import { translations } from '../translations';
import { DB } from '../store';

const AdminUser: React.FC<{lang: Language}> = ({ lang }) => {
  const t = translations[lang];
  const [users, setUsers] = useState<User[]>(DB.getUsers());

  const deleteUser = (id: string) => {
    if (id === 'admin') return alert("Cannot delete primary admin");
    const updated = users.filter(u => u.id !== id);
    localStorage.setItem('kenakata_users', JSON.stringify(updated));
    setUsers(updated);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{t.users} ({users.length})</h2>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50">
        {users.map(u => (
          <div key={u.id} className="flex items-center gap-4 p-4 border-b last:border-0">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">
              {u.name.charAt(0).toUpperCase()}
            </div>
            <div className="grow">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-800">{u.name}</p>
                {u.role === 'admin' && (
                  <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase">Admin</span>
                )}
              </div>
              <p className="text-xs text-gray-400">{u.phone || u.email}</p>
            </div>
            <button 
              onClick={() => deleteUser(u.id)}
              disabled={u.role === 'admin'}
              className="text-red-400 p-2 disabled:opacity-30"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUser;
