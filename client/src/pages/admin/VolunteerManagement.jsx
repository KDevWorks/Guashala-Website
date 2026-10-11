import React, { useState } from 'react';
import { Eye, Check, X } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const VolunteerManagement = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: 'Sanjay Kumar', email: 'sanjay@example.com', phone: '9876543210', interest: 'Animal Care', date: '2023-10-20T10:00:00', status: 'Pending', experience: 'I have previously volunteered at an animal shelter for 2 years.' },
    { id: 2, name: 'Anita Desai', email: 'anita@example.com', phone: '8765432109', interest: 'Event Management', date: '2023-10-18T14:30:00', status: 'Approved', experience: 'I organize local community events.' },
    { id: 3, name: 'Ravi Verma', email: 'ravi@example.com', phone: '7654321098', interest: 'Fundraising', date: '2023-10-15T09:15:00', status: 'Pending', experience: 'No prior experience but willing to learn and help.' },
    { id: 4, name: 'Kiran Patel', email: 'kiran@example.com', phone: '6543210987', interest: 'Medical Assistance', date: '2023-10-10T16:45:00', status: 'Rejected', experience: 'Nursing student.' },
  ]);

  const columns = [
    { key: 'name', label: 'Name', render: (val) => <span className="font-semibold text-gray-900">{val}</span> },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'interest', label: 'Area of Interest' },
    { key: 'date', label: 'Applied On', render: (val) => formatDate(val) },
    { key: 'status', label: 'Status', render: (val) => {
      const colors = {
        'Approved': 'bg-green-100 text-green-800',
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Rejected': 'bg-red-100 text-red-800'
      };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[val]}`}>{val}</span>;
    }}
  ];

  const actions = [
    {
      label: 'View',
      icon: Eye,
      onClick: (row) => {
        setSelectedVolunteer(row);
        setIsModalOpen(true);
      },
      className: 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'
    }
  ];

  const handleUpdateStatus = (id, newStatus) => {
    setVolunteers(volunteers.map(v => v.id === id ? { ...v, status: newStatus } : v));
    toast.success(`Volunteer status updated to ${newStatus}`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Volunteer Applications</h1>
        <p className="text-sm text-gray-500 mt-1">Review and manage volunteer signups</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden pt-2">
        <DataTable 
          columns={columns} 
          data={volunteers} 
          actions={actions}
          searchable={true}
          searchPlaceholder="Search by name, email, or interest..."
        />
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Volunteer Application Details" size="md">
        {selectedVolunteer && (
          <div className="space-y-6">
            <div className="flex justify-between items-start pb-4 border-b">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedVolunteer.name}</h3>
                <p className="text-sm text-gray-500">Applied on {formatDate(selectedVolunteer.date)}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedVolunteer.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                selectedVolunteer.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedVolunteer.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900">{selectedVolunteer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-900">{selectedVolunteer.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Area of Interest</p>
                <p className="font-medium text-gray-900">{selectedVolunteer.interest}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Prior Experience / Message</p>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mt-1">
                  <p className="text-gray-700 text-sm">{selectedVolunteer.experience}</p>
                </div>
              </div>
            </div>

            {selectedVolunteer.status === 'Pending' && (
              <div className="pt-4 border-t flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-red-200 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center transition-colors"
                  onClick={() => handleUpdateStatus(selectedVolunteer.id, 'Rejected')}
                >
                  <X size={16} className="mr-2" /> Reject
                </button>
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center transition-colors"
                  onClick={() => handleUpdateStatus(selectedVolunteer.id, 'Approved')}
                >
                  <Check size={16} className="mr-2" /> Approve
                </button>
              </div>
            )}
            {selectedVolunteer.status !== 'Pending' && (
              <div className="pt-4 border-t flex justify-end">
                <button className="btn-outline px-4 py-2" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VolunteerManagement;
