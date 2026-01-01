
import * as React from 'react';
import { useState } from 'react';
import { 
  Plus, 
  Lock, 
  Activity, 
  Pause, 
  Play, 
  Edit2, 
  Trash2, 
  Target, 
  Zap,
  ChevronRight,
  Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { AddProductModal } from '../components/AddProductModal';
import { useNavigate } from 'react-router-dom';

const USER_PLAN: 'STARTER' | 'PRO' = 'STARTER';
const SLOTS_COUNT = 3;

interface Product {
  id: string;
  name: string;
  status: 'active' | 'paused';
  persona: string;
  pain_points: string[];
  stats: {
    total_leads: number;
    avg_score: number;
    last_run_at: string;
  };
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Intercom Alternative',
    status: 'active',
    persona: 'Bootstrapped SaaS Founders',
    pain_points: ['High Costs', 'Complex UI', 'Bloat'],
    stats: {
      total_leads: 1240,
      avg_score: 8.4,
      last_run_at: new Date().toISOString()
    }
  }
];

const ProductCard: React.FC<{ product: Product, onToggle: (id: string) => void, onDelete: (id: string) => void }> = ({ product, onToggle, onDelete }) => {
  const navigate = useNavigate();
  const isActive = product.status === 'active';
  
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
      
      {/* Zone A: Header (Identity & Quality) */}
      <div className="flex items-start justify-between mb-6">
        <div>
           <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">{product.name}</h3>
           <div className="flex items-center gap-2 mt-1.5">
              <span className={cn("relative flex h-2 w-2 rounded-full", isActive ? "bg-emerald-500" : "bg-slate-300")}>
                {isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
              </span>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest font-mono", isActive ? "text-emerald-600" : "text-slate-400")}>
                {isActive ? 'Live Hunting' : 'Paused'}
              </span>
           </div>
        </div>
        
        {/* Quality Badge */}
        <div className={cn(
            "px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold flex items-center gap-1.5",
            product.stats.avg_score >= 8
                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                : "bg-slate-50 border-slate-100 text-slate-600"
        )}>
           <span>AVG {product.stats.avg_score.toFixed(1)}</span>
        </div>
      </div>

      {/* Zone B: The DNA (Context) */}
      <div className="space-y-4 mb-8">
         {/* Persona */}
         <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1.5 flex items-center gap-1.5">
               <Target className="w-3 h-3" /> TARGET
            </div>
            <div className="text-sm font-medium text-slate-700 leading-snug line-clamp-2 min-h-[1.25rem]">
               {product.persona}
            </div>
         </div>

         {/* Triggers */}
         <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1.5 flex items-center gap-1.5">
               <Zap className="w-3 h-3" /> TRIGGERS
            </div>
            <div className="flex flex-wrap gap-2">
               {product.pain_points.slice(0, 2).map((pt, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">
                     {pt}
                  </span>
               ))}
               {product.pain_points.length > 2 && (
                  <span className="px-2 py-1 rounded-md bg-slate-50 text-slate-400 border border-slate-100 text-xs font-medium">
                     +{product.pain_points.length - 2}
                  </span>
               )}
            </div>
         </div>
      </div>

      {/* Zone C: The Yield (North Star Metric) */}
      <div className="mt-auto mb-8 border-t border-slate-100 pt-6">
         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1">
            LEADS FOUND
         </div>
         <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold font-mono text-slate-900 tracking-tighter">
               {product.stats.total_leads.toLocaleString()}
            </span>
         </div>
         <div className="flex items-center gap-1.5 mt-2 text-slate-400">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-mono">Last sweep: 14m ago</span>
         </div>
      </div>

      {/* Zone D: Actions (Footer) */}
      <div className="flex items-center gap-2">
         <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/products/${product.id}`)}
            className="flex-1 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 font-medium h-9 text-xs border border-slate-200 shadow-sm"
         >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit
         </Button>
         <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle(product.id)}
            className="flex-1 rounded-full text-slate-500 hover:text-[#2C3E50] h-9 text-xs"
         >
            {isActive ? 'Pause' : 'Resume'}
         </Button>
         <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(product.id)}
            className="rounded-full text-slate-300 hover:text-rose-600 hover:bg-rose-50 h-9 w-9"
         >
            <Trash2 className="w-4 h-4" />
         </Button>
      </div>
    </div>
  );
};

const EmptySlot: React.FC<{ isLocked: boolean, onAction: () => void }> = ({ isLocked, onAction }) => {
  return (
    <div onClick={onAction} className={cn("border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all group min-h-[400px]", isLocked ? "bg-slate-50/30" : "bg-slate-50/50 hover:bg-slate-100 cursor-pointer hover:border-slate-400")}>
      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border bg-white", isLocked ? "text-slate-300" : "text-slate-400 group-hover:text-[#C2410C] group-hover:border-[#C2410C]/20 shadow-sm")}>
        {isLocked ? <Lock className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
      </div>
      <h3 className={cn("text-xl font-bold mb-2", isLocked ? "text-slate-400" : "text-slate-500 group-hover:text-slate-900")}>{isLocked ? `Unlock Slot` : "Add New Product"}</h3>
      <p className="text-slate-400 text-base max-w-[220px] leading-relaxed">{isLocked ? "Upgrade to Pro to hunt for another product." : "Configure a new persona to start hunting in different subreddits."}</p>
      {isLocked && <Button variant="link" onClick={(e) => { e.stopPropagation(); onAction(); }} className="mt-6 text-[#C2410C] font-bold text-sm uppercase tracking-widest">Upgrade to Pro <ChevronRight className="w-4 h-4 ml-1" /></Button>}
    </div>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleToggleStatus = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newStatus = p.status === 'active' ? 'paused' : 'active';
        toast.success(newStatus === 'active' ? "Hunting Resumed" : "Hunting Paused");
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  const handleDelete = (id: string) => toast.info("Deletion is locked for safety in this demo.");

  const handleAddProduct = () => {
    if (USER_PLAN === 'STARTER' && products.length >= 1) {
      toast.error("Plan limit reached", { description: "Upgrade to Pro ($49/mo) to add more products." });
      return;
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = (data: any) => {
    // Map the incoming form data (which matches the AddProductModal fields) to our internal Product structure
    const newProd: Product = { 
      id: Math.random().toString(36).substr(2, 9), 
      name: data.name, 
      status: 'active', 
      persona: data.audience, 
      pain_points: data.painPoints, 
      stats: {
        total_leads: 0,
        avg_score: 0,
        last_run_at: new Date().toISOString()
      }
    };
    setProducts([...products, newProd]);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveProduct} />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">My Products</h1>
            <div className="flex items-center gap-3 mt-3">
               <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-200">Plan: {USER_PLAN}</div>
               <p className="text-slate-400 text-sm font-medium">Manage target personas and value propositions.</p>
            </div>
          </div>
          {USER_PLAN === 'PRO' && <Button onClick={handleAddProduct} className="bg-[#C2410C] text-white h-12 px-8 rounded-full font-bold shadow-lg hover:-translate-y-0.5 transition-all"><Plus className="w-5 h-5 mr-2" /> Add Product</Button>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {products.map(product => <ProductCard key={product.id} product={product} onToggle={handleToggleStatus} onDelete={handleDelete} />)}
          {Array.from({ length: SLOTS_COUNT - products.length }).map((_, idx) => {
            const slotIndex = products.length + idx + 1;
            const isLocked = USER_PLAN === 'STARTER' && slotIndex > 1;
            return <EmptySlot key={`slot-${slotIndex}`} isLocked={isLocked} onAction={handleAddProduct} />;
          })}
        </div>
      </div>
    </main>
  );
}
