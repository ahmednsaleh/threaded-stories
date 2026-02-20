import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { MagicInput } from './MagicInput';
import {
  Sparkles,
  ArrowRight,
  Check,
  Loader2,
  Target,
  Zap,
  Globe,
  Search,
  Plus,
  X,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Cpu,
  BrainCircuit,
  Briefcase,
  Lightbulb
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface OnboardingFlowProps {
  initialUrl?: string;
}

type Step = 'input' | 'analysis' | 'review' | 'launch';

// --- SUB-COMPONENTS ---

// 1. Tag Input Component (Surgical Slate Style)
interface TagInputProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
  icon?: React.ElementType;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onAdd, onRemove, placeholder, icon: Icon }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        onAdd(input.trim());
        setInput('');
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-white border border-slate-200 rounded-lg focus-within:border-[#C2410C] focus-within:ring-1 focus-within:ring-[#C2410C] transition-all">
      {tags.map((tag) => (
        <span key={tag} className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-900 text-xs font-medium border border-slate-200 animate-in fade-in zoom-in-95">
          {Icon && <Icon className="w-3 h-3 mr-1.5 text-slate-400" />}
          {tag}
          <button onClick={() => onRemove(tag)} className="ml-1.5 text-slate-400 hover:text-rose-500 focus:outline-none">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] outline-none text-sm bg-transparent placeholder:text-slate-400 text-slate-900"
      />
    </div>
  );
};

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ initialUrl }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // State Machine
  const [step, setStep] = useState<Step>(initialUrl ? 'analysis' : 'input');

  // Data State
  const [url, setUrl] = useState(initialUrl || '');
  const [logs, setLogs] = useState<string[]>([]);
  const [launchStatus, setLaunchStatus] = useState<{id: string, text: string, status: 'pending'|'active'|'done'}[]>([
    { id: '1', text: 'Connecting to Reddit API...', status: 'pending' },
    { id: '2', text: 'Filtering noise (Student/Career posts)...', status: 'pending' },
    { id: '3', text: 'Scoring leads (Intent Model v2)...', status: 'pending' },
  ]);

  // Review Form State
  const [formData, setFormData] = useState({
    productName: '',
    targetPersona: '',
    primaryJob: '',
    valueProposition: '',
    painsFrustrations: '',
    subreddits: [] as string[],
    keywords: [] as string[]
  });

  // --- STEP 1: INPUT ---
  const handleAnalyze = (inputUrl: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setUrl(inputUrl);
    setStep('analysis');
  };

  // --- STEP 2: ANALYSIS EFFECTS ---
  useEffect(() => {
    if (step === 'analysis') {
      const logSteps = [
        "Extracting product DNA and Value Prop...",
        "Identifying Target Persona and Primary Job...",
        "Mapping Pains & Frustrations...",
        "Generating strategic keywords...",
      ];

      let currentIndex = 0;
      setLogs([]);

      const interval = setInterval(() => {
        if (currentIndex < logSteps.length) {
          setLogs(prev => [...prev, logSteps[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 800);

      // Call edge function in parallel with log animation
      (async () => {
        try {
          const { data, error } = await supabase.functions.invoke('extract-product-info', {
            body: { url: url.trim() },
          });

          if (error) throw error;

          setFormData({
            productName: data?.product_name || data?.name || '',
            targetPersona: data?.persona || data?.audience || data?.target_audience || '',
            primaryJob: data?.primary_job || data?.jobs_to_be_done || '',
            valueProposition: data?.product_description || data?.description || data?.value_proposition || '',
            painsFrustrations: data?.pain_points_solved || data?.pains || '',
            subreddits: data?.subreddits
              ? (Array.isArray(data.subreddits) ? data.subreddits : data.subreddits.split(',').map((s: string) => s.trim()).filter(Boolean))
              : [],
            keywords: data?.keywords
              ? (Array.isArray(data.keywords) ? data.keywords : data.keywords.split(',').map((s: string) => s.trim()).filter(Boolean))
              : [],
          });

          // Wait for log animation to finish, then transition
          setTimeout(() => setStep('review'), Math.max(0, logSteps.length * 800 + 1000 - 2000));
        } catch (err: any) {
          console.error('Analysis failed:', err);
          toast.error('Analysis failed', { description: err.message || 'Could not analyze the URL. Try again.' });
          setStep('input');
        }
      })();

      return () => clearInterval(interval);
    }
  }, [step]);

  // --- STEP 4: LAUNCH EFFECTS ---
  useEffect(() => {
    if (step === 'launch') {
      const timers: ReturnType<typeof setTimeout>[] = [];

      // Animate status items
      launchStatus.forEach((_, index) => {
        timers.push(setTimeout(() => {
          setLaunchStatus(prev => prev.map((item, i) => {
            if (i === index) return { ...item, status: 'active' };
            if (i === index - 1) return { ...item, status: 'done' };
            return item;
          }));
        }, index * 1200));
      });

      // Create product in Supabase and call onboard-product
      (async () => {
        try {
          if (!user) {
            navigate('/auth');
            return;
          }

          const { data: product, error: insertError } = await supabase.from('products').insert({
            user_id: user.id,
            product_name: formData.productName,
            product_description: formData.valueProposition,
            persona: formData.targetPersona,
            pain_points_solved: formData.painsFrustrations,
            jobs_to_be_done: formData.primaryJob,
            product_url: url.trim() || null,
            business_type: 'B2B',
            status: 'active',
            subreddits: formData.subreddits,
            keywords: formData.keywords,
          }).select('id').single();

          if (insertError) throw insertError;

          // Call onboard-product edge function to kick off the engine
          if (product?.id) {
            try {
              await supabase.functions.invoke('onboard-product', {
                body: { product_id: product.id },
              });
            } catch (e) {
              // Non-fatal: product created, engine will pick it up on next cycle
              console.error('onboard-product edge function error:', e);
            }
          }

          // Mark onboarding complete
          await supabase.from('users').update({ onboarding_complete: true }).eq('id', user.id);

          queryClient.invalidateQueries({ queryKey: ['products'] });
          queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        } catch (err: any) {
          console.error('Product creation failed:', err);
          toast.error('Failed to create product', { description: err.message });
        }
      })();

      // Final redirect after animation
      timers.push(setTimeout(() => {
        setLaunchStatus(prev => prev.map(item => ({ ...item, status: 'done' })));
        setTimeout(() => navigate('/dashboard'), 800);
      }, launchStatus.length * 1200 + 500));

      return () => timers.forEach(clearTimeout);
    }
  }, [step]);


  // --- RENDERERS ---

  if (step === 'input') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Surgical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2C3E50 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="w-full max-w-2xl relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
           <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6 tracking-tight">
             Where should we hunt?
           </h1>
           <p className="text-slate-500 text-lg mb-10 max-w-lg mx-auto">
             Enter your landing page URL. We'll extract the signal to find your buyers.
           </p>
           <MagicInput onAnalyze={handleAnalyze} />
        </div>
      </div>
    );
  }

  if (step === 'analysis') {
    const progress = (logs.length / 4) * 100;
    
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl animate-in fade-in zoom-in-95 duration-500">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#2C3E50] tracking-tight mb-2">
              Analyzing your product details...
            </h1>
            <p className="text-slate-500 text-lg">
              Our agents are reading your landing page.
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden mb-10">
            <div 
              className="bg-[#C2410C] h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(194,65,12,0.3)]"
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>

          {/* Logs */}
          <div className="space-y-4 min-h-[200px] pl-4 border-l-2 border-slate-100">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-600 font-mono text-sm animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 py-12">
        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Header */}
          <div className="text-center mb-10">
             <div className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 rounded-xl shadow-sm mb-6">
               <BrainCircuit className="w-6 h-6 text-[#C2410C]" />
             </div>
             <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50] tracking-tight mb-3">
               Here's what our AI understood.
             </h1>
             <p className="text-slate-500 text-lg">
               Confirm or refine these details before we start hunting.
             </p>
          </div>

          {/* Review Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
             <div className="p-8 md:p-10 space-y-8">
                
                {/* Row 1: Product Name */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-black uppercase tracking-widest font-mono">Product Name</label>
                    <input 
                      type="text" 
                      value={formData.productName}
                      onChange={e => setFormData({...formData, productName: e.target.value})}
                      className="w-full p-3 rounded-lg border border-slate-200 bg-white text-slate-900 font-bold outline-none focus:border-[#C2410C] text-lg"
                    />
                </div>

                {/* Row 2: Target Persona & Primary Job */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-black uppercase tracking-widest font-mono flex items-center gap-2">
                        <Target className="w-3 h-3" /> Target Persona
                      </label>
                      <input 
                        type="text" 
                        value={formData.targetPersona}
                        onChange={e => setFormData({...formData, targetPersona: e.target.value})}
                        className="w-full p-3 rounded-lg border border-slate-200 bg-white text-slate-900 font-medium outline-none focus:border-[#C2410C]"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-black uppercase tracking-widest font-mono flex items-center gap-2">
                        <Briefcase className="w-3 h-3" /> Primary Job
                      </label>
                      <input 
                        type="text" 
                        value={formData.primaryJob}
                        onChange={e => setFormData({...formData, primaryJob: e.target.value})}
                        className="w-full p-3 rounded-lg border border-slate-200 bg-white text-slate-900 font-medium outline-none focus:border-[#C2410C]"
                      />
                   </div>
                </div>

                {/* Row 3: Pains & Frustrations (Free Text) */}
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-black uppercase tracking-widest font-mono flex items-center gap-2">
                     <Zap className="w-3 h-3" /> Pains or Frustrations
                   </label>
                   <textarea 
                     value={formData.painsFrustrations}
                     onChange={(e) => setFormData(prev => ({ ...prev, painsFrustrations: e.target.value }))}
                     className="w-full p-3 rounded-lg border border-slate-200 bg-white text-slate-900 font-medium outline-none focus:border-[#C2410C] min-h-[80px] resize-none"
                   />
                </div>

                {/* Row 4: Value Proposition */}
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-black uppercase tracking-widest font-mono flex items-center gap-2">
                     <Lightbulb className="w-3 h-3" /> Value Proposition
                   </label>
                   <textarea 
                      value={formData.valueProposition}
                      onChange={e => setFormData({...formData, valueProposition: e.target.value})}
                      className="w-full p-3 rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-[#C2410C] min-h-[80px] resize-none"
                    />
                </div>

                {/* Row 5: Found Subreddits (Before Keywords) */}
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-black uppercase tracking-widest font-mono flex items-center gap-2">
                     <Globe className="w-3 h-3" /> Found Subreddits
                   </label>
                   <TagInput 
                     tags={formData.subreddits}
                     onAdd={(t) => setFormData(prev => ({ ...prev, subreddits: [...prev.subreddits, t] }))}
                     onRemove={(t) => setFormData(prev => ({ ...prev, subreddits: prev.subreddits.filter(i => i !== t) }))}
                     placeholder="Add a subreddit..."
                     icon={Search}
                   />
                </div>

                {/* Row 6: Keywords */}
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-black uppercase tracking-widest font-mono flex items-center gap-2">
                     <Sparkles className="w-3 h-3" /> Strategic Keywords
                   </label>
                   <TagInput 
                     tags={formData.keywords}
                     onAdd={(t) => setFormData(prev => ({ ...prev, keywords: [...prev.keywords, t] }))}
                     onRemove={(t) => setFormData(prev => ({ ...prev, keywords: prev.keywords.filter(i => i !== t) }))}
                     placeholder="Add a keyword..."
                     icon={Search}
                   />
                </div>

                {/* Footer Insight */}
                <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                    <div className="flex h-2.5 w-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                    <p className="text-sm text-slate-600">
                      Our agent is ready to monitor <strong className="text-[#2C3E50] text-base">{formData.subreddits.length}</strong> communities.
                    </p>
                </div>

             </div>

             {/* Footer */}
             <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 flex justify-end">
                <Button 
                   onClick={() => setStep('launch')}
                   className="bg-[#C2410C] hover:bg-[#A3360A] text-white rounded-lg h-12 px-10 font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full md:w-auto"
                >
                  Looks Good! Start Hunting <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- STEP 4: LAUNCH ---
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6">
       <div className="w-full max-w-lg text-center animate-in fade-in zoom-in-95 duration-700">
          
          <div className="mb-8 relative inline-block">
             <div className="w-20 h-20 rounded-2xl bg-[#2C3E50] flex items-center justify-center shadow-2xl relative z-10">
                <Terminal className="w-10 h-10 text-white" />
             </div>
             <div className="absolute inset-0 bg-[#C2410C] blur-2xl opacity-20 animate-pulse"></div>
          </div>

          <h1 className="text-3xl font-bold text-[#2C3E50] mb-8 tracking-tight">
            Initializing Autonomous Agents...
          </h1>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-left space-y-4">
             {launchStatus.map((item) => (
               <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     {item.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                     {item.status === 'active' && <Loader2 className="w-4 h-4 text-[#C2410C] animate-spin" />}
                     {item.status === 'done' && <CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
                     
                     <span className={cn(
                       "text-sm font-medium transition-colors",
                       item.status === 'pending' ? "text-slate-400" : "text-slate-700"
                     )}>
                       {item.text}
                     </span>
                  </div>
                  
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider font-mono transition-colors",
                    item.status === 'active' ? "text-[#C2410C]" : 
                    item.status === 'done' ? "text-[#10B981]" : "text-slate-300"
                  )}>
                    {item.status === 'active' ? 'Active' : item.status === 'done' ? 'Success' : 'Queued'}
                  </span>
               </div>
             ))}
          </div>

       </div>
    </div>
  );
};