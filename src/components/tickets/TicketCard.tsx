import { Ticket } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
  showDepartment?: boolean;
}

export function TicketCard({ ticket, onClick, showDepartment = true }: TicketCardProps) {
  const statusClasses = {
    'Abierto': 'status-badge-open',
    'En Progreso': 'status-badge-progress',
    'Resuelto': 'status-badge-resolved'
  };

  const priorityClasses = {
    'Baja': 'priority-badge-low',
    'Media': 'priority-badge-medium',
    'Alta': 'priority-badge-high',
    'Critica': 'priority-badge-critical'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card 
      className={cn(
        "glass-card hover:shadow-xl transition-all duration-200 cursor-pointer group",
        onClick && "hover:-translate-y-1"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {ticket.title}
          </CardTitle>
          <Badge className={cn("shrink-0", statusClasses[ticket.status])}>
            {ticket.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {ticket.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {ticket.category}
          </Badge>
          <Badge className={cn("text-xs", priorityClasses[ticket.priority])}>
            {ticket.priority}
          </Badge>
        </div>

        {showDepartment && ticket.department_name && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
            <Building2 className="w-3.5 h-3.5" />
            <span className="font-medium">{ticket.department_name}</span>
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(ticket.created_at)}</span>
          </div>
          {ticket.updated_at !== ticket.created_at && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Actualizado</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
