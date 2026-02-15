// src/app/superadmin/page.tsx
'use client';

import SuperAdminLayout from '../../components/SuperAdminLayout';
import { useState } from 'react';
import { IndianRupee, TrendingUp, Users, AlertCircle } from 'lucide-react';

export default function SuperAdminDashboard() {
  const [filter, setFilter] = useState('monthly');

  const stats = [
    { title: 'Maintenance Collected', value: '₹85,000', icon: IndianRupee, color: 'from-green-500 to-emerald-600', sub: '+12% from last month' },
    { title: 'Maintenance Due', value: '₹12,500', icon: AlertCircle, color: 'from-red-500 to-pink-600', sub: '5 Members pending' },
    { title: 'Society Funds', value: '₹98,700', icon: TrendingUp, color: 'from-blue-500 to-cyan-600', sub: 'Total Reserves' },
    { title: 'Total Members', value: '124', icon: Users, color: 'from-purple-500 to-indigo-600', sub: 'Active Residents' },
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
            <p className="text-gray-500">Welcome back, Super Admin</p>
          </div>

          {/* Filter Options */}
          <div className="flex p-1 bg-white/50 backdrop-blur-md rounded-xl border border-white/20 shadow-sm">
            {['monthly', 'weekly', 'yearly'].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${filter === option
                    ? 'bg-white text-purple-700 shadow-md'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/30'
                  }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+2.5%</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-xs text-gray-400 mt-2">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity / Chart Section Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 min-h-[300px]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Financial Overview</h3>
            <div className="h-64 flex items-center justify-center text-gray-400 bg-white/30 rounded-2xl border border-dashed border-gray-300">
              Chart Component Visualization
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-white/50 hover:bg-white/80 rounded-xl flex items-center gap-3 transition-colors text-left group">
                <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Users className="w-4 h-4" /></div>
                <span className="text-sm font-medium text-gray-700">Add New Member</span>
              </button>
              <button className="w-full p-3 bg-white/50 hover:bg-white/80 rounded-xl flex items-center gap-3 transition-colors text-left group">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform"><IndianRupee className="w-4 h-4" /></div>
                <span className="text-sm font-medium text-gray-700">Record Payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
