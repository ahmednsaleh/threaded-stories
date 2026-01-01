import * as React from 'react';
import { Globe, Zap, Filter } from 'lucide-react';

export const SystemStatus = () => {
  return (
    <div className="w-full bg-[#FAFAFA] border-y border-slate-200">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-slate-200">
          
          <div className="flex flex-col items-center md:items-start md:px-8 first:pl-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Globe className="w-3 h-3" /> Subreddits
            </span>
            <span className="text-2xl font-bold font-mono text-[#2C3E50] tracking-tighter tabular-nums">
              11,403
            </span>
          </div>

          <div className="flex flex-col items-center md:items-start md:px-8">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Zap className="w-3 h-3" /> Leads Today
            </span>
            <span className="text-2xl font-bold font-mono text-[#2C3E50] tracking-tighter tabular-nums">
              1,247
            </span>
          </div>

          <div className="flex flex-col items-center md:items-start md:px-8">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Filter className="w-3 h-3" /> Noise Filtered
            </span>
            <span className="text-2xl font-bold font-mono text-[#2C3E50] tracking-tighter tabular-nums">
              98.4%
            </span>
          </div>

          <div className="flex flex-col items-center md:items-start md:px-8">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              Status
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-bold font-mono text-[#2C3E50] tracking-tight">
                OPERATIONAL
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};