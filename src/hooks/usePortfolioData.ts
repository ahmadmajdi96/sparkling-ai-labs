import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  features: Feature[];
}

export interface PortfolioSystem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
  display_order: number;
  screenshots: string[];
  categories: Category[];
}

export const usePortfolioData = () => {
  const [systems, setSystems] = useState<PortfolioSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('portfolio-admin', {
          body: { action: 'get_portfolio' }
        });

        if (error) throw error;
        setSystems(data.systems || []);
      } catch (err: any) {
        console.error('Error fetching portfolio:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { systems, loading, error };
};
