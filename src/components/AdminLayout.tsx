// components/AdminLayout.tsx
'use client';

import AdminSidebar from './AdminSidebar';
import Navbar from './Navbar';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <Navbar user={{ name: 'Raj Kumar', role: 'ADMIN' }} />
        <main className="flex-1 p-4 bg-[#f6f8fc] overflow-auto">{children}</main>
      </div>
    </div>
  );
}
