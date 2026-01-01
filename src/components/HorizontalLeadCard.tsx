
import * as React from 'react';
import { useState } from 'react';
import { 
  ChevronDown, 
  Sparkles, 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink, 
  Flame, 
  Target, 
  CheckCircle2,
  Smile,
  Meh,
  Frown,
  Signal,
  Activity,
  ScanLine
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface HorizontalLeadCardProps {
  subreddit?: string;
  title?: string;
  description?: string;
  matchScore?: number;
  intent?: 'High' | 'Medium' | 'Low';
  matchReason?: string;
  painPoint?: string;
  buyingStage?: string;
  urgency?: string;
  competitor?: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  suggestedReply?: string;
  highlightPhrase?: string;
  className?: string;
  initiallyExpanded?: boolean;
}

export const HorizontalLeadCard: React.FC<HorizontalLeadCardProps> = ({ 
  subreddit = "r/SaaS",
  title = "Looking for a churn reduction tool that isn't overpriced.",
  description = "I've been using Baremetrics but the pricing is getting ridiculous for our stage. I need something cheaper than Baremetrics that still gives me good cohort analysis.",
  matchScore = 8.7,
  intent = "High",
  matchReason = "User is frustrated by [High Costs] and mentions [limited budget].",
  painPoint = "High Churn",
  buyingStage = "Consideration",
  urgency = "High",
  competitor = "Baremetrics",
  sentiment = "Negative",
  suggestedReply = "Try opening with: 'I saw you mentioned Baremetrics pricing...'",
  highlightPhrase = "cheaper than Baremetrics",
  className,
  initiallyExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const handleFeedback = (type: 'positive' | 'negative', e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Feedback recorded. Tuning agent...", {
      description: type === 'positive' ? "Marked as relevant." : "Marked as irrelevant."
    });
  };

  const renderDescription = () => {
    if (!highlightPhrase || !description) return description;
    const parts = description.split(highlightPhrase);
    if (parts.length < 2) return description;
    
    return (
      <span>
        {parts[0]}
        <span className="bg-yellow-100 text-slate-900 font-semibold px-0.5 rounded box-decoration-clone">
          {highlightPhrase}
        </span>
        {parts[1]}
      </span>
    );
  };

  // Intent Styles
  const intentConfig = {
    High: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-orange-50 text-orange-700 border-orange-200",
    Low: "bg-slate-50 text-slate-700 border-slate-200"
  };

  const sentimentIcon = {
    Positive: <Smile className="w-5 h-5 text-emerald-500 fill-emerald-400/20" />,
    Neutral: <Meh className="w-5 h-5 text-slate-400 fill-slate-100" />,
    Negative: <Frown className="w-5 h-5 text-rose-500 fill-rose-400/20" />
  };

  return (
    <div 
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-xl shadow-sm transition-all duration-300 overflow-hidden group hover:shadow-md hover:border-slate-300",
        isExpanded ? "ring-1 ring-[#E2E8F0]" : "",
        className
      )}
    >
      {/* 1. COLLAPSED HEADER (Horizontal Strip) */}
      <div 
        className="flex items-center p-5 cursor-pointer min-h-[110px] gap-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Zone 1: Score & Subreddit (Fixed Width) */}
        <div className="flex flex-col items-center justify-center w-20 gap-2 flex-shrink-0">
          <div className={cn(
            "px-3 py-1.5 rounded-full text-base font-bold font-mono border whitespace-nowrap flex items-center gap-1",
            intentConfig[intent] || intentConfig.High
          )}>
            {intent === 'High' ? <Signal className="w-3.5 h-3.5" /> : (intent === 'Medium' ? <ScanLine className="w-3.5 h-3.5" /> : null)}
            {matchScore}
          </div>
          <span className="text-xs font-bold text-slate-500">{subreddit}</span>
        </div>

        {/* Zone 2: Content Summary (Flexible) */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
          <h3 className="text-[#2C3E50] font-bold text-lg leading-tight truncate pr-4">
            {title}
          </h3>
          
          {/* Why it's a match - Single Line Integrated */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 max-w-fit">
            <Sparkles className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700 truncate max-w-[300px] md:max-w-none">
              {matchReason}
            </span>
          </div>
        </div>

        {/* Zone 3: Signal Beads (Icons Only) */}
        <div className="hidden md:flex items-center gap-4 px-6 border-l border-r border-slate-100 h-16">
           <div className="group/bead relative p-2 rounded-full hover:bg-slate-50 transition-colors cursor-help">
              <Signal className="w-5 h-5 text-[#10B981]" />
           </div>
           <div className="group/bead relative p-2 rounded-full hover:bg-slate-50 transition-colors cursor-help">
              <ScanLine className="w-5 h-5 text-[#D97706]" />
           </div>
           <div className="group/bead relative p-2 rounded-full hover:bg-slate-50 transition-colors cursor-help">
              {sentimentIcon[sentiment || 'Neutral']}
           </div>
        </div>

        {/* Zone 4: Actions */}
        <div className="flex items-center gap-2 pl-2">
           <Button 
             variant="ghost" 
             size="icon" 
             className="text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full"
             onClick={(e) => handleFeedback('positive', e)}
           >
             <ThumbsUp className="w-5 h-5" />
           </Button>
           <Button 
             variant="ghost" 
             size="icon" 
             className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full"
             onClick={(e) => handleFeedback('negative', e)}
           >
             <ThumbsDown className="w-5 h-5" />
           </Button>
           <div className="w-px h-8 bg-slate-200 mx-2"></div>
           <Button 
             variant="ghost" 
             size="icon" 
             className="text-slate-400 hover:text-[#2C3E50] hover:bg-slate-100 rounded-full"
           >
             <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isExpanded && "rotate-180")} />
           </Button>
        </div>
      </div>

      {/* 2. EXPANDED CONTENT (Slide Down) */}
      {isExpanded && (
        <div className="px-6 pb-6 md:px-8 md:pb-8 md:pl-[104px] animate-in slide-in-from-top-2 duration-300 ease-out border-t border-slate-50 pt-6">
          
          {/* Full Signal Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
               <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">Pain Point</span>
               <div className="flex items-center gap-2 text-base font-semibold text-[#2C3E50]">
                 <CheckCircle2 className="w-4 h-4 text-[#10B981] fill-[#10B981]/20" /> {painPoint}
               </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
               <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">Buying Stage</span>
               <div className="flex items-center gap-2 text-base font-semibold text-[#2C3E50]">
                 <Target className="w-4 h-4 text-[#D97706] fill-[#D97706]/20" /> {buyingStage}
               </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
               <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">Urgency</span>
               <div className="flex items-center gap-2 text-base font-semibold text-[#2C3E50]">
                 <Flame className="w-4 h-4 text-[#C2410C] fill-[#C2410C]/20" /> {urgency}
               </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
               <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">Competitor</span>
               <div className="text-base font-semibold text-[#2C3E50]">
                 {competitor}
               </div>
            </div>
          </div>

          {/* Full Body Text */}
          <div className="prose prose-slate max-w-none bg-slate-50/50 p-6 rounded-xl border border-slate-100 mb-8">
            <p className="text-slate-800 text-base leading-relaxed m-0 font-medium">
              {renderDescription()}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-slate-100 pt-6">
            <div className="text-base text-slate-600 italic font-medium">
               <span className="font-bold text-slate-800 not-italic mr-2">Suggested Hook:</span>
               "{suggestedReply}"
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
               <Button variant="ghost" className="flex-1 md:flex-none text-slate-500 hover:text-[#2C3E50] font-medium rounded-full">
                 Mark as Contacted
               </Button>
               <Button className="flex-1 md:flex-none bg-[#C2410C] hover:bg-[#A3360A] text-white shadow-sm font-semibold rounded-full px-6">
                 Reply on Reddit <ExternalLink className="w-4 h-4 ml-2" />
               </Button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
