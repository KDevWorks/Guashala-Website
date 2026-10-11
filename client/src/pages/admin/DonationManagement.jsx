import React, { useState } from 'react';
import { Eye, Download, FileText, Search, Filter } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import { formatCurrency, formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const DonationManagement = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data
  const donations = Array.from({ length: 20 }).map((_, i) => ({
    id: `DON-${1000 + i}`,
    donorName: ['Rahul Sharma', 'Priya Singh', 'Amit Kumar', 'Neha Gupta', 'Vikram Singh'][i % 5],
    email: `donor${i}@example.com`,
    amount: [1000, 2500, 5000, 10000, 500][i % 5],
    cause: ['Fodder', 'Medical', 'Shelter', 'General'][i % 4],
    date: new Date(2023, 9, 15 - (i % 15)).toISOString(),
    status: i % 7 === 0 ? 'Failed' : (i % 5 === 0 ? 'Pending' : 'Completed'),
    paymentMethod: ['UPI', 'Credit Card', 'Net Banking'][i % 3],
  }));

  const columns = [
    { key: 'id', label: 'Receipt #' },
    { key: 'donorName', label: 'Donor Name' },
    { key: 'amount', label: 'Amount', render: (val) => <span className="font-semibold">{formatCurrency(val)}</span> },
    { key: 'cause', label: 'Cause' },
    { key: 'date', label: 'Date', render: (val) => formatDate(val) },
    { key: 'status', label: 'Status', render: (val) => {
      const colors = {
        'Completed': 'bg-green-100 text-green-800',
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Failed': 'bg-red-100 text-red-800'
      };
      return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[val]}`}>{val}</span>;
    }}
  ];

  const actions = [
    {
      label: 'View Details',
      icon: Eye,
      onClick: (row) => {
        setSelectedDonation(row);
        setIsModalOpen(true);
      },
      className: 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'
    },
    {
      label: 'Download Receipt',
      icon: Download,
      onClick: () => {
        toast.success('Downloading receipt...');
      },
      className: 'text-green-500 hover:text-green-700 hover:bg-green-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Donation Management</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage all donations</p>
        </div>
        <button className="btn-outline flex items-center mt-4 sm:mt-0 px-4 py-2" onClick={() => toast.success('Exporting data...')}>
          <FileText size={18} className="mr-2" /> Export to CSV
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="border-r border-gray-100 pr-4">
          <p className="text-sm text-gray-500">Total Donations</p>
          <p className="text-xl font-bold text-gray-800">{formatCurrency(2500000)}</p>
        </div>
        <div className="border-r border-gray-100 px-4">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-xl font-bold text-saffron-600">{formatCurrency(150000)}</p>
        </div>
        <div className="pl-4">
          <p className="text-sm text-gray-500">Average Donation</p>
          <p className="text-xl font-bold text-gray-800">{formatCurrency(3500)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden pt-2">
        <DataTable 
          columns={columns} 
          data={donations} 
          actions={actions}
          searchable={true}
          searchPlaceholder="Search donor, ID, or email..."
        />
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Donation Details" size="md">
        {selectedDonation && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="text-sm text-gray-500">Receipt Number</p>
                <p className="text-lg font-bold">{selectedDonation.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-2xl font-bold text-saffron-600">{formatCurrency(selectedDonation.amount)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Donor Name</p>
                <p className="font-medium">{selectedDonation.donorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedDonation.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(selectedDonation.date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{selectedDonation.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cause</p>
                <p className="font-medium">{selectedDonation.cause}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{selectedDonation.paymentMethod}</p>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end space-x-3">
              <button className="btn-outline px-4 py-2" onClick={() => setIsModalOpen(false)}>Close</button>
              <button className="btn-primary px-4 py-2 flex items-center" onClick={() => toast.success('Receipt sent to donor')}>
                Send Receipt
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DonationManagement;
