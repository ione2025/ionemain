'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { STORAGE_KEYS } from '../constants/storage';

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
  updateUser: (updates: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// NOTE: This is a demo implementation using localStorage for simplicity.
// In production, use a proper backend with secure authentication.

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
      const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      // Initialize default admin if no users exist
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!users) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([
          { ...DEFAULT_ADMIN, password: 'admin123' }
        ]));
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersRaw = localStorage.getItem(STORAGE_KEYS.USERS);
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const foundUser = users.find(
        (u: { email: string; password: string }) => 
          u.email === email && u.password === password
      );
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during login:', error);
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
      const usersRaw = localStorage.getItem(STORAGE_KEYS.USERS);
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
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userWithoutPassword));
      return true;
    } catch (error) {
      console.error('Error during signup:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
