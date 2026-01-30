'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type UserRole = 'buyer' | 'seller' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_KEY = 'ionecenter_auth';
const USERS_KEY = 'ionecenter_users';

// Default admin account
const DEFAULT_ADMIN: User = {
  id: 'admin-1',
  name: 'Admin',
  email: 'admin@ionecenter.com',
  role: 'admin',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      // Initialize default admin if no users exist
      const users = localStorage.getItem(USERS_KEY);
      if (!users) {
        localStorage.setItem(USERS_KEY, JSON.stringify([
          { ...DEFAULT_ADMIN, password: 'admin123' }
        ]));
      }
    } catch {
      // Ignore errors
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersRaw = localStorage.getItem(USERS_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const foundUser = users.find(
        (u: { email: string; password: string }) => 
          u.email === email && u.password === password
      );
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    try {
      const usersRaw = localStorage.getItem(USERS_KEY);
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      
      // Check if email already exists
      if (users.some((u: { email: string }) => u.email === email)) {
        return false;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        role,
      };
      
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
