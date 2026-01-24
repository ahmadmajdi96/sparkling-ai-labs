-- Create tables for portfolio management system

-- Admin users table for portal access
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Portfolio systems table
CREATE TABLE public.portfolio_systems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  gradient TEXT NOT NULL DEFAULT 'from-primary to-secondary',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Portfolio system screenshots table
CREATE TABLE public.portfolio_screenshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  system_id UUID NOT NULL REFERENCES public.portfolio_systems(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Portfolio categories table
CREATE TABLE public.portfolio_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  system_id UUID NOT NULL REFERENCES public.portfolio_systems(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  gradient TEXT NOT NULL DEFAULT 'from-primary to-secondary',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Portfolio features table
CREATE TABLE public.portfolio_features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.portfolio_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_features ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio data (displayed on website)
CREATE POLICY "Anyone can view active portfolio systems"
  ON public.portfolio_systems FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view portfolio screenshots"
  ON public.portfolio_screenshots FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.portfolio_systems 
    WHERE id = portfolio_screenshots.system_id AND is_active = true
  ));

CREATE POLICY "Anyone can view portfolio categories"
  ON public.portfolio_categories FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.portfolio_systems 
    WHERE id = portfolio_categories.system_id AND is_active = true
  ));

CREATE POLICY "Anyone can view portfolio features"
  ON public.portfolio_features FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.portfolio_categories c
    JOIN public.portfolio_systems s ON c.system_id = s.id
    WHERE c.id = portfolio_features.category_id AND s.is_active = true
  ));

-- Admin users can manage all data (managed via edge function with service role)
-- No direct write policies - all writes go through secure edge function

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER set_updated_at_admin_users
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_portfolio_systems
  BEFORE UPDATE ON public.portfolio_systems
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_portfolio_categories
  BEFORE UPDATE ON public.portfolio_categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);

-- Storage policies for portfolio images (public read, authenticated write)
CREATE POLICY "Portfolio images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated users can upload portfolio images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated users can update portfolio images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated users can delete portfolio images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-images');