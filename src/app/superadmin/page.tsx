'use client';

import SuperAdminLayout from '../../components/SuperAdminLayout';
import Navbar from '../../components/Navbar';
import { useState } from 'react';

export default function SuperAdminDashboard() {
  const [filter, setFilter] = useState('monthly');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={{ name: 'Super Admin', role: 'ADMIN' }} />
      <SuperAdminLayout>
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Super Admin Dashboard</h2>

          {/* Filter Options */}
          <div className="mb-6 flex flex-wrap gap-3">
            {['monthly', 'weekly', 'yearly', 'custom'].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 rounded border text-sm font-medium ${
                  filter === option
                    ? 'bg-purple-700 text-white'
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          {/* Summary Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-purple-50 p-4 rounded shadow text-center">
              <p className="text-sm text-gray-600 mb-1">Maintenance Collected</p>
              <h3 className="text-xl font-bold text-purple-800">₹85,000</h3>
            </div>
            <div className="bg-purple-50 p-4 rounded shadow text-center">
              <p className="text-sm text-gray-600 mb-1">Maintenance Due</p>
              <h3 className="text-xl font-bold text-purple-800">₹12,500</h3>
            </div>
            <div className="bg-purple-50 p-4 rounded shadow text-center">
              <p className="text-sm text-gray-600 mb-1">Interest Collected</p>
              <h3 className="text-xl font-bold text-purple-800">₹1,200</h3>
            </div>
            <div className="bg-purple-50 p-4 rounded shadow text-center">
              <p className="text-sm text-gray-600 mb-1">Society Funds</p>
              <h3 className="text-xl font-bold text-purple-800">₹98,700</h3>
            </div>
          </div>
        </div>
      </SuperAdminLayout>
    </div>
  );
}
