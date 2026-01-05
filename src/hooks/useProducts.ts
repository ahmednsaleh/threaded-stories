import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Product {
  id: string;
  product_name: string;
  status: string | null;
}

export function useProducts() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['products', user?.id],
    queryFn: async (): Promise<Product[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('products')
        .select('id, product_name, status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
}
