import * as React from 'react';
import { LeadCard } from '../LeadCard';
import { Button } from '../ui/button';
import { 
  Layout, 
  Zap, 
  ScanLine, 
  Signal, 
  Search, 
  Filter, 
  Clock, 
  ChevronDown 
} from 'lucide-react';

export const LandingDemoFeed = () => {
  return (
    <div className="w-full h-auto bg-slate-50 flex flex-col p-6 pb-12">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        
        {/* Stats Bar (The Pipeline) */}
        <div className="bg-white border border-slate-200 rounded-2xl h-24 flex items-stretch shadow-sm overflow-hidden shrink-0">
          
          {/* Item 1: Total Leads (Active) */}
          <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-100 px-4 bg-slate-50 border-b-2 border-b-[#C2410C]">
            <div className="flex items-center gap-2 mb-2">
               <Layout className="w-3.5 h-3.5 text-slate-400" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Total Leads</span>
            </div>
            <div className="text-3xl font-mono font-bold text-slate-900 tracking-tighter leading-none">1,240</div>
          </div>

          {/* Item 2: New */}
          <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-100 px-4 hover:bg-slate-50/50 transition-colors cursor-default">
            <div className="flex items-center gap-2 mb-2">
               <Zap className="w-3.5 h-3.5 text-[#C2410C]" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">New</span>
            </div>
            <div className="text-3xl font-mono font-bold text-slate-900 tracking-tighter leading-none">45</div>
          </div>

          {/* Item 3: Potential */}
          <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-100 px-4 hover:bg-slate-50/50 transition-colors cursor-default">
            <div className="flex items-center gap-2 mb-2">
               <ScanLine className="w-3.5 h-3.5 text-amber-600" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Potential</span>
            </div>
            <div className="text-3xl font-mono font-bold text-amber-600 tracking-tighter leading-none">12</div>
          </div>

          {/* Item 4: Top Matches */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 hover:bg-slate-50/50 transition-colors cursor-default">
            <div className="flex items-center gap-2 mb-2">
               <Signal className="w-3.5 h-3.5 text-emerald-600" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Top Matches</span>
            </div>
            <div className="text-3xl font-mono font-bold text-emerald-600 tracking-tighter leading-none">18</div>
          </div>

        </div>

        {/* Control Strip (Search & Filters) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-[#C2410C]" />
            <input 
              type="text" 
              placeholder="Search within filtered leads..." 
              className="w-full h-12 pl-11 pr-4 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] bg-white shadow-sm font-medium transition-all placeholder:text-slate-400 text-slate-700"
              readOnly
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="rounded-full border-slate-200 h-12 px-6 flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-600 font-medium flex-1 md:flex-none justify-center">
              <Filter className="w-3.5 h-3.5" /> 
              Show All 
              <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
            </Button>
            <Button variant="outline" className="rounded-full border-slate-200 h-12 px-6 flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-600 font-medium flex-1 md:flex-none justify-center">
              <Clock className="w-3.5 h-3.5" /> 
              Last 24h 
              <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1" />
            </Button>
          </div>
        </div>

        {/* Leads Feed */}
        <div className="space-y-6">
          {/* Card 1: High Intent */}
          <LeadCard 
            id="demo-1"
            intent_score={9.8}
            source_subreddit="r/SaaS"
            username="active_buyer_99"
            time_ago="14m ago"
            post_title="We are leaving [Competitor]. Need a cheaper alternative ASAP."
            post_content="I've been using Baremetrics but the pricing is getting ridiculous for our stage. I need something cheaper than Baremetrics that still gives me good cohort analysis and high-fidelity metrics. We need to switch by next week."
            relevance_summary="Direct Intent. User is explicitly churning from a competitor and has budget."
            problem_statement_detail="Unsustainable Pricing"
            urgency_signals_detail="Immediate Churn"
            competitors_mentioned="Baremetrics"
            product_name="Plausible"
            buying_stage="Actively Shopping"
            sentiment="High Urgency"
            initiallyExpanded={true}
            noAnimation={true}
          />

          {/* Card 2: Medium Intent */}
          <LeadCard 
            id="demo-2"
            intent_score={6.4}
            source_subreddit="r/marketing"
            username="growth_seeker"
            time_ago="2h ago"
            post_title="How do you handle custom cohort tracking? Spreadsheet is messy."
            post_content="I'm currently trying to track our retention in Google Sheets but it's becoming a full-time job. How do people automate this without spending $500/mo on enterprise tools? Just looking for a simpler workflow."
            relevance_summary="Indirect Intent. User has the specific pain point but is not actively shopping. Opportunity to educate."
            problem_statement_detail="Manual Workflow Friction"
            urgency_signals_detail="Process Optimization"
            competitors_mentioned="Google Sheets"
            product_name="Plausible"
            buying_stage="Problem Aware"
            sentiment="Solution Seeking"
            initiallyExpanded={false}
            noAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};