// components/SuperAdminSidebar.tsx
'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  UserPlus,
  UserMinus,
  Settings,
  Calculator,
  Users,
} from 'lucide-react';

export default function SuperAdminSidebar() {
  return (
    <aside className="w-16 bg-[#e1e6ff] flex flex-col items-center py-4 space-y-6">
      <Link href="/superadmin" title="Dashboard">
        <LayoutDashboard className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
      <Link href="/superadmin/add-admin" title="Add Admin">
        <UserPlus className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
      <Link href="/superadmin/remove-admin" title="Remove Admin">
        <UserMinus className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
      <Link href="/superadmin/add-member" title="Add Member">
        <Users className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
      <Link href="/superadmin/remove-member" title="Remove Member">
        <Users className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
      <Link href="/superadmin/maintenance" title="Set Maintenance">
        <Settings className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
      <Link href="/superadmin/calculator" title="Calculator">
        <Calculator className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
    </aside>
  );
}
