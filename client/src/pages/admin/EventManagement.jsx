import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const EventManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Mock Data
  const [events, setEvents] = useState([
    { id: '1', title: 'Gopashtami Celebration', date: '2023-11-20T09:00:00', location: 'Main Gaushala Campus', category: 'Festival', status: 'Upcoming' },
    { id: '2', title: 'Free Veterinary Camp', date: '2023-12-05T10:00:00', location: 'Village Square', category: 'Medical', status: 'Upcoming' },
    { id: '3', title: 'Cow Adoption Drive', date: '2023-10-10T11:00:00', location: 'City Center Mall', category: 'Awareness', status: 'Completed' },
    { id: '4', title: 'Monthly Volunteer Training', date: '2023-11-01T14:00:00', location: 'Community Hall', category: 'Training', status: 'Upcoming' },
  ]);

  const columns = [
    { key: 'title', label: 'Event Name', render: (val) => <span className="font-semibold text-gray-900">{val}</span> },
    { key: 'date', label: 'Date & Time', render: (val) => formatDate(val) },
    { key: 'location', label: 'Location' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${val === 'Upcoming' ? 'bg-blue-100 text-blue-800' : (val === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')}`}>
        {val}
      </span>
    )}
  ];

  const actions = [
    {
      label: 'Edit',
      icon: Edit2,
      onClick: (row) => {
        setCurrentEvent(row);
        setIsModalOpen(true);
      },
      className: 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: (row) => {
        setCurrentEvent(row);
        setIsDeleteModalOpen(true);
      },
      className: 'text-red-500 hover:text-red-700 hover:bg-red-50'
    }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    toast.success(currentEvent.id ? 'Event updated successfully' : 'Event created successfully');
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setEvents(events.filter(e => e.id !== currentEvent.id));
    toast.success('Event deleted successfully');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Event Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage upcoming and past events</p>
        </div>
        <button 
          className="btn-primary flex items-center mt-4 sm:mt-0 px-4 py-2" 
          onClick={() => { setCurrentEvent({ title: '', date: '', location: '', category: 'Festival', status: 'Upcoming' }); setIsModalOpen(true); }}
        >
          <Plus size={18} className="mr-2" /> Create Event
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden pt-2">
        <DataTable 
          columns={columns} 
          data={events} 
          actions={actions}
          searchable={true}
          searchPlaceholder="Search events..."
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentEvent?.id ? "Edit Event" : "Create New Event"} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Event Title" name="title" value={currentEvent?.title || ''} onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})} required />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              className="input-field min-h-[100px]" 
              value={currentEvent?.description || ''} 
              onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon size={16} className="text-gray-400" />
                </div>
                <input 
                  type="datetime-local" 
                  className="input-field pl-10" 
                  value={currentEvent?.date ? currentEvent.date.substring(0, 16) : ''} 
                  onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={16} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="input-field pl-10" 
                  value={currentEvent?.location || ''} 
                  onChange={(e) => setCurrentEvent({...currentEvent, location: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="input-field" value={currentEvent?.category || 'Festival'} onChange={(e) => setCurrentEvent({...currentEvent, category: e.target.value})}>
                <option value="Festival">Festival</option>
                <option value="Medical">Medical</option>
                <option value="Awareness">Awareness</option>
                <option value="Training">Training</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="input-field" value={currentEvent?.status || 'Upcoming'} onChange={(e) => setCurrentEvent({...currentEvent, status: e.target.value})}>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button type="button" className="btn-outline px-4 py-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary px-4 py-2">Save Event</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="space-y-4">
          <p className="text-gray-600">Are you sure you want to delete the event "{currentEvent?.title}"? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3 pt-4">
            <button className="btn-outline px-4 py-2" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium" onClick={handleDelete}>
              Delete Event
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventManagement;
