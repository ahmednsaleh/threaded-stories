import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { cn } from '../lib/utils';
import {
  Zap,
  CreditCard,
  History,
  Download,
  FileText,
  Package,
  Lock,
  Loader2
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user, session } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<string>('starter');
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      const { data, error } = await supabase
        .from('users')
        .select('subscription_tier')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setSubscriptionTier(data.subscription_tier || 'starter');
      }
      setLoading(false);
    }
    fetchProfile();
  }, [user]);

  const isPro = subscriptionTier === 'pro';

  const handleUpgrade = async () => {
    if (!session?.access_token) {
      toast.error('Please sign in first');
      return;
    }
    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-checkout-session', {
        body: {},
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast.error('Failed to start checkout', { description: err.message });
      setCheckoutLoading(false);
    }
  };

  const handleManageBilling = async () => {
    if (!session?.access_token) {
      toast.error('Please sign in first');
      return;
    }
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-portal-session', {
        body: {},
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast.error('Failed to open billing portal', { description: err.message });
      setPortalLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-tight text-[#2C3E50]">Plans & Billing</h1>
          <p className="text-slate-500 text-lg font-medium">Manage your subscription and billing history.</p>
        </div>

        {/* Primary Action: Subscription & Upgrade */}
        <Card className="rounded-2xl border-[#E2E8F0] shadow-sm overflow-hidden bg-white border-t-4 border-t-[#C2410C]">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30 py-6 px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <CreditCard className="w-5 h-5 text-[#2C3E50]" />
                </div>
                <CardTitle className="text-lg font-bold text-[#2C3E50] uppercase tracking-wider">Current Subscription</CardTitle>
              </div>
              <div className="flex items-center px-4 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                {subscriptionTier.toUpperCase()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-mono ml-1">Product Capacity</p>
                  <div className="flex items-center gap-4">
                    <TooltipProvider>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-xl bg-white border border-slate-900 flex items-center justify-center">
                          <Package className="w-7 h-7 text-[#2C3E50]" />
                        </div>
                        <span className="text-[10px] font-bold text-[#2C3E50] uppercase tracking-widest font-mono">Active</span>
                      </div>
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 opacity-80">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className={cn(
                                "w-16 h-16 rounded-xl flex items-center justify-center cursor-help",
                                isPro ? "bg-white border border-slate-900" : "bg-slate-100"
                              )}>
                                {isPro ? (
                                  <Package className="w-6 h-6 text-[#2C3E50]" />
                                ) : (
                                  <Lock className="w-6 h-6 text-slate-400" />
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="font-bold">
                              {isPro ? "Available" : "Upgrade to unlock"}
                            </TooltipContent>
                          </Tooltip>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                            {isPro ? "Available" : "Locked"}
                          </span>
                        </div>
                      ))}
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block w-px h-40 bg-slate-100"></div>
              <div className="w-full lg:w-[320px] bg-gradient-to-br from-[#2C3E50] to-[#1E293B] rounded-2xl p-6 text-white relative shadow-xl">
                {isPro ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                      <span className="font-bold text-lg tracking-tight">Pro Plan Active</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">You have access to all features including multi-product tracking.</p>
                    <Button
                      onClick={handleManageBilling}
                      disabled={portalLoading}
                      className="w-full bg-white text-[#2C3E50] font-bold h-11 hover:bg-slate-100 transition-all"
                    >
                      {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Manage Billing"}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-[#C2410C] fill-[#C2410C]" />
                      <span className="font-bold text-lg tracking-tight">Unlock Multi-Product</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">Upgrade to manage up to 3 separate products and track competitors simultaneously.</p>
                    <Button
                      onClick={handleUpgrade}
                      disabled={checkoutLoading}
                      className="w-full bg-[#C2410C] text-white font-bold h-11 shadow-lg shadow-[#C2410C]/20 transition-all"
                    >
                      {checkoutLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upgrade - $49/mo"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History Card */}
        <Card className="rounded-2xl border-[#E2E8F0] shadow-sm overflow-hidden bg-white mb-20">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30 py-5 px-8">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-slate-400" />
              <CardTitle className="text-base font-bold text-[#2C3E50] uppercase tracking-wider">Billing History</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-40 bg-slate-50/50 flex flex-col items-center justify-center text-center p-8">
              <FileText className="w-6 h-6 text-slate-300 mb-4" />
              <h4 className="text-sm font-bold text-[#2C3E50]">
                {isPro ? "View invoices in the Stripe Customer Portal." : "No invoices yet."}
              </h4>
              {isPro && (
                <Button
                  variant="link"
                  onClick={handleManageBilling}
                  className="mt-2 text-[#C2410C]"
                >
                  Open Billing Portal
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
