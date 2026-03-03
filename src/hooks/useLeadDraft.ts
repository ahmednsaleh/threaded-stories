import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface LeadDraft {
  id: string;
  draft_text: string;
  status: string;
}

export function useLeadDraft(leadId: string | null) {
  return useQuery({
    queryKey: ['lead_draft', leadId],
    queryFn: async (): Promise<LeadDraft | null> => {
      if (!leadId) return null;
      const { data, error } = await supabase
        .from('lead_drafts')
        .select('id, draft_text, status')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!leadId,
    staleTime: 30_000, // 30s — drafts don't change often
  });
}
