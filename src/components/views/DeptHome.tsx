import { CreateTicketForm } from '@/components/tickets/CreateTicketForm';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, HelpCircle, Clock, CheckCircle } from 'lucide-react';

export function DeptHome() {
  const { user } = useAuth();

  const tips = [
    { icon: <HelpCircle className="w-5 h-5" />, text: 'Describa el problema con el mayor detalle posible' },
    { icon: <Clock className="w-5 h-5" />, text: 'Los tickets críticos se atienden en menos de 24 horas' },
    { icon: <CheckCircle className="w-5 h-5" />, text: 'Recibirá notificación cuando su ticket sea resuelto' },
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Department Info */}
      <Card className="glass-card bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Departamento activo</p>
            <h3 className="text-xl font-bold text-foreground">{user?.department_name}</h3>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Ticket Form */}
        <div className="lg:col-span-2">
          <CreateTicketForm />
        </div>

        {/* Tips Sidebar */}
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Consejos útiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="text-primary shrink-0 mt-0.5">{tip.icon}</div>
                  <p className="text-muted-foreground">{tip.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card bg-amber-500/5 border-amber-200">
            <CardContent className="py-4">
              <p className="text-sm font-medium text-amber-800">
                ¿Problema urgente?
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Para emergencias críticas que afecten a todo el departamento, 
                seleccione prioridad "Crítica".
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
