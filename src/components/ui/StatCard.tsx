import * as React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

export type TrendType = 'positive' | 'negative' | 'neutral';

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendType?: TrendType;
  icon?: React.ElementType;
  valueColor?: string;
  className?: string;
}

const trendStyles: Record<TrendType, string> = {
  positive: "text-emerald-600 bg-emerald-50 border-emerald-200",
  negative: "text-rose-600 bg-rose-50 border-rose-200",
  neutral: "text-slate-500 bg-slate-100 border-slate-200",
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  trendType = 'neutral',
  icon: Icon,
  valueColor,
  className
}) => {
  return (
    <div className={cn(
      "bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm transition-all hover:shadow-md hover:border-slate-300 flex flex-col justify-between h-full",
      className
    )}>
      {/* Top row: Title and Icon */}
      <div className="flex items-start justify-between mb-6">
        <span className="text-lg font-semibold text-slate-600 font-sans">
          {title}
        </span>
        {Icon && <Icon className="w-6 h-6 text-slate-300" />}
      </div>

      {/* Bottom row: Value and Trend */}
      <div className="flex items-end justify-between mt-auto">
        <span className={cn(
          "text-4xl font-bold font-mono tracking-tighter tabular-nums leading-none",
          valueColor ? valueColor : "text-slate-900"
        )}>
          {value}
        </span>
        
        {trend && (
          <span className={cn(
            "text-sm font-mono font-medium px-2.5 py-1 rounded border mb-1 flex items-center justify-center",
            trendStyles[trendType]
          )}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};