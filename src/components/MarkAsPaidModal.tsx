'use client';

import { useState } from "react";
import Image from "next/image";
import { X, Check, CreditCard, Banknote, Landmark, QrCode, Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}

export default function MarkAsPaidModal({ onClose, onConfirm }: Props) {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [transactionId, setTransactionId] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showTransactionIdField = paymentMethod === "UPI" || paymentMethod === "Netbanking";
  const showChequeFields = paymentMethod === "Cheque";
  const showBankDetails = paymentMethod === "Netbanking" || paymentMethod === "Cheque";
  const showQR = paymentMethod === "UPI";

  const isFormValid = () => {
    if (paymentMethod === "Cash") return true;
    if (paymentMethod === "UPI" || paymentMethod === "Netbanking") return transactionId.trim() !== "";
    if (paymentMethod === "Cheque") return chequeNo.trim() !== "" && bankName.trim() !== "";
    return false;
  };

  const handleConfirm = async () => {
    if (isFormValid()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConfirm();
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Confirm Payment</h2>
            <p className="text-indigo-100 text-sm mt-1">July 2024 Maintenance • ₹2,500</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Select Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              {['Cash', 'UPI', 'Netbanking', 'Cheque'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium",
                    paymentMethod === method
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {method === 'Cash' && <Banknote className="w-4 h-4" />}
                  {method === 'UPI' && <QrCode className="w-4 h-4" />}
                  {method === 'Netbanking' && <Landmark className="w-4 h-4" />}
                  {method === 'Cheque' && <CreditCard className="w-4 h-4" />}
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="space-y-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
            {showTransactionIdField && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Transaction ID</label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                  placeholder="e.g. UPI1234567890"
                />
              </div>
            )}

            {showChequeFields && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Cheque No.</label>
                  <input
                    type="text"
                    value={chequeNo}
                    onChange={(e) => setChequeNo(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                    placeholder="XXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                    placeholder="e.g. HDFC"
                  />
                </div>
              </div>
            )}

            {showQR && (
              <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-200">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <QrCode className="w-10 h-10 text-gray-800" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Scan to Pay</p>
                  <p className="text-xs text-gray-500">society@upi</p>
                </div>
              </div>
            )}

            {!showTransactionIdField && !showChequeFields && !showQR && (
              <p className="text-sm text-gray-500 italic">Please collect cash and issue a receipt.</p>
            )}
          </div>

          {/* File Upload (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Proof (Optional)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mb-2" />
              <span className="text-xs">Click to upload image or PDF</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isFormValid() || isSubmitting}
            className={cn(
              "px-5 py-2.5 text-white font-medium rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/25",
              isFormValid() && !isSubmitting
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02]"
                : "bg-gray-300 cursor-not-allowed shadow-none"
            )}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
