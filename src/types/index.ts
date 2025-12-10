export type UserRole = 'admin' | 'departamento';

export type TicketStatus = 'Abierto' | 'En Progreso' | 'Resuelto';
export type TicketPriority = 'Baja' | 'Media' | 'Alta' | 'Critica';
export type TicketCategory = 'Redes' | 'Software' | 'Hardware';
export type InventoryType = 'Hardware' | 'Software' | 'Periferico';
export type InventoryStatus = 'Activo' | 'Mantenimiento' | 'Desincorporado';

export interface User {
  id: number;
  username: string;
  role: UserRole;
  department_name: string;
  created_at: string;
}

export interface Ticket {
  id: number;
  user_id: number;
  title: string;
  description: string;
  priority: TicketPriority;
  category: TicketCategory;
  status: TicketStatus;
  admin_response?: string;
  department_name?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  type: InventoryType;
  serial_number: string;
  status: InventoryStatus;
  stock: number;
  description?: string;
  created_at: string;
}

export interface DashboardStats {
  abiertos: number;
  progreso: number;
  resueltos: number;
}

export interface AppSettings {
  logoUrl?: string;
  organizationName: string;
  systemName: string;
}
