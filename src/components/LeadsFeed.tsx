import * as React from 'react';
import { 
  Search,
  Layout,
  Zap,
  ScanLine,
  Signal,
  ArrowDown
} from 'lucide-react';
import { Button } from './ui/button';
import { LeadCard } from './LeadCard';

interface MockLead {
  id: string;
  score: number;
  subreddit: string;
  timeAgo: string;
  username: string;
  title: string;
  content: string;
  summary: string;
  pain: string;
  urgency: string;
  competitor: string;
  url: string;
  buyingStage: string;
  sentiment: string;
}

const StatsRow = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-slate-400">
        <Layout className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Total Leads</span>
      </div>
      <div className="text-3xl font-mono font-bold text-slate-900 tracking-tighter">1,240</div>
    </div>
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-slate-400">
        <Zap className="w-3.5 h-3.5 text-[#C2410C] fill-[#C2410C]" />
        <span className="text-[10px] font-bold uppercase tracking-widest font-mono">New</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-3xl font-mono font-bold text-slate-900 tracking-tighter">45</div>
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mt-1" />
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-slate-400">
        <ScanLine className="w-3.5 h-3.5 text-amber-600" />
        <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Potential</span>
      </div>
      <div className="text-3xl font-mono font-bold text-amber-600 tracking-tighter">12</div>
    </div>
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-slate-400">
        <Signal className="w-3.5 h-3.5 text-emerald-600" />
        <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Top Matches</span>
      </div>
      <div className="text-3xl font-mono font-bold text-emerald-600 tracking-tighter">18</div>
    </div>
  </div>
);

export const LeadsFeed = () => {
  const leads: MockLead[] = [
    {
      id: '1',
      score: 9.8,
      subreddit: 'r/SaaS',
      username: 'active_buyer_99',
      timeAgo: '12m ago',
      title: "We are leaving [Competitor]. Need a cheaper alternative ASAP.",
      summary: "Direct Intent. User is explicitly churning from a competitor and has budget. Perfect opportunity to position as the high-ROI choice.",
      content: "I've been using Baremetrics but the pricing is getting ridiculous for our stage. I need something cheaper than Baremetrics that still gives me good cohort analysis and high-fidelity metrics. We need to switch by next week.",
      pain: "Unsustainable Pricing",
      urgency: "Immediate Churn",
      competitor: "Baremetrics",
      url: "https://reddit.com/r/SaaS/comments/1",
      buyingStage: "Actively Shopping",
      sentiment: "High Urgency"
    },
    {
      id: '2',
      score: 6.4,
      subreddit: 'r/marketing',
      username: 'growth_seeker',
      timeAgo: '2h ago',
      title: "How are you guys handling custom cohort tracking? Spreadsheet is getting messy.",
      summary: "Indirect Intent. User has the specific pain point your tool solves but is not yet looking for a product. Opportunity to educate on automation.",
      content: "I'm currently trying to track our retention in Google Sheets but it's becoming a full-time job. How do people automate this without spending $500/mo on enterprise tools? Just looking for a simpler workflow.",
      pain: "Manual Workflow Friction",
      urgency: "Process Optimization",
      competitor: "Google Sheets",
      url: "https://reddit.com/r/marketing/comments/2",
      buyingStage: "Problem Aware",
      sentiment: "Solution Seeking"
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      
      {/* Stats row acting as a header context */}
      <StatsRow />

      {/* 2. THE FEED (Vertical Stack) */}
      <div className="flex flex-col space-y-10 relative">
        {leads.map((lead, idx) => (
          <React.Fragment key={lead.id}>
            <LeadCard 
              id={lead.id}
              intent_score={lead.score}
              source_subreddit={lead.subreddit}
              username={lead.username}
              time_ago={lead.timeAgo}
              post_title={lead.title}
              post_content={lead.content}
              relevance_summary={lead.summary}
              problem_statement_detail={lead.pain}
              urgency_signals_detail={lead.urgency}
              competitors_mentioned={lead.competitor}
              post_url={lead.url}
              buying_stage={lead.buyingStage}
              sentiment={lead.sentiment}
              initiallyExpanded={idx === 0}
              product_name="Plausible"
            />
            
            {/* Connection Visual (Down Arrow) */}
            {idx < leads.length - 1 && (
              <div className="flex justify-center items-center py-2 opacity-30">
                <div className="h-10 w-px bg-slate-300 dashed border-l border-dashed" />
                <ArrowDown className="w-4 h-4 text-slate-300 absolute mt-12" />
              </div>
            )}
          </React.Fragment>
        ))}
        
        {/* Loading Footer */}
        <div className="pt-12 pb-4 text-center">
           <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-400 text-[10px] font-bold font-mono tracking-[0.2em] uppercase shadow-sm">
              <Search className="w-4 h-4 text-[#C2410C] animate-pulse" />
              Scanning for more signals...
           </div>
        </div>
      </div>
    </div>
  );
};