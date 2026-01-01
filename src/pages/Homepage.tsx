import * as React from 'react';
import { AdaptiveEngine } from '../components/AdaptiveEngine';
import { SignalVsNoise } from '../components/SignalVsNoise';
import { NavBar } from '../components/NavBar';
import { FooterSection } from '../components/FooterSection';
import { PricingSection } from '../components/PricingSection';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { CtaSection } from '../components/CtaSection';
import { LandingHero } from '../components/LandingHero';
import { OnboardingFlow } from '../components/OnboardingFlow';
import { ProductShowcase } from '../components/ProductShowcase';

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#E2E8F0] last:border-0">
      <button 
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[#2C3E50] font-bold text-lg group-hover:text-[#C2410C] transition-colors pr-8">
          {question}
        </span>
        <ChevronDown className={cn("w-5 h-5 text-slate-300 transition-transform duration-300", isOpen && "rotate-180 text-[#C2410C]")} />
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[500px] opacity-100 pb-6" : "max-h-0 opacity-0"
      )}>
        <p className="text-slate-600 text-base leading-relaxed pr-8 font-medium">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function Homepage() {
  const [view, setView] = useState<'hero' | 'onboarding'>('hero');
  const [analyzedUrl, setAnalyzedUrl] = useState<string>('');

  const handleStartHunting = (url: string) => {
    console.log(`Analyzing URL: ${url}`);
    setAnalyzedUrl(url);
    setView('onboarding');
  };

  if (view === 'onboarding') {
    return <OnboardingFlow initialUrl={analyzedUrl} />;
  }
  
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2C3E50] font-sans selection:bg-[#C2410C]/20 overflow-x-hidden">
      
      <NavBar />

      {/* Hero Section */}
      <LandingHero onStartHunting={handleStartHunting} />

      {/* Product Showcase (Hero Graphic) */}
      <ProductShowcase />

      {/* Signal vs Noise */}
      <SignalVsNoise />

      {/* How It Works (Engine) */}
      <AdaptiveEngine />

      {/* Pricing */}
      <PricingSection />

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="text-center mb-12">
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2C3E50] mb-4">
               Frequently Asked Questions
             </h2>
             <p className="text-slate-500 text-xl mt-4">Everything you need to know about the hunter.</p>
           </div>
           <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E2E8F0] p-10 shadow-sm">
             <div className="divide-y divide-[#E2E8F0]">
               <FAQItem 
                 question="Will using Threaddits get me banned?" 
                 answer={
                   <>
                     No. Threaddits is a <strong className="font-bold text-slate-900">surgical listening tool</strong>, not a spam bot. We identify high-intent conversations and draft the replies, but <em className="italic">you</em> take the final action. Since you are posting manually (or approving via our interface) and adding genuine value, you remain 100% safe and compliant with Reddit's TOS.
                   </>
                 }
               />
               <FAQItem 
                 question="Does the system auto-post for me?" 
                 answer={
                   <>
                     Never. Automation without supervision is the fastest way to lose reputation. Threaddits acts as your <strong className="font-bold text-slate-900">Command Center</strong>—we find the lead and write the draft, but you hold the trigger. This ensures your brand always sounds human, not robotic.
                   </>
                 }
               />
               <FAQItem 
                 question="How do you know they are ready to buy?" 
                 answer={
                   <>
                     Keywords aren't enough. Someone saying "I hate HubSpot" is different from "I need a HubSpot alternative." Our AI analyzes <strong className="font-bold text-slate-900">sentiment and context</strong> to filter out complainers, students, and researchers, delivering only leads with active buying intent.
                   </>
                 }
               />
               <FAQItem 
                 question="How many leads will I get daily?" 
                 answer={
                   <>
                     We prioritize <strong className="font-bold text-slate-900">signal over noise</strong>. Instead of flooding you with 50 low-quality alerts, Threaddits filters out 90% of the clutter. Expect fewer, higher-quality notifications that are actually worth your time to pursue.
                   </>
                 }
               />
               <FAQItem 
                 question="Does this work for B2B SaaS?" 
                 answer={
                   <>
                     Absolutely. Reddit is the largest forum on the internet, hosting thousands of professional communities like r/SaaS, r/marketing, and r/sysadmin. It is currently the most under-tapped channel for B2B customer acquisition.
                   </>
                 }
               />
             </div>
           </div>
        </div>
      </section>

      <CtaSection />

      <FooterSection />

    </div>
  );
}