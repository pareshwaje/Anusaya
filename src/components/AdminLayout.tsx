'use client';

import AdminSidebar from '@/components/AdminSidebar';
import Navbar from './Navbar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <Navbar user={{ name: 'Raj Kumar', role: 'ADMIN' }} />
        <main className="flex-1 p-4 bg-[#e7edff] overflow-auto">{children}</main>
      </div>
    </div>
  );
}
