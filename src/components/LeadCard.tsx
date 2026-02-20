
import * as React from 'react';
import { 
  Sparkles, 
  HeartCrack, 
  Flame, 
  Swords, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronDown,
  Copy,
  Check,
  Loader2,
  Trophy,
  Mail,
  Send,
  Ban,
  Signal,
  ExternalLink,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { useUpdateLeadStatus, useUpdateLeadFeedback } from '../hooks/useLeadMutations';

export interface LeadCardProps {
  id: string;
  intent_score: number;
  source_subreddit: string;
  username: string;
  time_ago: string;
  post_title: string;
  post_content: string;
  relevance_summary: string;
  problem_statement_detail: string;
  urgency_signals_detail: string;
  competitors_mentioned?: string;
  product_name?: string;
  product_id?: string;
  buying_stage?: string;
  sentiment?: string;
  status?: string;
  initiallyExpanded?: boolean;
  className?: string;
  post_url?: string;
  noAnimation?: boolean;
}

const renderHighlightedSummary = (text: string, competitors: string) => {
  if (!competitors || competitors === "No direct competitors mentioned" || competitors === "None") return text;
  const compList = competitors.split(',').map(c => c.trim()).filter(c => c.length > 0);
  if (compList.length === 0) return text;
  const regex = new RegExp(`(${compList.join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) => {
    const isMatch = compList.some(c => c.toLowerCase() === part.toLowerCase());
    return isMatch ? <span key={i} className="bg-yellow-100 text-slate-900 font-bold px-0.5 rounded box-decoration-clone">{part}</span> : part;
  });
};

const funnelStatuses = [
  { id: 'New', label: 'New', color: 'bg-blue-500', icon: Mail },
  { id: 'Contacted', label: 'Contacted', color: 'bg-amber-400', icon: Send },
  { id: 'Won', label: 'Won', color: 'bg-emerald-500', icon: Trophy },
  { id: 'Rejected', label: 'Rejected', color: 'bg-slate-400', icon: Ban },
] as const;

type FunnelStatus = typeof funnelStatuses[number]['id'];

export const LeadCard: React.FC<LeadCardProps> = ({ 
  id,
  username,
  intent_score,
  source_subreddit,
  time_ago,
  post_title,
  post_content,
  relevance_summary,
  problem_statement_detail,
  urgency_signals_detail,
  competitors_mentioned = "None",
  product_name = "Threaddits",
  product_id,
  buying_stage = "Actively Shopping",
  sentiment = "High Urgency",
  status = "New",
  className,
  post_url = "https://reddit.com",
  noAnimation = false
}) => {
  const [isDraftVisible, setIsDraftVisible] = React.useState(false);
  const [isDrafting, setIsDrafting] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState<FunnelStatus>(status as FunnelStatus);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);

  // Mutations
  const updateStatus = useUpdateLeadStatus();
  const updateFeedback = useUpdateLeadFeedback();

  // Sync status from props
  React.useEffect(() => {
    setCurrentStatus(status as FunnelStatus);
  }, [status]);

  const cleanSubreddit = source_subreddit.startsWith('r/') ? source_subreddit : `r/${source_subreddit}`;

  const aiDraft = `Hi u/${username}, saw your post on ${cleanSubreddit} about "${post_title}". \n\nIt sounds like ${problem_statement_detail.toLowerCase()} is a major bottleneck right now. Since you're looking for a better way to handle this, you might find ${product_name} useful.\n\nWould love to know if this fits your current workflow!`;

  const handleDraftToggle = () => {
    if (!isDraftVisible) {
      setIsDrafting(true);
      setTimeout(() => {
        setIsDrafting(false);
        setIsDraftVisible(true);
      }, 800);
    } else {
      setIsDraftVisible(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusChange = (newStatus: FunnelStatus) => {
    setCurrentStatus(newStatus);
    setIsStatusMenuOpen(false);
    updateStatus.mutate({ leadId: id, status: newStatus });
  };

  const handleGoodLead = () => {
    updateFeedback.mutate({ leadId: id, feedback: 'good' });
  };

  const handleBadLead = () => {
    setIsDismissed(true);
    updateFeedback.mutate({ leadId: id, feedback: 'bad', postUrl: post_url, productId: product_id });
  };

  if (isDismissed) return null;

  return (
    <div 
      className={cn(
        "bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 relative group overflow-hidden",
        !noAnimation && "animate-in fade-in slide-in-from-bottom-4",
        className
      )}
    >
      {/* 1. Header Row (Flex) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        <div className="flex flex-wrap items-center gap-2">
           {/* Score Badge */}
           <div className={cn(
             "flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm border",
             intent_score >= 8 
               ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
               : intent_score >= 5 
                 ? "bg-amber-50 text-amber-700 border-amber-100"
                 : "bg-slate-50 text-slate-600 border-slate-200"
           )}>
             <Signal className="w-3.5 h-3.5" />
             {intent_score.toFixed(1)} {intent_score >= 8 ? 'STRONG SIGNAL' : intent_score >= 5 ? 'POTENTIAL' : 'LOW SIGNAL'}
           </div>
           
           {/* Tag 1: Buying Stage (Purple/Pink) */}
           <div className="px-2.5 py-1 rounded-full bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100 text-[10px] font-bold uppercase tracking-wide">
             {buying_stage}
           </div>

           {/* Tag 2: Urgency/Sentiment (Red/Orange) */}
           <div className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100 text-[10px] font-bold uppercase tracking-wide">
             {sentiment}
           </div>
        </div>

        {/* Feedback / Training Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
           <Button 
             variant="ghost" 
             size="sm" 
             className="h-8 px-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors flex items-center gap-1.5 border border-transparent hover:border-emerald-100" 
             onClick={handleGoodLead}
             disabled={updateFeedback.isPending}
           >
             <ThumbsUp className="w-3.5 h-3.5" />
             <span className="text-xs font-medium">Good Lead</span>
           </Button>
           
           <Button 
             variant="ghost" 
             size="sm" 
             onClick={handleBadLead}
             disabled={updateFeedback.isPending}
             className="h-8 px-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors flex items-center gap-1.5 border border-transparent hover:border-rose-100" 
           >
             <ThumbsDown className="w-3.5 h-3.5" />
             <span className="text-xs font-medium">Bad Lead</span>
           </Button>
        </div>
      </div>

      {/* 2. Title Section */}
      <div className="mb-6">
         <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2">{post_title}</h3>
         <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
            <span className="font-bold text-[#C2410C]">u/{username}</span>
            <span className="text-slate-300">•</span>
            <span className="font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{cleanSubreddit}</span>
            <span className="text-slate-300">•</span>
            <span>{time_ago}</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <a href={post_url} target="_blank" rel="noreferrer" className="hover:text-[#C2410C] flex items-center gap-1 transition-colors group/link ml-auto sm:ml-0">
               <ExternalLink className="w-3 h-3 group-hover/link:stroke-[#C2410C]" /> Open Thread
            </a>
         </div>
      </div>

      {/* 3. THE INTELLIGENCE BOX (The Brain) */}
      <div className="bg-gradient-to-r from-[#C2410C]/10 to-white rounded-r-lg border-l-4 border-[#C2410C] p-5 mb-6 shadow-sm">
         <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#C2410C]" />
            <span className="text-xs font-bold text-[#C2410C] uppercase tracking-widest">Match Intelligence for {product_name}</span>
         </div>
         
         <p className="text-sm text-slate-700 font-medium mb-6 leading-relaxed border-b border-[#C2410C]/10 pb-4">
           {relevance_summary}
         </p>

         {/* The Grid (3 Columns) */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {/* Col 1: Pain */}
            <div className="flex flex-col gap-1.5">
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                 <HeartCrack className="w-3 h-3 text-rose-400" /> Core Pain
               </div>
               <div className="text-xs font-bold text-slate-900 leading-snug">{problem_statement_detail}</div>
            </div>
            {/* Col 2: Urgency */}
            <div className="flex flex-col gap-1.5">
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                 <Flame className="w-3 h-3 text-orange-400" /> Urgency
               </div>
               <div className="text-xs font-bold text-slate-900 leading-snug">{urgency_signals_detail}</div>
            </div>
            {/* Col 3: Competitors */}
            <div className="flex flex-col gap-1.5">
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                 <Swords className="w-3 h-3 text-slate-400" /> Competitors
               </div>
               <div className="text-xs font-bold text-slate-900 leading-snug">{competitors_mentioned}</div>
            </div>
         </div>
      </div>

      {/* 4. The Quote */}
      <div className="pl-4 border-l-2 border-slate-200 mb-6">
         <p className="text-sm text-slate-600 italic leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
           "{renderHighlightedSummary(post_content, competitors_mentioned)}"
         </p>
      </div>

      {/* 5. Footer (Actions) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
         {/* Left: Status Dropdown */}
         <div className="relative">
           <Button 
             onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
             variant="outline" 
             className="h-9 text-xs font-bold text-slate-600 gap-2 rounded-full border-slate-200 pl-2 pr-3 bg-white hover:bg-slate-50"
             disabled={updateStatus.isPending}
           >
              <div className={cn("w-2 h-2 rounded-full", funnelStatuses.find(s => s.id === currentStatus)?.color || 'bg-blue-500')} />
              {funnelStatuses.find(s => s.id === currentStatus)?.label || currentStatus}
              <ChevronDown className="w-3 h-3 opacity-50 ml-1"/>
           </Button>

           {isStatusMenuOpen && (
             <div className="absolute bottom-full left-0 mb-2 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {funnelStatuses.map((statusItem) => (
                  <button
                    key={statusItem.id}
                    onClick={() => handleStatusChange(statusItem.id)}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <div className={cn("w-2 h-2 rounded-full", statusItem.color)} />
                    {statusItem.label}
                  </button>
                ))}
             </div>
           )}
         </div>

         {/* Right: Action Button */}
         {!isDraftVisible ? (
            <Button 
              onClick={handleDraftToggle}
              className={cn(
                 "bg-[#C2410C] hover:bg-[#A3360A] text-white rounded-full h-10 px-6 font-bold text-sm shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5",
                 isDrafting && "bg-slate-100 text-slate-400 hover:bg-slate-100 hover:translate-y-0 shadow-none"
              )}
              disabled={isDrafting}
            >
              {isDrafting ? (
                 <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Drafting...</>
              ) : (
                 <><Zap className="w-4 h-4 mr-2 fill-white" /> Draft Reply</>
              )}
            </Button>
         ) : (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 w-full sm:w-auto">
               <Button variant="ghost" size="sm" onClick={() => setIsDraftVisible(false)} className="text-slate-500 hover:text-slate-800">Cancel</Button>
               <Button onClick={handleCopy} className="bg-slate-900 text-white rounded-full h-9 px-4 font-bold text-xs">
                  {copied ? <Check className="w-3 h-3 mr-2" /> : <Copy className="w-3 h-3 mr-2" />}
                  {copied ? 'Copied' : 'Copy'}
               </Button>
            </div>
         )}
      </div>

      {/* AI Draft Area (Conditional) */}
      {isDraftVisible && !isDrafting && (
         <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-2">
               <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono flex items-center gap-1">
                 <Sparkles className="w-3 h-3" /> AI Suggestion
               </span>
               <a href={post_url} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono hover:text-[#C2410C] flex items-center gap-1">
                 Reply on Reddit <ExternalLink className="w-3 h-3" />
               </a>
            </div>
            <p className="text-sm text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
              {aiDraft}
            </p>
         </div>
      )}
    </div>
  );
};
