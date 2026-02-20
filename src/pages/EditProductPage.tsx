
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Activity,
  Pause,
  Globe,
  Plus,
  Save,
  Target,
  Search,
  Flame,
  Zap,
  Trash2,
  BrainCircuit,
  Briefcase,
  AlertTriangle,
  Link as LinkIcon,
  BarChart3,
  ArrowUpRight,
  X,
  Filter,
  Lightbulb,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import {
  useProduct,
  useProductSubreddits,
  useProductKeywords,
  useUpdateProduct,
  useToggleProductStatus,
} from '../hooks/useProduct';
import { useLeadMetrics } from '../hooks/useLeadMetrics';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';

// --- Types ---
type KeywordTier = 'core' | 'pain_point' | 'use_case' | 'competitor';

// --- Sub-Components ---

const TierBadge = ({ tier }: { tier: string }) => {
  const styles: Record<string, string> = {
    core: "bg-blue-50 text-blue-700 border-blue-100",
    pain_point: "bg-red-50 text-red-700 border-red-100",
    use_case: "bg-emerald-50 text-emerald-700 border-emerald-100",
    competitor: "bg-slate-100 text-slate-700 border-slate-200",
    active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    learning: "bg-amber-50 text-amber-700 border-amber-100",
    low_signal: "bg-slate-50 text-slate-500 border-slate-200",
  };

  const labels: Record<string, string> = {
    core: "Core Keyword",
    pain_point: "Pain Point",
    use_case: "Use Case",
    competitor: "Competitor",
    active: "Active",
    learning: "Learning",
    low_signal: "Low Signal",
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border font-mono whitespace-nowrap", styles[tier] || styles.core)}>
      {labels[tier] || tier.replace('_', ' ')}
    </span>
  );
};

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch data
  const { data: product, isLoading: isLoadingProduct } = useProduct(id);
  const { data: subreddits = [], isLoading: isLoadingSubreddits } = useProductSubreddits(id);
  const { data: keywords = [], isLoading: isLoadingKeywords } = useProductKeywords(id);
  const { data: metrics } = useLeadMetrics(id || null);
  const queryClient = useQueryClient();
  const updateProduct = useUpdateProduct();
  const toggleStatus = useToggleProductStatus();

  // Local form state
  const [name, setName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [persona, setPersona] = useState('');
  const [primaryJob, setPrimaryJob] = useState('');
  const [painsFrustrations, setPainsFrustrations] = useState('');
  const [valueProposition, setValueProposition] = useState('');
  const [status, setStatus] = useState<'active' | 'paused'>('active');

  // Input States
  const [newSubreddit, setNewSubreddit] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedTier, setSelectedTier] = useState<KeywordTier>('core');

  // Sync product data to form
  useEffect(() => {
    if (product) {
      setName(product.product_name || '');
      setWebsiteUrl(product.product_url || '');
      setPersona(product.persona || '');
      setPrimaryJob(product.jobs_to_be_done || '');
      setPainsFrustrations(product.pain_points_solved || '');
      setValueProposition(product.product_description || '');
      setStatus((product.status as 'active' | 'paused') || 'active');
    }
  }, [product]);

  // --- Handlers ---
  const handleToggleStatus = () => {
    if (!id) return;
    const newStatus = status === 'active' ? 'paused' : 'active';
    setStatus(newStatus);
    toggleStatus.mutate({ productId: id, newStatus });
  };

  const handleSaveConfig = () => {
    if (!id) return;
    updateProduct.mutate({
      productId: id,
      updates: {
        product_name: name,
        product_url: websiteUrl,
        persona,
        jobs_to_be_done: primaryJob,
        pain_points_solved: painsFrustrations,
        product_description: valueProposition,
      },
    });
  };

  const handleDiscoverSubreddits = async () => {
    if (!id) return;
    toast.info("Discovering adjacent subreddits...", { description: "This may take a moment." });
    try {
      const { data, error } = await supabase.functions.invoke('discover-new-subreddits', {
        body: { product_id: id },
      });
      if (error) throw error;
      toast.success("Discovery complete", {
        description: `Found ${data?.new_subreddits?.length || 0} new subreddits.`,
      });
    } catch (err: any) {
      toast.error("Discovery failed", { description: err.message || 'Unknown error' });
    }
  };

  const addSubreddit = async () => {
    let sub = newSubreddit.trim();
    if (!sub || !id) return;
    if (!sub.startsWith('r/')) sub = `r/${sub}`;

    const { error } = await supabase.from('product_subreddit_status').insert({
      product_id: id,
      subreddit: sub,
      status: 'active',
      origin: 'manual',
    });

    if (error) {
      toast.error('Failed to add subreddit', { description: error.message });
    } else {
      setNewSubreddit('');
      queryClient.invalidateQueries({ queryKey: ['product-subreddits', id] });
      toast.success(`Monitoring ${sub}`);
    }
  };

  const removeSubreddit = async (subId: string) => {
    const { error } = await supabase
      .from('product_subreddit_status')
      .delete()
      .eq('id', subId);

    if (error) {
      toast.error('Failed to remove subreddit', { description: error.message });
    } else {
      queryClient.invalidateQueries({ queryKey: ['product-subreddits', id] });
    }
  };

  const addKeyword = async () => {
    if (!newKeyword.trim() || !id) return;

    const { error } = await supabase.from('keyword_performance').insert({
      product_id: id,
      keyword: newKeyword.trim(),
      status: 'learning',
    });

    if (error) {
      toast.error('Failed to add keyword', { description: error.message });
    } else {
      setNewKeyword('');
      queryClient.invalidateQueries({ queryKey: ['product-keywords', id] });
      toast.success(`Tracking "${newKeyword.trim()}"`);
    }
  };

  const removeKeyword = async (kwId: string) => {
    const { error } = await supabase
      .from('keyword_performance')
      .delete()
      .eq('id', kwId);

    if (error) {
      toast.error('Failed to remove keyword', { description: error.message });
    } else {
      queryClient.invalidateQueries({ queryKey: ['product-keywords', id] });
    }
  };

  // Calculate stats
  const totalLeads = metrics?.total || 0;

  if (isLoadingProduct) {
    return (
      <main className="flex-1 flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400 mx-auto" />
          <p className="text-slate-400 mt-4 text-sm">Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex-1 flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <p className="text-slate-500 text-lg font-bold">Product not found</p>
          <Button onClick={() => navigate('/products')} variant="ghost" className="mt-4">
            Back to Products
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 md:p-10 overflow-y-auto bg-[#FAFAFA]">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* === HEADER AREA === */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-[#2C3E50] tracking-tight">{name}</h1>

              {/* STATUS TOGGLE */}
              <button
                onClick={handleToggleStatus}
                className={cn(
                  "group flex items-center gap-3 pl-3 pr-1.5 py-1 rounded-full border transition-all duration-300",
                  status === 'active'
                    ? "bg-white border-emerald-200 hover:border-emerald-300 shadow-sm"
                    : "bg-slate-50 border-slate-200"
                )}
              >
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  status === 'active' ? "text-emerald-700" : "text-slate-400"
                )}>
                  {status === 'active' ? "Live Hunting" : "Paused"}
                </span>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                  status === 'active' ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                )}>
                  {status === 'active'
                    ? <Activity className="w-3.5 h-3.5 animate-pulse" />
                    : <Pause className="w-3.5 h-3.5" />
                  }
                </div>
              </button>
            </div>
            <p className="text-slate-500 font-medium text-lg mt-1">
              Configure your autonomous agents and monitor performance.
            </p>
          </div>
        </div>

        {/* === MAIN LAYOUT (STRETCH) === */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* --- LEFT COLUMN: CONFIGURATION --- */}
          <div className="flex-1 flex flex-col gap-8 min-w-0">

            {/* 1. Product DNA */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
               <div className="flex items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-[#2C3E50]" />
                    <h2 className="text-xl font-bold text-[#2C3E50]">Product DNA</h2>
                  </div>
                  <Button
                    onClick={handleSaveConfig}
                    disabled={updateProduct.isPending}
                    className="bg-[#C2410C] hover:bg-[#A3360A] text-white font-bold h-9 px-4 rounded-full shadow-sm"
                  >
                    {updateProduct.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save
                  </Button>
               </div>

               <div className="space-y-6">
                 {/* Name & URL Group */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none font-medium transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                        <LinkIcon className="w-3 h-3" /> Website URL
                      </label>
                      <input
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none font-medium transition-all"
                      />
                    </div>
                 </div>

                 {/* Persona */}
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                     <Target className="w-3 h-3" /> Target Persona
                   </label>
                   <textarea
                     value={persona}
                     onChange={(e) => setPersona(e.target.value)}
                     className="w-full p-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none leading-relaxed min-h-[80px] resize-none font-medium transition-all text-sm"
                   />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Job */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                        <Briefcase className="w-3 h-3" /> Primary Job
                      </label>
                      <textarea
                        value={primaryJob}
                        onChange={(e) => setPrimaryJob(e.target.value)}
                        placeholder="What is the main job your customer is hiring your product to do?"
                        className="w-full p-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none leading-relaxed min-h-[100px] resize-none font-medium transition-all text-sm"
                      />
                    </div>

                    {/* Pains */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Pains or Frustrations
                      </label>
                      <textarea
                        value={painsFrustrations}
                        onChange={(e) => setPainsFrustrations(e.target.value)}
                        placeholder="What triggers them to look for a solution?"
                        className="w-full p-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none leading-relaxed min-h-[100px] resize-none font-medium transition-all text-sm"
                      />
                    </div>
                 </div>

                 {/* Value Proposition */}
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                     <Lightbulb className="w-3 h-3" /> Value Proposition
                   </label>
                   <p className="text-xs text-slate-500 mb-1">
                     What is your product, and how does it help solve these customer problems or alleviate their frustrations?
                   </p>
                   <textarea
                     value={valueProposition}
                     onChange={(e) => setValueProposition(e.target.value)}
                     className="w-full p-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none leading-relaxed min-h-[100px] resize-none font-medium transition-all text-sm"
                   />
                 </div>
              </div>
            </div>

            {/* 2. Subreddits */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
               <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-4">

                 {/* Left Side: Title + Discovery */}
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[#2C3E50]" />
                        <h2 className="text-xl font-bold text-[#2C3E50]">Subreddits</h2>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDiscoverSubreddits}
                      className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-8 gap-2 text-xs font-bold uppercase tracking-wide border border-transparent hover:border-slate-200"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Find Adjacent
                    </Button>
                 </div>

                 {/* Right Side: Manual Input */}
                 <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                      <input
                        type="text"
                        value={newSubreddit}
                        onChange={(e) => setNewSubreddit(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSubreddit()}
                        placeholder="r/..."
                        className="h-10 w-full md:w-56 pl-4 pr-2 rounded-full border border-slate-200 text-sm focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none transition-all bg-white text-slate-900 font-medium"
                      />
                    </div>
                    <button
                      onClick={addSubreddit}
                      className="bg-[#C2410C] hover:bg-[#A3360A] text-white font-bold px-6 py-2 rounded-full transition-colors text-sm h-10 shadow-sm whitespace-nowrap"
                    >
                      Add
                    </button>
                 </div>
               </div>

               {isLoadingSubreddits ? (
                 <div className="flex items-center justify-center py-8 text-slate-400">
                   <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading subreddits...
                 </div>
               ) : subreddits.length === 0 ? (
                 <div className="text-center py-8 text-slate-400 text-sm">
                   No subreddits configured. Add one or use "Find Adjacent" to discover relevant communities.
                 </div>
               ) : (
                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {subreddits.map((sub) => {
                      const score = sub.avg_intent_score || 0;
                      const signalColor = score >= 8 ? 'bg-emerald-500' : score >= 5 ? 'bg-amber-500' : 'bg-slate-300';
                      return (
                        <div key={sub.id} className="group relative flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3 hover:border-[#C2410C]/30 hover:shadow-sm transition-all cursor-default select-none">
                           <div className="flex flex-col gap-0.5 min-w-0">
                             <span className="text-sm font-bold text-slate-900 truncate">{sub.subreddit}</span>
                             <div className="flex items-center gap-1.5">
                               <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", signalColor)} />
                               <span className="text-xs font-mono text-slate-500">{sub.total_leads_found || 0} Leads</span>
                             </div>
                           </div>
                           <button
                              onClick={() => removeSubreddit(sub.id)}
                              className="text-slate-300 hover:text-red-500 transition-all p-1 opacity-0 group-hover:opacity-100"
                           >
                             <X className="w-3.5 h-3.5" />
                           </button>
                        </div>
                      );
                    })}
                 </div>
               )}
            </div>

            {/* 3. Keywords */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm flex-1 flex flex-col">
              {/* Header with Add Keyword Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 mb-4 shrink-0 gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#2C3E50]" />
                    <h2 className="text-xl font-bold text-[#2C3E50]">Keywords</h2>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                         <input
                           type="text"
                           value={newKeyword}
                           onChange={(e) => setNewKeyword(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                           placeholder="Add keyword..."
                           className="h-10 w-full md:w-48 pl-4 pr-2 rounded-full border border-slate-200 text-sm focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none transition-all bg-white text-slate-900 font-medium"
                         />
                    </div>

                    <button
                      onClick={addKeyword}
                      className="bg-[#C2410C] hover:bg-[#A3360A] text-white font-bold px-6 py-2 rounded-full transition-colors text-sm h-10 shadow-sm whitespace-nowrap"
                    >
                      Add
                    </button>
                </div>
              </div>

              {/* Keyword Table */}
              {isLoadingKeywords ? (
                <div className="flex items-center justify-center py-8 text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading keywords...
                </div>
              ) : keywords.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  No keywords configured yet. Add keywords to track.
                </div>
              ) : (
                <div className="w-full text-left border border-slate-100 rounded-xl overflow-hidden flex-1">
                   <div className="grid grid-cols-12 px-6 py-3 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-100">
                      <div className="col-span-4 md:col-span-5">Keyword</div>
                      <div className="col-span-4 md:col-span-3">Status</div>
                      <div className="col-span-3 hidden md:block">Performance</div>
                      <div className="col-span-4 md:col-span-1 text-right">Action</div>
                   </div>

                   <div className="divide-y divide-slate-100">
                     {keywords.map((kw) => (
                       <div key={kw.id} className="grid grid-cols-12 px-6 py-3 items-center hover:bg-slate-50 transition-colors group">
                          <div className="col-span-4 md:col-span-5 font-bold text-slate-700 text-sm">{kw.keyword}</div>
                          <div className="col-span-4 md:col-span-3"><TierBadge tier={kw.status} /></div>
                          <div className="col-span-3 hidden md:block">
                             {kw.status === 'learning' ? (
                               <span className="flex items-center gap-1.5 text-amber-500 text-xs font-bold font-mono">
                                  <Activity className="w-3.5 h-3.5" /> Learning
                               </span>
                             ) : kw.leads_found > 0 ? (
                               <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold font-mono">
                                  <Flame className="w-3.5 h-3.5 fill-emerald-100" /> {kw.leads_found} Leads
                               </span>
                             ) : (
                               <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold font-mono">
                                  <AlertTriangle className="w-3.5 h-3.5" /> Low Signal
                               </span>
                             )}
                          </div>
                          <div className="col-span-4 md:col-span-1 text-right">
                             <button
                                onClick={() => removeKeyword(kw.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                             >
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>

          </div>

          {/* --- RIGHT COLUMN: STATUS (30%) --- */}
          <div className="w-full lg:w-96 flex flex-col gap-6 shrink-0">

            {/* 1. Performance Summary */}
            <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden shrink-0">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2410C] opacity-20 blur-[60px] rounded-full pointer-events-none"></div>

               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Performance</span>
                     </div>
                     <div className={cn(
                       "w-2 h-2 rounded-full",
                       status === 'active' ? "bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]" : "bg-slate-500"
                     )}></div>
                  </div>

                  <div className="mb-4">
                     <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold font-mono tracking-tighter text-white">
                          {totalLeads.toLocaleString()}
                        </span>
                     </div>
                     <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1 block">Total Leads Found</span>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-8 border-t border-slate-800 pt-4">
                    <span className="text-slate-400">High Intent</span>
                    <span className="font-bold text-emerald-400 font-mono">{metrics?.topMatches || 0}</span>
                  </div>
               </div>
            </div>

            {/* 2. System Evolution placeholder */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
               <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 shrink-0">
                  <BrainCircuit className="w-4 h-4 text-[#C2410C]" />
                  <span className="text-sm font-bold text-[#2C3E50] uppercase tracking-wide">System Evolution</span>
               </div>

               <div className="flex-1 flex items-center justify-center">
                 <p className="text-sm text-slate-400 text-center">
                   Evolution events will appear here as the engine learns.
                 </p>
               </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
