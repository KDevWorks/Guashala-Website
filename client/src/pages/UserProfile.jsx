import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  User, CreditCard, Receipt, Settings, Heart, AlertCircle, 
  Download, Calendar, Edit2, LogOut, CheckCircle2, ChevronRight, Shield
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import SEO from '../components/common/SEO';
import AnimatedSection from '../components/common/AnimatedSection';

// Mock Data
const MOCK_DONATIONS = [
  { id: 'DON-9821', date: '2026-09-15', amount: 5000, cause: 'Adopt a Cow', status: 'completed' },
  { id: 'DON-9754', date: '2026-08-20', amount: 2100, cause: 'General Fund', status: 'completed' },
  { id: 'DON-9610', date: '2026-07-05', amount: 11000, cause: 'Medical Treatment', status: 'completed' },
  { id: 'DON-9502', date: '2026-06-12', amount: 1500, cause: 'Fodder Fund', status: 'completed' },
  { id: 'DON-9488', date: '2026-05-30', amount: 5000, cause: 'Shelter Construction', status: 'completed' },
  { id: 'DON-9321', date: '2026-04-15', amount: 1000, cause: 'General Fund', status: 'failed' },
  { id: 'DON-9210', date: '2026-03-10', amount: 2100, cause: 'Adopt a Cow', status: 'completed' },
  { id: 'DON-9105', date: '2026-02-28', amount: 5000, cause: 'Fodder Fund', status: 'completed' },
  { id: 'DON-9050', date: '2026-01-15', amount: 1100, cause: 'General Fund', status: 'pending' },
  { id: 'DON-8920', date: '2025-12-25', amount: 11000, cause: 'Medical Treatment', status: 'completed' }
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const UserProfile = () => {
  const { user, isAuthenticated, loading, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // Settings Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '123 Krishna Nagar, Mathura, UP 281001',
    notifications: true,
    newsletter: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-saffron-600"></div>
      </div>
    );
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (updateProfile) {
      updateProfile({ name: formData.name, phone: formData.phone });
    }
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password updated successfully');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const totalDonated = MOCK_DONATIONS.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.amount, 0);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 bg-gradient-to-br from-saffron-500 to-saffron-600 text-white rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-saffron-50">Total Donated</h3>
                  <Heart className="w-8 h-8 text-white opacity-80" />
                </div>
                <p className="text-3xl font-bold">{formatCurrency(totalDonated)}</p>
                <p className="text-sm mt-2 text-saffron-100">Thank you for your generosity</p>
              </div>
              <div className="card p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-charcoal-700">Donations</h3>
                  <CreditCard className="w-8 h-8 text-forest-500" />
                </div>
                <p className="text-3xl font-bold text-charcoal-900">{MOCK_DONATIONS.filter(d=>d.status==='completed').length}</p>
                <p className="text-sm mt-2 text-charcoal-500">Total successful contributions</p>
              </div>
              <div className="card p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-charcoal-700">Member Since</h3>
                  <Calendar className="w-8 h-8 text-golden-500" />
                </div>
                <p className="text-3xl font-bold text-charcoal-900">2025</p>
                <p className="text-sm mt-2 text-charcoal-500">Supporting our cause</p>
              </div>
            </div>

            <div className="card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-medium text-charcoal-900">Recent Donations</h3>
                <button onClick={() => setActiveTab('donations')} className="text-sm text-saffron-600 font-medium hover:text-saffron-700 flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-white">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cause</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {MOCK_DONATIONS.slice(0, 5).map((donation) => (
                      <tr key={donation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(donation.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.cause}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(donation.amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                            donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'donations':
        return (
          <div className="card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-gray-50 gap-4">
              <h3 className="text-lg font-medium text-charcoal-900">Donation History</h3>
              <div className="flex gap-2">
                <select className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-saffron-500 focus:border-saffron-500">
                  <option>All Causes</option>
                  <option>Adopt a Cow</option>
                  <option>Fodder Fund</option>
                </select>
                <select className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-saffron-500 focus:border-saffron-500">
                  <option>All Years</option>
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cause</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_DONATIONS.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{donation.id}</div>
                        <div className="text-sm text-gray-500">{formatDate(donation.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.cause}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(donation.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                          donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {donation.status === 'completed' && (
                          <button className="text-saffron-600 hover:text-saffron-900 inline-flex items-center" title="Download Receipt">
                            <Download className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'receipts':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_DONATIONS.filter(d => d.status === 'completed').map((donation) => (
              <div key={`rec-${donation.id}`} className="card bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-saffron-100 flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-saffron-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">80G Eligible</span>
                </div>
                <h4 className="font-semibold text-charcoal-900 text-lg mb-1">{formatCurrency(donation.amount)}</h4>
                <p className="text-sm text-charcoal-600 mb-4">{donation.cause}</p>
                <div className="text-xs text-gray-500 space-y-1 mb-4">
                  <p>Receipt No: {donation.id}</p>
                  <p>Date: {formatDate(donation.date)}</p>
                </div>
                <button className="w-full btn-outline border-saffron-200 text-saffron-600 py-2 text-sm flex items-center justify-center hover:bg-saffron-50">
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </button>
              </div>
            ))}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8 max-w-4xl">
            {/* Profile Info */}
            <div className="card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-heading font-semibold text-charcoal-900">Personal Information</h3>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="flex items-center text-sm font-medium text-saffron-600 hover:text-saffron-700">
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field w-full" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" value={formData.email} disabled className="input-field w-full bg-gray-50 text-gray-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input-field w-full" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} rows="2" className="input-field w-full"></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="btn-primary px-4 py-2">Save Changes</button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-medium text-charcoal-900">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-charcoal-900">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-charcoal-900">{formData.phone || 'Not provided'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="font-medium text-charcoal-900">{formData.address || 'Not provided'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Change Password */}
            <div className="card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
              <h3 className="text-xl font-heading font-semibold text-charcoal-900 mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-forest-600" /> Security
              </h3>
              <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input type="password" value={passwordData.currentPassword} onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})} className="input-field w-full" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} className="input-field w-full" required minLength="8" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="input-field w-full" required minLength="8" />
                </div>
                <button type="submit" className="btn-secondary mt-2 px-4 py-2">Update Password</button>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="card bg-red-50 rounded-xl shadow-sm border border-red-100 overflow-hidden p-6">
              <h3 className="text-lg font-heading font-semibold text-red-800 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Delete Account
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'donations', name: 'Donation History', icon: CreditCard },
    { id: 'receipts', name: '80G Receipts', icon: Receipt },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <>
      <SEO title="My Profile | Shri Krishna Gaushala" description="Manage your donations and profile." />
      
      {/* Page Header */}
      <div className="bg-forest-900 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0 text-white">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Welcome back, {user?.name || 'Supporter'}
              </h1>
              <p className="text-forest-100 max-w-xl">
                Thank you for your continuous support to the sacred cows. Your contributions make a real difference.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/donate" className="btn-primary whitespace-nowrap shadow-lg">Donate Now</Link>
              <button onClick={() => { logout(); toast.success('Logged out'); }} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md font-medium transition-colors flex items-center">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cream-50 min-h-screen py-8">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-100 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-saffron-100 text-saffron-600 rounded-full flex items-center justify-center text-xl font-bold font-heading">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900">{user?.name || 'User'}</h3>
                    <p className="text-xs text-gray-500 truncate w-32">{user?.email || 'user@email.com'}</p>
                  </div>
                </div>
                <nav className="p-2 space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.id 
                            ? 'bg-saffron-50 text-saffron-700' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal-900'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-saffron-600' : 'text-gray-400'}`} />
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-3/4">
              <AnimatedSection>
                {renderTabContent()}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
