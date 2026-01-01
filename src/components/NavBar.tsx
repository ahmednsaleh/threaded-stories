import * as React from 'react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

export const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="w-full bg-[#FAFAFA] border-b border-[#E2E8F0] px-8 py-4 sticky top-0 z-50 backdrop-blur-md bg-[#FAFAFA]/95">
      <div className="container mx-auto flex items-center justify-between h-12">
        {/* Left: Logo */}
        <div 
          onClick={() => handleNavigation('/')} 
          className="flex-shrink-0 cursor-pointer"
        >
          <Logo />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-8">
          <Button 
            onClick={() => handleNavigation('/auth')}
            variant="ghost"
            className="text-slate-600 hover:text-slate-900 font-medium text-base hover:bg-transparent"
          >
            Log in
          </Button>
        </div>
      </div>
    </nav>
  );
};