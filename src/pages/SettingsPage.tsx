import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { cn } from '../lib/utils';
import { 
  Zap, 
  CreditCard, 
  History,
  Download,
  ExternalLink,
  FileText,
  Package,
  Lock,
  Plus
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';

const USER_PLAN: 'STARTER' | 'PRO' = 'STARTER';

export default function SettingsPage() {
  const slotsUsed = 1;
  const isPro = USER_PLAN === 'PRO';
  const billingHistory = isPro ? [
    { date: 'Oct 01, 2025', amount: '$49.00', status: 'Paid', invoice: 'INV-004' },
    { date: 'Sep 01, 2025', amount: '$49.00', status: 'Paid', invoice: 'INV-003' },
    { date: 'Aug 01, 2025', amount: '$49.00', status: 'Paid', invoice: 'INV-002' },
  ] : [];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-tight text-[#2C3E50]">Plans & Billing</h1>
          <p className="text-slate-500 text-lg font-medium">Manage your subscription and billing history.</p>
        </div>

        {/* Primary Action: Subscription & Upgrade */}
        <Card className="rounded-2xl border-[#E2E8F0] shadow-sm overflow-hidden bg-white border-t-4 border-t-[#C2410C]">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30 py-6 px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <CreditCard className="w-5 h-5 text-[#2C3E50]" />
                </div>
                <CardTitle className="text-lg font-bold text-[#2C3E50] uppercase tracking-wider">Current Subscription</CardTitle>
              </div>
              <div className="flex items-center px-4 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                {USER_PLAN}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-mono ml-1">Product Capacity</p>
                  <div className="flex items-center gap-4">
                    <TooltipProvider>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-xl bg-white border border-slate-900 flex items-center justify-center">
                          <Package className="w-7 h-7 text-[#2C3E50]" />
                        </div>
                        <span className="text-[10px] font-bold text-[#2C3E50] uppercase tracking-widest font-mono">Active</span>
                      </div>
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 opacity-80">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center cursor-help">
                                <Lock className="w-6 h-6 text-slate-400" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="font-bold">Upgrade to unlock</TooltipContent>
                          </Tooltip>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Locked</span>
                        </div>
                      ))}
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block w-px h-40 bg-slate-100"></div>
              <div className="w-full lg:w-[320px] bg-gradient-to-br from-[#2C3E50] to-[#1E293B] rounded-2xl p-6 text-white relative shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-[#C2410C] fill-[#C2410C]" />
                  <span className="font-bold text-lg tracking-tight">Unlock Multi-Product</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">Upgrade to manage up to 3 separate products and track competitors simultaneously.</p>
                <Button className="w-full bg-[#C2410C] text-white font-bold h-11 shadow-lg shadow-[#C2410C]/20 transition-all">Upgrade - $49/mo</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History Card */}
        <Card className="rounded-2xl border-[#E2E8F0] shadow-sm overflow-hidden bg-white mb-20">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30 py-5 px-8">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-slate-400" />
              <CardTitle className="text-base font-bold text-[#2C3E50] uppercase tracking-wider">Billing History</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {billingHistory.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Invoice</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {billingHistory.map((invoice, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4 text-sm font-medium text-[#2C3E50]">{invoice.date}</td>
                      <td className="px-8 py-4 text-sm font-mono text-slate-500">{invoice.invoice}</td>
                      <td className="px-8 py-4 text-sm font-bold text-[#2C3E50] font-mono">{invoice.amount}</td>
                      <td className="px-8 py-4 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-[#C2410C]"><Download className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-40 bg-slate-50/50 flex flex-col items-center justify-center text-center p-8">
                <FileText className="w-6 h-6 text-slate-300 mb-4" />
                <h4 className="text-sm font-bold text-[#2C3E50]">No invoices yet.</h4>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}