"use client";
import { useStore } from '@/store/store';
import { ROLE_CONFIGS, UserRole } from '@/lib/enterprise';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Target, TrendingUp, CheckSquare, CalendarDays,
  BarChart3, ShieldAlert, Gauge, AlertOctagon, Settings,
  Moon, Sun, Plus, ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

type ModuleId = 'dashboard' | 'goals' | 'strategy' | 'reviews' | 'checkins' | 'analytics' | 'audit' | 'kpigov' | 'escalations' | 'settings';

const NAV: { id: ModuleId; label: string; icon: React.ElementType; section: string; badgeKey?: string }[] = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, section: 'Core' },
  { id: 'goals', label: 'Goal Workspace', icon: Target, section: 'Core', badgeKey: 'goals' },
  { id: 'strategy', label: 'Strategic Objectives', icon: TrendingUp, section: 'Core' },
  { id: 'reviews', label: 'Manager Review Hub', icon: CheckSquare, section: 'Core', badgeKey: 'approvals' },
  { id: 'checkins', label: 'Quarterly Check-ins', icon: CalendarDays, section: 'Core' },
  { id: 'kpigov', label: 'KPI Governance', icon: Gauge, section: 'Intelligence' },
  { id: 'analytics', label: 'Analytics Center', icon: BarChart3, section: 'Intelligence' },
  { id: 'escalations', label: 'Escalation Matrix', icon: AlertOctagon, section: 'Intelligence', badgeKey: 'escalations' },
  { id: 'audit', label: 'Audit Trail', icon: ShieldAlert, section: 'Intelligence' },
  { id: 'settings', label: 'Organization Settings', icon: Settings, section: 'System' },
];

export function Sidebar() {
  const { activeModule, setActiveModule, theme, toggleTheme, openGoalModal, goals, approvals, role, setRole } = useStore();
  const [roleOpen, setRoleOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const pendingApprovals = approvals.filter(a => a.status === 'pending').length;
  const cfg = ROLE_CONFIGS[role];

  const getBadge = (key?: string) => {
    if (!key) return null;
    if (key === 'goals') return goals.length;
    if (key === 'approvals') return pendingApprovals;
    if (key === 'escalations') return 2;
    return null;
  };

  return (
    <aside className="w-[260px] h-full flex flex-col z-50 shrink-0 border-r border-border-primary" style={{ background: 'var(--surface)' }}>
      {/* Logo */}
      <div className="p-5 pb-3">
        <div className="font-display text-[22px] font-black tracking-tighter flex items-center gap-2.5">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#7C4DFF] shadow-lg shadow-[#5B8CFF]/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
            </div>
          </div>
          <span className="bg-gradient-to-r from-[#5B8CFF] to-[#7C4DFF] bg-clip-text text-transparent">ALIGNIQ</span>
        </div>
        <div className="text-[9px] font-bold tracking-[0.14em] text-text-tertiary uppercase mt-1">Enterprise Governance OS</div>
      </div>

      {/* Org Card */}
      <div className="mx-3 mb-3 p-3 rounded-xl border border-border-primary" style={{ background: 'var(--bg)' }}>
        <div className="text-[10px] text-text-tertiary font-semibold mb-0.5">Organization</div>
        <div className="text-[12px] font-bold text-text-primary">ALIGNIQ Enterprise Systems</div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse shadow-[0_0_8px_rgba(5,150,105,0.7)]" />
          <span className="text-[10px] text-brand-emerald font-bold">Live · Q3 Review Active</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto pb-2 px-2 flex flex-col gap-0.5">
        {NAV.map((item, idx) => {
          const isActive = activeModule === item.id;
          const showSection = idx === 0 || NAV[idx - 1].section !== item.section;
          const badge = getBadge(item.badgeKey);
          return (
            <div key={item.id}>
              {showSection && (
                <div className="text-[9px] font-black tracking-[0.1em] text-text-tertiary uppercase px-3 py-2 mt-2">{item.section}</div>
              )}
              <div role="button" tabIndex={0}
                onClick={() => setActiveModule(item.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-all relative group cursor-pointer",
                  isActive ? "text-brand-blue-mid font-semibold" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {isActive && (
                  <motion.div layoutId="nav-active" className="absolute inset-0 rounded-lg border border-[#5B8CFF]/20 z-0" style={{ background: 'rgba(91,140,255,0.08)' }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <item.icon className={cn("w-3.5 h-3.5 shrink-0 relative z-10", isActive ? "text-brand-blue-mid" : "text-text-tertiary group-hover:text-text-secondary")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="relative z-10 flex-1 text-left">{item.label}</span>
                {badge !== null && badge > 0 && (
                  <span className="relative z-10 bg-brand-red text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{badge}</span>
                )}
              </div>
            </div>
          );
        })}
      </nav>

      {/* New Initiative */}
      <div className="px-3 pb-2">
        <div role="button" tabIndex={0}
          onClick={() => { openGoalModal(); setActiveModule('goals'); }}
          className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#1857C8] to-[#5203D5] hover:opacity-90 text-white text-[11px] font-bold py-2 px-4 rounded-lg transition-all shadow-lg shadow-[#1857C8]/25 hover:shadow-[#1857C8]/40 hover:-translate-y-0.5"
        >
          <Plus className="w-3.5 h-3.5" /> New Initiative
        </div>
      </div>

      {/* User / Role Switcher */}
      <div className="p-3 border-t border-border-primary">
        <div className="relative">
          {/* Theme toggle row — sibling to role button, not nested inside it */}
          <div className="flex items-center gap-2 px-2 pb-1.5">
            <div
              role="button"
              tabIndex={0}
              onClick={toggleTheme}
              onKeyDown={e => e.key === 'Enter' && toggleTheme()}
              className="ml-auto flex items-center gap-1 text-[10px] text-text-tertiary hover:text-text-primary cursor-pointer rounded px-1.5 py-0.5 hover:bg-bg-primary transition-colors"
            >
              {mounted
                ? (theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />)
                : <span className="w-3 h-3 block" />}
              {mounted && <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>}
            </div>
          </div>
          <div role="button" tabIndex={0}
            onClick={() => setRoleOpen(o => !o)}
            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-bg-primary transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5B8CFF] to-[#00B4D8] flex items-center justify-center text-[10px] font-black text-white shadow-md shrink-0">
              {cfg.initials}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-[11px] font-bold text-text-primary truncate">{cfg.name}</div>
              <div className="text-[10px] text-text-tertiary truncate">{cfg.role}</div>
            </div>
            <ChevronDown className={cn("w-3.5 h-3.5 text-text-tertiary transition-transform", roleOpen && "rotate-180")} />
          </div>
          <AnimatePresence>
            {roleOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                className="absolute bottom-full left-0 right-0 mb-1 rounded-xl border border-border-primary shadow-2xl overflow-hidden z-50"
                style={{ background: 'var(--surface)' }}
              >
                <div className="p-2 border-b border-border-primary">
                  <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider px-2 py-1">Switch Role</div>
                </div>
                {(Object.keys(ROLE_CONFIGS) as UserRole[]).map(r => {
                  const c = ROLE_CONFIGS[r];
                  return (
                    <div role="button" tabIndex={0} key={r} onClick={() => { setRole(r); setRoleOpen(false); }} className={cn("w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-bg-primary transition-colors text-left", role === r && "bg-bg-primary")}>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5B8CFF] to-[#7C4DFF] flex items-center justify-center text-[9px] font-black text-white shrink-0">{c.initials}</div>
                      <div>
                        <div className="text-[11px] font-bold text-text-primary">{c.name}</div>
                        <div className="text-[10px] text-text-tertiary">{c.role}</div>
                      </div>
                      {role === r && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-emerald" />}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}
