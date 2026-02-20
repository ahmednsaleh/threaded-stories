import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Zap,
  Target,
  Activity,
  ArrowRight,
  ChevronRight,
  Layout,
  Globe,
  BrainCircuit,
  Radar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useProducts } from '../hooks/useProducts';
import { useLeads } from '../hooks/useLeads';
import { useLeadMetrics } from '../hooks/useLeadMetrics';
import { formatTimeAgo } from '../lib/formatTimeAgo';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: products = [], isLoading: isLoadingProducts } = useProducts();

  // Use the first product as the primary one for dashboard metrics
  const primaryProduct = products[0] || null;
  const primaryProductId = primaryProduct?.id || null;

  // Fetch lead metrics for the primary product
  const { data: metrics = { total: 0, new: 0, potential: 0, topMatches: 0 } } = useLeadMetrics(primaryProductId);

  // Fetch top 5 leads sorted by intent_score
  const { data: allLeads = [], isLoading: isLoadingLeads } = useLeads({
    productId: primaryProductId,
    statusFilter: 'Show All',
    timeFilter: 'All Time',
  });

  const topLeads = React.useMemo(() => {
    return [...allLeads]
      .sort((a, b) => b.intent_score - a.intent_score)
      .slice(0, 5);
  }, [allLeads]);

  // Calculate quality density (high intent / total)
  const qualityDensity = metrics.total > 0
    ? Math.round((metrics.topMatches / metrics.total) * 100)
    : 0;

  const isLoading = isLoadingProducts || isLoadingLeads;

  return (
    <main className="flex-1 p-4 md:p-10 overflow-y-auto bg-[#FAFAFA] min-h-screen">
      <div className="mx-auto w-full max-w-6xl space-y-8 pb-20">

        {/* 1. HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#2C3E50]">Dashboard</h1>
          <p className="text-lg text-slate-500 font-medium">Your autonomous lead pipeline.</p>
        </div>

        {/* 2. THE VITALS (Stats Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

           {/* Metric 1 */}
           <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Total Leads</span>
                 <Zap className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold font-mono text-[#2C3E50] tracking-tighter leading-none">
                   {isLoading ? '...' : metrics.total.toLocaleString()}
                 </span>
              </div>
           </div>

           {/* Metric 2 */}
           <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">High Intent (8+)</span>
                 <Target className="w-4 h-4 text-[#C2410C]" />
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold font-mono text-[#2C3E50] tracking-tighter leading-none">
                   {isLoading ? '...' : metrics.topMatches}
                 </span>
              </div>
           </div>

           {/* Metric 3 */}
           <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Quality Density</span>
                 <Activity className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold font-mono text-[#2C3E50] tracking-tighter leading-none">
                   {isLoading ? '...' : `${qualityDensity}%`}
                 </span>
                 <span className="text-[10px] font-medium text-slate-400 font-mono">Signal Ratio</span>
              </div>
           </div>

           {/* Metric 4 */}
           <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">New Leads</span>
                 <Radar className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold font-mono text-[#2C3E50] tracking-tighter leading-none">
                   {isLoading ? '...' : metrics.new}
                 </span>
                 <span className="text-[10px] font-medium text-slate-400 font-mono">Unreviewed</span>
              </div>
           </div>
        </div>

        {/* 3. TOP OPPORTUNITIES (Dense List) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
           <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-orange-50 rounded-md border border-orange-100">
                    <Target className="w-4 h-4 text-[#C2410C]" />
                 </div>
                 <h2 className="text-base font-bold text-[#2C3E50]">Top 5 High-Intent Leads</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/feed')}
                className="text-[#C2410C] hover:text-[#A3360A] hover:bg-orange-50 font-bold text-xs h-8"
              >
                View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
           </div>

           <div className="divide-y divide-slate-50">
              {isLoading ? (
                <div className="p-8 flex items-center justify-center text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading leads...
                </div>
              ) : topLeads.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm font-medium">
                  No leads found yet. Your engine is still scanning.
                </div>
              ) : (
                topLeads.map((lead) => (
                 <div
                   key={lead.id}
                   onClick={() => navigate('/feed')}
                   className="group flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                 >
                    <div className="flex items-center gap-4 overflow-hidden min-w-0">
                       {/* Score */}
                       <div className="shrink-0">
                          <div className={cn(
                            "w-10 text-center py-1 rounded-md border text-xs font-bold font-mono",
                            lead.intent_score >= 8
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : lead.intent_score >= 5
                                ? "bg-amber-50 text-amber-700 border-amber-100"
                                : "bg-slate-50 text-slate-600 border-slate-200"
                          )}>
                            {lead.intent_score.toFixed(1)}
                          </div>
                       </div>

                       {/* Content */}
                       <div className="flex flex-col min-w-0 gap-0.5">
                          <div className="flex items-center gap-2">
                             <span className="text-sm font-bold text-slate-800 truncate">{lead.post_title}</span>
                             <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                               {lead.source_subreddit.startsWith('r/') ? lead.source_subreddit : `r/${lead.source_subreddit}`}
                             </span>
                             {lead.status === 'New' && <div className="w-1.5 h-1.5 rounded-full bg-[#C2410C] shrink-0" />}
                          </div>
                          <span className="text-xs text-slate-500 font-medium truncate pr-4">
                            {lead.relevance_summary || lead.problem_statement_detail || 'Lead detected'}
                          </span>
                       </div>
                    </div>

                    {/* Action */}
                    <div className="shrink-0 pl-2 flex items-center gap-2">
                       <span className="text-[10px] text-slate-400 font-mono">{formatTimeAgo(lead.created_utc)}</span>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-300 group-hover:text-[#2C3E50] rounded-full">
                          <ChevronRight className="w-4 h-4" />
                       </Button>
                    </div>
                 </div>
                ))
              )}
           </div>
        </div>

        {/* 4. CONTEXT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

           {/* LEFT: Active Products */}
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                 <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4 text-slate-400" />
                    <h2 className="text-base font-bold text-[#2C3E50]">Active Products</h2>
                 </div>
                 <Button variant="ghost" size="sm" onClick={() => navigate('/products')} className="text-slate-400 hover:text-[#2C3E50] h-7 text-xs font-bold">Manage</Button>
              </div>

              <div className="p-6 space-y-4">
                 {isLoadingProducts ? (
                   <div className="flex items-center justify-center py-8 text-slate-400">
                     <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading products...
                   </div>
                 ) : products.length === 0 ? (
                   <div className="text-center py-8 text-slate-400 text-sm">
                     No products configured yet.
                   </div>
                 ) : (
                   products.map((prod) => (
                    <div key={prod.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                             <Globe className="w-5 h-5" />
                          </div>
                          <div>
                             <h3 className="text-sm font-bold text-[#2C3E50]">{prod.product_name}</h3>
                             <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] font-medium text-slate-500 font-mono flex items-center gap-1">
                                  <Search className="w-3 h-3" /> {prod.subreddits?.length || 0} Subreddits
                                </span>
                                <span className={cn(
                                  "text-[10px] font-bold font-mono flex items-center gap-1",
                                  prod.status === 'active' ? "text-emerald-600" : "text-slate-400"
                                )}>
                                  <Activity className="w-3 h-3" /> {prod.status === 'active' ? 'Live' : 'Paused'}
                                </span>
                             </div>
                          </div>
                       </div>
                       <Button
                         variant="secondary"
                         size="sm"
                         onClick={() => navigate(`/products/${prod.id}`)}
                         className="h-8 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                         Edit
                       </Button>
                    </div>
                   ))
                 )}

                 <button onClick={() => navigate('/products')} className="w-full py-3 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all flex items-center justify-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                       <span className="text-[10px] leading-none mb-0.5">+</span>
                    </div>
                    Add Product
                 </button>
              </div>
           </div>

           {/* RIGHT: System Evolution - keep static for now as noted in task description */}
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                 <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-[#C2410C]" />
                    <h2 className="text-base font-bold text-[#2C3E50]">System Evolution</h2>
                 </div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Activity</span>
              </div>

              <div className="p-6">
                <div className="py-8 text-center text-slate-400 text-sm">
                  System evolution events will appear here as the engine learns from your feedback.
                </div>
              </div>
           </div>

        </div>

      </div>
    </main>
  );
}
