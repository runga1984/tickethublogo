import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Image, Building2, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsPanel() {
  const { settings, updateSettings } = useData();
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || '');
  const [orgName, setOrgName] = useState(settings.organizationName);
  const [systemName, setSystemName] = useState(settings.systemName);
  const [logoPreview, setLogoPreview] = useState(settings.logoUrl || '');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogoUrl(base64);
        setLogoPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setLogoUrl(url);
    setLogoPreview(url);
  };

  const handleSave = () => {
    updateSettings({
      logoUrl,
      organizationName: orgName,
      systemName
    });
    toast.success('Configuración guardada exitosamente');
  };

  const handleRemoveLogo = () => {
    setLogoUrl('');
    setLogoPreview('');
  };

  return (
    <div className="space-y-6 fade-in">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" />
            Logo de la Organización
          </CardTitle>
          <CardDescription>
            Suba un logo o proporcione una URL para personalizar la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo Preview */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted overflow-hidden">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="w-full h-full object-contain p-2"
                    onError={() => setLogoPreview('')}
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Upload Options */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo-file">Subir archivo</Label>
                <Input
                  id="logo-file"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Formatos aceptados: PNG, JPG, SVG. Máximo 2MB.
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">o</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-url">URL del logo</Label>
                <Input
                  id="logo-url"
                  type="url"
                  value={logoUrl.startsWith('data:') ? '' : logoUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://ejemplo.com/logo.png"
                />
              </div>

              {logoPreview && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRemoveLogo}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar logo
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Información de la Organización
          </CardTitle>
          <CardDescription>
            Configure el nombre de su organización y del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Nombre de la Organización</Label>
              <Input
                id="org-name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="CDCE Anzoátegui"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="system-name">Nombre del Sistema</Label>
              <Input
                id="system-name"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                placeholder="Sistema de Gestión Integral"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
}
