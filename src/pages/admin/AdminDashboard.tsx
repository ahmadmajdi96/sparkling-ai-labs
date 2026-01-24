import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, LogOut, Plus, Settings, Layers, Image, 
  ChevronRight, Loader2, Trash2, Edit, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PortfolioSystem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const ICON_OPTIONS = [
  'BarChart3', 'Factory', 'Truck', 'Wrench', 'Briefcase', 'Crown', 'MessageSquare',
  'Bot', 'Users', 'Settings', 'Target', 'Shield', 'Database', 'LineChart'
];

const GRADIENT_OPTIONS = [
  { value: 'from-primary to-secondary', label: 'Primary → Secondary' },
  { value: 'from-orange-500 to-red-500', label: 'Orange → Red' },
  { value: 'from-emerald-500 to-teal-500', label: 'Emerald → Teal' },
  { value: 'from-amber-500 to-yellow-500', label: 'Amber → Yellow' },
  { value: 'from-violet-500 to-purple-500', label: 'Violet → Purple' },
  { value: 'from-indigo-500 to-blue-500', label: 'Indigo → Blue' },
  { value: 'from-pink-500 to-rose-500', label: 'Pink → Rose' },
];

const AdminDashboard = () => {
  const [systems, setSystems] = useState<PortfolioSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSystem, setEditingSystem] = useState<PortfolioSystem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    icon: 'BarChart3',
    gradient: 'from-primary to-secondary',
    display_order: 0,
    is_active: true
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchSystems();
  }, [navigate]);

  const fetchSystems = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'get_systems' }
      });

      if (error) throw error;
      setSystems(data.systems || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching systems',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSystem) {
        const { error } = await supabase.functions.invoke('portfolio-admin', {
          body: { action: 'update_system', id: editingSystem.id, updates: formData }
        });
        if (error) throw error;
        toast({ title: 'System updated successfully' });
      } else {
        const { error } = await supabase.functions.invoke('portfolio-admin', {
          body: { action: 'create_system', system: formData }
        });
        if (error) throw error;
        toast({ title: 'System created successfully' });
      }
      
      setIsAddDialogOpen(false);
      setEditingSystem(null);
      resetForm();
      fetchSystems();
    } catch (error: any) {
      toast({
        title: 'Error saving system',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this system? This will also delete all categories, features, and screenshots.')) {
      return;
    }
    
    try {
      const { error } = await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'delete_system', id }
      });
      if (error) throw error;
      toast({ title: 'System deleted successfully' });
      fetchSystems();
    } catch (error: any) {
      toast({
        title: 'Error deleting system',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (system: PortfolioSystem) => {
    setEditingSystem(system);
    setFormData({
      name: system.name,
      tagline: system.tagline,
      description: system.description,
      icon: system.icon,
      gradient: system.gradient,
      display_order: system.display_order,
      is_active: system.is_active
    });
    setIsAddDialogOpen(true);
  };

  const handleToggleActive = async (system: PortfolioSystem) => {
    try {
      const { error } = await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'update_system', id: system.id, updates: { is_active: !system.is_active } }
      });
      if (error) throw error;
      toast({ title: `System ${system.is_active ? 'hidden' : 'visible'} on portfolio` });
      fetchSystems();
    } catch (error: any) {
      toast({
        title: 'Error updating system',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      tagline: '',
      description: '',
      icon: 'BarChart3',
      gradient: 'from-primary to-secondary',
      display_order: systems.length,
      is_active: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Portfolio Admin</h1>
              <p className="text-xs text-muted-foreground">Manage your portfolio content</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systems.length}</p>
                  <p className="text-sm text-muted-foreground">Total Systems</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systems.filter(s => s.is_active).length}</p>
                  <p className="text-sm text-muted-foreground">Active Systems</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Image className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">-</p>
                  <p className="text-sm text-muted-foreground">Total Screenshots</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Systems List */}
        <Card className="border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Portfolio Systems</CardTitle>
              <CardDescription>Manage your product systems and their content</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) {
                setEditingSystem(null);
                resetForm();
              }
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add System
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingSystem ? 'Edit System' : 'Add New System'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">System Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="CORTANEX BI"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Business Intelligence Platform"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Comprehensive business intelligence platform..."
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ICON_OPTIONS.map(icon => (
                            <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Gradient</Label>
                      <Select value={formData.gradient} onValueChange={(v) => setFormData({ ...formData, gradient: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADIENT_OPTIONS.map(g => (
                            <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      min={0}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSystem ? 'Update' : 'Create'} System
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systems.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No systems yet. Add your first portfolio system.</p>
                </div>
              ) : (
                systems.map((system) => (
                  <div
                    key={system.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-card border border-primary/10 hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${system.gradient} flex items-center justify-center`}>
                        <Settings className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{system.name}</h3>
                          <Badge variant={system.is_active ? 'default' : 'secondary'}>
                            {system.is_active ? 'Active' : 'Hidden'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{system.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleActive(system)}
                        title={system.is_active ? 'Hide from portfolio' : 'Show on portfolio'}
                      >
                        {system.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(system)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(system.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/admin/system/${system.id}`)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
