'use client';

import { useState } from 'react';
import MemberLayout from '@/components/MemberLayout';
import MarkAsPaidModal from '@/components/MarkAsPaidModal';

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
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow flex flex-col">
          <span className="text-sm text-gray-500">Flat Details</span>
          <span className="text-2xl font-semibold text-purple-800 mt-2">A-101</span>
          <span className="text-xs text-gray-400 mt-1">Owned by Aarav Sharma</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex flex-col">
          <span className="text-sm text-gray-500">Family Members</span>
          <span className="text-2xl font-semibold text-purple-800 mt-2">1</span>
          <span className="text-xs text-gray-400 mt-1">Total family members registered</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex flex-col">
          <span className="text-sm text-gray-500">Vehicles</span>
          <span className="text-2xl font-semibold text-purple-800 mt-2">1</span>
          <span className="text-xs text-gray-400 mt-1">Total vehicles registered</span>
        </div>
      </div>

      {/* Maintenance History */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-black mb-1">Maintenance History</h2>
        <p className="text-sm text-black mb-4">View your past and current maintenance dues.</p>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-black border-b">
              <th className="py-2">Month</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => (
              <tr key={index} className="border-b hover:bg-purple-100/30">
                <td className="py-3 text-black">{item.month}</td>
                <td className="text-black">{item.amount}</td>
                <td className="text-black">{item.dueDate}</td>
                <td>
                  {item.status === 'paid' && (
                    <span className="px-2 py-1 rounded text-white text-xs bg-green-500">✓ Paid</span>
                  )}
                  {item.status === 'due' && (
                    <span className="px-2 py-1 rounded text-white text-xs bg-red-500">⛔ Due</span>
                  )}
                  {item.status === 'waiting' && (
                    <span className="px-2 py-1 rounded text-white text-xs bg-yellow-500">⏳ Waiting for Approval</span>
                  )}
                </td>
                <td className="text-right">
                  {item.status === 'paid' ? (
                    <button className="bg-purple-100 text-purple-900 px-3 py-1 rounded text-sm">
                      📄 Invoice
                    </button>
                  ) : item.status === 'waiting' ? (
                    <span className="text-sm text-gray-500 italic">In review</span>
                  ) : (
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-purple-900 text-white px-3 py-1 rounded text-sm"
                    >
                      Mark as Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <MarkAsPaidModal onClose={() => setShowModal(false)} onConfirm={handleConfirmPayment} />}
    </MemberLayout>
  );
}
