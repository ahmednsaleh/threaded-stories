import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

export const InsightHero = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl p-6 mx-auto",
        className
      )}
    >
      {/* Header Row */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <span className="text-emerald-700 text-xs font-bold tracking-wider uppercase">
          MATCH INTELLIGENCE FOR PLAUSIBLE
        </span>
      </div>

      {/* Main Insight (The "Why") */}
      <p className="mt-3 text-slate-900 text-lg font-medium leading-snug">
        User is aware that a solution (Reddit outreach) exists but is sensitive to the high cost of current channels.
      </p>

      {/* Tags Footer (The "What") */}
      <div className="mt-4 flex flex-wrap gap-3">
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
          🔥 Pain: High Cost
        </span>
        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
          🎯 Intent: Solution Aware
        </span>
      </div>
    </div>
  );
};