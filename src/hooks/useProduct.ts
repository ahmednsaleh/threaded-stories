import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface ProductDetail {
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

export interface SubredditStatus {
  id: string;
  subreddit: string;
  status: string | null;
  total_leads_found: number | null;
  avg_intent_score: number | null;
  origin: string | null;
}

export interface KeywordPerformance {
  id: string;
  keyword: string;
  status: string;
  leads_found: number;
  impressions: number;
  conversion_rate: number;
}

export function useProduct(productId: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['product', productId],
    queryFn: async (): Promise<ProductDetail | null> => {
      if (!productId || !user?.id) return null;

      const { data, error } = await supabase
        .from('products')
        .select('id, product_name, product_description, product_url, status, persona, pain_points_solved, jobs_to_be_done, business_type, keywords, subreddits, last_run_at, created_at')
        .eq('id', productId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!productId && !!user?.id,
  });
}

export function useProductSubreddits(productId: string | undefined) {
  return useQuery({
    queryKey: ['product-subreddits', productId],
    queryFn: async (): Promise<SubredditStatus[]> => {
      if (!productId) return [];

      const { data, error } = await supabase
        .from('product_subreddit_status')
        .select('id, subreddit, status, total_leads_found, avg_intent_score, origin')
        .eq('product_id', productId)
        .order('total_leads_found', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!productId,
  });
}

export function useProductKeywords(productId: string | undefined) {
  return useQuery({
    queryKey: ['product-keywords', productId],
    queryFn: async (): Promise<KeywordPerformance[]> => {
      if (!productId) return [];

      const { data, error } = await supabase
        .from('keyword_performance')
        .select('id, keyword, status, leads_found, impressions, conversion_rate')
        .eq('product_id', productId)
        .order('leads_found', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!productId,
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, updates }: { productId: string; updates: Record<string, any> }) => {
      const { error } = await supabase
        .from('products')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', productId);

      if (error) throw error;
    },
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update product', { description: error.message });
    },
  });
}

export function useToggleProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, newStatus }: { productId: string; newStatus: string }) => {
      const { error } = await supabase
        .from('products')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', productId);

      if (error) throw error;
    },
    onSuccess: (_, { newStatus }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
      toast.success(newStatus === 'active' ? 'Hunting Resumed' : 'Hunting Paused');
    },
    onError: (error) => {
      toast.error('Failed to update status', { description: error.message });
    },
  });
}
