"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

export default function CalculatorPage() {
  const [maintenanceAmount] = useState(2500);
  const [interestRate] = useState(2); // percent per month after 3 months
  const [history] = useState([
    {
      date: "2024-06-01",
      field: "maintenance",
      value: 2500,
      updatedBy: "SuperAdmin",
    },
    {
      date: "2024-06-15",
      field: "interest",
      value: 2,
      updatedBy: "SuperAdmin",
    },
  ]);

  const [unpaidMonths, setUnpaidMonths] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState<number | null>(null);

  const calculateTotal = () => {
  let total = 0;

  for (let i = 1; i <= unpaidMonths; i++) {
    total += maintenanceAmount;

    // Apply interest every 3 months (on the updated total)
    if (i % 3 === 0 && i >= 3) {
      total += (total * interestRate) / 100;
    }
  }

  setCalculatedAmount(Math.round(total));
};

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-md shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-purple-800">
              Maintenance Calculator
            </h2>
            <p className="text-gray-500">Only Super Admins can edit rates</p>
          </div>
        </div>

        {/* Current Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-purple-50 p-4 rounded border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Current Maintenance</p>
            <h3 className="text-xl font-semibold text-purple-800">
              ₹{maintenanceAmount}
            </h3>
          </div>
          <div className="bg-purple-50 p-4 rounded border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">
              Interest Rate (monthly after 3 months)
            </p>
            <h3 className="text-xl font-semibold text-purple-800">
              {interestRate}%
            </h3>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-gray-100 p-4 rounded mb-6">
          <label className="block font-medium mb-2 text-black">
            Number of Unpaid Months
          </label>
          <input
            type="number"
            value={unpaidMonths}
            onChange={(e) => setUnpaidMonths(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
            min={1}
            placeholder="Enter months unpaid"
          />
          <button
            onClick={calculateTotal}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Calculate Total Due
          </button>

          {calculatedAmount !== null && (
            <div className="mt-4 text-lg text-black">
              <p>
                Total Due:{" "}
                <span className="font-bold text-purple-800">
                  ₹{calculatedAmount}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Change History */}
        <div className="bg-white border p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">
            Change History
          </h3>
          <table className="w-full text-left text-sm text-black">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="py-2">Date</th>
                <th>Field</th>
                <th>Value</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="py-2">{entry.date}</td>
                  <td>{entry.field}</td>
                  <td>{entry.value}</td>
                  <td>{entry.updatedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
