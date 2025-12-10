import { DashboardStats } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Clock, CheckCircle2, Ticket } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const total = stats.abiertos + stats.progreso + stats.resueltos;

  const cards = [
    {
      label: 'Total Tickets',
      value: total,
      icon: <Ticket className="w-6 h-6" />,
      color: 'bg-primary/10 text-primary',
      iconBg: 'bg-primary/20'
    },
    {
      label: 'Abiertos',
      value: stats.abiertos,
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'bg-amber-500/10 text-amber-600',
      iconBg: 'bg-amber-500/20'
    },
    {
      label: 'En Progreso',
      value: stats.progreso,
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-blue-500/10 text-blue-600',
      iconBg: 'bg-blue-500/20'
    },
    {
      label: 'Resueltos',
      value: stats.resueltos,
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'bg-emerald-500/10 text-emerald-600',
      iconBg: 'bg-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="glass-card hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{card.label}</p>
                <p className="text-3xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${card.iconBg}`}>
                <div className={card.color}>{card.icon}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
