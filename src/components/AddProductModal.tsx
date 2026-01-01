import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  Globe, 
  Target, 
  Zap, 
  Plus,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
}

// Mock analysis result
const MOCK_ANALYSIS = {
  name: "ScaleFast",
  description: "An automated lead generation tool that helps B2B agencies find clients on Reddit without manual searching.",
  audience: "B2B Agencies / Founders",
  painPoints: ["Manual Prospecting", "Low Lead Quality", "Time Consuming"]
};

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState<'input' | 'analyzing' | 'review'>('input');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Form State (Review Step)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    audience: '',
    painPoints: [] as string[]
  });
  const [newPainPoint, setNewPainPoint] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setUrl('');
      setFormData({ name: '', description: '', audience: '', painPoints: [] });
      setIsAnalyzing(false);
    }
  }, [isOpen]);

  // Handle Analysis Simulation
  const handleAnalyze = () => {
    if (!url.trim()) return;
    
    setStep('analyzing');
    setIsAnalyzing(true);

    // Simulate AI delay
    setTimeout(() => {
      setFormData(MOCK_ANALYSIS);
      setIsAnalyzing(false);
      setStep('review');
    }, 2000);
  };

  // Handle Pain Point Management
  const addPainPoint = () => {
    if (newPainPoint.trim()) {
      setFormData(prev => ({
        ...prev,
        painPoints: [...prev.painPoints, newPainPoint.trim()]
      }));
      setNewPainPoint('');
    }
  };

  const removePainPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPainPoint();
    }
  };

  const handleSave = () => {
    onSave({
      ...formData,
      status: 'active',
      leadsThisWeek: 0,
      avgScore: 0
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- STATE 1: INPUT --- */}
        {step === 'input' && (
          <div className="p-8 md:p-12 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
              <Globe className="w-7 h-7 text-[#2C3E50]" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-3">
              Add New Product
            </h2>
            <p className="text-slate-500 text-lg mb-8 max-w-md">
              Enter your landing page URL. We'll analyze it to identify your target audience and pain points automatically.
            </p>

            <div className="w-full max-w-lg relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="https://your-product.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 focus:border-[#2C3E50] focus:ring-0 text-lg text-[#2C3E50] placeholder:text-slate-300 transition-all outline-none"
                autoFocus
              />
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={!url.trim()}
              className="mt-6 w-full max-w-lg h-12 bg-[#C2410C] hover:bg-[#A3360A] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Analyze Product <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* --- STATE 2: ANALYZING --- */}
        {step === 'analyzing' && (
          <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-[#C2410C] animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#C2410C] animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C3E50] mt-8 mb-2 animate-pulse">
              Analyzing Product DNA...
            </h3>
            <p className="text-slate-500">
              Extracting value proposition and audience context.
            </p>
          </div>
        )}

        {/* --- STATE 3: REVIEW --- */}
        {step === 'review' && (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#2C3E50]">Review Product DNA</h2>
                <p className="text-xs text-slate-500 font-medium">AI analysis complete. Refine details below.</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none text-[#2C3E50] font-bold"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Short Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none text-slate-600 text-sm leading-relaxed min-h-[80px] resize-none"
                />
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Target className="w-3 h-3" /> Target Audience
                </label>
                <input
                  type="text"
                  value={formData.audience}
                  onChange={(e) => setFormData({...formData, audience: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] outline-none text-[#2C3E50] font-medium"
                />
              </div>

              {/* Pain Points */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Pain Points Solved
                </label>
                
                <div className="flex flex-wrap gap-2">
                  {formData.painPoints.map((point, index) => (
                    <div key={index} className="inline-flex items-center bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm font-medium border border-slate-200 group">
                      {point}
                      <button 
                        onClick={() => removePainPoint(index)}
                        className="ml-2 text-slate-400 hover:text-red-500 focus:outline-none"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 max-w-[200px]">
                    <input
                      type="text"
                      value={newPainPoint}
                      onChange={(e) => setNewPainPoint(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Add pain point..."
                      className="bg-white border-b border-slate-300 focus:border-[#C2410C] px-1 py-1 text-sm outline-none w-full"
                    />
                    <button 
                      onClick={addPainPoint} 
                      disabled={!newPainPoint.trim()}
                      className="text-slate-400 hover:text-[#C2410C] disabled:opacity-30"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setStep('input')}
                className="text-slate-500 hover:text-slate-800"
              >
                Back
              </Button>
              <Button 
                onClick={handleSave}
                className="flex-1 md:flex-none bg-[#C2410C] hover:bg-[#A3360A] text-white font-bold px-8 rounded-full"
              >
                Save & Start Hunting
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};