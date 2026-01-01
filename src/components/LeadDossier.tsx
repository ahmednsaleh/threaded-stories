import * as React from 'react';
import { 
  Sparkles, 
  HeartCrack, 
  Target, 
  Flame, 
  Swords, 
  ExternalLink, 
  Trash2,
  Copy,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export interface LeadDossierProps {
  id: string;
  intent_score: number;
  source_subreddit: string;
  created_utc: string;
  relevance_summary: string;
  post_title: string;
  post_content: string;
  problem_statement_detail: string;
  user_goal: string;
  urgency_signals_detail: string;
  competitors_mentioned: string;
  suggested_reply_hook: string;
  onReject?: (id: string) => void;
  className?: string;
}

export const LeadDossier: React.FC<LeadDossierProps> = ({
  id,
  intent_score,
  source_subreddit,
  created_utc,
  relevance_summary,
  post_title,
  post_content,
  problem_statement_detail,
  user_goal,
  urgency_signals_detail,
  competitors_mentioned,
  suggested_reply_hook,
  onReject,
  className
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(suggested_reply_hook);
    setCopied(true);
    toast.success("Hook copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const scoreColorClass = intent_score >= 8 
    ? "text-emerald-600 bg-emerald-50 border-emerald-100" 
    : "text-amber-600 bg-amber-50 border-amber-100";

  return (
    <div className={cn(
      "w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-8 mb-8 flex flex-col gap-8",
      className
    )}>
      {/* ZONE 1: THE HEADER */}
      <div className="flex items-center justify-between">
        <div className={cn(
          "text-3xl font-bold font-mono px-5 py-2 rounded-xl border tabular-nums",
          scoreColorClass
        )}>
          {intent_score.toFixed(1)}
        </div>
        <div className="flex flex-col items-end">
          <div className="text-slate-400 font-mono text-sm uppercase tracking-widest font-bold">
            {source_subreddit}
          </div>
          <div className="text-slate-300 font-mono text-xs mt-1">
            {created_utc}
          </div>
        </div>
      </div>

      {/* ZONE 2: THE WHY */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[#C2410C]" />
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Why it's a match
          </h4>
        </div>
        <p className="text-lg text-slate-800 leading-relaxed font-medium">
          {relevance_summary}
        </p>
      </div>

      {/* ZONE 3: THE DEEP DIVE (Structured Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pain Card */}
        <div className="border border-slate-100 rounded-xl p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <HeartCrack className="w-4 h-4 text-rose-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Core Pain</span>
          </div>
          <p className="text-base font-semibold text-slate-900 leading-tight">
            {problem_statement_detail}
          </p>
        </div>

        {/* Goal Card */}
        <div className="border border-slate-100 rounded-xl p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">User Goal</span>
          </div>
          <p className="text-base font-semibold text-slate-900 leading-tight">
            {user_goal}
          </p>
        </div>

        {/* Urgency Card */}
        <div className="border border-slate-100 rounded-xl p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Urgency</span>
          </div>
          <p className="text-base font-semibold text-slate-900 leading-tight">
            {urgency_signals_detail}
          </p>
        </div>

        {/* Competitor Card */}
        <div className="border border-slate-100 rounded-xl p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Competitor</span>
          </div>
          <p className="text-base font-semibold text-slate-900 leading-tight">
            {competitors_mentioned}
          </p>
        </div>
      </div>

      {/* ZONE 4: THE SOURCE MATERIAL */}
      <div className="border-t border-slate-100 pt-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
          {post_title}
        </h3>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 leading-relaxed font-normal whitespace-pre-wrap">
            {post_content}
          </p>
        </div>
      </div>

      {/* ZONE 5: THE ACTION (Assistant) */}
      <div className="mt-4 border-t border-slate-100 pt-8 flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-mono">
              Suggested Hook
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-900 font-mono text-xs uppercase"
            >
              {copied ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 shadow-inner">
            <p className="text-slate-800 font-mono text-base leading-relaxed italic">
              "{suggested_reply_hook}"
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-2">
          <Button 
            variant="ghost" 
            size="lg"
            onClick={() => onReject?.(id)}
            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold uppercase tracking-wide px-8 h-12"
          >
            <Trash2 className="w-5 h-5 mr-2" /> Reject
          </Button>
          <Button 
            size="lg"
            className="bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold uppercase tracking-wide rounded-full px-10 h-12 shadow-lg hover:shadow-xl transition-all"
          >
            Open on Reddit <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};