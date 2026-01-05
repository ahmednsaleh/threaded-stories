import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { 
  Plus,
  Search,
  ChevronDown,
  Signal,
  Zap,
  Layout,
  Clock,
  Check,
  Filter,
  ScanLine
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { LeadCard } from '../components/LeadCard';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useLeads, TimeFilter, StatusFilter } from '../hooks/useLeads';
import { useLeadMetrics } from '../hooks/useLeadMetrics';
import { formatTimeAgo } from '../lib/formatTimeAgo';

type LeadFilter = 'all' | 'new' | 'warm' | 'hot';

const LeadCardSkeleton = () => (
  <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-6 overflow-hidden">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-24 rounded-full bg-slate-100 animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 rounded bg-slate-100 animate-pulse" />
          <div className="h-6 w-20 rounded bg-slate-100 animate-pulse" />
        </div>
      </div>
    </div>
    <div className="h-32 w-full bg-slate-50 border-l-4 border-slate-200 rounded-r-lg mb-6 animate-pulse" />
    <div className="space-y-2 mb-8">
      <div className="h-4 w-full bg-slate-50 rounded animate-pulse" />
      <div className="h-4 w-5/6 bg-slate-50 rounded animate-pulse" />
    </div>
  </div>
);

export default function LeadsPage({ isShowcase = false }: { isShowcase?: boolean }) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<LeadFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('All Time');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Show All');
  const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  // Product Switcher State
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  // Fetch products from database
  const { data: products = [], isLoading: isLoadingProducts } = useProducts();

  // Set initial product when products load
  useEffect(() => {
    if (products.length > 0 && !activeProductId) {
      setActiveProductId(products[0].id);
    }
  }, [products, activeProductId]);

  const activeProduct = products.find(p => p.id === activeProductId) || products[0];

  // Fetch leads with filters
  const { data: leads = [], isLoading: isLoadingLeads } = useLeads({
    productId: activeProductId,
    statusFilter,
    timeFilter,
    searchQuery,
  });

  // Fetch metrics for pipeline bar
  const { data: metrics = { total: 0, new: 0, potential: 0, topMatches: 0 } } = useLeadMetrics(activeProductId);

  // Filter leads by intent score based on activeFilter
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (activeFilter === 'hot' && lead.intent_score < 8) return false;
      if (activeFilter === 'warm' && (lead.intent_score < 5 || lead.intent_score >= 8)) return false;
      if (activeFilter === 'new' && lead.status !== 'New') return false;
      return true;
    });
  }, [leads, activeFilter]);

  const isLoading = isLoadingProducts || isLoadingLeads;

  return (
    <main className={cn(
      "flex flex-1 flex-col gap-4 h-full", 
      isShowcase ? "p-6 overflow-hidden" : "p-4 md:gap-8 md:p-10 overflow-y-auto"
    )}>
      <div className={cn("mx-auto w-full max-w-6xl", isShowcase ? "space-y-5" : "space-y-8")}>
        
        {/* Header Section (Context Switcher) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="relative">
             <div 
               onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
               className="flex items-center gap-3 cursor-pointer group select-none"
             >
                <h1 className={cn(
                  "font-bold tracking-tighter text-[#2C3E50] flex items-center gap-2 transition-colors group-hover:text-slate-700", 
                  isShowcase ? "text-3xl" : "text-4xl"
                )}>
                  {isLoadingProducts ? 'Loading...' : (activeProduct?.product_name || 'Select Product')}
                  <ChevronDown className={cn(
                    "w-6 h-6 text-slate-400 transition-transform duration-200", 
                    isProductMenuOpen && "rotate-180 text-[#2C3E50]"
                  )} />
                </h1>
                
                {activeProduct?.status === 'active' && (
                  <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-xs font-medium border border-emerald-100 flex items-center gap-1.5 shadow-sm h-7 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-bold uppercase tracking-widest text-[10px] pt-0.5">Live</span>
                  </div>
                )}
             </div>

             {/* Dropdown Menu */}
             {isProductMenuOpen && (
               <>
                 <div className="fixed inset-0 z-30" onClick={() => setIsProductMenuOpen(false)} />
                 <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
                   <div className="py-2">
                      <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Switch Product</div>
                      {products.map(p => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setActiveProductId(p.id);
                            setIsProductMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between group transition-colors"
                        >
                          <span className={cn(p.id === activeProductId ? "text-[#2C3E50]" : "text-slate-600")}>{p.product_name}</span>
                          {p.id === activeProductId && <Check className="w-4 h-4 text-[#C2410C]" />}
                        </button>
                      ))}
                      {products.length === 0 && !isLoadingProducts && (
                        <div className="px-4 py-3 text-sm text-slate-400">No products found</div>
                      )}
                   </div>
                   <div className="border-t border-slate-100 bg-slate-50/50 p-2">
                      <button 
                        onClick={() => {
                          navigate('/products');
                          setIsProductMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm font-bold text-[#C2410C] hover:bg-white hover:shadow-sm rounded-lg flex items-center gap-2 transition-all"
                      >
                         <Plus className="w-4 h-4" /> Add New Product
                      </button>
                   </div>
                 </div>
               </>
             )}
          </div>
          
          {/* No Right-side Action Button (Removed as requested) */}
        </div>

        {/* Interactive Pipeline Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl h-24 flex items-stretch shadow-sm overflow-hidden shrink-0 relative z-0">
          <button onClick={() => setActiveFilter('all')} className={cn("flex-1 flex flex-col items-center justify-center border-r border-slate-100 px-4 transition-all focus:outline-none", activeFilter === 'all' ? "bg-slate-50 border-b-2 border-b-[#C2410C]" : "hover:bg-slate-50/50")}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5"><Layout className="w-3 h-3" /> Total Leads</span>
            <span className="text-3xl font-mono font-bold text-slate-900 tabular-nums leading-none">{metrics.total.toLocaleString()}</span>
          </button>
          <button onClick={() => setActiveFilter('new')} className={cn("flex-1 flex flex-col items-center justify-center border-r border-slate-100 px-4 transition-all focus:outline-none", activeFilter === 'new' ? "bg-slate-50 border-b-2 border-b-[#C2410C]" : "hover:bg-slate-50/50")}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#C2410C] fill-[#C2410C]" /> New</span>
            <span className="text-3xl font-mono font-bold text-slate-900 tabular-nums leading-none">{metrics.new}</span>
          </button>
          <button onClick={() => setActiveFilter('warm')} className={cn("flex-1 flex flex-col items-center justify-center border-r border-slate-100 px-4 transition-all focus:outline-none", activeFilter === 'warm' ? "bg-slate-50 border-b-2 border-b-[#C2410C]" : "hover:bg-slate-50/50")}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5"><ScanLine className="w-3 h-3 text-amber-600" /> Potential</span>
            <span className="text-3xl font-mono font-bold text-amber-600 tabular-nums leading-none">{metrics.potential}</span>
          </button>
          <button onClick={() => setActiveFilter('hot')} className={cn("flex-1 flex flex-col items-center justify-center px-4 transition-all focus:outline-none", activeFilter === 'hot' ? "bg-slate-50 border-b-2 border-b-[#C2410C]" : "hover:bg-slate-50/50")}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5"><Signal className="w-3 h-3 text-emerald-600" /> Top Matches</span>
            <span className="text-3xl font-mono font-bold text-emerald-600 tabular-nums leading-none">{metrics.topMatches}</span>
          </button>
        </div>

        {/* Control Strip */}
        <div className="flex items-center justify-between gap-6 shrink-0 mb-2 relative z-0">
          <div className="relative w-full max-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-[#C2410C]" />
            <input 
              type="text" 
              placeholder="Search within filtered leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-[#C2410C] bg-white shadow-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Button variant="outline" onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)} className="rounded-full border-slate-200 h-11 px-6 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> {statusFilter} <ChevronDown className="w-3.5 h-3.5" />
              </Button>
              {isStatusMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsStatusMenuOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {(['Show All', 'New', 'Contacted', 'Won', 'Rejected'] as StatusFilter[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => { setStatusFilter(status); setIsStatusMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="relative">
              <Button variant="outline" onClick={() => setIsTimeMenuOpen(!isTimeMenuOpen)} className="rounded-full border-slate-200 h-11 px-6 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> {timeFilter} <ChevronDown className="w-3.5 h-3.5" />
              </Button>
              {isTimeMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsTimeMenuOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {(['Last 24h', 'Last Week', 'Last Month', 'All Time'] as TimeFilter[]).map((time) => (
                      <button
                        key={time}
                        onClick={() => { setTimeFilter(time); setIsTimeMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Feed Stream */}
        <div className={cn("space-y-8 pb-20 relative z-0", isShowcase ? "!mt-6" : "!mt-10")}>
          {isLoading && !isShowcase ? (
            <>
              <LeadCardSkeleton />
              <LeadCardSkeleton />
            </>
          ) : filteredLeads.length > 0 ? (
            filteredLeads.slice(0, isShowcase ? 2 : undefined).map((lead, index) => (
              <LeadCard 
                key={lead.id}
                id={lead.id}
                intent_score={lead.intent_score}
                source_subreddit={lead.source_subreddit}
                username={lead.author}
                time_ago={formatTimeAgo(lead.created_utc)}
                post_title={lead.post_title}
                post_content={lead.post_content}
                post_url={lead.post_url}
                relevance_summary={lead.relevance_summary || 'No summary available'}
                problem_statement_detail={lead.problem_statement_detail || 'Not specified'}
                urgency_signals_detail={lead.urgency_signals_detail || 'Not specified'}
                competitors_mentioned={lead.competitive_context_detail || lead.competitors_mentioned || 'None'}
                buying_stage={lead.buying_stage_detail || (lead.is_solution_seeking ? 'Solution Seeking' : 'Researching')}
                sentiment={
                  lead.urgency_signals_detail?.toLowerCase().includes('high') || lead.urgency_signals_detail?.toLowerCase().includes('immediate')
                    ? 'High Urgency'
                    : lead.urgency_signals_detail?.toLowerCase().includes('medium')
                      ? 'Medium Urgency'
                      : 'Low Urgency'
                }
                status={lead.status}
                product_name={activeProduct?.product_name || 'Product'}
                initiallyExpanded={index === 0} 
                noAnimation={isShowcase}
              />
            ))
          ) : (
            <div className="py-20 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm font-mono">
                {!activeProductId ? 'Please select a product to view leads.' : 'No signals found matching criteria.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
