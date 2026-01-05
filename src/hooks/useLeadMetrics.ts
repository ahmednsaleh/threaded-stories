import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface LeadMetrics {
  total: number;
  new: number;
  potential: number;
  topMatches: number;
}

export function useLeadMetrics(productId: string | null) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['lead-metrics', user?.id, productId],
    queryFn: async (): Promise<LeadMetrics> => {
      if (!user?.id || !productId) {
        return { total: 0, new: 0, potential: 0, topMatches: 0 };
      }

      // Fetch all counts in parallel
      const [totalResult, newResult, potentialResult, topMatchesResult] = await Promise.all([
        // Total leads
        supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('product_id', productId),
        
        // New leads (status = 'New')
        supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .eq('status', 'New'),
        
        // Potential leads (intent_score 5-7)
        supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .gte('intent_score', 5)
          .lte('intent_score', 7),
        
        // Top matches (intent_score >= 8)
        supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .gte('intent_score', 8),
      ]);

      return {
        total: totalResult.count ?? 0,
        new: newResult.count ?? 0,
        potential: potentialResult.count ?? 0,
        topMatches: topMatchesResult.count ?? 0,
      };
    },
    enabled: !!user?.id && !!productId,
  });
}
