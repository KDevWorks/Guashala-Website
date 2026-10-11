import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import SEO from '../common/SEO';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-body">
      <SEO title="Admin Dashboard | Gaushala" />
      
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 mr-4 text-gray-500 rounded-md md:hidden hover:bg-gray-100 focus:outline-none"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 font-heading hidden sm:block">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-saffron-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-700 font-semibold">
                <User size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none flex items-center transition-colors hover:text-red-500"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
