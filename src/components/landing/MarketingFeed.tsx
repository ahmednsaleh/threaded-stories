import * as React from 'react';
import { Logo } from '../Logo';
import { LeadCard } from '../LeadCard';
import { Zap, Layout, ScanLine, ChevronRight } from 'lucide-react';

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
    intent_score: 6.4,
    source_subreddit: 'r/marketing',
    username: 'growth_seeker',
    time_ago: '2h ago',
    post_title: "How are you guys handling custom cohort tracking? Spreadsheet is getting messy.",
    post_content: "I'm currently trying to track our retention in Google Sheets but it's becoming a full-time job. How do people automate this without spending $500/mo on enterprise tools? Just looking for a simpler workflow.",
    relevance_summary: "User has specific pain point (manual tracking) but price sensitive. Good candidate for mid-tier plan.",
    problem_statement_detail: "Manual workflow friction in spreadsheets.",
    urgency_signals_detail: "Medium - Process Optimization.",
    competitors_mentioned: "Google Sheets",
    buying_stage: "Problem Aware",
    sentiment: "Solution Seeking",
    status: 'new'
  }
];

export const MarketingFeed = () => {
  return (
    <div className="w-full bg-[#FAFAFA] h-full overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 z-20 shadow-sm relative">
        <div className="flex items-center gap-4">
          <div className="scale-75 origin-left">
            <Logo />
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>Live Feed</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-bold">Plausible</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
             <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                   <Layout className="w-3.5 h-3.5 text-slate-400" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Total Leads</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#2C3E50] tracking-tighter">1,240</div>
             </div>
             <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                   <Zap className="w-3.5 h-3.5 text-[#C2410C]" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">New</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#2C3E50] tracking-tighter">45</div>
             </div>
             <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                   <ScanLine className="w-3.5 h-3.5 text-amber-500" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Potential</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#2C3E50] tracking-tighter">12</div>
             </div>
          </div>

          {/* Feed */}
          <div className="space-y-6">
             {MOCK_LEADS.map((lead, i) => (
                <LeadCard 
                  key={lead.id}
                  {...lead}
                  product_name="Plausible"
                  initiallyExpanded={i === 0}
                  noAnimation={true}
                />
             ))}
          </div>

        </div>
      </div>
    </div>
  );
};