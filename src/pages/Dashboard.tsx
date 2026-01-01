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
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- Types & Mock Data ---

interface LeadPreview {
  id: string;
  score: number;
  subreddit: string;
  time: string;
  title: string;
  match_reason: string;
  status: 'new' | 'viewed';
}

interface EvolutionEvent {
  id: string;
  date: string;
  event: string;
  description: string;
  type: 'optimization' | 'discovery' | 'warning';
}

interface ProductSummary {
  id: string;
  name: string;
  subreddits_count: number;
  keywords_count: number;
  primary_sub: string;
  status: 'active' | 'paused';
  leads_found: number;
}

const TOP_LEADS: LeadPreview[] = [
  { 
    id: '1', 
    score: 9.8, 
    subreddit: "r/SaaS", 
    time: "2h", 
    title: "Need an alternative to Intercom. It's too expensive.", 
    match_reason: "Direct competitor churn signal. Price sensitivity detected.",
    status: 'new'
  },
  { 
    id: '2', 
    score: 9.4, 
    subreddit: "r/startups", 
    time: "4h", 
    title: "How do you handle customer feedback aggregation?", 
    match_reason: "High pain signal regarding manual workflows.",
    status: 'new'
  },
  { 
    id: '3', 
    score: 8.9, 
    subreddit: "r/marketing", 
    time: "6h", 
    title: "GA4 is a nightmare. Any privacy-friendly alternatives?", 
    match_reason: "Solution shopping behavior. Privacy focus aligns.",
    status: 'viewed'
  },
  { 
    id: '4', 
    score: 8.5, 
    subreddit: "r/webdev", 
    time: "8h", 
    title: "Looking for a lightweight CRM for freelancers", 
    match_reason: "Matches 'Simple CRM' value prop. High intent.",
    status: 'new'
  },
  { 
    id: '5', 
    score: 8.2, 
    subreddit: "r/entrepreneur", 
    time: "12h", 
    title: "Best tool for cold outreach automation?", 
    match_reason: "Category match. User asking for recommendations.",
    status: 'viewed'
  }
];

const SYSTEM_LOGS: EvolutionEvent[] = [
  { id: 'e1', date: '2h ago', event: 'Optimization', description: 'Increased weight for "Intercom pricing" based on click-through.', type: 'optimization' },
  { id: 'e2', date: '5h ago', event: 'Discovery', description: 'Identified "Drift alternative" as emerging competitor term.', type: 'discovery' },
  { id: 'e3', date: '1d ago', event: 'Retirement', description: 'Retired r/funny due to low signal-to-noise ratio.', type: 'warning' },
  { id: 'e4', date: '2d ago', event: 'Optimization', description: 'Refined persona matching to exclude "Enterprise" roles.', type: 'optimization' },
  { id: 'e5', date: '3d ago', event: 'Discovery', description: 'Found new high-intent cluster in r/SaaS.', type: 'discovery' },
];

const ACTIVE_PRODUCTS: ProductSummary[] = [
  { id: '1', name: 'Intercom Alternative', subreddits_count: 12, keywords_count: 24, primary_sub: 'r/SaaS', status: 'active', leads_found: 842 },
  { id: '2', name: 'Agency Scale Tool', subreddits_count: 8, keywords_count: 15, primary_sub: 'r/agency', status: 'active', leads_found: 398 },
];

export default function Dashboard() {
  const navigate = useNavigate();

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
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Leads Found (7d)</span>
                 <Zap className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold font-mono text-[#2C3E50] tracking-tighter leading-none">42</span>
                 <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">+12%</span>
              </div>
           </div>

           {/* Metric 2 */}
           <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">High Intent (8+)</span>
                 <Target className="w-4 h-4 text-[#C2410C]" />
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold font-mono text-[#2C3E50] tracking-tighter leading-none">18</span>
                 <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">+5</span>
              </div>
           </div>

           {/* Metric 3 */}
           <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Quality Density</span>
                 <Activity className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold font-mono text-[#2C3E50] tracking-tighter leading-none">14%</span>
                 <span className="text-[10px] font-medium text-slate-400 font-mono">Signal Ratio</span>
              </div>
           </div>

           {/* Metric 4 */}
           <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Market Coverage</span>
                 <Radar className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold font-mono text-[#2C3E50] tracking-tighter leading-none">12.4k</span>
                 <span className="text-[10px] font-medium text-slate-400 font-mono">Posts Scanned</span>
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
              {TOP_LEADS.map((lead) => (
                 <div 
                   key={lead.id} 
                   onClick={() => navigate('/feed')}
                   className="group flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                 >
                    <div className="flex items-center gap-4 overflow-hidden min-w-0">
                       {/* Score */}
                       <div className="shrink-0">
                          <div className="w-10 text-center py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold font-mono">
                            {lead.score}
                          </div>
                       </div>
                       
                       {/* Content */}
                       <div className="flex flex-col min-w-0 gap-0.5">
                          <div className="flex items-center gap-2">
                             <span className="text-sm font-bold text-slate-800 truncate">{lead.title}</span>
                             <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">{lead.subreddit}</span>
                             {lead.status === 'new' && <div className="w-1.5 h-1.5 rounded-full bg-[#C2410C] shrink-0" />}
                          </div>
                          <span className="text-xs text-slate-500 font-medium truncate pr-4">{lead.match_reason}</span>
                       </div>
                    </div>

                    {/* Action */}
                    <div className="shrink-0 pl-2">
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-300 group-hover:text-[#2C3E50] rounded-full">
                          <ChevronRight className="w-4 h-4" />
                       </Button>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* 4. CONTEXT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
           
           {/* LEFT: Active Configuration */}
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                 <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4 text-slate-400" />
                    <h2 className="text-base font-bold text-[#2C3E50]">Active Products</h2>
                 </div>
                 <Button variant="ghost" size="sm" onClick={() => navigate('/products')} className="text-slate-400 hover:text-[#2C3E50] h-7 text-xs font-bold">Manage</Button>
              </div>
              
              <div className="p-6 space-y-4">
                 {ACTIVE_PRODUCTS.map((prod) => (
                    <div key={prod.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                             <Globe className="w-5 h-5" />
                          </div>
                          <div>
                             <h3 className="text-sm font-bold text-[#2C3E50]">{prod.name}</h3>
                             <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] font-medium text-slate-500 font-mono flex items-center gap-1">
                                  <Search className="w-3 h-3" /> {prod.keywords_count} Keywords
                                </span>
                                <span className="text-[10px] font-bold text-emerald-600 font-mono flex items-center gap-1">
                                  <Activity className="w-3 h-3" /> Live
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
                 ))}
                 
                 <button onClick={() => navigate('/products')} className="w-full py-3 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all flex items-center justify-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                       <span className="text-[10px] leading-none mb-0.5">+</span>
                    </div>
                    Add Product
                 </button>
              </div>
           </div>

           {/* RIGHT: System Evolution */}
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                 <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-[#C2410C]" />
                    <h2 className="text-base font-bold text-[#2C3E50]">System Evolution</h2>
                 </div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Activity</span>
              </div>

              <div className="p-6">
                  <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-[9px] top-2 bottom-2 w-px bg-slate-100 z-0"></div>
                      
                      <div className="space-y-6 relative z-10">
                        {SYSTEM_LOGS.map((evt) => (
                          <div key={evt.id} className="relative pl-6 group">
                            {/* Node */}
                            <div className={cn(
                              "absolute left-0 top-1.5 w-5 h-5 -ml-[10px] rounded-full border-4 border-white shadow-sm z-10 box-content flex items-center justify-center",
                              evt.type === 'optimization' ? "bg-blue-500" : 
                              evt.type === 'discovery' ? "bg-emerald-500" : "bg-amber-500"
                            )}>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
                            </div>
                            
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                  <span className={cn(
                                    "text-[9px] font-bold uppercase tracking-widest",
                                    evt.type === 'optimization' ? "text-blue-700" : 
                                    evt.type === 'discovery' ? "text-emerald-700" : "text-amber-700"
                                  )}>
                                    {evt.event}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-300">{evt.date}</span>
                                </div>
                                <p className="text-xs text-slate-600 font-medium leading-snug">
                                  {evt.description}
                                </p>
                            </div>
                          </div>
                        ))}
                      </div>
                  </div>
              </div>
           </div>

        </div>

      </div>
    </main>
  );
}