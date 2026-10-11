import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import Input from '../../components/common/Input';
import toast from 'react-hot-toast';
import Modal from '../../components/common/Modal';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Content saved successfully');
  };

  // FAQ State
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'How can I donate?', answer: 'You can donate via online transfer, UPI, or visit us in person.' },
    { id: 2, question: 'Can I adopt a cow?', answer: 'Yes, we have a cow adoption program where you can sponsor a cow monthly.' }
  ]);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);

  // Stats State
  const [stats, setStats] = useState({
    cowsRescued: '1500+',
    volunteers: '300+',
    donors: '5000+',
    yearsActive: '12+'
  });

  // Settings State
  const [settings, setSettings] = useState({
    email: 'info@gaushala.org',
    phone: '+91 9876543210',
    address: '123 Gaushala Road, Green Valley, State 123456',
    facebook: 'https://facebook.com/gaushala',
    twitter: 'https://twitter.com/gaushala'
  });

  const tabs = [
    { id: 'about', label: 'About Us' },
    { id: 'statistics', label: 'Statistics' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'settings', label: 'Settings' }
  ];

  const handleSaveFaq = (e) => {
    e.preventDefault();
    if(currentFaq.id) {
      setFaqs(faqs.map(f => f.id === currentFaq.id ? currentFaq : f));
    } else {
      setFaqs([...faqs, { ...currentFaq, id: Date.now() }]);
    }
    setIsFaqModalOpen(false);
    toast.success('FAQ saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Content Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage website content and settings</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-saffron-500 text-saffron-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        
        {/* About Tab */}
        {activeTab === 'about' && (
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Title</label>
              <input type="text" className="input-field" defaultValue="Serving the Sacred: Our Journey" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Description</label>
              <textarea className="input-field min-h-[150px]" defaultValue="We are dedicated to the welfare and protection of cows..."></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Our Mission</label>
                <textarea className="input-field min-h-[100px]" defaultValue="To provide a safe haven for destitute, old, and sick cows..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Our Vision</label>
                <textarea className="input-field min-h-[100px]" defaultValue="A world where every cow is treated with respect and care..."></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary flex items-center px-6 py-2">
                <Save size={18} className="mr-2" /> Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Cows Rescued & Sheltered" value={stats.cowsRescued} onChange={(e) => setStats({...stats, cowsRescued: e.target.value})} />
              <Input label="Active Volunteers" value={stats.volunteers} onChange={(e) => setStats({...stats, volunteers: e.target.value})} />
              <Input label="Happy Donors" value={stats.donors} onChange={(e) => setStats({...stats, donors: e.target.value})} />
              <Input label="Years Active" value={stats.yearsActive} onChange={(e) => setStats({...stats, yearsActive: e.target.value})} />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary flex items-center px-6 py-2">
                <Save size={18} className="mr-2" /> Save Changes
              </button>
            </div>
          </form>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
              <button 
                className="btn-outline flex items-center px-3 py-1.5 text-sm"
                onClick={() => { setCurrentFaq({ question: '', answer: '' }); setIsFaqModalOpen(true); }}
              >
                <Plus size={16} className="mr-1" /> Add FAQ
              </button>
            </div>
            
            <div className="space-y-4">
              {faqs.map(faq => (
                <div key={faq.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start group hover:border-gray-300">
                  <div className="pr-8">
                    <h4 className="font-medium text-gray-900 mb-1">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" onClick={() => { setCurrentFaq(faq); setIsFaqModalOpen(true); }}>
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" onClick={() => {
                      setFaqs(faqs.filter(f => f.id !== faq.id));
                      toast.success('FAQ deleted');
                    }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Modal isOpen={isFaqModalOpen} onClose={() => setIsFaqModalOpen(false)} title={currentFaq?.id ? "Edit FAQ" : "Add FAQ"}>
              <form onSubmit={handleSaveFaq} className="space-y-4">
                <Input label="Question" value={currentFaq?.question || ''} onChange={e => setCurrentFaq({...currentFaq, question: e.target.value})} required />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea 
                    className="input-field min-h-[100px]" 
                    value={currentFaq?.answer || ''} 
                    onChange={e => setCurrentFaq({...currentFaq, answer: e.target.value})} 
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" className="btn-outline px-4 py-2" onClick={() => setIsFaqModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-primary px-4 py-2">Save FAQ</button>
                </div>
              </form>
            </Modal>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Email Address" type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} />
              <Input label="Phone Number" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</label>
                <textarea className="input-field" rows="2" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})}></textarea>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 pt-4">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Facebook URL" value={settings.facebook} onChange={e => setSettings({...settings, facebook: e.target.value})} />
              <Input label="Twitter URL" value={settings.twitter} onChange={e => setSettings({...settings, twitter: e.target.value})} />
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="btn-primary flex items-center px-6 py-2">
                <Save size={18} className="mr-2" /> Save Settings
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
