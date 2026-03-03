import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { cn } from "../lib/utils";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Toaster } from "./ui/sonner";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect unauthenticated users to auth page
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, loading, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C2410C]" />
      </div>
    );
  }

  // Don't render layout for unauthenticated users
  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] flex flex-col md:flex-row">
      {/* Static sidebar for desktop */}
      <AppSidebar className="hidden md:flex" />

      {/* Mobile sidebar with overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
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
      {/* Telegram support bubble */}
      <a
        href="https://t.me/ahmednsaleh"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: "#229ED9" }}
        title="Chat with the founder on Telegram"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </a>
      <Toaster />
    </div>
  );
};
