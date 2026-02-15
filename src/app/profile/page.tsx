'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { User, Phone, Mail, Home, Edit2, Plus, Trash2, Car, Users, Save } from 'lucide-react';

// Define types for FamilyMember and Vehicle
type FamilyMember = {
  name: string;
  relation: string;
  aadhar: string;
};

type Vehicle = {
  number: string;
  owner: string;
  parkingLot: string;
};

export default function MemberProfilePage() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { name: 'Raj Kumar', relation: 'Self', aadhar: 'XXXX-XXXX-1234' } // Dummy initial data
  ]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { number: 'MH12 AB 1234', owner: 'Raj Kumar', parkingLot: 'P-101' } // Dummy initial data
  ]);

  const [newFamily, setNewFamily] = useState<FamilyMember>({
    name: '',
    relation: '',
    aadhar: '',
  });

  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    number: '',
    owner: '',
    parkingLot: '',
  });

  const addFamilyMember = () => {
    if (newFamily.name && newFamily.relation && newFamily.aadhar) {
      setFamilyMembers([...familyMembers, newFamily]);
      setNewFamily({ name: '', relation: '', aadhar: '' });
    }
  };

  const removeFamilyMember = (index: number) => {
    const updated = [...familyMembers];
    updated.splice(index, 1);
    setFamilyMembers(updated);
  };

  const addVehicle = () => {
    if (newVehicle.number && newVehicle.owner && newVehicle.parkingLot) {
      setVehicles([...vehicles, newVehicle]);
      setNewVehicle({ number: '', owner: '', parkingLot: '' });
    }
  };

  const removeVehicle = (index: number) => {
    const updated = [...vehicles];
    updated.splice(index, 1);
    setVehicles(updated);
  };

  return (
    <div className="min-h-screen w-full bg-muted/30 overflow-y-auto">

      <Navbar user={{ name: 'Raj Kumar', role: 'MEMBER' }} />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* Header / Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-white/20 p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 p-1 shadow-lg">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-indigo-300" />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md text-indigo-600 hover:scale-110 transition-transform">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center md:text-left space-y-2 flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Raj Kumar</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600">
                <span className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                  <Home className="w-4 h-4" /> Flat A-101
                </span>
                <span className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                  <Phone className="w-4 h-4" /> +91 98765 43210
                </span>
                <span className="flex items-center gap-1.5 bg-white/50 px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                  <Mail className="w-4 h-4" /> raj.kumar@example.com
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Family Section */}
            <div className="bg-white rounded-3xl shadow-xl border border-white/20 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Family Members</h2>
                </div>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">{familyMembers.length}</span>
              </div>

              <div className="space-y-4 flex-1">
                {familyMembers.map((f, i) => (
                  <div key={i} className="bg-white/50 border border-white/40 p-4 rounded-xl flex items-center justify-between group hover:bg-white/80 transition-colors">
                    <div>
                      <p className="font-bold text-gray-800">{f.name}</p>
                      <p className="text-xs text-gray-500">{f.relation} • {f.aadhar}</p>
                    </div>
                    <button onClick={() => removeFamilyMember(i)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200/50 space-y-3">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Add New Member</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newFamily.name}
                    onChange={(e) => setNewFamily({ ...newFamily, name: e.target.value })}
                    className="p-2.5 bg-white/50 border border-white/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Relation"
                    value={newFamily.relation}
                    onChange={(e) => setNewFamily({ ...newFamily, relation: e.target.value })}
                    className="p-2.5 bg-white/50 border border-white/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Aadhar"
                    value={newFamily.aadhar}
                    onChange={(e) => setNewFamily({ ...newFamily, aadhar: e.target.value })}
                    className="col-span-2 p-2.5 bg-white/50 border border-white/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <button
                  onClick={addFamilyMember}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 font-medium transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Add Member
                </button>
              </div>
            </div>

            {/* Vehicles Section */}
            <div className="bg-white rounded-3xl shadow-xl border border-white/20 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Car className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Vehicles</h2>
                </div>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{vehicles.length}</span>
              </div>

              <div className="space-y-4 flex-1">
                {vehicles.map((v, i) => (
                  <div key={i} className="bg-white/50 border border-white/40 p-4 rounded-xl flex items-center justify-between group hover:bg-white/80 transition-colors">
                    <div>
                      <p className="font-mono font-bold text-gray-800 tracking-wide">{v.number}</p>
                      <p className="text-xs text-gray-500">{v.owner} • Slot: {v.parkingLot}</p>
                    </div>
                    <button onClick={() => removeVehicle(i)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200/50 space-y-3">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Add New Vehicle</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Number (e.g. MH12..)"
                    value={newVehicle.number}
                    onChange={(e) => setNewVehicle({ ...newVehicle, number: e.target.value })}
                    className="p-2.5 bg-white/50 border border-white/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Parking Slot"
                    value={newVehicle.parkingLot}
                    onChange={(e) => setNewVehicle({ ...newVehicle, parkingLot: e.target.value })}
                    className="p-2.5 bg-white/50 border border-white/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Owner Name"
                    value={newVehicle.owner}
                    onChange={(e) => setNewVehicle({ ...newVehicle, owner: e.target.value })}
                    className="col-span-2 p-2.5 bg-white/50 border border-white/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <button
                  onClick={addVehicle}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 font-medium transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Add Vehicle
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
