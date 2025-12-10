import { CalendarDays } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-card sticky top-0 z-10 px-8 py-4 shadow-sm border-b border-border flex justify-between items-center">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full flex items-center gap-2">
        <CalendarDays className="w-4 h-4" />
        <span className="capitalize">{today}</span>
      </div>
    </header>
  );
}
