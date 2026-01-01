import * as React from 'react';
import { Logo } from './Logo';

export const FooterSection = () => {
  return (
    <footer className="w-full bg-[#2C3E50] text-white py-16 px-8 font-sans">
      <div className="container mx-auto">
        
        {/* Top section with logo and links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
          
          {/* Column 1: Logo & Tagline */}
          <div className="col-span-2 pr-8">
            <div className="flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity mb-4">
              <Logo variant="light" />
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              The autonomous lead engine for Reddit.<br /> 
              Stop Searching. Start Selling.
            </p>
          </div>

          {/* Spacer for mobile */}
          <div className="col-span-2 md:col-span-1"></div>

          {/* Column 2: Product Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#how-it-works" className="text-slate-300 hover:text-[#C2410C] transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-slate-300 hover:text-[#C2410C] transition-colors">Pricing</a></li>
              <li><a href="/auth" className="text-slate-300 hover:text-[#C2410C] transition-colors">Login</a></li>
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-300 hover:text-[#C2410C] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-300 hover:text-[#C2410C] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="border-t border-[#3b5066] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2025 Threaddits. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};