import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Ticket, 
  Package, 
  BarChart3, 
  PaperclipIcon, 
  ClipboardList, 
  LogOut,
  Settings,
  Building2
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const { user, logout } = useAuth();
  const { settings } = useData();

  const adminNav: NavItem[] = [
    { id: 'admin-home', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'admin-tickets', label: 'Gestión de Tickets', icon: <Ticket className="w-5 h-5" /> },
    { id: 'admin-inventory', label: 'Inventario', icon: <Package className="w-5 h-5" /> },
    { id: 'admin-settings', label: 'Configuración', icon: <Settings className="w-5 h-5" /> },
  ];

  const deptNav: NavItem[] = [
    { id: 'dept-home', label: 'Crear Solicitud', icon: <PaperclipIcon className="w-5 h-5" /> },
    { id: 'dept-tickets', label: 'Mis Solicitudes', icon: <ClipboardList className="w-5 h-5" /> },
  ];

  const navItems = user?.role === 'admin' ? adminNav : deptNav;

  return (
    <aside className="w-72 glass-sidebar text-white flex flex-col shadow-2xl z-20 min-h-screen">
      {/* Logo & Brand */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        {settings.logoUrl ? (
          <img 
            src={settings.logoUrl} 
            alt="Logo" 
            className="w-10 h-10 rounded-lg object-contain bg-white/10 p-1"
          />
        ) : (
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-accent">
            <Building2 className="w-6 h-6" />
          </div>
        )}
        <div>
          <h1 className="font-bold text-lg tracking-wide">{settings.organizationName}</h1>
          <p className="text-xs text-sidebar-text-muted opacity-70">Sistema de Gestión</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 flex-1">
        <div className="text-xs font-semibold text-sidebar-text-muted uppercase tracking-wider mb-3 px-4 opacity-60">
          Menú Principal
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full text-left py-3 px-4 rounded-lg flex items-center gap-3 transition-all duration-200",
                "hover:bg-white/10 text-white/90 hover:text-white",
                activeView === item.id && "nav-item-active bg-white/15"
              )}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="bg-black/20 p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center shadow-lg">
            <span className="text-sm font-bold text-white">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-semibold truncate text-white">{user?.username}</p>
            <p className="text-xs truncate text-sidebar-text-muted opacity-70">
              {user?.department_name}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-200 py-2.5 rounded-lg text-sm transition border border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
