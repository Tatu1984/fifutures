'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AdminUser {
  username: string;
  displayName: string;
  email: string;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user
const ADMIN_USER: AdminUser = {
  username: 'admin',
  displayName: 'Admin User',
  email: 'admin@fifutures.com',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for auth cookie
    const authToken = Cookies.get('admin-auth-token');

    if (authToken === 'admin-session') {
      setUser(ADMIN_USER);
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove('admin-auth-token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
