import * as React from 'react';
import { StatCard } from './ui/StatCard';
import { Sparkles, Target, Scale, Clock } from 'lucide-react';

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="NEW LEADS (24H)"
        value="14"
        trend="+3"
        trendType="positive"
        icon={Sparkles}
      />
      <StatCard
        title="HIGH INTENT"
        value="3"
        trend="+1"
        trendType="positive"
        icon={Target}
      />
      <StatCard
        title="AVG SCORE"
        value="7.2"
        trend="+0.1"
        trendType="positive"
        icon={Scale}
      />
      <StatCard
        title="TIME SAVED"
        value="4.5h"
        trend=""
        trendType="neutral"
        icon={Clock}
      />
    </div>
  );
};