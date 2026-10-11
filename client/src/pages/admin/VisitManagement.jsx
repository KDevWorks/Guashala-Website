import React, { useState } from 'react';
import { Eye, Check, X, Calendar as CalendarIcon } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const VisitManagement = () => {
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data
  const [visits, setVisits] = useState([
    { id: 'VR-101', name: 'Sharma Family', email: 'sharma@example.com', phone: '9876543210', dateRequested: '2023-10-20T10:00:00', visitDate: '2023-11-05T10:30:00', visitors: 4, purpose: 'Family Visit', status: 'Pending' },
    { id: 'VR-102', name: 'Delhi Public School', email: 'admin@dps.edu', phone: '8765432109', dateRequested: '2023-10-18T14:30:00', visitDate: '2023-11-15T09:00:00', visitors: 45, purpose: 'Educational Tour', status: 'Approved' },
    { id: 'VR-103', name: 'Dr. Agarwal', email: 'agarwal@example.com', phone: '7654321098', dateRequested: '2023-10-15T09:15:00', visitDate: '2023-10-25T11:00:00', visitors: 2, purpose: 'Donation Enquiry', status: 'Completed' },
    { id: 'VR-104', name: 'Tech Solutions Team', email: 'hr@techsol.com', phone: '6543210987', dateRequested: '2023-10-10T16:45:00', visitDate: '2023-10-20T14:00:00', visitors: 15, purpose: 'Corporate CSR', status: 'Approved' },
  ]);

  const columns = [
    { key: 'id', label: 'Req ID' },
    { key: 'name', label: 'Name/Organization', render: (val) => <span className="font-semibold text-gray-900">{val}</span> },
    { key: 'visitDate', label: 'Visit Date', render: (val) => formatDate(val) },
    { key: 'visitors', label: 'Visitors' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'status', label: 'Status', render: (val) => {
      const colors = {
        'Approved': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-green-100 text-green-800',
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
        setSelectedVisit(row);
        setIsModalOpen(true);
      },
      className: 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'
    }
  ];

  const handleUpdateStatus = (id, newStatus) => {
    setVisits(visits.map(v => v.id === id ? { ...v, status: newStatus } : v));
    toast.success(`Visit status updated to ${newStatus}`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Visit Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Manage physical visits to the Gaushala</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden pt-2">
        <DataTable 
          columns={columns} 
          data={visits} 
          actions={actions}
          searchable={true}
          searchPlaceholder="Search by ID, name, or purpose..."
        />
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Visit Request Details" size="md">
        {selectedVisit && (
          <div className="space-y-6">
            <div className="flex justify-between items-start pb-4 border-b">
              <div>
                <p className="text-sm text-gray-500 mb-1">Request {selectedVisit.id}</p>
                <h3 className="text-xl font-bold text-gray-900">{selectedVisit.name}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedVisit.status === 'Approved' ? 'bg-blue-100 text-blue-800' : 
                selectedVisit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                selectedVisit.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedVisit.status}
              </span>
            </div>

            <div className="bg-saffron-50 rounded-lg p-4 flex items-center justify-between border border-saffron-100">
              <div className="flex items-center text-saffron-900">
                <CalendarIcon size={24} className="mr-3 text-saffron-500" />
                <div>
                  <p className="text-sm font-medium">Requested Visit Date & Time</p>
                  <p className="text-lg font-bold">{formatDate(selectedVisit.visitDate)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-saffron-900">Group Size</p>
                <p className="text-lg font-bold text-saffron-900">{selectedVisit.visitors} people</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900">{selectedVisit.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-900">{selectedVisit.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Purpose of Visit</p>
                <p className="font-medium text-gray-900">{selectedVisit.purpose}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Requested On</p>
                <p className="font-medium text-gray-900">{formatDate(selectedVisit.dateRequested)}</p>
              </div>
            </div>

            {selectedVisit.status === 'Pending' && (
              <div className="pt-4 border-t flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-red-200 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center transition-colors"
                  onClick={() => handleUpdateStatus(selectedVisit.id, 'Rejected')}
                >
                  <X size={16} className="mr-2" /> Reject Request
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center transition-colors"
                  onClick={() => handleUpdateStatus(selectedVisit.id, 'Approved')}
                >
                  <Check size={16} className="mr-2" /> Approve Request
                </button>
              </div>
            )}
            
            {selectedVisit.status === 'Approved' && (
              <div className="pt-4 border-t flex justify-between items-center">
                <p className="text-sm text-gray-500">Mark as completed when visit is done.</p>
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center transition-colors"
                  onClick={() => handleUpdateStatus(selectedVisit.id, 'Completed')}
                >
                  <Check size={16} className="mr-2" /> Mark Completed
                </button>
              </div>
            )}
            
            {(selectedVisit.status === 'Completed' || selectedVisit.status === 'Rejected') && (
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

export default VisitManagement;
