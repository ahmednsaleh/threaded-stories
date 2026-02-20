import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Lead {
  id: string;
  intent_score: number;
  source_subreddit: string;
  author: string;
  created_utc: string | null;
  post_title: string;
  post_content: string;
  post_url: string;
  relevance_summary: string | null;
  problem_statement_detail: string | null;
  urgency_signals_detail: string | null;
  competitors_mentioned: string | null;
  competitive_context_detail: string | null;
  buying_stage_detail: string | null;
  sentiment: string | null;
  status: string;
  user_feedback: string | null;
  is_solution_seeking: boolean | null;
  is_problem_focused: boolean | null;
  product_id: string | null;
}

export type TimeFilter = 'Last 24h' | 'Last Week' | 'Last Month' | 'All Time';
export type StatusFilter = 'Show All' | 'New' | 'Contacted' | 'Won' | 'Rejected';

interface UseLeadsParams {
  productId: string | null;
  statusFilter?: StatusFilter;
  timeFilter?: TimeFilter;
  searchQuery?: string;
}

function getTimeFilterDate(filter: TimeFilter): Date | null {
  const now = new Date();
  switch (filter) {
    case 'Last 24h':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case 'Last Week':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case 'Last Month':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case 'All Time':
    default:
      return null;
  }
}

export function useLeads({ productId, statusFilter = 'Show All', timeFilter = 'All Time', searchQuery = '' }: UseLeadsParams) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['leads', user?.id, productId, statusFilter, timeFilter, searchQuery],
    queryFn: async (): Promise<Lead[]> => {
      if (!user?.id || !productId) return [];

      let query = supabase
        .from('leads')
        .select('id, post_url, post_title, post_content, author, source_subreddit, intent_score, buying_stage_detail, urgency_signals_detail, relevance_summary, problem_statement_detail, competitors_mentioned, sentiment, status, user_feedback, created_utc, product_id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      // Apply status filter
      if (statusFilter !== 'Show All') {
        query = query.eq('status', statusFilter);
      }

      // Apply time filter
      const timeDate = getTimeFilterDate(timeFilter);
      if (timeDate) {
        query = query.gte('created_at', timeDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      // Apply search filter client-side (for title and content)
      let filteredData = data || [];
      if (searchQuery) {
        const lowerSearch = searchQuery.toLowerCase();
        filteredData = filteredData.filter(
          (lead) =>
            lead.post_title.toLowerCase().includes(lowerSearch) ||
            lead.post_content.toLowerCase().includes(lowerSearch)
        );
      }

      return filteredData;
    },
    enabled: !!user?.id && !!productId,
  });
}
