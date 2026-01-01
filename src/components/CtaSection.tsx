import * as React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#2C3E50]">
      <div className="container mx-auto px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            Ready to control the conversation?
          </h2>
          <p className="text-slate-300 text-lg mb-12 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 font-medium leading-relaxed">
            Join the autonomous hunters finding customers on Reddit right now. <br/>
            No noise. Just signal.
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-[#C2410C] hover:bg-[#A3360A] text-white h-14 px-10 font-bold text-lg rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C2410C]/20"
            >
              Start Hunting Free <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs text-slate-400 mt-8 font-mono tracking-widest uppercase opacity-60">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};