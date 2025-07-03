"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}

export default function MarkAsPaidModal({ onClose, onConfirm }: Props) {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [file, setFile] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [bankName, setBankName] = useState("");

  const showTransactionIdField =
    paymentMethod === "UPI" || paymentMethod === "Netbanking";
  const showChequeFields = paymentMethod === "Cheque";
  const showBankDetails =
    paymentMethod === "Netbanking" || paymentMethod === "Cheque";
  const showQR = paymentMethod === "UPI";

  const isFormValid = () => {
    if (paymentMethod === "Cash") return true;
    if (paymentMethod === "UPI" || paymentMethod === "Netbanking")
      return transactionId.trim() !== "";
    if (paymentMethod === "Cheque")
      return chequeNo.trim() !== "" && bankName.trim() !== "";
    return false;
  };

  const handleConfirm = () => {
    if (isFormValid()) {
      onConfirm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="bg-purple-100 p-6 rounded-md w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Mark Payment as Paid</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            &times;
          </button>
        </div>

        <p className="text-black mb-2">
          Confirm your payment for <strong>July 2024</strong> maintenance of{" "}
          <strong>₹2500</strong>.
        </p>

        {/* Payment Method Dropdown */}
        <label className="block text-black font-medium mb-1 mt-4">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border border-purple-500 rounded text-black"
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Netbanking">Netbanking</option>
          <option value="Cheque">Cheque</option>
        </select>

        {/* Conditional Inputs */}
        {showTransactionIdField && (
          <>
            <label className="block text-black font-medium mb-1 mt-4">
              Transaction ID
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-2 border border-purple-300 rounded text-black"
              placeholder="Enter transaction ID"
            />
          </>
        )}

        {showChequeFields && (
          <>
            <label className="block text-black font-medium mb-1 mt-4">
              Cheque Number
            </label>
            <input
              type="text"
              value={chequeNo}
              onChange={(e) => setChequeNo(e.target.value)}
              className="w-full p-2 border border-purple-300 rounded"
              placeholder="Enter cheque number"
            />

            <label className="block text-black font-medium mb-1 mt-4">
              Bank Name
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2 border border-purple-300 rounded"
              placeholder="Enter bank name"
            />
          </>
        )}

        {/* Dummy Payment Info */}
        {showQR && (
          <div className="mt-4 text-black text-sm bg-white rounded p-3 border border-purple-300 text-center">
            <img
              src="/qr-code.png"
              alt="QR Code"
              className="mx-auto w-24 h-24 mb-2"
            />
            <p>
              Pay to: <strong>society@upi</strong>
            </p>
          </div>
        )}

        {showBankDetails && (
          <div className="mt-4 text-black text-sm bg-white rounded p-3 border border-purple-300">
            <p>
              <strong>Bank Name:</strong> HDFC Bank
            </p>
            <p>
              <strong>Account No:</strong> 1234567890
            </p>
            <p>
              <strong>IFSC:</strong> HDFC0001234
            </p>
            <p>
              <strong>Account Name:</strong> Anusaya Society
            </p>
          </div>
        )}

        {/* File Upload */}
        <label className="block text-black font-medium mb-1 mt-4">
          Payment Proof (Optional)
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-2 bg-white border border-purple-300 rounded"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded text-white ${
              isFormValid()
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-purple-300 cursor-not-allowed"
            }`}
            disabled={!isFormValid()}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
