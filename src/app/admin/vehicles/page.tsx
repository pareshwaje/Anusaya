'use client';

import AdminLayout from '@/components/AdminLayout';
import { Car, Search, Plus, Filter, MoreVertical, FileText } from 'lucide-react';

export default function VehiclesPage() {
  const customVehicles = [
    { number: 'MH12 AB 1234', type: 'Car', owner: 'Aarav Sharma', flat: 'A-101', parking: 'P-01', status: 'Active' },
    { number: 'MH12 CD 5678', type: 'Bike', owner: 'Diya Patel', flat: 'B-203', parking: 'P-02', status: 'Active' },
    { number: 'MH12 EF 9012', type: 'Car', owner: 'Vikram Singh', flat: 'C-305', parking: 'P-03', status: 'Active' },
    { number: 'MH12 GH 3456', type: 'Bike', owner: 'Neha Gupta', flat: 'A-102', parking: 'P-04', status: 'Inactive' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Vehicle Management</h1>
            <p className="text-gray-500 mt-1">Track and manage society member vehicles and parking.</p>
          </div>
          <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-transform flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Vehicle
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by vehicle number, owner, or flat..."
              className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            />
          </div>
          <button className="px-4 py-3 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-white/80 transition-colors shadow-sm">
            <Filter className="w-5 h-5" /> Filter
          </button>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-500">Vehicle Info</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Owner</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Parking Slot</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customVehicles.map((vehicle, index) => (
                  <tr key={index} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-600">
                          <Car className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{vehicle.number}</p>
                          <p className="text-xs text-gray-500">{vehicle.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{vehicle.owner}</p>
                      <p className="text-xs text-gray-500">Flat {vehicle.flat}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-mono font-medium text-gray-600 border border-gray-200">
                        {vehicle.parking}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${vehicle.status === 'Active'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
