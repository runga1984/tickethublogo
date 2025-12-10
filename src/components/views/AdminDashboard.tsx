import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TicketChart } from '@/components/dashboard/TicketChart';
import { TicketCard } from '@/components/tickets/TicketCard';
import { TicketDetailDialog } from '@/components/tickets/TicketDetailDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/types';
import { Clock } from 'lucide-react';

export function AdminDashboard() {
  const { tickets, getStats } = useData();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  const stats = getStats();
  const recentTickets = tickets.slice(0, 4);

  return (
    <div className="space-y-8 fade-in">
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TicketChart stats={stats} />

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-primary" />
              Tickets Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTickets.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No hay tickets registrados
              </p>
            ) : (
              recentTickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm line-clamp-1">{ticket.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ticket.status === 'Abierto' ? 'bg-amber-100 text-amber-700' :
                      ticket.status === 'En Progreso' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ticket.department_name}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <TicketDetailDialog
        ticket={selectedTicket}
        open={!!selectedTicket}
        onOpenChange={(open) => !open && setSelectedTicket(null)}
      />
    </div>
  );
}
