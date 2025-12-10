import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users data
const DEMO_USERS: (User & { password: string })[] = [
  { id: 1, username: 'admin', password: '123456', role: 'admin', department_name: 'Dirección de Tecnología', created_at: new Date().toISOString() },
  { id: 2, username: 'atencion', password: '123456', role: 'departamento', department_name: 'Atención al ciudadano', created_at: new Date().toISOString() },
  { id: 3, username: 'segurosocial', password: '123456', role: 'departamento', department_name: 'Seguro Social', created_at: new Date().toISOString() },
  { id: 4, username: 'supervision', password: '123456', role: 'departamento', department_name: 'Supervisión Educativa', created_at: new Date().toISOString() },
  { id: 5, username: 'consultoria', password: '123456', role: 'departamento', department_name: 'Consultoría Jurídica', created_at: new Date().toISOString() },
  { id: 6, username: 'bienes', password: '123456', role: 'departamento', department_name: 'Bienes Nacionales', created_at: new Date().toISOString() },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('cdce_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = DEMO_USERS.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('cdce_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cdce_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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

export { DEMO_USERS };
