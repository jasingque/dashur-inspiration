import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, BriefcaseBusiness, NotepadText, Contact, User, X, Menu } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo.webp';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const AdminDashboard = () => {
  const username: string = localStorage.getItem('adminUsername') || 'Admin';
  const email: string = localStorage.getItem('adminEmail') || 'admin@example.com';
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, path: '/admin/dashboard' },
    { id: 'positions', label: 'Career Positions', icon: <BriefcaseBusiness />, path: '/admin/dashboard/positions' },
    { id: 'applications', label: 'Applications', icon: <NotepadText />, path: '/admin/dashboard/applications' },
    { id: 'contacts', label: 'Contact Forms', icon: <Contact />, path: '/admin/dashboard/contacts' },
  ];

  const isActiveMenu = (path: string): boolean => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Helmet>
        <title>Admin Dashboard - Dashur AI</title>
        <meta name="description" content="Dashur AI admin dashboard for managing positions, applications, and contacts" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white border-r border-slate-700 transform transition-all duration-300 ease-in-out ${isMobile && !isSidebarOpen ? '-translate-x-full' : ''}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <img src={logo} alt="Dashurai Logo" className={`h-6 transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`} />
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-slate-700"
            >
              {isSidebarOpen ? (
                <X/>
              ) : (
                <Menu/>
              )}
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center ${isSidebarOpen ? 'px-4' : 'px-2 justify-center'} py-3 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  isActiveMenu(item.path)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white hover:shadow-md'
                }`}
                title={!isSidebarOpen ? item.label : ''}
              >
                <span className="text-lg sm:text-xl transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
                {isSidebarOpen && (
                  <span className="ml-3 font-medium text-sm sm:text-base">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : (isSidebarOpen ? 'ml-64' : 'ml-20')}`}>
        <header className="bg-slate-800 shadow-sm border-b border-gray-700">
          <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-slate-700"
                >
                  <Menu/>
                </button>
              )}
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
                      <p className="text-xs sm:text-sm text-gray-400">{email}</p>
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
