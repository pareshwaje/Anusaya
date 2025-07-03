'use client';

import AdminLayout from '../../components/AdminLayout';
import { useState } from 'react';
import { EyeIcon, CheckIcon, XIcon, FileText, Car, Users } from 'lucide-react';

const dummyPayments = [
  {
    flatNo: 'B-203',
    member: 'Diya Patel',
    month: 'July 2024',
    amount: '₹3,000',
    method: 'CHEQUE',
    transactionId: 'CHQ12345678',
    proof: true,
    status: 'pending'
  },
];

const dummyMembers = [
  {
    name: 'Diya Patel',
    flatNo: 'B-203',
    wing: 'B',
    phone: '9876543210',
    email: 'diya@example.com',
  },
];

const dummyMaintenance = [
  { year: '2024', records: [
    { month: 'May', status: 'Paid', download: true },
    { month: 'June', status: 'Paid', download: true },
    { month: 'July', status: 'Unpaid', download: false },
  ]}
];

const dummyVehicles = [
  { rc: 'RC1234567890', number: 'MH12AB1234', owner: 'Diya Patel' }
];

const dummyFamily = [
  { name: 'Raj Patel', aadhar: 'XXXX-XXXX-1234', relation: 'Father' }
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('paymentverification');
  const [lightbox, setLightbox] = useState({ open: false, type: '', member: null });
  const [payments, setPayments] = useState(dummyPayments);

  const openLightbox = (type, member) => {
    setLightbox({ open: true, type, member });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, type: '', member: null });
  };

  const handleApproval = (index) => {
    const updated = [...payments];
    updated[index].status = 'approved';
    setPayments(updated);
  };

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const approvedPayments = payments.filter(p => p.status === 'approved');

  return (
    <AdminLayout>
      <div className="mb-4 flex space-x-4">
        {['Payment Verification', 'Verified Payments', 'Member Info'].map((label, i) => (
          <button
            key={i}
            onClick={() => setTab(label.toLowerCase().replace(/\s/g, ''))}
            className={`px-4 py-2 rounded-md ${
              tab === label.toLowerCase().replace(/\s/g, '')
                ? 'bg-white shadow text-purple-700 font-semibold'
                : 'text-gray-500 bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'paymentverification' && (
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold text-black mb-1">
            Pending Payment Verifications
          </h2>
          <p className="text-black mb-4">
            Review and approve or reject member payment submissions.
          </p>

          <table className="w-full text-left text-sm text-black">
            <thead className="border-b border-gray-300">
              <tr className="text-gray-600">
                <th className="py-2">Flat No.</th>
                <th>Member</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Transaction ID</th>
                <th>Proof</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((payment, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-3">{payment.flatNo}</td>
                  <td>{payment.member}</td>
                  <td>{payment.month}</td>
                  <td>{payment.amount}</td>
                  <td>
                    <span className="border px-3 py-1 rounded-full text-xs font-semibold">
                      {payment.method}
                    </span>
                  </td>
                  <td>{payment.transactionId || '-'}</td>
                  <td className="text-center">
                    {payment.proof && (
                      <EyeIcon className="h-5 w-5 mx-auto text-gray-600 cursor-pointer" />
                    )}
                  </td>
                  <td>
                    <span className="px-2 py-1 rounded text-white text-xs bg-yellow-500">⏳ Waiting</span>
                  </td>
                  <td className="flex items-center gap-2 mt-2">
                    <button
                      className="bg-green-100 text-green-600 p-2 rounded"
                      onClick={() => handleApproval(payments.indexOf(payment))}
                    >
                      <CheckIcon size={16} />
                    </button>
                    <button className="bg-red-100 text-red-600 p-2 rounded">
                      <XIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'verifiedpayments' && (
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold text-black mb-1">Verified Payments</h2>
          <p className="text-black mb-4">List of payments approved by admin.</p>

          <table className="w-full text-left text-sm text-black">
            <thead className="border-b border-gray-300">
              <tr className="text-gray-600">
                <th className="py-2">Flat No.</th>
                <th>Member</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Transaction ID</th>
                <th>Proof</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedPayments.map((payment, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-3">{payment.flatNo}</td>
                  <td>{payment.member}</td>
                  <td>{payment.month}</td>
                  <td>{payment.amount}</td>
                  <td>
                    <span className="border px-3 py-1 rounded-full text-xs font-semibold">
                      {payment.method}
                    </span>
                  </td>
                  <td>{payment.transactionId || '-'}</td>
                  <td className="text-center">
                    {payment.proof && (
                      <EyeIcon className="h-5 w-5 mx-auto text-gray-600 cursor-pointer" />
                    )}
                  </td>
                  <td>
                    <span className="px-2 py-1 rounded text-white text-xs bg-green-500">✓ Approved</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'memberinfo' && (
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold text-black mb-1">All Members</h2>
          <p className="text-black mb-4">List of all registered members with their details.</p>

          <table className="w-full text-left text-sm text-black">
            <thead className="border-b border-gray-300">
              <tr className="text-gray-600">
                <th>Name</th>
                <th>Flat No</th>
                <th>Wing</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyMembers.map((member, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-3 font-medium text-black">{member.name}</td>
                  <td>{member.flatNo}</td>
                  <td>{member.wing}</td>
                  <td>{member.phone}</td>
                  <td>{member.email}</td>
                  <td className="flex items-center gap-2 mt-2">
                    <button
                      className="bg-blue-100 text-blue-700 p-2 rounded"
                      onClick={() => openLightbox('Maintenance Record', member)}
                    >
                      <FileText size={16} />
                    </button>
                    <button
                      className="bg-yellow-100 text-yellow-700 p-2 rounded"
                      onClick={() => openLightbox('Vehicle Info', member)}
                    >
                      <Car size={16} />
                    </button>
                    <button
                      className="bg-purple-100 text-purple-700 p-2 rounded"
                      onClick={() => openLightbox('Family Members', member)}
                    >
                      <Users size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {lightbox.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-xl w-[90%] md:w-[600px]">
            <h3 className="text-lg font-semibold mb-4 text-purple-700">
              {lightbox.type} for {lightbox.member ? lightbox.member.name : ''}
            </h3>
            {lightbox.type === 'Maintenance Record' && (
              <div className="text-sm text-gray-700">
                {dummyMaintenance.map((yearData, idx) => (
                  <div key={idx} className="mb-4">
                    <h4 className="font-bold mb-2">Year {yearData.year}</h4>
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b">
                          <th>Month</th>
                          <th>Status</th>
                          <th>Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearData.records.map((r, i) => (
                          <tr key={i} className="border-b">
                            <td>{r.month}</td>
                            <td>{r.status}</td>
                            <td>{r.download ? <a href="#" className="text-blue-600 underline">Invoice</a> : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
            {lightbox.type === 'Vehicle Info' && (
              <div className="text-sm text-gray-700">
                {dummyVehicles.map((v, i) => (
                  <div key={i} className="mb-2">
                    <p><strong>RC:</strong> {v.rc}</p>
                    <p><strong>Number:</strong> {v.number}</p>
                    <p><strong>Owner:</strong> {v.owner}</p>
                  </div>
                ))}
              </div>
            )}
            {lightbox.type === 'Family Members' && (
              <div className="text-sm text-gray-700">
                {dummyFamily.map((f, i) => (
                  <div key={i} className="mb-2">
                    <p><strong>Name:</strong> {f.name}</p>
                    <p><strong>Relation:</strong> {f.relation}</p>
                    <p><strong>Aadhar:</strong> {f.aadhar}</p>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={closeLightbox}
              className="mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}