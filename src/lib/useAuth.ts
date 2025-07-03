// Auth/session utilities
'use client';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);
  }, []);

  return role;
}
