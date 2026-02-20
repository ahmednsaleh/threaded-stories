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
      queryClient.invalidateQueries({ queryKey: ['total-new-leads-count'] });
    },
    onError: (error) => {
      toast.error('Failed to update status', { description: error.message });
    },
  });
}

export function useUpdateLeadFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ leadId, feedback, postUrl, productId }: { leadId: string; feedback: 'good' | 'bad'; postUrl?: string; productId?: string }) => {
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

      // For bad leads, also call the reject-lead edge function to train rejection patterns
      if (feedback === 'bad' && postUrl && productId) {
        try {
          await supabase.functions.invoke('reject-lead', {
            body: { post_url: postUrl, product_id: productId },
          });
        } catch (edgeFnErr) {
          // Don't fail the whole mutation if edge function fails
          console.error('reject-lead edge function error:', edgeFnErr);
        }
      }
    },
    onSuccess: (_, { feedback }) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead-metrics'] });
      queryClient.invalidateQueries({ queryKey: ['total-new-leads-count'] });

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
