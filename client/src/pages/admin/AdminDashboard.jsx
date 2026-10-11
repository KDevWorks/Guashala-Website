import React from 'react';
import { IndianRupee, Users, Heart, ArrowRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import StatCard from '../../components/admin/StatCard';
import DataTable from '../../components/admin/DataTable';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock Data
  const donationData = [
    { name: 'Jan', amount: 40000 },
    { name: 'Feb', amount: 30000 },
    { name: 'Mar', amount: 55000 },
    { name: 'Apr', amount: 45000 },
    { name: 'May', amount: 60000 },
    { name: 'Jun', amount: 80000 },
  ];

  const causeData = [
    { name: 'Fodder', value: 400 },
    { name: 'Medical', value: 300 },
    { name: 'Shelter', value: 200 },
    { name: 'General', value: 100 },
  ];
  const COLORS = ['#dc7625', '#336a3b', '#DDA710', '#8b5cf6'];

  const recentDonations = [
    { id: '1', donor: 'Rahul Sharma', amount: 5000, cause: 'Fodder', date: '2023-10-15', status: 'Completed' },
    { id: '2', donor: 'Priya Singh', amount: 2000, cause: 'Medical', date: '2023-10-14', status: 'Completed' },
    { id: '3', donor: 'Amit Kumar', amount: 10000, cause: 'Shelter', date: '2023-10-13', status: 'Pending' },
    { id: '4', donor: 'Neha Gupta', amount: 1500, cause: 'General', date: '2023-10-12', status: 'Completed' },
    { id: '5', donor: 'Vikram Singh', amount: 3000, cause: 'Fodder', date: '2023-10-11', status: 'Completed' },
  ];

  const columns = [
    { key: 'donor', label: 'Donor Name' },
    { key: 'amount', label: 'Amount', render: (val) => <span className="font-semibold text-gray-900">{formatCurrency(val)}</span> },
    { key: 'cause', label: 'Cause' },
    { key: 'date', label: 'Date', render: (val) => formatDate(val) },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${val === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {val}
      </span>
    )}
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link to="/admin/causes" className="btn-outline text-sm py-2 px-4">Add Cause</Link>
          <Link to="/admin/donations" className="btn-primary text-sm py-2 px-4">View Reports</Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Donations" value="₹12,50,000" icon={IndianRupee} trend="12%" trendDirection="up" color="saffron" />
        <StatCard title="Monthly Donations" value="₹1,50,000" icon={IndianRupee} trend="5%" trendDirection="up" color="golden" />
        <StatCard title="Total Donors" value="1,250" icon={Users} trend="8%" trendDirection="up" color="blue" />
        <StatCard title="Active Causes" value="6" icon={Heart} color="forest" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Donation Overview (Last 6 Months)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value}`, 'Amount']}
                />
                <Line type="monotone" dataKey="amount" stroke="#dc7625" strokeWidth={3} dot={{ r: 4, fill: '#dc7625' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Donations by Cause</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={causeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {causeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Donations</h3>
          <Link to="/admin/donations" className="text-saffron-600 hover:text-saffron-700 text-sm font-medium flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <DataTable columns={columns} data={recentDonations} />
      </div>
    </div>
  );
};

export default AdminDashboard;
