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
  { id: 1, username: 'admin', password: '123456', role: 'admin', department_name: 'Administración', created_at: new Date().toISOString() },
  { id: 2, username: 'atencion', password: '123456', role: 'departamento', department_name: 'Atención al ciudadano', created_at: new Date().toISOString() },
  { id: 3, username: 'segurosocial', password: '123456', role: 'departamento', department_name: 'Seguro social', created_at: new Date().toISOString() },
  { id: 4, username: 'supervision', password: '123456', role: 'departamento', department_name: 'Supervisión Educativa', created_at: new Date().toISOString() },
  { id: 5, username: 'consultoria', password: '123456', role: 'departamento', department_name: 'Consultoría Jurídica', created_at: new Date().toISOString() },
  { id: 6, username: 'bienes', password: '123456', role: 'departamento', department_name: 'Bienes Nacionales', created_at: new Date().toISOString() },
  { id: 7, username: 'planificacion', password: '123456', role: 'departamento', department_name: 'Planificación y Presupuesto', created_at: new Date().toISOString() },
  { id: 8, username: 'cnae', password: '123456', role: 'departamento', department_name: 'CNAE', created_at: new Date().toISOString() },
  { id: 9, username: 'crca', password: '123456', role: 'departamento', department_name: 'CRCA', created_at: new Date().toISOString() },
  { id: 10, username: 'comunidades', password: '123456', role: 'departamento', department_name: 'Comunidades Educativas', created_at: new Date().toISOString() },
  { id: 11, username: 'indigena', password: '123456', role: 'departamento', department_name: 'Indígena', created_at: new Date().toISOString() },
  { id: 12, username: 'formacion', password: '123456', role: 'departamento', department_name: 'Formación e Investigación Docente', created_at: new Date().toISOString() },
  { id: 13, username: 'despacho', password: '123456', role: 'departamento', department_name: 'Despacho', created_at: new Date().toISOString() },
  { id: 14, username: 'gobernacion', password: '123456', role: 'departamento', department_name: 'Gobernación', created_at: new Date().toISOString() },
  { id: 15, username: 'salasituacional', password: '123456', role: 'departamento', department_name: 'Sala Situacional', created_at: new Date().toISOString() },
  { id: 16, username: 'sige', password: '123456', role: 'departamento', department_name: 'Sige', created_at: new Date().toISOString() },
  { id: 17, username: 'gestionhumana', password: '123456', role: 'departamento', department_name: 'Gestión Humana', created_at: new Date().toISOString() },
  { id: 18, username: 'mediagral', password: '123456', role: 'departamento', department_name: 'Div. Media general y media técnica', created_at: new Date().toISOString() },
  { id: 19, username: 'primaria', password: '123456', role: 'departamento', department_name: 'Div. Primaria y Educación especial', created_at: new Date().toISOString() },
  { id: 20, username: 'informatica', password: '123456', role: 'departamento', department_name: 'Informática', created_at: new Date().toISOString() },
  { id: 21, username: 'prensa', password: '123456', role: 'departamento', department_name: 'Prensa', created_at: new Date().toISOString() },
  { id: 22, username: 'fundabit', password: '123456', role: 'departamento', department_name: 'Fundabit', created_at: new Date().toISOString() },
  { id: 23, username: 'unem', password: '123456', role: 'departamento', department_name: 'Unem', created_at: new Date().toISOString() },
  { id: 24, username: 'auditoria', password: '123456', role: 'departamento', department_name: 'Auditoría', created_at: new Date().toISOString() },
  { id: 25, username: 'barberia', password: '123456', role: 'departamento', department_name: 'Barbería & Peluquería', created_at: new Date().toISOString() },
  { id: 26, username: 'externos', password: '123456', role: 'departamento', department_name: 'Entes Externos', created_at: new Date().toISOString() },
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
