'use client';

import MemberSidebar from '@/components/MemberSidebar';
import Navbar from './Navbar';
import { ReactNode } from 'react';

export default function MemberLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <MemberSidebar />
      <div className="flex flex-col flex-1">
        <Navbar user={{ name: 'Aarav Sharma', role: 'MEMBER' }} />
        <main className="flex-1 p-4 bg-[#e7edff] overflow-auto">{children}</main>
      </div>
    </div>
  );
}
