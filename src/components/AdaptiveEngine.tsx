import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Search, Filter, ThumbsUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number; // original x
  oy: number; // original y
  oz: number; // original z
  status: 'normal' | 'pruning' | 'reinforcing';
  timer: number; // For animation duration
}

interface Connection {
  p1: number;
  p2: number;
}

export const AdaptiveEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  // Use a ref to track hovered step inside the animation loop without re-triggering the effect
  const hoveredStepRef = useRef<number | null>(null);

  useEffect(() => {
    hoveredStepRef.current = hoveredStep;
  }, [hoveredStep]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
       if (containerRef.current && canvas) {
         // Support high DPI displays for sharp rendering on large scales
         const dpr = window.devicePixelRatio || 1;
         const rect = containerRef.current.getBoundingClientRect();
         
         canvas.width = rect.width * dpr;
         canvas.height = rect.height * dpr;
         
         canvas.style.width = `${rect.width}px`;
         canvas.style.height = `${rect.height}px`;
         
         ctx.scale(dpr, dpr);
       }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // --- BRAIN CONFIG ---
    const POINTS_COUNT = 450; // Increased density for larger scale
    const CONNECTION_DISTANCE = 0.22; 
    const MAX_CONNECTIONS = 3;
    
    const points: Point3D[] = [];
    const connections: Connection[] = [];
    
    // Generate Brain Shape (Structured)
    let attempts = 0;
    while (points.length < POINTS_COUNT && attempts < 50000) {
      attempts++;
      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 2;

      // Brain Shape Equation
      let inside = false;
      const xSep = 0.15; // Gap between hemispheres
      
      // Check hemispheres
      if (Math.abs(x) > xSep) {
        const xOff = Math.abs(x) - xSep;
        const val = Math.pow(xOff / 0.4, 2) + Math.pow(y / 0.55, 2) + Math.pow(z / 0.7, 2);
        if (val <= 1.0) inside = true;
      }
      
      // Brain Stem
      if (!inside) {
        if (y > 0.3 && y < 0.9 && Math.abs(x) < 0.12 && z > 0.15 && z < 0.45) {
           inside = true;
        }
      }

      if (inside) {
        points.push({ 
            x, y, z, 
            ox: x, oy: y, oz: z, 
            status: 'normal',
            timer: 0
        });
      }
    }

    // Connect Points
    for (let i = 0; i < points.length; i++) {
      let cnt = 0;
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].ox - points[j].ox;
        const dy = points[i].oy - points[j].oy;
        const dz = points[i].oz - points[j].oz;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

        if (dist < CONNECTION_DISTANCE) {
          connections.push({ p1: i, p2: j });
          cnt++;
          if (cnt >= MAX_CONNECTIONS) break;
        }
      }
    }

    let rotationY = 0;
    let frame = 0;
    let animationFrameId: number;

    const animate = () => {
      // Logic inside animate accounts for logical pixels (CSS pixels)
      const rect = containerRef.current?.getBoundingClientRect();
      const logicalWidth = rect ? rect.width : canvas.width;
      const logicalHeight = rect ? rect.height : canvas.height;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      
      const centerX = logicalWidth / 2;
      const centerY = logicalHeight / 2;
      
      // Scale up significantly: 0.45 of container dimension for "Massive" look
      const scaleBase = Math.min(logicalWidth, logicalHeight) * 0.45;
      
      rotationY += 0.002; // Slower rotation for sense of mass
      frame++;

      // Current interaction state
      const currentHover = hoveredStepRef.current;

      // Trigger Learning Events (Pruning/Reinforcing)
      if (currentHover === null && frame % 120 === 0) {
        const pruneIdx = Math.floor(Math.random() * points.length);
        points[pruneIdx].status = 'pruning';
        points[pruneIdx].timer = 60;

        const reinforceIdx = Math.floor(Math.random() * points.length);
        points[reinforceIdx].status = 'reinforcing';
        points[reinforceIdx].timer = 60;
      }

      // Project Points
      points.forEach(p => {
        const cos = Math.cos(rotationY);
        const sin = Math.sin(rotationY);
        
        const rx = p.ox * cos - p.oz * sin;
        const rz = p.ox * sin + p.oz * cos;
        const ry = p.oy;

        p.x = centerX + rx * scaleBase;
        p.y = centerY + ry * scaleBase;
        p.z = rz;

        if (p.timer > 0) p.timer--;
        if (p.timer === 0 && p.status !== 'normal') p.status = 'normal';
      });

      // Draw Connections (Wireframe)
      connections.forEach(c => {
        const p1 = points[c.p1];
        const p2 = points[c.p2];
        
        let strokeStyle = `rgba(255, 255, 255, 0.15)`; 
        let lineWidth = 0.8;

        // Interaction Overrides
        if (currentHover === 2) { // TRAIN: Pulse Orange
            const pulse = (Math.sin(frame * 0.1) + 1) / 2;
            strokeStyle = `rgba(194, 65, 12, ${0.15 + pulse * 0.3})`;
            lineWidth = 1;
        } else if (p1.status === 'reinforcing' && p2.status === 'reinforcing') {
             strokeStyle = `rgba(194, 65, 12, ${0.5 + (p1.timer/60) * 0.5})`;
             lineWidth = 2;
        } else if (p1.status === 'pruning' || p2.status === 'pruning') {
             strokeStyle = `rgba(239, 68, 68, ${p1.timer/60 * 0.6})`;
             lineWidth = 1;
        }

        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Points (Nodes)
      points.forEach(p => {
        let fillStyle = `rgba(255, 255, 255, 0.9)`;
        let radius = 1.8; // Larger nodes
        let shadowColor = '';
        let shadowBlur = 0;

        // INTERACTION LOGIC
        if (currentHover === 0) { 
            // SCOUT: Front Lobe Highlight (using rotated Z)
            if (p.z > 0.3) {
                fillStyle = `rgba(255, 255, 255, 1)`;
                radius = 4;
                shadowColor = 'rgba(255, 255, 255, 0.8)';
                shadowBlur = 15;
            } else {
                fillStyle = `rgba(255, 255, 255, 0.15)`; // Dim others
            }
        } 
        else if (currentHover === 1) {
            // FILTER: Core Highlight
            const dist = Math.sqrt(p.ox*p.ox + p.oy*p.oy + p.oz*p.oz);
            if (dist < 0.45) {
                fillStyle = `rgba(255, 255, 255, 1)`;
                radius = 4;
                shadowColor = 'rgba(255, 255, 255, 0.8)';
                shadowBlur = 15;
            } else {
                fillStyle = `rgba(255, 255, 255, 0.15)`; // Dim others
            }
        }
        else if (currentHover === 2) {
            // TRAIN: Full Orange Pulse
            const pulse = (Math.sin(frame * 0.15) + 1) / 2; // 0 to 1
            fillStyle = `rgba(194, 65, 12, ${0.6 + pulse * 0.4})`;
            radius = 3 + pulse * 2;
            shadowColor = 'rgba(194, 65, 12, 0.8)';
            shadowBlur = 15 * pulse;
        }
        else {
            // Default Status Logic
            if (p.status === 'reinforcing') {
                fillStyle = `rgba(194, 65, 12, 1)`; 
                radius = 4 + Math.sin(frame * 0.2) * 1;
                shadowColor = 'rgba(194, 65, 12, 0.6)';
                shadowBlur = 12;
            } else if (p.status === 'pruning') {
                fillStyle = `rgba(239, 68, 68, ${p.timer/60})`;
                radius = 5 * (p.timer/60);
            }
        }

        // Draw
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="py-24 bg-[#2C3E50] relative overflow-hidden flex flex-col items-center justify-center">
        {/* Background Grid for context */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }} 
        />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center w-full max-w-7xl gap-12">
           
           {/* 1. HEADER (Normalized Typography) */}
           <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto z-20 flex-shrink-0">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
               You reject the noise.<br/> It learns the <span className="text-[#C2410C]">signal</span>.
             </h2>
             <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto font-medium mt-4">
               Threaddits is a living engine. Hit <strong className="text-white">"Bad Lead"</strong>, and it rewrites the rules instantly.
             </p>
           </div>

           {/* 2. THE BRAIN VISUAL (Massive & Immersive) */}
           <div 
             ref={containerRef}
             className="relative w-full h-[500px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000 delay-200 cursor-crosshair"
           >
              <canvas ref={canvasRef} className="w-full h-full object-contain" />
           </div>

           {/* 3. THE STEPS (Wider Grid) */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl flex-shrink-0">
              
              {/* Step 1: Scout */}
              <div 
                className={cn(
                  "group flex flex-col items-start text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer h-full",
                  "bg-transparent border-transparent hover:bg-slate-800/40 hover:border-slate-700 hover:backdrop-blur-sm"
                )}
                onMouseEnter={() => setHoveredStep(0)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-[#C2410C] transition-colors duration-300">
                        <Search className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">1. Scout</h3>
                 </div>
                 <p className="text-slate-400 text-base leading-relaxed font-medium group-hover:text-slate-200 transition-colors">
                   Autonomous agents scan 100k+ subreddits. It finds communities you didn't know existed.
                 </p>
              </div>

              {/* Step 2: Filter */}
              <div 
                className={cn(
                  "group flex flex-col items-start text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer h-full",
                  "bg-transparent border-transparent hover:bg-slate-800/40 hover:border-slate-700 hover:backdrop-blur-sm"
                )}
                onMouseEnter={() => setHoveredStep(1)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-[#C2410C] transition-colors duration-300">
                        <Filter className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">2. Filter</h3>
                 </div>
                 <p className="text-slate-400 text-base leading-relaxed font-medium group-hover:text-slate-200 transition-colors">
                   Scores intent via context. It knows the difference between "How do I?" and "What should I buy?".
                 </p>
              </div>

              {/* Step 3: Train */}
              <div 
                className={cn(
                  "group flex flex-col items-start text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer h-full",
                  "bg-transparent border-transparent hover:bg-slate-800/40 hover:border-slate-700 hover:backdrop-blur-sm"
                )}
                onMouseEnter={() => setHoveredStep(2)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-[#C2410C] transition-colors duration-300">
                        <ThumbsUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">3. Train</h3>
                 </div>
                 <p className="text-slate-400 text-base leading-relaxed font-medium group-hover:text-slate-200 transition-colors">
                   Evolves with every click. Hit <strong className="text-white">Bad Lead</strong> and the neural net prunes that pattern forever.
                 </p>
              </div>

           </div>
        </div>
    </section>
  );
};
