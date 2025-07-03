'use client';

import MemberLayout from '../../components/MemberLayout';
import { useState } from 'react';

export default function MemberProfilePage() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  
  const [newFamily, setNewFamily] = useState({ name: '', relation: '', aadhar: '' });
  const [newVehicle, setNewVehicle] = useState({ number: '', owner: '', parkingLot: '' });

  const addFamilyMember = () => {
    if (newFamily.name && newFamily.relation && newFamily.aadhar) {
      setFamilyMembers([...familyMembers, newFamily]);
      setNewFamily({ name: '', relation: '', aadhar: '' });
    }
  };

  const addVehicle = () => {
    if (newVehicle.number && newVehicle.owner && newVehicle.parkingLot) {
      setVehicles([...vehicles, newVehicle]);
      setNewVehicle({ number: '', owner: '', parkingLot: '' });
    }
  };

  return (
    <MemberLayout>
      <div className="bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Member Profile</h2>

        {/* Family Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-black">Family Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={newFamily.name}
              onChange={(e) => setNewFamily({ ...newFamily, name: e.target.value })}
              className="p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Relation"
              value={newFamily.relation}
              onChange={(e) => setNewFamily({ ...newFamily, relation: e.target.value })}
              className="p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Aadhar Card Number"
              value={newFamily.aadhar}
              onChange={(e) => setNewFamily({ ...newFamily, aadhar: e.target.value })}
              className="p-2 border rounded text-black"
            />
          </div>
          <button
            onClick={addFamilyMember}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add Family Member
          </button>

          <ul className="mt-4 text-black">
            {familyMembers.map((f, i) => (
              <li key={i} className="border p-2 rounded mb-2">
                <strong>{f.name}</strong> ({f.relation}) - Aadhar: {f.aadhar}
              </li>
            ))}
          </ul>
        </div>

        {/* Vehicles Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">Vehicles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Vehicle Number"
              value={newVehicle.number}
              onChange={(e) => setNewVehicle({ ...newVehicle, number: e.target.value })}
              className="p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Owner Name"
              value={newVehicle.owner}
              onChange={(e) => setNewVehicle({ ...newVehicle, owner: e.target.value })}
              className="p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Parking Lot Number"
              value={newVehicle.parkingLot}
              onChange={(e) => setNewVehicle({ ...newVehicle, parkingLot: e.target.value })}
              className="p-2 border rounded text-black"
            />
          </div>
          <button
            onClick={addVehicle}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add Vehicle
          </button>

          <ul className="mt-4 text-black">
            {vehicles.map((v, i) => (
              <li key={i} className="border p-2 rounded mb-2">
                <strong>{v.number}</strong> - Owner: {v.owner} (Parking: {v.parkingLot})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MemberLayout>
  );
}
