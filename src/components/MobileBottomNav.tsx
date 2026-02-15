'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShieldCheck, User, Menu, Megaphone, AlertCircle, CalendarDays, UserPlus, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function MobileBottomNav({ role }: { role?: string }) {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);

    // Primary Links (Always Visible)
    const primaryLinks = [
        { href: role === 'ADMIN' ? '/admin' : '/dashboard', icon: Home, label: 'Home' },
        { href: role === 'ADMIN' ? '/admin/vehicles' : '/profile', icon: role === 'ADMIN' ? ShieldCheck : User, label: role === 'ADMIN' ? 'Vehicles' : 'Profile' },
        { href: '#', icon: showMenu ? X : Menu, label: 'Menu', action: () => setShowMenu(!showMenu) },
    ];

    // Menu Overlay Links (Hidden by default)
    const menuLinks = [
        { href: role === 'ADMIN' ? '/admin/notices' : '/dashboard/notices', icon: Megaphone, label: 'Notices', color: 'bg-orange-100 text-orange-600' },
        { href: role === 'ADMIN' ? '/admin/complaints' : '/dashboard/complaints', icon: AlertCircle, label: 'Complaints', color: 'bg-blue-100 text-blue-600' },
        { href: role === 'ADMIN' ? '/admin/bookings' : '/dashboard/bookings', icon: CalendarDays, label: 'Bookings', color: 'bg-purple-100 text-purple-600' },
        { href: role === 'ADMIN' ? '/admin/visitors' : '/dashboard/visitors', icon: UserPlus, label: 'Visitors', color: 'bg-green-100 text-green-600' },
        { href: role === 'ADMIN' ? '/admin/documents' : '/dashboard/documents', icon: FileText, label: 'Documents', color: 'bg-pink-100 text-pink-600' },
    ];

    if (!role) return null;

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center z-50 md:hidden pb-safe">
                {primaryLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = link.href !== '#' && pathname === link.href;

                    return (
                        <button
                            key={index}
                            onClick={link.action ? link.action : undefined}
                            className="flex flex-col items-center gap-1 min-w-[64px]"
                        >
                            {link.href !== '#' ? (
                                <Link href={link.href} className={cn("flex flex-col items-center gap-1", isActive ? "text-indigo-600" : "text-gray-400")}>
                                    <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
                                    <span className="text-[10px] font-medium">{link.label}</span>
                                </Link>
                            ) : (
                                <div className={cn("flex flex-col items-center gap-1 transition-colors", showMenu ? "text-indigo-600" : "text-gray-400")}>
                                    <Icon className="w-6 h-6" />
                                    <span className="text-[10px] font-medium">{link.label}</span>
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Expansive Mobile Menu Overlay */}
            {showMenu && (
                <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setShowMenu(false)}>

                    <div className="absolute bottom-[80px] left-4 right-4 bg-white rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Quick Access</h3>
                            <button onClick={() => setShowMenu(false)} className="p-1 bg-gray-100 rounded-full">
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {menuLinks.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setShowMenu(false)}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm", item.color)}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">{item.label}</span>
                                </Link>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <Link href="/login" className="flex items-center justify-center w-full py-3 text-red-600 font-bold bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
