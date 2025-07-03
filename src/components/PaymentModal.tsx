'use client';
import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    method: string;
    file?: File | null;
  }) => void;
  month: string;
  amount: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onConfirm,
  month,
  amount,
}: PaymentModalProps) {
  const [method, setMethod] = useState('Cash');
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm({ method, file });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
      <div className="bg-purple-100 rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-1">Mark Payment as Paid</h2>
        <p className="text-sm text-gray-600 mb-4">
          Confirm your payment for <strong>{month}</strong> maintenance of ₹{amount}.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 border border-purple-500 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>NetBanking</option>
            <option>Cheque</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Proof (Optional)
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-600 bg-white border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
