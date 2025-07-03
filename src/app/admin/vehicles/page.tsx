'use client';

import AdminLayout from '@/components/AdminLayout';

const dummyVehicles = [
  { parkingLot: 'A1', number: 'MH12AB1234', owner: 'Diya Patel', flat: 'B-203' },
  { parkingLot: 'A2', number: 'MH12XY9876', owner: 'Raj Sharma', flat: 'A-101' },
  { parkingLot: 'A3', number: 'MH14CD4567', owner: 'Neha Verma', flat: 'C-302' },
  { parkingLot: 'A4', number: 'MH01EF7890', owner: 'Kunal Mehta', flat: 'D-104' },
];

export default function AdminVehicles() {
  const sortedVehicles = [...dummyVehicles].sort((a, b) => a.parkingLot.localeCompare(b.parkingLot));

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">All Vehicles</h2>
        <p className="text-gray-500 mb-4">List of all registered vehicles sorted by parking lot.</p>

        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-300 text-gray-700">
            <tr>
              <th className="py-2">Parking Lot</th>
              <th>Vehicle Number</th>
              <th>Owner</th>
              <th>Flat</th>
            </tr>
          </thead>
          <tbody>
            {sortedVehicles.map((v, i) => (
              <tr key={i} className="border-t border-gray-200">
                <td className="py-2 font-medium text-black">{v.parkingLot}</td>
                <td className="text-black">{v.number}</td>
                <td className="text-black">{v.owner}</td>
                <td className="text-black">{v.flat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
