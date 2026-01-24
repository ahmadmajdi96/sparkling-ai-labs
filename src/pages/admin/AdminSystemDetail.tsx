import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Plus, Trash2, Edit, Image, Layers, ChevronDown, ChevronUp,
  Loader2, GripVertical, Save, X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Screenshot {
  id: string;
  image_url: string;
  display_order: number;
}

interface Feature {
  id: string;
  name: string;
  description: string;
  display_order: number;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  display_order: number;
  portfolio_features: Feature[];
}

interface System {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
}

const ICON_OPTIONS = [
  'LineChart', 'Bot', 'Target', 'Users', 'Calculator', 'Shield', 'Building2', 'UserCheck',
  'Factory', 'Cog', 'Monitor', 'Wrench', 'CalendarDays', 'Search', 'LayoutDashboard',
  'Truck', 'MapPin', 'Package', 'Smartphone', 'Star', 'Lock', 'Map', 'Route',
  'Gauge', 'Calendar', 'CheckSquare', 'ShieldCheck', 'BarChart2', 'Palette',
  'Briefcase', 'CreditCard', 'Headphones', 'Megaphone', 'Building', 'FolderKanban',
  'Crown', 'Network', 'GitBranch', 'FileCheck', 'Workflow', 'MessageSquare', 'BookOpen',
  'FileType', 'Link', 'UsersRound', 'BellRing', 'ShieldAlert', 'Receipt', 'HelpCircle'
];

const GRADIENT_OPTIONS = [
  { value: 'from-primary to-secondary', label: 'Primary → Secondary' },
  { value: 'from-orange-500 to-red-500', label: 'Orange → Red' },
  { value: 'from-emerald-500 to-teal-500', label: 'Emerald → Teal' },
  { value: 'from-amber-500 to-yellow-500', label: 'Amber → Yellow' },
  { value: 'from-violet-500 to-purple-500', label: 'Violet → Purple' },
  { value: 'from-indigo-500 to-blue-500', label: 'Indigo → Blue' },
  { value: 'from-pink-500 to-rose-500', label: 'Pink → Rose' },
  { value: 'from-blue-500 to-cyan-500', label: 'Blue → Cyan' },
  { value: 'from-green-500 to-emerald-500', label: 'Green → Emerald' },
  { value: 'from-rose-500 to-pink-500', label: 'Rose → Pink' },
  { value: 'from-cyan-500 to-sky-500', label: 'Cyan → Sky' },
  { value: 'from-gray-500 to-slate-600', label: 'Gray → Slate' },
  { value: 'from-red-500 to-rose-600', label: 'Red → Rose' },
  { value: 'from-yellow-500 to-orange-500', label: 'Yellow → Orange' },
  { value: 'from-teal-500 to-cyan-500', label: 'Teal → Cyan' },
  { value: 'from-purple-500 to-pink-500', label: 'Purple → Pink' },
  { value: 'from-fuchsia-500 to-purple-500', label: 'Fuchsia → Purple' },
];

const AdminSystemDetail = () => {
  const { systemId } = useParams<{ systemId: string }>();
  const [system, setSystem] = useState<System | null>(null);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [isScreenshotDialogOpen, setIsScreenshotDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  // Form states
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [categoryForm, setCategoryForm] = useState({
    title: '',
    icon: 'LineChart',
    gradient: 'from-primary to-secondary'
  });
  const [featureForm, setFeatureForm] = useState({
    name: '',
    description: ''
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
  }, [systemId, navigate]);

  const fetchData = async () => {
    try {
      // Fetch system details
      const { data: systemsData } = await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'get_systems' }
      });
      const currentSystem = systemsData?.systems?.find((s: System) => s.id === systemId);
      setSystem(currentSystem || null);

      // Fetch screenshots
      const { data: ssData } = await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'get_screenshots', system_id: systemId }
      });
      setScreenshots(ssData?.screenshots || []);

      // Fetch categories with features
      const { data: catData } = await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'get_categories', system_id: systemId }
      });
      setCategories(catData?.categories || []);
    } catch (error: any) {
      toast({
        title: 'Error loading data',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Screenshot handlers
  const handleAddScreenshot = async () => {
    if (!screenshotUrl.trim()) return;
    
    try {
      await supabase.functions.invoke('portfolio-admin', {
        body: {
          action: 'add_screenshot',
          screenshot: {
            system_id: systemId,
            image_url: screenshotUrl,
            display_order: screenshots.length
          }
        }
      });
      setScreenshotUrl('');
      setIsScreenshotDialogOpen(false);
      fetchData();
      toast({ title: 'Screenshot added' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDeleteScreenshot = async (id: string) => {
    try {
      await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'delete_screenshot', id }
      });
      fetchData();
      toast({ title: 'Screenshot deleted' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  // Category handlers
  const handleSaveCategory = async () => {
    try {
      if (editingCategory) {
        await supabase.functions.invoke('portfolio-admin', {
          body: { action: 'update_category', id: editingCategory.id, updates: categoryForm }
        });
        toast({ title: 'Category updated' });
      } else {
        await supabase.functions.invoke('portfolio-admin', {
          body: {
            action: 'create_category',
            category: {
              system_id: systemId,
              ...categoryForm,
              display_order: categories.length
            }
          }
        });
        toast({ title: 'Category created' });
      }
      setIsCategoryDialogOpen(false);
      setEditingCategory(null);
      setCategoryForm({ title: '', icon: 'LineChart', gradient: 'from-primary to-secondary' });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category and all its features?')) return;
    try {
      await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'delete_category', id }
      });
      fetchData();
      toast({ title: 'Category deleted' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryForm({ title: cat.title, icon: cat.icon, gradient: cat.gradient });
    setIsCategoryDialogOpen(true);
  };

  // Feature handlers
  const handleSaveFeature = async () => {
    try {
      if (editingFeature) {
        await supabase.functions.invoke('portfolio-admin', {
          body: { action: 'update_feature', id: editingFeature.id, updates: featureForm }
        });
        toast({ title: 'Feature updated' });
      } else {
        const category = categories.find(c => c.id === selectedCategoryId);
        await supabase.functions.invoke('portfolio-admin', {
          body: {
            action: 'create_feature',
            feature: {
              category_id: selectedCategoryId,
              ...featureForm,
              display_order: category?.portfolio_features?.length || 0
            }
          }
        });
        toast({ title: 'Feature created' });
      }
      setIsFeatureDialogOpen(false);
      setEditingFeature(null);
      setSelectedCategoryId(null);
      setFeatureForm({ name: '', description: '' });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDeleteFeature = async (id: string) => {
    try {
      await supabase.functions.invoke('portfolio-admin', {
        body: { action: 'delete_feature', id }
      });
      fetchData();
      toast({ title: 'Feature deleted' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleEditFeature = (feature: Feature, categoryId: string) => {
    setEditingFeature(feature);
    setSelectedCategoryId(categoryId);
    setFeatureForm({ name: feature.name, description: feature.description });
    setIsFeatureDialogOpen(true);
  };

  const openAddFeature = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setEditingFeature(null);
    setFeatureForm({ name: '', description: '' });
    setIsFeatureDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!system) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">System not found</p>
          <Button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${system.gradient} flex items-center justify-center`}>
            <Layers className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-lg">{system.name}</h1>
            <p className="text-xs text-muted-foreground">{system.tagline}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Screenshots Section */}
        <Card className="border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Screenshots
              </CardTitle>
              <CardDescription>Manage system screenshots displayed in the portfolio</CardDescription>
            </div>
            <Dialog open={isScreenshotDialogOpen} onOpenChange={setIsScreenshotDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Screenshot
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Screenshot</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={screenshotUrl}
                      onChange={(e) => setScreenshotUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  {screenshotUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img src={screenshotUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsScreenshotDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddScreenshot}>Add Screenshot</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {screenshots.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No screenshots yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {screenshots.map((ss) => (
                  <div key={ss.id} className="relative group rounded-lg overflow-hidden bg-muted aspect-video">
                    <img src={ss.image_url} alt="Screenshot" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteScreenshot(ss.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories & Features Section */}
        <Card className="border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Categories & Features
              </CardTitle>
              <CardDescription>Manage feature categories and their features</CardDescription>
            </div>
            <Dialog open={isCategoryDialogOpen} onOpenChange={(open) => {
              setIsCategoryDialogOpen(open);
              if (!open) {
                setEditingCategory(null);
                setCategoryForm({ title: '', icon: 'LineChart', gradient: 'from-primary to-secondary' });
              }
            }}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={categoryForm.title}
                      onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                      placeholder="1. Executive Intelligence"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Select value={categoryForm.icon} onValueChange={(v) => setCategoryForm({ ...categoryForm, icon: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {ICON_OPTIONS.map(icon => (
                            <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Gradient</Label>
                      <Select value={categoryForm.gradient} onValueChange={(v) => setCategoryForm({ ...categoryForm, gradient: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {GRADIENT_OPTIONS.map(g => (
                            <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveCategory}>
                      {editingCategory ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No categories yet</p>
              </div>
            ) : (
              <Accordion type="multiple" className="space-y-3">
                {categories.map((cat) => (
                  <AccordionItem
                    key={cat.id}
                    value={cat.id}
                    className="border border-primary/10 rounded-xl overflow-hidden bg-card/50"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                          <Layers className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-medium flex-1 text-left">{cat.title}</span>
                        <Badge variant="outline" className="mr-2">
                          {cat.portfolio_features?.length || 0} features
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="flex gap-2 mb-4">
                        <Button size="sm" variant="outline" onClick={() => handleEditCategory(cat)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openAddFeature(cat.id)}>
                          <Plus className="w-3 h-3 mr-1" />
                          Add Feature
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(cat.id)}>
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <div className="space-y-2 pl-12">
                        {cat.portfolio_features?.map((feat) => (
                          <div
                            key={feat.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-primary/5 group"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{feat.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{feat.description}</p>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                onClick={() => handleEditFeature(feat, cat.id)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 text-destructive"
                                onClick={() => handleDeleteFeature(feat.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {(!cat.portfolio_features || cat.portfolio_features.length === 0) && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No features yet. Add your first feature.
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        {/* Feature Dialog */}
        <Dialog open={isFeatureDialogOpen} onOpenChange={(open) => {
          setIsFeatureDialogOpen(open);
          if (!open) {
            setEditingFeature(null);
            setSelectedCategoryId(null);
            setFeatureForm({ name: '', description: '' });
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFeature ? 'Edit Feature' : 'Add Feature'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Feature Name</Label>
                <Input
                  value={featureForm.name}
                  onChange={(e) => setFeatureForm({ ...featureForm, name: e.target.value })}
                  placeholder="Executive Overview Dashboard"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={featureForm.description}
                  onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })}
                  placeholder="Real-time business health snapshot..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsFeatureDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveFeature}>
                  {editingFeature ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminSystemDetail;
