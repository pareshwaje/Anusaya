'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, LogOut, User } from 'lucide-react';

interface NavbarProps {
  user?: {
    name: string;
    role: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (pathname === '/login') return null;

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="flex h-16 items-center justify-between rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-sm px-6 transition-all duration-300 hover:shadow-md hover:bg-white/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Anusaya Society
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden md:flex flex-col items-end mr-2">
              <h1 className="text-sm font-semibold capitalize text-foreground">
                {user.role} Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">Welcome back</p>
            </div>
          )}

          {/* Theme Toggle Removed */}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-white/20 transition-all border border-transparent hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-md ring-2 ring-white/50">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-semibold leading-none">{user.name}</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", showDropdown && "rotate-180")} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-white/20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        router.push('/profile');
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-sm rounded-xl hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-sm rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
