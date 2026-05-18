"use client";
import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useStore(s => s.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }, [theme, mounted]);

  // Render children immediately — avoids layout shift.
  // The html class is applied via useEffect so no SSR mismatch.
  return <>{children}</>;
}
