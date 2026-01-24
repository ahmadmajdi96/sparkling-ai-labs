import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, LogOut, Plus, Settings, Layers, Image, 
  ChevronRight, Loader2, Trash2, Edit, Eye, EyeOff, Mail, MailOpen, MessageSquare
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

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

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  is_read: boolean;
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
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSystem, setEditingSystem] = useState<PortfolioSystem | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
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
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [systemsRes, messagesRes] = await Promise.all([
        supabase.functions.invoke('portfolio-admin', { body: { action: 'get_systems' } }),
        supabase.functions.invoke('portfolio-admin', { body: { action: 'get_messages' } })
      ]);

      if (systemsRes.error) throw systemsRes.error;
      if (messagesRes.error) throw messagesRes.error;
      
      setSystems(systemsRes.data.systems || []);
      setMessages(messagesRes.data.messages || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching data',
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
      fetchData();
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
      fetchData();
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
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Error updating system',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleMarkRead = async (message: ContactMessage) => {
    if (message.is_read) return;
    
    try {
      await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'mark_message_read', id: message.id }
      });
      setMessages(prev => prev.map(m => m.id === message.id ? { ...m, is_read: true } : m));
    } catch (error: any) {
      console.error('Error marking message read:', error);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const { error } = await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'delete_message', id }
      });
      if (error) throw error;
      toast({ title: 'Message deleted' });
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error: any) {
      toast({
        title: 'Error deleting message',
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

  const unreadCount = messages.filter(m => !m.is_read).length;

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{messages.length}</p>
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                  <p className="text-sm text-muted-foreground">Unread Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="systems" className="space-y-6">
          <TabsList className="bg-card border border-primary/10">
            <TabsTrigger value="systems" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Layers className="w-4 h-4 mr-2" />
              Portfolio Systems
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Messages
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Systems Tab */}
          <TabsContent value="systems">
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
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Messages List */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Contact form submissions from visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No messages yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            onClick={() => {
                              setSelectedMessage(message);
                              handleMarkRead(message);
                            }}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              selectedMessage?.id === message.id
                                ? 'border-primary bg-primary/5'
                                : message.is_read
                                ? 'border-primary/10 hover:border-primary/30 bg-card'
                                : 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                {message.is_read ? (
                                  <MailOpen className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <Mail className="w-4 h-4 text-amber-500" />
                                )}
                                <span className="font-medium">{message.name}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{message.email}</p>
                            <p className="text-sm mt-2 line-clamp-2">{message.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Message Detail */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle>Message Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedMessage ? (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">From</label>
                          <p className="text-lg font-semibold">{selectedMessage.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <p>
                            <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">
                              {selectedMessage.email}
                            </a>
                          </p>
                        </div>
                        {selectedMessage.company && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Company</label>
                            <p>{selectedMessage.company}</p>
                          </div>
                        )}
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Received</label>
                          <p>{new Date(selectedMessage.created_at).toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Message</label>
                          <div className="mt-2 p-4 rounded-lg bg-muted/50 whitespace-pre-wrap">
                            {selectedMessage.message}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <a href={`mailto:${selectedMessage.email}`}>
                            <Mail className="w-4 h-4 mr-2" />
                            Reply via Email
                          </a>
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteMessage(selectedMessage.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a message to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
