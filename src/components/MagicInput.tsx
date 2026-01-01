import * as React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export interface MagicInputProps {
  onAnalyze: (url: string) => void;
}

export const MagicInput: React.FC<MagicInputProps> = ({ onAnalyze }) => {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAnalyze = () => {
    if (url.trim()) {
      onAnalyze(url);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className={cn(
        "relative group flex items-center w-full max-w-2xl mx-auto",
        "transition-all duration-300 ease-out",
        isFocused ? 'scale-[1.01]' : 'scale-100'
      )}>
      {/* Icon */}
      <div className="absolute left-6 text-slate-400 pointer-events-none z-10">
        <Sparkles className="w-5 h-5" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Paste your landing page URL..."
        className={cn(
            "w-full h-16 pl-14 pr-44", 
            "bg-white text-slate-900 placeholder:text-slate-400",
            "text-lg font-medium rounded-full",
            "border-2 outline-none",
            "transition-all duration-200",
            isFocused 
              ? 'border-slate-800 shadow-xl' 
              : 'border-slate-200 shadow-sm hover:border-slate-300'
        )}
      />

      {/* Action Button (Inside) */}
      <div className="absolute right-2 top-2 bottom-2">
        <button 
          onClick={handleAnalyze}
          className={cn(
            "h-full px-8 flex items-center gap-2",
            "bg-[#C2410C] hover:bg-[#9A3412] text-white",
            "font-semibold rounded-full text-base",
            "transition-colors duration-200"
          )}>
          <span>Start Hunting</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};