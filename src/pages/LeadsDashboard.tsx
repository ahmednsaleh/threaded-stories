import * as React from 'react';
import { Button } from '../components/ui/button';
import { 
  Plus,
  Activity,
  Target,
  BarChart2,
  ListFilter
} from 'lucide-react';
import { cn } from '../lib/utils';

type ChangeType = 'positive' | 'negative' | 'neutral';

// Sub-component for a metric card
const MetricCard = ({ title, value, change, changeType, icon: Icon }: { title: string, value: string, change: string, changeType: ChangeType, icon: React.ElementType }) => {
  const changeStyles: Record<ChangeType, string> = {
    positive: "text-emerald-600 bg-emerald-50 border-emerald-200",
    negative: "text-rose-600 bg-rose-50 border-rose-200",
    neutral: "text-slate-600 bg-slate-100 border-slate-200",
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{title}</span>
        <Icon className="w-4 h-4 text-slate-300" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold font-mono text-[#2C3E50] tracking-tighter tabular-nums">
          {value}
        </span>
        <span className={cn("text-xs font-mono font-medium px-1.5 py-0.5 rounded border", changeStyles[changeType])}>
          {change}
        </span>
      </div>
    </div>
  );
};

// Sub-component for a placeholder lead card
const LeadPlaceholder = () => (
  <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 animate-pulse select-none">
    <div className="flex items-start gap-4">
      {/* Score badge placeholder */}
      <div className="flex-shrink-0 pt-0.5">
        <div className="w-28 h-6 bg-slate-100 rounded-full"></div>
      </div>
      {/* Content placeholder */}
      <div className="flex-1 min-w-0">
        <div className="w-3/5 h-4 bg-slate-200 rounded mb-4"></div>
        <div className="bg-slate-50 border border-slate-100 rounded-md p-3 flex gap-2.5 items-start">
          <div className="w-4 h-4 bg-slate-200 rounded-full mt-0.5 flex-shrink-0"></div>
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded w-4/5"></div>
          </div>
        </div>
      </div>
      {/* Chevron placeholder */}
      <div className="pl-2">
         <div className="w-5 h-5 bg-slate-100 rounded-full"></div>
      </div>
    </div>
  </div>
);


export default function LeadsDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
        
        {/* SECTION A: DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#2C3E50]">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Welcome back. Here is the latest intelligence from your missions.
            </p>
          </div>
          <Button className="bg-[#C2410C] hover:bg-[#A3360A] text-white font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" /> New Mission
          </Button>
        </div>

        {/* SECTION B: STATUS & METRICS */}
        
        {/* Calm Status Banner */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between mb-6">
           <div className="flex items-center gap-3">
             <div className="relative flex h-2.5 w-2.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
             </div>
             <span className="text-sm font-bold font-mono text-[#2C3E50] tracking-tight">LIVE HUNTING</span>
           </div>
           <span className="text-xs font-mono text-slate-400">Last scan: 32s ago</span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MetricCard title="Leads (24h)" value="42" change="+12%" changeType="positive" icon={BarChart2} />
          <MetricCard title="High Intent" value="18" change="+5" changeType="positive" icon={Target} />
          <MetricCard title="Avg Score" value="8.9" change="-0.2" changeType="negative" icon={Activity} />
        </div>

        {/* SECTION C: THE FEED */}
        <div className="space-y-4">
          
          {/* Feed Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-lg font-bold text-[#2C3E50]">Incoming Leads</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ListFilter className="w-3 h-3" />
              <span>Sort by: Newest</span>
            </div>
          </div>

          {/* The List of Placeholders */}
          <div className="space-y-3 pt-4">
            <LeadPlaceholder />
            <LeadPlaceholder />
            <LeadPlaceholder />
          </div>

        </div>
    </div>
  );
}