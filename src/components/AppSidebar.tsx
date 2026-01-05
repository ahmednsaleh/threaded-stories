
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import {
  LayoutDashboard,
  MessageSquare,
  Layers,
  CreditCard,
  X,
  LogOut
} from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { useTotalNewLeadsCount } from '../hooks/useTotalNewLeadsCount';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/feed', icon: MessageSquare, label: 'Leads' },
  { href: '/products', icon: Layers, label: 'Products' },
  { href: '/settings', icon: CreditCard, label: 'Billing' },
];

interface AppSidebarProps {
  className?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ className, isMobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: newLeadsCount = 0 } = useTotalNewLeadsCount();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const NavLinks = () => (
    <nav className="flex-1 px-4 space-y-2">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.href}
          end={item.href === '/dashboard'}
          className={({ isActive }) =>
            cn(
              'relative flex items-center gap-3 rounded-full px-4 py-3 text-base font-medium transition-colors',
              isActive
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <div className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#C2410C] rounded-full" />}
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.label === 'Leads' && newLeadsCount > 0 && (
                <span className="rounded-full bg-[#C2410C] px-2.5 py-0.5 text-[11px] font-bold text-white">
                  {newLeadsCount}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-slate-800 bg-[#0F172A] transition-transform duration-300 ease-in-out md:translate-x-0",
        isMobileOpen ? 'translate-x-0' : '-translate-x-full',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-20 items-center justify-between px-6 flex-shrink-0">
        <NavLink to="/dashboard" className="flex-shrink-0 select-none">
           <Logo variant="light" />
        </NavLink>
        <Button variant="ghost" size="icon" className="md:hidden text-slate-400 hover:text-white rounded-full" onClick={onMobileClose}>
           <X className="h-6 w-6" />
           <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      {/* Navigation */}
      <div className="py-6 flex-1">
        <NavLinks />
      </div>

      {/* Footer / User Area */}
      <div className="mt-auto border-t border-slate-800 p-4 flex items-center justify-between gap-2">
        {/* Left Side: Profile Link */}
        <NavLink 
          to="/profile"
          className={({ isActive }) => cn(
            "flex items-center gap-3 flex-1 min-w-0 p-2 rounded-xl transition-all duration-200 group text-left outline-none hover:opacity-80",
            isActive ? "bg-slate-800" : "hover:bg-slate-800"
          )}
        >
          <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white ring-2 ring-slate-600 group-hover:ring-slate-500 transition-all flex-shrink-0">
            {user?.email?.slice(0, 2).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.email?.split('@')[0] || 'User'}</p>
            <p className="text-xs text-slate-400 truncate">Free Plan</p>
          </div>
        </NavLink>

        {/* Right Side: Log Out Button */}
        <button 
          onClick={handleLogout}
          className="p-2.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all flex-shrink-0 group"
          title="Log out"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </aside>
  );
};
