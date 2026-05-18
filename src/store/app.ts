import { create } from 'zustand';

type AppState = {
  activeModule: 'dashboard' | 'goals' | 'strategy' | 'reviews' | 'checkins' | 'analytics' | 'audit';
  setActiveModule: (module: AppState['activeModule']) => void;
  isAIOpen: boolean;
  toggleAI: () => void;
  isNotifsOpen: boolean;
  toggleNotifs: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  activeModule: 'dashboard',
  setActiveModule: (module) => set({ activeModule: module }),
  isAIOpen: false,
  toggleAI: () => set((state) => ({ isAIOpen: !state.isAIOpen, isNotifsOpen: false })),
  isNotifsOpen: false,
  toggleNotifs: () => set((state) => ({ isNotifsOpen: !state.isNotifsOpen, isAIOpen: false })),
}));
