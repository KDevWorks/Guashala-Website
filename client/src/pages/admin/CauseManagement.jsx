import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

const CauseManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCause, setCurrentCause] = useState(null);

  // Mock Data
  const [causes, setCauses] = useState([
    { id: 1, title: 'Fodder for Cows', description: 'Provide nutritious fodder to hundreds of cows daily.', goal: 500000, raised: 250000, status: 'Active' },
    { id: 2, title: 'Medical Treatment', description: 'Help us provide medical care to sick and injured cows.', goal: 300000, raised: 150000, status: 'Active' },
    { id: 3, title: 'Shelter Expansion', description: 'Build new sheds to accommodate more rescued cows.', goal: 1000000, raised: 800000, status: 'Active' },
    { id: 4, title: 'Winter Blankets', description: 'Protect cows from harsh winters with warm covers.', goal: 100000, raised: 100000, status: 'Completed' },
  ]);

  const handleOpenModal = (cause = null) => {
    setCurrentCause(cause || { title: '', description: '', goal: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success(currentCause.id ? 'Cause updated successfully' : 'Cause created successfully');
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setCauses(causes.filter(c => c.id !== currentCause.id));
    toast.success('Cause deleted successfully');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Manage Causes</h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or remove donation causes</p>
        </div>
        <button className="btn-primary flex items-center mt-4 sm:mt-0 px-4 py-2" onClick={() => handleOpenModal()}>
          <Plus size={18} className="mr-2" /> Add New Cause
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {causes.map(cause => (
          <div key={cause.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-40 bg-gray-200 flex items-center justify-center relative">
              <ImageIcon className="text-gray-400" size={40} />
              <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${cause.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                {cause.status}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{cause.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{cause.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Raised: <span className="font-bold text-gray-900">{formatCurrency(cause.raised)}</span></span>
                  <span className="text-gray-500">Goal: <span className="font-bold text-gray-900">{formatCurrency(cause.goal)}</span></span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-saffron-500 h-2 rounded-full" style={{ width: `${Math.min((cause.raised / cause.goal) * 100, 100)}%` }}></div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <button 
                  className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-md transition-colors flex items-center justify-center"
                  onClick={() => handleOpenModal(cause)}
                >
                  <Edit2 size={16} className="mr-2" /> Edit
                </button>
                <button 
                  className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-md transition-colors flex items-center justify-center"
                  onClick={() => { setCurrentCause(cause); setIsDeleteModalOpen(true); }}
                >
                  <Trash2 size={16} className="mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentCause?.id ? "Edit Cause" : "Add New Cause"} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Cause Title" name="title" value={currentCause?.title || ''} onChange={(e) => setCurrentCause({...currentCause, title: e.target.value})} required />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              className="input-field min-h-[100px]" 
              value={currentCause?.description || ''} 
              onChange={(e) => setCurrentCause({...currentCause, description: e.target.value})}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Goal Amount (₹)" type="number" name="goal" value={currentCause?.goal || ''} onChange={(e) => setCurrentCause({...currentCause, goal: e.target.value})} required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                className="input-field" 
                value={currentCause?.status || 'Active'} 
                onChange={(e) => setCurrentCause({...currentCause, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="space-y-1 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-saffron-600 hover:text-saffron-500 focus-within:outline-none">
                    <span>Upload a file</span>
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" className="btn-outline px-4 py-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary px-4 py-2">Save Cause</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="space-y-4">
          <p className="text-gray-600">Are you sure you want to delete the cause "{currentCause?.title}"? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3 pt-4">
            <button className="btn-outline px-4 py-2" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium" onClick={handleDelete}>
              Delete Cause
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CauseManagement;
