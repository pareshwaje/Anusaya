'use client';

import { ShieldCheck, Users, Car, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="w-16 bg-[#e1e6ff] flex flex-col items-center py-4 space-y-6">
      <Link href="/admin" title="Admin Dashboard">
        <ShieldCheck className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
      <Link href="/admin/vehicles" title="Vehicles">
        <Car className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
      <Link href="/admin/calculator" title="Calculator">
        <Calculator className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
    </aside>
  );
}
