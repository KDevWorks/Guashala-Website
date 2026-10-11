import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  IndianRupee, 
  Heart, 
  Image as ImageIcon, 
  Calendar, 
  FileText, 
  Users, 
  MapPin, 
  X,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Donations', path: '/admin/donations', icon: IndianRupee },
    { name: 'Causes', path: '/admin/causes', icon: Heart },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Content', path: '/admin/content', icon: FileText },
    { name: 'Volunteers', path: '/admin/volunteers', icon: Users },
    { name: 'Visit Requests', path: '/admin/visits', icon: MapPin },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-forest-900 text-white w-64 shadow-xl">
      <div className="flex items-center justify-between px-6 py-5 border-b border-forest-800">
        <Link to="/admin" className="flex items-center space-x-2">
          <Heart className="w-8 h-8 text-saffron-500" />
          <span className="text-xl font-bold font-heading">Admin Panel</span>
        </Link>
        <button className="md:hidden text-gray-300 hover:text-white" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-saffron-500 text-white'
                  : 'text-gray-300 hover:bg-forest-800 hover:text-white'
              }`
            }
            onClick={() => {
              if (window.innerWidth < 768) {
                onClose();
              }
            }}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-forest-800">
        <Link 
          to="/" 
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-forest-800 hover:text-white transition-colors"
        >
          <ExternalLink className="w-5 h-5 mr-3" />
          Back to Website
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute inset-y-0 left-0 z-50 w-64 h-full"
              onClick={e => e.stopPropagation()}
            >
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0 z-30">
        <SidebarContent />
      </div>
    </>
  );
};

export default AdminSidebar;
