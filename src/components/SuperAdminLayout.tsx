'use client';

import SuperAdminSidebar from './SuperAdminSidebar';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SuperAdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-purple-700 text-white px-6 py-4 shadow">
          <h1 className="text-xl font-semibold">Anusaya Society — Super Admin Panel</h1>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-[#f5f7ff] flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
