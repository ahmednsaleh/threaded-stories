import * as React from 'react';
import { MagicInput } from './MagicInput';

export interface LandingHeroProps {
  onStartHunting: (url: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartHunting }) => {
  const [text, setText] = React.useState("Selling.");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [loopNum, setLoopNum] = React.useState(0);
  const [delta, setDelta] = React.useState(150);
  
  const toRotate = ["Selling.", "Scaling.", "Sustaining."];
  const period = 2000;

  React.useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(50);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(150);
    }
  };

  return (
    <section className="bg-[#FAFAFA] pt-24 pb-96 relative overflow-visible flex flex-col items-center z-20">
      {/* Surgical Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#2C3E50 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#2C3E50] leading-[0.9]">
            Stop Searching.<br /> 
            Start <span className="text-[#C2410C] min-w-[4ch] inline-block text-left">
              {text}
              <span className="animate-pulse border-r-4 border-[#C2410C] ml-1 h-[0.7em] inline-block align-middle mb-2 md:mb-4"></span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            The autonomous lead engine for <span className="text-[#C2410C] font-bold">Reddit</span>. <br className="hidden md:block"/>
            Drop your URL to find high-intent buyers instantly.
          </p>

          <div className="pt-10 w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl relative z-30 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <MagicInput onAnalyze={onStartHunting} />
              
              <p className="text-xs text-slate-400 mt-8 font-mono tracking-wide opacity-80">
                Takes ~5 seconds • No credit card required
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};