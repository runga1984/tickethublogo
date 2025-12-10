import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Ticket } from '@/types';
import { TicketCard } from '@/components/tickets/TicketCard';
import { TicketDetailDialog } from '@/components/tickets/TicketDetailDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function DeptTickets() {
  const { user } = useAuth();
  const { tickets } = useData();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tickets for current user
  const myTickets = tickets.filter(t => t.user_id === user?.id);
  
  const filteredTickets = myTickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openTickets = filteredTickets.filter(t => t.status === 'Abierto');
  const progressTickets = filteredTickets.filter(t => t.status === 'En Progreso');
  const resolvedTickets = filteredTickets.filter(t => t.status === 'Resuelto');

  const stats = [
    { label: 'Total', value: myTickets.length, icon: <FileText className="w-5 h-5" />, color: 'text-primary' },
    { label: 'Abiertos', value: openTickets.length, icon: <AlertCircle className="w-5 h-5" />, color: 'text-amber-600' },
    { label: 'En Progreso', value: progressTickets.length, icon: <Clock className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Resueltos', value: resolvedTickets.length, icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-emerald-600' },
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Mini Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="flex items-center gap-3 py-4">
              <div className={stat.color}>{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar en mis solicitudes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos ({filteredTickets.length})</TabsTrigger>
          <TabsTrigger value="pending">Pendientes ({openTickets.length + progressTickets.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resueltos ({resolvedTickets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <TicketGrid tickets={filteredTickets} onSelect={setSelectedTicket} />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <TicketGrid tickets={[...openTickets, ...progressTickets]} onSelect={setSelectedTicket} />
        </TabsContent>
        <TabsContent value="resolved" className="mt-6">
          <TicketGrid tickets={resolvedTickets} onSelect={setSelectedTicket} />
        </TabsContent>
      </Tabs>

      <TicketDetailDialog
        ticket={selectedTicket}
        open={!!selectedTicket}
        onOpenChange={(open) => !open && setSelectedTicket(null)}
      />
    </div>
  );
}

function TicketGrid({ tickets, onSelect }: { tickets: Ticket[]; onSelect: (t: Ticket) => void }) {
  if (tickets.length === 0) {
    return (
      <Card className="glass-card">
        <CardContent className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No tiene solicitudes registradas</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tickets.map((ticket) => (
        <TicketCard 
          key={ticket.id} 
          ticket={ticket} 
          onClick={() => onSelect(ticket)}
          showDepartment={false}
        />
      ))}
    </div>
  );
}
