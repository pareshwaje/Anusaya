// components/SuperAdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  UserPlus,
  UserMinus,
  Settings,
  Calculator,
  Users,
} from 'lucide-react';

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/superadmin', icon: LayoutDashboard, title: 'Dashboard' },
    { href: '/superadmin/add-admin', icon: UserPlus, title: 'Add Admin' },
    { href: '/superadmin/remove-admin', icon: UserMinus, title: 'Remove Admin' },
    { href: '/superadmin/add-member', icon: Users, title: 'Add Member' },
    { href: '/superadmin/remove-member', icon: Users, title: 'Remove Member' },
    { href: '/superadmin/maintenance', icon: Settings, title: 'Set Maintenance' },
    { href: '/superadmin/calculator', icon: Calculator, title: 'Calculator' },
  ];

  return (
    <aside className="hidden md:flex w-20 bg-background/80 backdrop-blur-md border-r border-border flex-col items-center py-6 space-y-4 supports-[backdrop-filter]:bg-background/60">
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
