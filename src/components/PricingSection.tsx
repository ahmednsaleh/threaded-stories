import * as React from 'react';
import { Button } from './ui/button';
import { Check, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface FeatureItem {
  text: string;
  highlight?: string;
  suffix?: string;
}

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false,
  buttonText = "Get Started",
  onAction 
}: { 
  title: string, 
  price: string, 
  description: string, 
  features: FeatureItem[], 
  isPopular?: boolean,
  buttonText?: string,
  onAction: () => void
}) => (
  <div className={cn(
    "relative flex flex-col p-8 rounded-2xl transition-all duration-300 h-full",
    isPopular 
      ? "bg-white border-2 border-[#C2410C] shadow-2xl shadow-[#C2410C]/10 z-10 scale-105 md:scale-105" 
      : "bg-white border border-slate-200 shadow-sm hover:border-slate-300"
  )}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C2410C] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm flex items-center gap-1.5">
        <Zap className="w-3 h-3 fill-current" /> Most Popular
      </div>
    )}
    
    <div className="mb-8">
      <h3 className="text-lg font-bold text-[#2C3E50] mb-2">{title}</h3>
      <p className="text-sm text-slate-500 min-h-[40px] leading-relaxed">
        {description}
      </p>
    </div>

    <div className="mb-8 pb-8 border-b border-slate-100">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold font-mono text-[#2C3E50] tracking-tighter">{price}</span>
        <span className="text-slate-400 font-medium text-sm">/month</span>
      </div>
    </div>

    <ul className="space-y-4 mb-8 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700 font-sans">
          <Check className={cn(
            "w-5 h-5 flex-shrink-0",
            isPopular ? "text-[#C2410C]" : "text-slate-400"
          )} />
          <span>
            {feature.highlight && (
              <span className="font-bold text-[#2C3E50]">{feature.highlight}</span>
            )}
            {feature.suffix || feature.text}
          </span>
        </li>
      ))}
    </ul>

    <Button 
      onClick={onAction}
      className={cn(
        "w-full rounded-full h-12 font-bold text-base transition-all duration-200",
        isPopular 
          ? "bg-[#C2410C] hover:bg-[#A3360A] text-white shadow-lg shadow-[#C2410C]/20 hover:shadow-xl hover:-translate-y-0.5" 
          : "bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      )}
    >
      {buttonText}
    </Button>
  </div>
);

export const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-white border-y border-slate-200">
      <div className="container mx-auto px-6 max-w-7xl">
         <div className="text-center max-w-3xl mx-auto mb-12">
           <div className="inline-block px-3 py-1 mb-4 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest border border-slate-200">
              Simple Pricing
           </div>
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2C3E50] mb-4">
             Pay for results, not noise.
           </h2>
           <p className="text-slate-500 text-xl mt-4">
             Two simple plans. Cancel anytime.
           </p>
         </div>
         
         <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            {/* Tier 1: Starter Hunter (Most Popular) */}
            <PricingCard 
              title="Starter Hunter" 
              price="$29" 
              isPopular={true}
              description="Perfect for bootstrappers and solo founders validating an idea."
              features={[
                { text: "1 Active Product Slot" }, 
                { text: "Unlimited Lead Scanning" }, 
                { text: "Hourly AI Scans (Real-time)" }, 
                { highlight: "Self-Healing AI", suffix: ": Auto-learns from feedback" }, 
                { text: "Manual Reply Links" }
              ]}
              buttonText="Start Hunting"
              onAction={() => navigate('/auth')}
            />
            
            {/* Tier 2: Pro Hunter */}
            <PricingCard 
              title="Pro Hunter" 
              price="$49" 
              isPopular={false}
              description="For serious builders and agencies ready to scale their outreach."
              features={[
                { text: "Everything in Starter, plus:" },
                { text: "3 Active Product Slots" }, 
                { text: "Real-time Alerts & Slack Integration" },
                { text: "Advanced Matching Logic" },
                { text: "Priority Support" }
              ]}
              buttonText="Upgrade to Pro"
              onAction={() => navigate('/auth')}
            />
         </div>
      </div>
    </section>
  );
};