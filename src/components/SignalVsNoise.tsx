import * as React from 'react';
import { 
  Flame,
  MessageCircle,
  MoreHorizontal,
  ThumbsDown,
  Ban,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

export const SignalVsNoise = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-slate-200 overflow-hidden relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#2C3E50] mb-6 leading-tight">
            We clear the noise.<br />
            You get the <span className="text-[#C2410C]">signal</span>.
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-medium">
            Threaddits buries the 99% of spam, students, and self-promotion. You only see the leads ready to buy.
          </p>
        </div>

        {/* The Stack Visual */}
        <div className="relative h-[500px] w-full max-w-4xl mx-auto flex items-center justify-center">
            
            {/* LAYER 1: NOISE (Trash Cards) - Background */}
            
            {/* Card A: Left, rotated */}
            <div className="absolute w-72 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 opacity-40 blur-[1px] transform -rotate-6 -translate-x-16 md:-translate-x-64 z-0 select-none grayscale transition-all duration-500 hover:opacity-100 hover:blur-0 hover:z-20 hover:scale-105 hover:grayscale-0">
               <div className="flex items-center gap-3 mb-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                  <div className="h-3 w-24 bg-slate-300 rounded"></div>
               </div>
               <div className="space-y-2 mb-4">
                  <p className="text-sm font-bold text-slate-500">Check out my new blog post on SEO!</p>
                  <p className="text-xs text-slate-400">I wrote 5000 words on backlinks. Please read and subscribe to my...</p>
               </div>
               <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-red-50 text-red-400 rounded text-[10px] font-bold uppercase tracking-wider">
                 <Ban className="w-3 h-3" /> Spam
               </div>
            </div>

            {/* Card B: Right, rotated */}
            <div className="absolute w-72 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 opacity-40 blur-[1px] transform rotate-12 translate-x-12 md:translate-x-56 translate-y-12 z-0 select-none grayscale transition-all duration-500 hover:opacity-100 hover:blur-0 hover:z-20 hover:scale-105 hover:grayscale-0">
               <div className="flex items-center gap-3 mb-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                  <div className="h-3 w-20 bg-slate-300 rounded"></div>
               </div>
               <div className="space-y-2 mb-4">
                  <p className="text-sm font-bold text-slate-500">Is there a free tier for this?</p>
                  <p className="text-xs text-slate-400">I'm a student and can't afford the pro plan right now. Can I get...</p>
               </div>
               <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-500 rounded text-[10px] font-bold uppercase tracking-wider">
                 <ThumbsDown className="w-3 h-3" /> Low Value
               </div>
            </div>

            {/* Card C: Top, rotated */}
            <div className="absolute w-72 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 opacity-30 blur-[1px] transform -rotate-3 -translate-y-32 z-0 select-none grayscale transition-all duration-500 hover:opacity-100 hover:blur-0 hover:z-20 hover:scale-105 hover:grayscale-0">
               <div className="flex items-center gap-3 mb-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                  <div className="h-3 w-24 bg-slate-300 rounded"></div>
               </div>
               <div className="space-y-2 mb-4">
                  <p className="text-sm font-bold text-slate-500">Homework help needed ASAP</p>
                  <p className="text-xs text-slate-400">Can someone explain this concept to me? My assignment is due...</p>
               </div>
               <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-400 rounded text-[10px] font-bold uppercase tracking-wider">
                 Irrelevant
               </div>
            </div>


            {/* LAYER 2: SIGNAL (Hero Card) - Foreground */}
            <div className="relative z-10 w-full max-w-md transform transition-transform md:scale-110">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-8 animate-float">
                  
                  {/* Header Badge */}
                  <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#C2410C] to-orange-500 text-white shadow-lg shadow-orange-500/20">
                          <Flame className="w-4 h-4 fill-white" />
                          <span className="text-xs font-bold font-mono tracking-widest uppercase">9.8 High Intent</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-bold bg-slate-50 px-2 py-1 rounded">r/marketing</span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 mb-8">
                      <h3 className="text-xl font-bold text-[#2C3E50] leading-tight">
                          Need a new CRM. Hubspot is too expensive.
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed font-medium">
                          We are scaling down and need a cheaper alternative. <span className="bg-yellow-100 text-slate-900 px-1 rounded font-bold box-decoration-clone">Budget is ready</span> for the right tool.
                      </p>
                  </div>

                  {/* Footer UI Elements (Fake interaction) */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#2C3E50] text-white flex items-center justify-center">
                            <span className="text-xs font-bold font-mono">AS</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">u/active_scaler</span>
                            <span className="text-[10px] text-slate-400 font-mono">Posted 2h ago</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="p-2 hover:bg-slate-50 rounded-full text-slate-400 cursor-pointer transition-colors hidden sm:block">
                              <MoreHorizontal className="w-5 h-5" />
                          </div>
                          <div className="bg-[#C2410C] hover:bg-[#A3360A] text-white rounded-full h-9 px-4 font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5">
                              <Zap className="w-3.5 h-3.5 fill-white" /> Draft Reply
                          </div>
                      </div>
                  </div>
                </div>
            </div>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};