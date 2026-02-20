import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_url: string | null;
  status: string | null;
  persona: string | null;
  pain_points_solved: string;
  jobs_to_be_done: string | null;
  business_type: string;
  keywords: any | null;
  subreddits: string[] | null;
  last_run_at: string | null;
  created_at: string;
}

export function useProducts() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['products', user?.id],
    queryFn: async (): Promise<Product[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('products')
        .select('id, product_name, product_description, product_url, status, persona, pain_points_solved, jobs_to_be_done, business_type, keywords, subreddits, last_run_at, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
}
