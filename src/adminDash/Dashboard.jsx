import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, BriefcaseBusiness, NotepadText, Contact, User, Settings } from 'lucide-react';
import logo from '../assets/logo.webp';

const AdminDashboard = () => {
  const [username, setUsername] = useState('Admin');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
    const storedUsername = localStorage.getItem('adminUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, path: '/admin/dashboard' },
    { id: 'positions', label: 'Career Positions', icon: <BriefcaseBusiness />, path: '/admin/dashboard/positions' },
    { id: 'applications', label: 'Applications', icon: <NotepadText />, path: '/admin/dashboard/applications' },
    { id: 'contacts', label: 'Contact Forms', icon: <Contact />, path: '/admin/dashboard/contacts' },
  ];

  const isActiveMenu = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white border-r border-slate-700 transform transition-transform duration-300 ease-in-out lg:transform-none ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  isActiveMenu(item.path)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white hover:shadow-md'
                }`}
              >
                <span className="text-lg sm:text-xl transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
                <span className="ml-3 font-medium text-sm sm:text-base">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-slate-800 shadow-sm border-b border-gray-700">
          <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-slate-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white truncate">
                {menuItems.find(item => isActiveMenu(item.path))?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-all duration-200 hover:scale-105 p-2 rounded-lg hover:bg-slate-700"
                >
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-slate-500 hover:ring-2 hover:ring-blue-500">
                    <User size={16} />
                  </div>
                  <span className="text-sm sm:text-base font-medium hidden sm:block">{username}</span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50 transform transition-all duration-200 ease-out">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="text-sm sm:text-base font-semibold text-white">{username}</p>
                      <p className="text-xs sm:text-sm text-gray-400">admin@example.com</p>
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
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
