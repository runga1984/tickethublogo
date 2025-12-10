import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Ticket, TicketStatus } from '@/types';
import { TicketCard } from '@/components/tickets/TicketCard';
import { TicketDetailDialog } from '@/components/tickets/TicketDetailDialog';
import { CreateTicketForm } from '@/components/tickets/CreateTicketForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function AdminTickets() {
  const { tickets } = useData();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.department_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const openTickets = filteredTickets.filter(t => t.status === 'Abierto');
  const progressTickets = filteredTickets.filter(t => t.status === 'En Progreso');
  const resolvedTickets = filteredTickets.filter(t => t.status === 'Resuelto');

  return (
    <div className="space-y-6 fade-in">
      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as TicketStatus | 'all')}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Abierto">Abiertos</SelectItem>
              <SelectItem value="En Progreso">En Progreso</SelectItem>
              <SelectItem value="Resuelto">Resueltos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crear Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <CreateTicketForm 
              isAdmin={true} 
              onSuccess={() => setIsCreateDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs View */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">
            Todos ({filteredTickets.length})
          </TabsTrigger>
          <TabsTrigger value="open">
            Abiertos ({openTickets.length})
          </TabsTrigger>
          <TabsTrigger value="progress">
            Progreso ({progressTickets.length})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resueltos ({resolvedTickets.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <TicketGrid tickets={filteredTickets} onSelect={setSelectedTicket} />
        </TabsContent>
        <TabsContent value="open" className="mt-6">
          <TicketGrid tickets={openTickets} onSelect={setSelectedTicket} />
        </TabsContent>
        <TabsContent value="progress" className="mt-6">
          <TicketGrid tickets={progressTickets} onSelect={setSelectedTicket} />
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
      <div className="text-center py-12 text-muted-foreground">
        No se encontraron tickets
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tickets.map((ticket) => (
        <TicketCard 
          key={ticket.id} 
          ticket={ticket} 
          onClick={() => onSelect(ticket)}
          showDepartment={true}
        />
      ))}
    </div>
  );
}
