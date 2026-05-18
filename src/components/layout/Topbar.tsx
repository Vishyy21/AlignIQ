"use client";
import { useStore } from '@/store/store';
import { Search, Sparkles, Bell, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Topbar() {
  const { toggleAI, isNotifsOpen, toggleNotifs, notifications, markNotifRead, unreadCount, theme, toggleTheme } = useStore();

  // Hydration-safe: only render theme-dependent icon after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const unread = unreadCount();

  return (
    <header className="h-16 shrink-0 bg-surface/80 backdrop-blur-xl border-b border-border-primary flex items-center px-6 gap-4 z-40 sticky top-0 transition-colors duration-300">
      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary group-focus-within:text-brand-blue transition-colors" />
        <input
          type="text"
          placeholder="Search objectives, KPIs, people..."
          className="bg-bg-primary border border-border-primary rounded-lg py-1.5 pr-4 pl-9 text-[13px] text-text-primary w-56 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:w-72 transition-all placeholder:text-text-tertiary"
        />
      </div>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-3">

        {/* Theme toggle — only renders icon after mount to avoid hydration mismatch */}
        <div role="button" tabIndex={0}
          onClick={toggleTheme}
          className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-lg transition-colors"
          aria-label="Toggle theme"
        >
          {mounted
            ? (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)
            : <span className="w-4 h-4 block" />}
        </div>

        {/* AI Assistant */}
        <div role="button" tabIndex={0}
          onClick={toggleAI}
          className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue bg-brand-blue-light/50 hover:bg-brand-blue-light border border-brand-blue/20 px-3 py-1.5 rounded-lg transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" /> AI Assistant
        </div>

        {/* Notifications */}
        <div className="relative">
          <div role="button" tabIndex={0}
            onClick={toggleNotifs}
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-lg transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-red rounded-full border-2 border-surface" />
            )}
          </div>
          <AnimatePresence>
            {isNotifsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border-primary rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-border-primary flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary">Notifications</span>
                  {unread > 0 && (
                    <span className="text-[10px] bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-full font-bold">{unread} new</span>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.slice(0, 8).map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotifRead(n.id)}
                      className={cn(
                        "p-3 hover:bg-bg-primary transition-colors cursor-pointer border-b border-border-primary/30",
                        !n.read && "bg-brand-blue/5"
                      )}
                    >
                      <div className="text-[11px] text-text-tertiary mb-0.5">{n.time}</div>
                      <div className="text-[12px] text-text-primary font-medium leading-tight">{n.text}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quarter Badge */}
        <div className="bg-brand-blue/10 text-brand-blue text-[11px] font-bold px-2.5 py-1 rounded-full border border-brand-blue/20">
          Q3 2025
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-[11px] font-bold text-white cursor-pointer shadow-md border-2 border-surface hover:scale-105 transition-transform">
          VR
        </div>
      </div>
    </header>
  );
}
