"use client";
import { useStore } from '@/store/store';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardModule from '@/components/modules/DashboardModule';
import GoalsModule from '@/components/modules/GoalsModule';
import StrategyModule from '@/components/modules/StrategyModule';
import ReviewsModule from '@/components/modules/ReviewsModule';
import CheckinsModule from '@/components/modules/CheckinsModule';
import AnalyticsModule from '@/components/modules/AnalyticsModule';
import AuditModule from '@/components/modules/AuditModule';
import KPIGovModule from '@/components/modules/KPIGovModule';
import EscalationsModule from '@/components/modules/EscalationsModule';
import SettingsModule from '@/components/modules/SettingsModule';

const modules = {
  dashboard: DashboardModule,
  goals: GoalsModule,
  strategy: StrategyModule,
  reviews: ReviewsModule,
  checkins: CheckinsModule,
  kpigov: KPIGovModule,
  analytics: AnalyticsModule,
  escalations: EscalationsModule,
  audit: AuditModule,
  settings: SettingsModule,
};

export default function Home() {
  const activeModule = useStore(s => s.activeModule);
  const Module = modules[activeModule] ?? DashboardModule;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeModule}
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Module />
      </motion.div>
    </AnimatePresence>
  );
}
