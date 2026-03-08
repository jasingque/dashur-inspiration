import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-200 hover:scale-105 p-2 rounded-lg hover:bg-slate-700"
      >
        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-slate-500 hover:ring-2 hover:ring-blue-500">
          <User size={16} />
        </div>
        <span className="text-sm sm:text-base font-medium hidden sm:block">
          {user.name || user.email.split('@')[0]}
        </span>
      </button>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50 transform transition-all duration-200 ease-out">
          <div className="px-4 py-2 border-b border-slate-700">
            <p className="text-sm sm:text-base font-semibold text-white">
              {user.name || user.email.split('@')[0]}
            </p>
            <p className="text-xs sm:text-sm text-gray-400">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm sm:text-base text-red-400 hover:bg-slate-700 hover:text-red-300 transition-all duration-200 flex items-center group"
          >
            <LogOut size={16} className="mr-2 transition-transform duration-200 group-hover:scale-110" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
