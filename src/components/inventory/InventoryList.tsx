import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { InventoryItem, InventoryType, InventoryStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Plus, Monitor, Cpu, Wifi } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function InventoryList() {
  const { inventory, addInventoryItem } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'Hardware' as InventoryType,
    serial_number: '',
    status: 'Activo' as InventoryStatus,
    stock: 1,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim() || !newItem.serial_number.trim()) {
      toast.error('Complete los campos requeridos');
      return;
    }

    addInventoryItem(newItem);
    toast.success('Activo registrado exitosamente');
    setIsDialogOpen(false);
    setNewItem({
      name: '',
      type: 'Hardware',
      serial_number: '',
      status: 'Activo',
      stock: 1,
      description: ''
    });
  };

  const getTypeIcon = (type: InventoryType) => {
    switch (type) {
      case 'Hardware': return <Cpu className="w-4 h-4" />;
      case 'Software': return <Monitor className="w-4 h-4" />;
      case 'Periferico': return <Wifi className="w-4 h-4" />;
    }
  };

  const statusColors = {
    'Activo': 'bg-emerald-100 text-emerald-800',
    'Mantenimiento': 'bg-amber-100 text-amber-800',
    'Desincorporado': 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Bienes Tecnológicos</h3>
          <p className="text-sm text-muted-foreground">{inventory.length} activos registrados</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Activo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Registrar Nuevo Activo
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Nombre del activo *</Label>
                <Input
                  id="item-name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Ej. Laptop Dell Latitude"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select 
                    value={newItem.type} 
                    onValueChange={(v) => setNewItem({ ...newItem, type: v as InventoryType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Periferico">Periférico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select 
                    value={newItem.status} 
                    onValueChange={(v) => setNewItem({ ...newItem, status: v as InventoryStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="Desincorporado">Desincorporado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serial">Serial *</Label>
                  <Input
                    id="serial"
                    value={newItem.serial_number}
                    onChange={(e) => setNewItem({ ...newItem, serial_number: e.target.value })}
                    placeholder="Ej. SN-12345"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Cantidad</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="1"
                    value={newItem.stock}
                    onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Descripción opcional..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Serial</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.serial_number}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "font-semibold",
                      item.stock < 5 && "text-amber-600",
                      item.stock < 2 && "text-red-600"
                    )}>
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[item.status]}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
