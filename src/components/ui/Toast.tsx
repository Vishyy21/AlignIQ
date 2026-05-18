"use client";
import { useStore } from '@/store/store';
import { motion, AnimatePresence } from 'framer-motion';

export function Toast() {
  const toast = useStore(s => s.toast);
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          className="fixed bottom-6 right-6 bg-text-primary text-bg-primary px-4 py-3 rounded-xl text-[13px] font-semibold z-[200] shadow-2xl max-w-sm backdrop-blur-md border border-border-primary/30"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
