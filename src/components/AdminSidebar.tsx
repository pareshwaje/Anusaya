'use client';

import { ShieldCheck, Car, Calculator, Megaphone, AlertCircle, CalendarDays, UserPlus, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', icon: ShieldCheck, title: 'Dashboard' },
    { href: '/admin/vehicles', icon: Car, title: 'Vehicles' },
    { href: '/admin/calculator', icon: Calculator, title: 'Calculator' },
    { href: '/admin/notices', icon: Megaphone, title: 'Notices' },
    { href: '/admin/complaints', icon: AlertCircle, title: 'Complaints' },
    { href: '/admin/bookings', icon: CalendarDays, title: 'Bookings' },
    { href: '/admin/visitors', icon: UserPlus, title: 'Visitors' },
    { href: '/admin/documents', icon: FileText, title: 'Documents' },
  ];

  return (
    <aside className="hidden md:flex w-20 bg-background/80 backdrop-blur-md border-r border-border flex-col items-center py-6 space-y-4 supports-[backdrop-filter]:bg-background/60">
      <div className="mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
      </div>

      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            title={link.title}
            className={cn(
              "p-3 rounded-xl transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground"
            )}
          >
            <Icon className="w-6 h-6" />
          </Link>
        );
      })}
    </aside>
  );
}
