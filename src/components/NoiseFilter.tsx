import * as React from 'react';
import { cn } from '../lib/utils';
import { Filter } from 'lucide-react';

export const NoiseFilter = () => {
  // Generate deterministic random positions for noise to avoid hydration mismatches
  const noiseElements = Array.from({ length: 24 }).map((_, i) => ({
    width: [20, 30, 40, 25][i % 4],
    rotation: [12, -5, 45, -15, 30, -10][i % 6],
    top: [10, 30, 50, 70, 20, 80, 40, 60][i % 8],
    left: [10, 40, 20, 60, 80, 30, 70, 50][i % 8],
    opacity: [0.3, 0.5, 0.2, 0.6][i % 4],
    delay: i * 0.1,
  }));

  const signalElements = Array.from({ length: 6 });

  return (
    <div className="w-full py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        
        {/* The Visual Container */}
        <div className="relative w-full max-w-4xl mx-auto bg-white border border-[#E2E8F0] rounded-2xl shadow-sm h-[400px] overflow-hidden flex">
          
          {/* 1. INPUT (NOISE) - Chaotic */}
          <div className="flex-1 relative bg-[#F8FAFC]/50 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {noiseElements.map((el, i) => (
                <div
                  key={i}
                  className="absolute bg-[#64748B] rounded-full h-1.5 transition-all duration-1000 ease-in-out"
                  style={{
                    width: `${el.width}%`,
                    top: `${el.top}%`,
                    left: `${el.left}%`,
                    transform: `rotate(${el.rotation}deg)`,
                    opacity: el.opacity,
                  }}
                />
              ))}
            </div>
            {/* Subtle Gradient Fade to Center */}
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          </div>

          {/* 2. THE FILTER - Minimal Gate */}
          <div className="relative w-px h-full bg-[#E2E8F0] flex items-center justify-center z-20">
            <div className="absolute bg-white p-2 rounded-full border border-[#E2E8F0] shadow-sm">
              <Filter className="w-4 h-4 text-[#2C3E50]" />
            </div>
          </div>

          {/* 3. OUTPUT (SIGNAL) - Precise */}
          <div className="flex-1 relative bg-white flex flex-col items-center justify-center gap-4">
             {signalElements.map((_, i) => (
               <div key={i} className="flex items-center gap-4 w-3/4 animate-in fade-in slide-in-from-left-4 duration-700" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
                 {/* Hunt Green Pixel */}
                 <div className="w-3 h-3 bg-[#10B981] rounded-[1px] shadow-sm shadow-[#10B981]/20 flex-shrink-0"></div>
                 {/* Organized Data Lines */}
                 <div className="flex-1 space-y-1.5">
                    <div className="h-1.5 bg-[#F1F5F9] rounded-full w-full"></div>
                    <div className="h-1.5 bg-[#F1F5F9] rounded-full w-2/3"></div>
                 </div>
               </div>
             ))}
          </div>

        </div>

      </div>
    </div>
  );
};