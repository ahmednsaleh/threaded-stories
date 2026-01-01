import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { cn } from '../lib/utils';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Toaster } from './ui/sonner';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] flex flex-col md:flex-row">
      {/* Static sidebar for desktop */}
      <AppSidebar className="hidden md:flex" />

      {/* Mobile sidebar with overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden',
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <AppSidebar
        isMobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col md:pl-72 min-h-screen">
        {/* Top Header for main content area */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-sm px-4 md:px-12">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden shrink-0"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open Sidebar</span>
          </Button>
          
          <div className="flex-1">
             {/* Header content like search or page title can go here */}
          </div>
        </header>

        {/* Main Content Area - Reset padding so pages can control their own surgical spacing */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};