import * as React from 'react';
import { cn } from '../lib/utils';
import { LandingDemoFeed } from './landing/LandingDemoFeed';

export const ProductShowcase = () => {
  return (
    <section className="pt-0 pb-32 bg-[#FAFAFA] overflow-visible relative">
      {/* Background Data Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#2C3E50 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      <div className="container mx-auto px-6 relative z-30">
        
        {/* Wrapper for Levitation & Glow */}
        <div className="relative z-20 -mt-80 max-w-5xl mx-auto">
            
            {/* 1. The Glow - Orange but subtle (Surgical) */}
            {/* Using brand #C2410C at 15% opacity to provide warmth without loudness */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#C2410C]/15 via-[#C2410C]/5 to-[#C2410C]/15 blur-3xl -z-10 transform scale-105 rounded-[30px]" />

            {/* 2. THE CONTAINER (The Browser Window) */}
            <div className="bg-white rounded-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] border border-slate-200/60 overflow-visible h-auto min-h-[600px]">
                
                {/* Window Controls Header */}
                <div className="h-10 bg-slate-50/80 border-b border-slate-200/60 flex items-center justify-between px-4 backdrop-blur-sm rounded-t-xl">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 font-mono select-none tracking-widest uppercase opacity-70">
                    app.threaddits.com
                  </div>
                  <div className="w-12"></div> {/* Balance spacer */}
                </div>

                {/* App Interface Simulation */}
                <div className="w-full">
                   <LandingDemoFeed />
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};