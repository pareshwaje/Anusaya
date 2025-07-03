'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';

export default function MemberSidebar() {
  return (
    <aside className="w-16 bg-[#e1e6ff] flex flex-col items-center py-4 space-y-6">
      <Link href="/dashboard" title="Dashboard">
        <Home className="w-6 h-6 text-purple-700 hover:text-black cursor-pointer" />
      </Link>
    </aside>
  );
}
