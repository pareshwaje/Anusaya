'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

type User = {
  name: string;
  role: 'ADMIN' | 'MEMBER';
};

export default function Navbar({ user }: { user: User }) {
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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex items-center justify-between bg-purple-100 px-6 py-4 shadow-sm border-b">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
          <span className="text-sm text-gray-800 hidden sm:inline">{user.name}</span>
          <div className="w-8 h-8 rounded-full ring-2 ring-purple-800 text-purple-800 flex items-center justify-center">
            👤
          </div>
        </div>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded shadow-lg border z-50">
            <button
              onClick={() => {
                setShowDropdown(false);
                router.push('/profile');
              }}
              className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 cursor-pointer"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
