
import * as React from 'react';
import { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

// --- Types ---
type KeywordTier = 'core' | 'pain_point' | 'use_case' | 'competitor';

interface Keyword {
  id: string;
  term: string;
  tier: KeywordTier;
  leads_found: number;
  status: 'active' | 'learning' | 'low_signal';
}

interface Subreddit {
  id: string;
  name: string;
  signal_score: number; // 0-10
  leads_found: number;
  status: 'active';
}

interface EvolutionEvent {
  id: string;
  date: string;
  event: string;
  description: string;
  type: 'optimization' | 'discovery' | 'warning';
}

interface Product {
  id: string;
  name: string;
  website_url: string;
  status: 'active' | 'paused';
  ideal_customer: string;
  primary_job: string;
  pains_frustrations: string;
  value_proposition: string;
  keywords: Keyword[];
  subreddits: Subreddit[];
  evolution: EvolutionEvent[];
}

// --- Mock Data ---
const MOCK_PRODUCT: Product = {
  id: '1',
  name: 'Intercom Alternative',
  website_url: 'https://threaddits.com',
  status: 'active',
  ideal_customer: 'CTOs of bootstrapped SaaS companies ($10k-$1M ARR) who are technical but hate handling support manually.',
  primary_job: 'Capture and resolve customer support queries on their website without hiring a dedicated support agent.',
  pains_frustrations: 'Intercom is too expensive ($74/mo starting). Drift is too complex. They want a simple chat widget that syncs to Slack.',
  value_proposition: 'The only AI-powered chat widget that qualifies leads automatically and syncs directly to Slack, costing 50% less than Intercom.',
  keywords: [
    { id: 'k1', term: 'Intercom pricing', tier: 'competitor', leads_found: 18, status: 'active' },
    { id: 'k2', term: 'customer chat tool', tier: 'core', leads_found: 6, status: 'active' },
    { id: 'k3', term: 'too expensive', tier: 'pain_point', leads_found: 24, status: 'active' },
    { id: 'k4', term: 'support automation', tier: 'use_case', leads_found: 12, status: 'learning' },
    { id: 'k5', term: 'Drift alternative', tier: 'competitor', leads_found: 3, status: 'learning' },
  ],
  subreddits: [
    { id: 's1', name: 'r/SaaS', signal_score: 9.2, leads_found: 42, status: 'active' },
    { id: 's2', name: 'r/startups', signal_score: 7.5, leads_found: 15, status: 'active' },
    { id: 's3', name: 'r/marketing', signal_score: 5.1, leads_found: 4, status: 'active' },
    { id: 's4', name: 'r/entrepreneur', signal_score: 4.8, leads_found: 2, status: 'active' },
    { id: 's5', name: 'r/sideproject', signal_score: 6.5, leads_found: 8, status: 'active' },
    { id: 's6', name: 'r/smallbusiness', signal_score: 3.2, leads_found: 1, status: 'active' },
  ],
  evolution: [
    { id: 'e1', date: '2h ago', event: 'Optimization', description: 'Increased weight for "Intercom pricing" based on high click-through.', type: 'optimization' },
    { id: 'e2', date: '5h ago', event: 'Discovery', description: 'Identified "Drift alternative" as emerging competitor term.', type: 'discovery' },
    { id: 'e3', date: '1d ago', event: 'Retirement', description: 'Retired r/Entrepreneur due to low signal-to-noise ratio.', type: 'warning' },
    { id: 'e4', date: '2d ago', event: 'Optimization', description: 'Refined persona matching to exclude "Enterprise" roles.', type: 'optimization' },
    { id: 'e5', date: '3d ago', event: 'Discovery', description: 'Found new high-intent cluster in r/SaaS.', type: 'discovery' },
    { id: 'e6', date: '3d ago', event: 'Optimization', description: 'Adjusted urgency threshold for pricing complaints.', type: 'optimization' },
    { id: 'e7', date: '4d ago', event: 'Optimization', description: 'Reduced weight for generic "chat tool" keywords.', type: 'optimization' },
    { id: 'e8', date: '5d ago', event: 'Warning', description: 'Flagged potential false positives in r/marketing.', type: 'warning' },
    { id: 'e9', date: '6d ago', event: 'Discovery', description: 'Detected rising sentiment for "simple alternatives".', type: 'discovery' },
    { id: 'e10', date: '1w ago', event: 'Optimization', description: 'Calibrated sentiment analysis for sarcasm detection.', type: 'optimization' },
    { id: 'e11', date: '1w ago', event: 'Optimization', description: 'Updated competitor list with "HelpScout".', type: 'optimization' },
    { id: 'e12', date: '8d ago', event: 'Discovery', description: 'Found cross-referenced mentions in r/webdev.', type: 'discovery' },
    { id: 'e13', date: '9d ago', event: 'Warning', description: 'Low engagement rates in r/smallbusiness.', type: 'warning' },
    { id: 'e14', date: '10d ago', event: 'Optimization', description: 'Increased threshold for "high intent" classification.', type: 'optimization' },
    { id: 'e15', date: '11d ago', event: 'Discovery', description: 'Identified "customer support" as a key use case.', type: 'discovery' },
    { id: 'e16', date: '12d ago', event: 'Optimization', description: 'Refined keyword matching for "support automation".', type: 'optimization' },
    { id: 'e17', date: '13d ago', event: 'Optimization', description: 'Adjusted lead scoring model for better accuracy.', type: 'optimization' },
  ]
};

// --- Sub-Components ---

const TierBadge = ({ tier }: { tier: KeywordTier }) => {
  const styles = {
    core: "bg-blue-50 text-blue-700 border-blue-100",
    pain_point: "bg-red-50 text-red-700 border-red-100",
    use_case: "bg-emerald-50 text-emerald-700 border-emerald-100",
    competitor: "bg-slate-100 text-slate-700 border-slate-200"
  };
  
  const labels = {
    core: "Core Keyword",
    pain_point: "Pain Point",
    use_case: "Use Case",
    competitor: "Competitor"
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border font-mono whitespace-nowrap", styles[tier] || styles.core)}>
      {labels[tier] || tier.replace('_', ' ')}
    </span>
  );
};

export default function EditProductPage() {
  const [product, setProduct] = useState<Product>(MOCK_PRODUCT);
  
  // Input States
  const [newSubreddit, setNewSubreddit] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedTier, setSelectedTier] = useState<KeywordTier>('core');

  // --- Handlers ---
  const toggleStatus = () => {
    const newStatus = product.status === 'active' ? 'paused' : 'active';
    setProduct({ ...product, status: newStatus });
    toast.success(newStatus === 'active' ? "Hunting Resumed" : "Hunting Paused");
  };

  const handleSaveConfig = () => {
    toast.success("Configuration Saved", { description: "Agents are re-calibrating..." });
  };

  const handleDiscoverSubreddits = () => {
    toast.success("AI Agent dispatched", { description: "Scanning for adjacent high-signal communities..." });
  };

  const addSubreddit = () => {
    let sub = newSubreddit.trim();
    if (sub) {
      if (!sub.startsWith('r/')) sub = `r/${sub}`;
      const newSub: Subreddit = {
        id: Math.random().toString(),
        name: sub,
        signal_score: 5.0,
        leads_found: 0,
        status: 'active'
      };
      setProduct(p => ({ ...p, subreddits: [newSub, ...p.subreddits] }));
      setNewSubreddit('');
      toast.success(`Monitoring ${sub}`);
    }
  };

  const removeSubreddit = (id: string) => {
    setProduct(p => ({ ...p, subreddits: p.subreddits.filter(s => s.id !== id) }));
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      const newK: Keyword = {
        id: Math.random().toString(36),
        term: newKeyword.trim(),
        tier: selectedTier,
        leads_found: 0,
        status: 'learning'
      };
      setProduct(p => ({ ...p, keywords: [newK, ...p.keywords] }));
      setNewKeyword('');
      toast.success(`Tracking "${newK.term}"`);
    }
  };

  const removeKeyword = (id: string) => {
    setProduct(p => ({ ...p, keywords: p.keywords.filter(k => k.id !== id) }));
  };

  // Calculate stats for Dark Card
  const totalLeads = product.keywords.reduce((acc, k) => acc + k.leads_found, 0) + product.subreddits.reduce((acc, s) => acc + s.leads_found, 0);

  return (
    <main className="flex-1 p-4 md:p-10 overflow-y-auto bg-[#FAFAFA]">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* === HEADER AREA === */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-[#2C3E50] tracking-tight">{product.name}</h1>
              
              {/* STATUS TOGGLE */}
              <button 
                onClick={toggleStatus}
                className={cn(
                  "group flex items-center gap-3 pl-3 pr-1.5 py-1 rounded-full border transition-all duration-300",
                  product.status === 'active' 
                    ? "bg-white border-emerald-200 hover:border-emerald-300 shadow-sm" 
                    : "bg-slate-50 border-slate-200"
                )}
              >
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest", 
                  product.status === 'active' ? "text-emerald-700" : "text-slate-400"
                )}>
                  {product.status === 'active' ? "Live Hunting" : "Paused"}
                </span>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                  product.status === 'active' ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                )}>
                  {product.status === 'active' 
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
                  <Button onClick={handleSaveConfig} className="bg-[#C2410C] hover:bg-[#A3360A] text-white font-bold h-9 px-4 rounded-full shadow-sm">
                    <Save className="w-4 h-4 mr-2" /> Save
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
                        value={product.name}
                        onChange={(e) => setProduct({...product, name: e.target.value})}
                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none font-medium transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2">
                        <LinkIcon className="w-3 h-3" /> Website URL
                      </label>
                      <input 
                        type="text" 
                        value={product.website_url}
                        onChange={(e) => setProduct({...product, website_url: e.target.value})}
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
                     value={product.ideal_customer}
                     onChange={(e) => setProduct({...product, ideal_customer: e.target.value})}
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
                        value={product.primary_job}
                        onChange={(e) => setProduct({...product, primary_job: e.target.value})}
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
                        value={product.pains_frustrations}
                        onChange={(e) => setProduct({...product, pains_frustrations: e.target.value})}
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
                     value={product.value_proposition}
                     onChange={(e) => setProduct({...product, value_proposition: e.target.value})}
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
               
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {product.subreddits.map((sub) => {
                    const signalColor = sub.signal_score >= 8 ? 'bg-emerald-500' : sub.signal_score >= 5 ? 'bg-amber-500' : 'bg-slate-300';
                    return (
                      <div key={sub.id} className="group relative flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3 hover:border-[#C2410C]/30 hover:shadow-sm transition-all cursor-default select-none">
                         <div className="flex flex-col gap-0.5 min-w-0">
                           <span className="text-sm font-bold text-slate-900 truncate">{sub.name}</span>
                           <div className="flex items-center gap-1.5">
                             <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", signalColor)} />
                             <span className="text-xs font-mono text-slate-500">{sub.leads_found} Leads</span>
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
            </div>

            {/* 3. Keywords - ADDED flex-1 here */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm flex-1 flex flex-col">
              {/* UPDATED Header with Add Keyword Controls */}
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
                    
                    <select 
                         value={selectedTier}
                         onChange={(e) => setSelectedTier(e.target.value as KeywordTier)}
                         className="h-10 px-3 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-600 outline-none uppercase tracking-wide cursor-pointer"
                    >
                        <option value="core">Core</option>
                        <option value="pain_point">Pain Point</option>
                        <option value="competitor">Competitor</option>
                    </select>
                    
                    <button 
                      onClick={addKeyword} 
                      className="bg-[#C2410C] hover:bg-[#A3360A] text-white font-bold px-6 py-2 rounded-full transition-colors text-sm h-10 shadow-sm whitespace-nowrap"
                    >
                      Add
                    </button>
                </div>
              </div>

              {/* Keyword Table */}
              <div className="w-full text-left border border-slate-100 rounded-xl overflow-hidden flex-1">
                   <div className="grid grid-cols-12 px-6 py-3 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-100">
                      <div className="col-span-4 md:col-span-5">Keyword</div>
                      <div className="col-span-4 md:col-span-3">Tier</div>
                      <div className="col-span-3 hidden md:block">Performance</div>
                      <div className="col-span-4 md:col-span-1 text-right">Action</div>
                   </div>

                   <div className="divide-y divide-slate-100">
                     {product.keywords.map((kw) => (
                       <div key={kw.id} className="grid grid-cols-12 px-6 py-3 items-center hover:bg-slate-50 transition-colors group">
                          <div className="col-span-4 md:col-span-5 font-bold text-slate-700 text-sm">{kw.term}</div>
                          <div className="col-span-4 md:col-span-3"><TierBadge tier={kw.tier} /></div>
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
            </div>

          </div>

          {/* --- RIGHT COLUMN: STATUS (30%) --- */}
          <div className="w-full lg:w-96 flex flex-col gap-6 shrink-0">
            
            {/* 1. Performance Summary (Fixed Height) */}
            <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden shrink-0">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2410C] opacity-20 blur-[60px] rounded-full pointer-events-none"></div>

               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Performance</span>
                     </div>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]"></div>
                  </div>

                  <div className="mb-4">
                     <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold font-mono tracking-tighter text-white">{totalLeads.toLocaleString()}</span>
                     </div>
                     <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1 block">Total Leads Found</span>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-8 border-t border-slate-800 pt-4">
                    <span className="text-slate-400">Avg Quality</span>
                    <span className="font-bold text-emerald-400 font-mono">8.4 / 10</span>
                  </div>
               </div>
            </div>

            {/* 2. System Evolution (Stretches) - REMOVED min-h-[500px], REMOVED max-h constraint */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
               <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 shrink-0">
                  <BrainCircuit className="w-4 h-4 text-[#C2410C]" />
                  <span className="text-sm font-bold text-[#2C3E50] uppercase tracking-wide">System Evolution</span>
               </div>
               
               {/* Removed max-h-[600px] and added wrapper for timeline line */}
               <div className="relative flex-1 overflow-y-auto pr-2">
                  <div className="relative min-h-full">
                      <div className="absolute left-[9px] top-2 bottom-2 w-px bg-slate-100 z-0"></div>
                      <div className="space-y-6 relative z-10 py-2">
                        {product.evolution.map((evt) => (
                          <div key={evt.id} className="relative pl-6 group">
                            {/* Node */}
                            <div className={cn(
                              "absolute left-0 top-1.5 w-5 h-5 -ml-[10px] rounded-full border-4 border-white shadow-sm z-10 box-content transition-all group-hover:scale-110 flex items-center justify-center",
                              evt.type === 'optimization' ? "bg-blue-500" : 
                              evt.type === 'discovery' ? "bg-emerald-500" : "bg-orange-500"
                            )}>
                                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></div>
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className={cn(
                                    "text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                                    evt.type === 'optimization' ? "bg-blue-50 text-blue-700" : 
                                    evt.type === 'discovery' ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                                  )}>
                                    {evt.event}
                                  </span>
                                  <span className="text-[9px] font-mono text-slate-400 whitespace-nowrap">{evt.date}</span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed mt-1 font-medium">
                                  {evt.description}
                                </p>
                            </div>
                          </div>
                        ))}
                        {/* Fake fade out at bottom */}
                        <div className="h-12"></div>
                      </div>
                  </div>
               </div>
            </div>

          </div>
          
        </div>

      </div>
    </main>
  );
}
