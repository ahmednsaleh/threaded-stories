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

const MOCK_LEADS = [
  {
    id: '1',
    intent_score: 9.8,
    source_subreddit: 'r/SaaS',
    username: 'active_buyer_99',
    time_ago: '14m ago',
    post_title: "Threaddits vs Leaddit - which is better for a B2B startup?",
    post_content: "I've been looking into both Threaddits and Leaddit. We need to start scaling our outreach on Reddit next week. Threaddits seems more autonomous, but Leaddit has been around longer. Does anyone have experience with both? Looking for the best ROI and least manual effort.",
    relevance_summary: "Direct comparison between Threaddits and a primary competitor. User is in the final decision-making phase.",
    problem_statement_detail: "Needs high-ROI, low-effort lead generation for immediate scaling.",
    urgency_signals_detail: "High - Decision needed by next week for upcoming sprint.",
    competitors_mentioned: "Leaddit",
    buying_stage: "Actively Shopping",
    sentiment: "High Urgency",
    status: 'new'
  },
  {
    id: '2',
    intent_score: 8.5,
    source_subreddit: 'r/marketing',
    username: 'growth_guru',
    time_ago: '45m ago',
    post_title: "Best Reddit marketing tools in 2025? (Beyond keyword alerts)",
    post_content: "Keywords alerts like GummySearch are okay, but I'm getting too much noise. Are there any AI tools that actually understand the intent of the post? I want to find people who are frustrated with their current tech stack, not just people mentioning a keyword.",
    relevance_summary: "User is aware of the product category but looking for superior technical capabilities (AI intent over keyword matching).",
    problem_statement_detail: "Keyword tools provide too much noise; needs intent-based filtering.",
    urgency_signals_detail: "Medium - Optimizing current marketing workflow.",
    competitors_mentioned: "GummySearch",
    buying_stage: "Product Aware",
    sentiment: "Comparing Options",
    status: 'contacted'
  },
  {
    id: '3',
    intent_score: 7.2,
    source_subreddit: 'r/startups',
    username: 'solo_founder_dev',
    time_ago: '3h ago',
    post_title: "LinkedIn Ads are draining my bank account. Cheaper alternatives?",
    post_content: "I've been running LinkedIn ads for my dev tool and the CPM is just insane. I'm paying $10 per click and the conversion rate isn't justifying it. I know my target audience is on Reddit, but I don't want to just spam threads. Is there a way to find high-intent users on Reddit without it costing a fortune?",
    relevance_summary: "User is aware that a solution (Reddit outreach) exists but is sensitive to the high cost of current channels.",
    problem_statement_detail: "Unsustainable CAC on LinkedIn; seeking a cost-effective alternative.",
    urgency_signals_detail: "Medium - Actively looking to pivot ad spend.",
    competitors_mentioned: "LinkedIn Ads",
    buying_stage: "Solution Aware",
    sentiment: "Price Sensitive",
    status: 'new'
  },
  {
    id: '4',
    intent_score: 6.8,
    source_subreddit: 'r/SaaS',
    username: 'indie_dev_9',
    time_ago: '6h ago',
    post_title: "How to automate customer discovery on Reddit?",
    post_content: "I'm spending way too much time refreshing subreddits to find people with the problems my app solves. Does anyone have a script or tool that does this?",
    relevance_summary: "Early-stage discovery phase. High potential for tool adoption if the value proposition is clear.",
    problem_statement_detail: "Time-consuming manual discovery process.",
    urgency_signals_detail: "Low - Looking for workflow optimization.",
    competitors_mentioned: "None",
    buying_stage: "Unaware of Solutions",
    sentiment: "Solution Seeking",
    status: 'rejected'
  }
];

const PRODUCTS = [
  { id: '1', name: 'Plausible Leads', status: 'active' },
  { id: '2', name: 'Intercom Alternative', status: 'active' },
  { id: '3', name: 'Agency Scale Tool', status: 'paused' }
];

type LeadFilter = 'all' | 'new' | 'warm' | 'hot';
type TimeFilter = 'Last 24h' | 'Last Week' | 'Last Month' | 'All Time';
type StatusFilter = 'Show All' | 'New' | 'Contacted' | 'Won' | 'Rejected';

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
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('Last 24h');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Show All');
  const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Product Switcher State
  const [activeProductId, setActiveProductId] = useState('1');
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  const activeProduct = PRODUCTS.find(p => p.id === activeProductId) || PRODUCTS[0];

  useEffect(() => {
    if (isShowcase) return;
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeFilter, searchQuery, statusFilter, timeFilter, isShowcase, activeProductId]);

  const filteredLeads = useMemo(() => {
    return MOCK_LEADS.filter((lead) => {
      const matchesSearch = lead.post_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.post_content.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (activeFilter === 'hot' && lead.intent_score < 8) return false;
      if (activeFilter === 'warm' && (lead.intent_score < 5 || lead.intent_score >= 8)) return false;
      if (statusFilter !== 'Show All') {
        const leadStatusLabel = lead.status.charAt(0).toUpperCase() + lead.status.slice(1);
        if (leadStatusLabel !== statusFilter) return false;
      }
      return true;
    });
  }, [activeFilter, searchQuery, statusFilter]);

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
                  {activeProduct.name}
                  <ChevronDown className={cn(
                    "w-6 h-6 text-slate-400 transition-transform duration-200", 
                    isProductMenuOpen && "rotate-180 text-[#2C3E50]"
                  )} />
                </h1>
                
                {activeProduct.status === 'active' && (
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
                      {PRODUCTS.map(p => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setActiveProductId(p.id);
                            setIsProductMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between group transition-colors"
                        >
                          <span className={cn(p.id === activeProductId ? "text-[#2C3E50]" : "text-slate-600")}>{p.name}</span>
                          {p.id === activeProductId && <Check className="w-4 h-4 text-[#C2410C]" />}
                        </button>
                      ))}
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
            <span className="text-3xl font-mono font-bold text-slate-900 tabular-nums leading-none">1,240</span>
          </button>
          <button onClick={() => setActiveFilter('new')} className={cn("flex-1 flex flex-col items-center justify-center border-r border-slate-100 px-4 transition-all focus:outline-none", activeFilter === 'new' ? "bg-slate-50 border-b-2 border-b-[#C2410C]" : "hover:bg-slate-50/50")}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#C2410C] fill-[#C2410C]" /> New</span>
            <span className="text-3xl font-mono font-bold text-slate-900 tabular-nums leading-none">45</span>
          </button>
          <button onClick={() => setActiveFilter('warm')} className={cn("flex-1 flex flex-col items-center justify-center border-r border-slate-100 px-4 transition-all focus:outline-none", activeFilter === 'warm' ? "bg-slate-50 border-b-2 border-b-[#C2410C]" : "hover:bg-slate-50/50")}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5"><ScanLine className="w-3 h-3 text-amber-600" /> Potential</span>
            <span className="text-3xl font-mono font-bold text-amber-600 tabular-nums leading-none">12</span>
          </button>
          <button onClick={() => setActiveFilter('hot')} className={cn("flex-1 flex flex-col items-center justify-center px-4 transition-all focus:outline-none", activeFilter === 'hot' ? "bg-slate-50 border-b-2 border-b-[#C2410C]" : "hover:bg-slate-50/50")}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5"><Signal className="w-3 h-3 text-emerald-600" /> Top Matches</span>
            <span className="text-3xl font-mono font-bold text-emerald-600 tabular-nums leading-none">18</span>
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
                 <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {['Show All', 'New', 'Contacted', 'Won', 'Rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => { setStatusFilter(status as StatusFilter); setIsStatusMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                      >
                        {status}
                      </button>
                    ))}
                 </div>
              )}
            </div>
            
            <div className="relative">
              <Button variant="outline" onClick={() => setIsTimeMenuOpen(!isTimeMenuOpen)} className="rounded-full border-slate-200 h-11 px-6 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> {timeFilter} <ChevronDown className="w-3.5 h-3.5" />
              </Button>
              {isTimeMenuOpen && (
                 <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {['Last 24h', 'Last Week', 'Last Month', 'All Time'].map((time) => (
                      <button
                        key={time}
                        onClick={() => { setTimeFilter(time as TimeFilter); setIsTimeMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                      >
                        {time}
                      </button>
                    ))}
                 </div>
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
                {...lead} 
                product_name={activeProduct.name}
                initiallyExpanded={index === 0} 
                noAnimation={isShowcase}
              />
            ))
          ) : (
            <div className="py-20 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm font-mono">No signals found matching criteria.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}