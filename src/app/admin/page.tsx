"use client";

import AdminLayout from "../../components/AdminLayout";
import { useState } from "react";
import { EyeIcon, CheckIcon, XIcon, FileText, Car, Users } from "lucide-react";

type Member = {
  name: string;
  flatNo: string;
  wing?: string;
  phone?: string;
  email?: string;
};

const dummyPayments = [
  {
    flatNo: "B-203",
    member: "Diya Patel",
    month: "July 2024",
    amount: "₹3,000",
    method: "CHEQUE",
    transactionId: "CHQ12345678",
    proof: true,
    status: "pending",
  },
];

const dummyMembers: Member[] = [
  {
    name: "Diya Patel",
    flatNo: "B-203",
    wing: "B",
    phone: "9876543210",
    email: "diya@example.com",
  },
];

const dummyMaintenance = [
  {
    year: "2024",
    records: [
      { month: "May", status: "Paid", download: true },
      { month: "June", status: "Paid", download: true },
      { month: "July", status: "Unpaid", download: false },
    ],
  },
];

const dummyVehicles = [
  { rc: "RC1234567890", number: "MH12AB1234", owner: "Diya Patel" },
];

const dummyFamily = [
  { name: "Raj Patel", aadhar: "XXXX-XXXX-1234", relation: "Father" },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("paymentverification");
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    type: string;
    member: Member | null;
  }>({
    open: false,
    type: "",
    member: null,
  });
  const [payments, setPayments] = useState(dummyPayments);

  const openLightbox = (type: string, member: Member) => {
    setLightbox({ open: true, type, member });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, type: "", member: null });
  };

  const handleApproval = (index: number) => {
    const updated = [...payments];
    updated[index].status = "approved";
    setPayments(updated);
  };

  const pendingPayments = payments.filter((p) => p.status === "pending");
  const approvedPayments = payments.filter((p) => p.status === "approved");

  return (
    <AdminLayout>
      {/* ... the rest of your component remains unchanged ... */}

      {lightbox.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-xl w-[90%] md:w-[600px]">
            <h3 className="text-lg font-semibold mb-4 text-purple-700">
              {lightbox.type} for {lightbox.member?.name ?? ""}
            </h3>
            {/* ... rest of modal rendering remains the same ... */}
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
