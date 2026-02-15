'use client';

import AdminLayout from '../../components/AdminLayout';
import { useState } from 'react';
import { EyeIcon, CheckIcon, XIcon, FileText, Car, Users, Search, Filter, ArrowUpRight, DollarSign, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

type Member = {
  name: string;
  flatNo: string;
  wing?: string;
  phone?: string;
  email?: string;
};

const dummyPayments = [
  {
    flatNo: 'B-203',
    member: 'Diya Patel',
    month: 'July 2024',
    amount: '₹3,000',
    method: 'CHEQUE',
    transactionId: 'CHQ12345678',
    proof: true,
    status: 'pending',
  },
  {
    flatNo: 'A-105',
    member: 'Aarav Sharma',
    month: 'July 2024',
    amount: '₹2,500',
    method: 'UPI',
    transactionId: 'UPI987654321',
    proof: true,
    status: 'pending',
  },
];

const dummyMembers: Member[] = [
  {
    name: 'Diya Patel',
    flatNo: 'B-203',
    wing: 'B',
    phone: '9876543210',
    email: 'diya@example.com',
  },
  {
    name: 'Aarav Sharma',
    flatNo: 'A-105',
    wing: 'A',
    phone: '9876541230',
    email: 'aarav@example.com',
  },
];

const dummyMaintenance = [
  {
    year: '2024',
    records: [
      { month: 'May', status: 'Paid', download: true },
      { month: 'June', status: 'Paid', download: true },
      { month: 'July', status: 'Unpaid', download: false },
    ],
  },
];

const dummyVehicles = [
  { rc: 'RC1234567890', number: 'MH12AB1234', owner: 'Diya Patel' },
];

const dummyFamily = [
  { name: 'Raj Patel', aadhar: 'XXXX-XXXX-1234', relation: 'Father' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('paymentverification');
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    type: string;
    member: Member | null;
  }>({
    open: false,
    type: '',
    member: null,
  });
  const [payments, setPayments] = useState(dummyPayments);

  const openLightbox = (type: string, member: Member) => {
    setLightbox({ open: true, type, member });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, type: '', member: null });
  };

  const handleApproval = (index: number) => {
    const updated = [...payments];
    updated[index].status = 'approved';
    setPayments(updated);
  };

  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const approvedPayments = payments.filter((p) => p.status === 'approved');

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Manage payments, members, and society operations efficiently.</p>
          </div>

          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all shadow-sm">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2.5 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all shadow-sm">
              <Filter className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/30 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet className="w-32 h-32 transform rotate-12" />
            </div>
            <div className="relative z-10">
              <p className="font-medium text-blue-100">Total Collections</p>
              <h3 className="text-4xl font-bold mt-2">₹ 12,50,000</h3>
              <div className="mt-4 inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-medium border border-white/10">
                <ArrowUpRight className="w-4 h-4" /> +15% this month
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/20 group hover:border-orange-500/40 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Pending Approvals</p>
                <h3 className="text-3xl font-bold mt-2 text-gray-800">{pendingPayments.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm">
                <CheckIcon className="w-6 h-6" />
              </div>
            </div>
            <button
              onClick={() => setTab('paymentverification')}
              className="mt-6 text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              View details <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/20 group hover:border-purple-500/40 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Total Members</p>
                <h3 className="text-3xl font-bold mt-2 text-gray-800">{dummyMembers.length * 45}</h3>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <button
              onClick={() => setTab('memberinfo')}
              className="mt-6 text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              View directory <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 self-start w-full md:w-auto overflow-x-auto shadow-sm">
          {['Payment Verification', 'Verified Payments', 'Member Info'].map(
            (label, i) => {
              const tabKey = label.toLowerCase().replace(/\s/g, '');
              const isActive = tab === tabKey;
              return (
                <button
                  key={i}
                  onClick={() => setTab(tabKey)}
                  className={cn(
                    "px-6 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap",
                    isActive
                      ? "bg-white text-indigo-700 shadow-md scale-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  )}
                >
                  {label}
                </button>
              )
            }
          )}
        </div>


        {/* Tab Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-white/20 overflow-hidden min-h-[500px]">
          {tab === 'paymentverification' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-border/50 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Pending Payment Verifications</h2>
                  <p className="text-sm text-muted-foreground mt-1">Review and approve or reject member payment submissions.</p>
                </div>
              </div>
              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {pendingPayments.map((payment, index) => (
                  <div key={index} className="bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                          {payment.member.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{payment.member}</p>
                          <p className="text-xs text-muted-foreground">{payment.flatNo} • {payment.month}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">{payment.amount}</p>
                        <p className="text-xs text-muted-foreground">{payment.method}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {payment.proof ? (
                        <button className="flex-1 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                          View Proof
                        </button>
                      ) : (
                        <span className="flex-1 py-2 text-sm text-center text-muted-foreground bg-gray-50 rounded-lg">No Proof</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleApproval(payments.indexOf(payment))}
                        className="py-2.5 bg-green-500 text-white rounded-xl font-medium shadow-lg shadow-green-500/20 active:scale-95 transition-transform"
                      >
                        Approve
                      </button>
                      <button className="py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-medium active:scale-95 transition-transform">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
                {pendingPayments.length === 0 && (
                  <div className="text-center py-10 text-muted-foreground">No pending payments</div>
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30">
                    <tr className="text-left text-muted-foreground">
                      <th className="py-4 px-8 font-semibold rounded-l-lg">Details</th>
                      <th className="py-4 px-8 font-semibold">Amount</th>
                      <th className="py-4 px-8 font-semibold">Confirmation</th>
                      <th className="py-4 px-8 font-semibold rounded-r-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {pendingPayments.map((payment, index) => (
                      <tr key={index} className="hover:bg-muted/30 transition-colors group">
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                              {payment.member.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-base">{payment.member}</p>
                              <p className="text-muted-foreground text-xs">{payment.flatNo} • {payment.month}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <p className="font-bold text-base">{payment.amount}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded bg-muted/50 border border-border/50">{payment.method}</span>
                            <span className="text-xs text-muted-foreground font-mono">{payment.transactionId}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          {payment.proof ? (
                            <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                              <EyeIcon className="w-4 h-4" /> View Proof
                            </button>
                          ) : (
                            <span className="text-muted-foreground text-sm">No proof uploaded</span>
                          )}
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-3">
                            <button
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20 transition-all hover:scale-105"
                              onClick={() => handleApproval(payments.indexOf(payment))}
                            >
                              <CheckIcon size={16} /> Approve
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 transition-all hover:scale-105">
                              <XIcon size={16} /> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pendingPayments.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-muted-foreground">
                          <div className="flex flex-col items-center gap-2">
                            <CheckIcon className="w-12 h-12 text-green-500/20" />
                            <p>All caught up! No pending payments.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'verifiedpayments' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-border/50">
                <h2 className="text-xl font-bold">Verified Payments History</h2>
                <p className="text-sm text-muted-foreground mt-1">List of payments approved by admin.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30">
                    <tr className="text-left text-muted-foreground">
                      <th className="py-4 px-8 font-semibold">Flat No.</th>
                      <th className="py-4 px-8 font-semibold">Member</th>
                      <th className="py-4 px-8 font-semibold">Amount</th>
                      <th className="py-4 px-8 font-semibold">Date Info</th>
                      <th className="py-4 px-8 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {approvedPayments.map((payment, index) => (
                      <tr key={index} className="hover:bg-muted/30 transition-colors">
                        <td className="py-5 px-8 font-medium">{payment.flatNo}</td>
                        <td className="py-5 px-8 font-semibold">{payment.member}</td>
                        <td className="py-5 px-8">{payment.amount}</td>
                        <td className="py-5 px-8">
                          <div>
                            <p>{payment.month}</p>
                            <p className="text-xs text-muted-foreground font-mono">{payment.transactionId}</p>
                          </div>
                        </td>
                        <td className="py-5 px-8">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                            <CheckIcon className="w-3 h-3" /> Approved
                          </span>
                        </td>
                      </tr>
                    ))}
                    {approvedPayments.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-muted-foreground">No verified payments found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'memberinfo' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-border/50">
                <h2 className="text-xl font-bold">Member Directory</h2>
                <p className="text-sm text-muted-foreground mt-1">List of all registered members with their details.</p>
              </div>
              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {dummyMembers.map((member, index) => (
                  <div key={index} className="bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center font-bold text-lg">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-lg text-gray-900 block">{member.name}</span>
                        <span className="px-2 py-0.5 bg-muted rounded-md font-mono text-xs text-muted-foreground">{member.flatNo}</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{member.phone}</p>
                      <p className="text-muted-foreground">{member.email}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
                      <button
                        className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg hover:bg-blue-50 text-blue-600"
                        onClick={() => openLightbox('Maintenance Record', member)}
                      >
                        <FileText size={20} />
                        <span className="text-[10px] font-medium">History</span>
                      </button>
                      <button
                        className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg hover:bg-yellow-50 text-yellow-600"
                        onClick={() => openLightbox('Vehicle Info', member)}
                      >
                        <Car size={20} />
                        <span className="text-[10px] font-medium">Vehicles</span>
                      </button>
                      <button
                        className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg hover:bg-purple-50 text-purple-600"
                        onClick={() => openLightbox('Family Members', member)}
                      >
                        <Users size={20} />
                        <span className="text-[10px] font-medium">Family</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30">
                    <tr className="text-left text-muted-foreground">
                      <th className="py-4 px-8 font-semibold">Name</th>
                      <th className="py-4 px-8 font-semibold">Flat No</th>
                      <th className="py-4 px-8 font-semibold">Contact</th>
                      <th className="py-4 px-8 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {dummyMembers.map((member, index) => (
                      <tr key={index} className="hover:bg-muted/30 transition-colors">
                        <td className="py-5 px-8">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center font-bold">
                              {member.name.charAt(0)}
                            </div>
                            <span className="font-semibold">{member.name}</span>
                          </div>
                        </td>
                        <td className="py-5 px-8">
                          <span className="px-2 py-1 bg-muted rounded-md font-mono text-xs">{member.flatNo}</span>
                        </td>
                        <td className="py-5 px-8">
                          <div>
                            <p>{member.phone}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </td>
                        <td className="py-5 px-8">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                              onClick={() => openLightbox('Maintenance Record', member)}
                              title="Maintenance"
                            >
                              <FileText size={18} />
                            </button>
                            <button
                              className="p-2 rounded-lg hover:bg-yellow-50 text-yellow-600 transition-colors"
                              onClick={() => openLightbox('Vehicle Info', member)}
                              title="Vehicles"
                            >
                              <Car size={18} />
                            </button>
                            <button
                              className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 transition-colors"
                              onClick={() => openLightbox('Family Members', member)}
                              title="Family"
                            >
                              <Users size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox.open && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card text-card-foreground p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-lg md:max-w-xl animate-in zoom-in-95 duration-200 relative overflow-hidden">

            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold">{lightbox.type}</h3>
                <p className="text-muted-foreground">Details for {lightbox.member?.name}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
              {lightbox.type === 'Maintenance Record' && (
                <div className="space-y-6">
                  {dummyMaintenance.map((yearData, idx) => (
                    <div key={idx} className="bg-muted/30 p-4 rounded-2xl">
                      <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Year {yearData.year}</h4>
                      <div className="space-y-3">
                        {yearData.records.map((r, i) => (
                          <div key={i} className="flex items-center justify-between bg-background p-3 rounded-xl border border-border/50">
                            <div className="flex items-center gap-3">
                              <div className={cn("h-2 w-2 rounded-full", r.status === 'Paid' ? 'bg-green-500' : 'bg-red-500')}></div>
                              <span className="font-medium">{r.month}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-xs font-bold",
                                r.status === 'Paid' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              )}>
                                {r.status}
                              </span>
                              {r.download && <button className="text-xs text-primary hover:underline">Invoice</button>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {lightbox.type === 'Vehicle Info' && (
                <div className="space-y-4">
                  {dummyVehicles.map((v, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 border border-border">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">Vehicle Number</p>
                          <p className="text-2xl font-mono font-bold tracking-tight">{v.number}</p>
                        </div>
                        <Car className="text-muted-foreground w-8 h-8" />
                      </div>
                      <div className="mt-6 pt-4 border-t border-border/50 flex justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">RC Number</p>
                          <p className="font-medium">{v.rc}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Owner</p>
                          <p className="font-medium">{v.owner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {lightbox.type === 'Family Members' && (
                <div className="space-y-3">
                  {dummyFamily.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {f.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold">{f.name}</p>
                          <p className="text-xs text-muted-foreground">{f.relation}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Aadhar</p>
                        <p className="font-mono text-sm font-medium">{f.aadhar}</p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" /> Add Family Member
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={closeLightbox}
                className="px-6 py-2.5 rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
