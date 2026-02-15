'use client';

import { useState } from 'react';
import MemberLayout from '@/components/MemberLayout';
import MarkAsPaidModal from '@/components/MarkAsPaidModal';
import { Building2, Users, Car, FileText, CheckCircle, Clock, AlertCircle, ArrowUpRight, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const dummyPayments = [
  { month: 'July 2024', amount: '₹2,500', dueDate: '2024-07-10', status: 'due' },
  { month: 'June 2024', amount: '₹2,500', dueDate: '2024-06-10', status: 'paid' },
  { month: 'May 2024', amount: '₹2,500', dueDate: '2024-05-10', status: 'paid' },
];

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [payments, setPayments] = useState(dummyPayments);

  const handleConfirmPayment = () => {
    setPayments((prev) =>
      prev.map((p, i) => (i === 0 ? { ...p, status: 'waiting' } : p))
    );
  };

  return (
    <MemberLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of your society account and dues.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-sm">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">A</div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Flat Number</p>
              <p className="font-mono font-bold text-gray-800">A-101</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/30 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Building2 className="w-32 h-32 transform rotate-12" />
            </div>
            <div className="relative z-10">
              <p className="font-medium text-indigo-100 mb-1">Total Due</p>
              <h3 className="text-4xl font-bold">₹ 2,500</h3>
              <button
                onClick={() => setShowModal(true)}
                className="mt-6 px-4 py-2 bg-white text-indigo-600 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Pay Now <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Family Members Card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 group hover:border-purple-500/40 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Family Members</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">4</h3>
              <p className="text-xs text-gray-400 mt-2">Registered residents in Flat A-101</p>
            </div>
          </div>

          {/* Vehicles Card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 group hover:border-blue-500/40 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 shadow-sm">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Slot P-12</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Registered Vehicles</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">2</h3>
              <p className="text-xs text-gray-400 mt-2">1 Car, 1 Two-wheeler</p>
            </div>
          </div>
        </div>

        {/* Maintenance History */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden min-h-[400px]">
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Maintenance History</h2>
              <p className="text-sm text-gray-500 mt-1">Track your monthly maintenance payments.</p>
            </div>
            <button className="text-sm text-indigo-600 font-medium hover:underline">Download Statement</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/50">
                <tr className="text-left text-gray-500">
                  <th className="py-4 px-8 font-semibold">Month</th>
                  <th className="py-4 px-8 font-semibold">Amount</th>
                  <th className="py-4 px-8 font-semibold">Due Date</th>
                  <th className="py-4 px-8 font-semibold">Status</th>
                  <th className="py-4 px-8 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((item, index) => (
                  <tr key={index} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="py-5 px-8 font-medium text-gray-800">{item.month}</td>
                    <td className="py-5 px-8 text-gray-600">{item.amount}</td>
                    <td className="py-5 px-8 text-gray-500 font-mono text-xs">{item.dueDate}</td>
                    <td className="py-5 px-8">
                      {item.status === 'paid' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                          <CheckCircle className="w-3.5 h-3.5" /> Paid
                        </div>
                      )}
                      {item.status === 'due' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                          <AlertCircle className="w-3.5 h-3.5" /> Due
                        </div>
                      )}
                      {item.status === 'waiting' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                          <Clock className="w-3.5 h-3.5" /> Processing
                        </div>
                      )}
                    </td>
                    <td className="py-5 px-8 text-right">
                      {item.status === 'paid' ? (
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                          <FileText className="w-3.5 h-3.5" /> Invoice
                        </button>
                      ) : item.status === 'waiting' ? (
                        <span className="text-xs text-blue-600 font-medium italic">Pending Approval</span>
                      ) : (
                        <button
                          onClick={() => setShowModal(true)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
                        >
                          <Wallet className="w-3.5 h-3.5" /> Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && <MarkAsPaidModal onClose={() => setShowModal(false)} onConfirm={handleConfirmPayment} />}
    </MemberLayout>
  );
}
