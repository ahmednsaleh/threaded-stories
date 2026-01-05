import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ leadId, status }: { leadId: string; status: string }) => {
      const { error } = await supabase
        .from('leads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-metrics'] });
    },
    onError: (error) => {
      toast.error('Failed to update status', { description: error.message });
    },
  });
}

export function useUpdateLeadFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ leadId, feedback }: { leadId: string; feedback: 'good' | 'bad' }) => {
      const { error } = await supabase
        .from('leads')
        .update({ 
          user_feedback: feedback, 
          updated_at: new Date().toISOString(),
          // If bad lead, also mark as rejected
          ...(feedback === 'bad' ? { status: 'Rejected' } : {})
        })
        .eq('id', leadId);

      if (error) throw error;
    },
    onSuccess: (_, { feedback }) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-metrics'] });
      
      if (feedback === 'good') {
        toast.success('Marked as Good Lead', { description: 'The engine will prioritize similar patterns.' });
      } else {
        toast.info('Marked as Bad Lead', { description: 'Pattern pruned from future searches.' });
      }
    },
    onError: (error) => {
      toast.error('Failed to update feedback', { description: error.message });
    },
  });
}
