import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { AdminDashboard } from '@/components/views/AdminDashboard';
import { AdminTickets } from '@/components/views/AdminTickets';
import { InventoryList } from '@/components/inventory/InventoryList';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { DeptHome } from '@/components/views/DeptHome';
import { DeptTickets } from '@/components/views/DeptTickets';

const VIEW_TITLES: Record<string, string> = {
  'admin-home': 'Resumen Gerencial',
  'admin-tickets': 'Centro de Soporte Técnico',
  'admin-inventory': 'Control de Bienes Tecnológicos',
  'admin-settings': 'Configuración del Sistema',
  'dept-home': 'Nueva Solicitud',
  'dept-tickets': 'Historial de Solicitudes'
};

export function Dashboard() {
  const { user } = useAuth();
  const defaultView = user?.role === 'admin' ? 'admin-home' : 'dept-home';
  const [activeView, setActiveView] = useState(defaultView);

  const renderContent = () => {
    switch (activeView) {
      case 'admin-home':
        return <AdminDashboard />;
      case 'admin-tickets':
        return <AdminTickets />;
      case 'admin-inventory':
        return <InventoryList />;
      case 'admin-settings':
        return <SettingsPanel />;
      case 'dept-home':
        return <DeptHome />;
      case 'dept-tickets':
        return <DeptTickets />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      
      <main className="flex-1 overflow-y-auto">
        <Header title={VIEW_TITLES[activeView] || 'Panel'} />
        
        <div className="p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
