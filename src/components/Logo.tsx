import * as React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light';
}

/**
 * Threaddits Brand Logo
 * Concept: "The Reticle" - Engineering-first aesthetic with a precise data focus.
 */
export const Logo: React.FC<LogoProps> = ({ className, variant = 'default' }) => {
  const isLight = variant === 'light';

  return (
    <div className={cn(
      "font-mono font-bold text-2xl tracking-tighter flex items-center select-none",
      isLight ? "text-white" : "text-[#2C3E50]",
      className
    )}>
      <span>Threadd</span>
      <div className="relative mx-[0.5px]">
        <span className={isLight ? "text-white" : "text-[#2C3E50]"}>i</span>
        {/* 
          The Custom Terracotta Dot (The Data Ingot)
          Positioned precisely to overlay the tittle of the 'i' 
          maintaining the "Surgical Slate" identity.
        */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C2410C] rounded-full"></div>
      </div>
      <span>ts</span>
    </div>
  );
};