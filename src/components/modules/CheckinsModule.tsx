"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { SEED_CHECKIN_KPIS } from "@/lib/data";
import { useState } from "react";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

export default function CheckinsModule() {
  const { showToast, addAuditEvent } = useStore();
  const [notes, setNotes] = useState('');
  const [kpis] = useState(SEED_CHECKIN_KPIS);

  const saveNotes = () => {
    if (!notes.trim()) { showToast('Please enter review notes.'); return; }
    addAuditEvent({ ts: new Date().toISOString().replace('T',' ').substring(0,16), actor: 'Vanessa Ruiz', type: 'Check-in', desc: `Q3 quarterly review notes submitted`, status: 'logged' });
    showToast('Review notes saved to Q3 2025 audit record.');
    setNotes('');
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      <motion.div variants={item}>
        <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Quarterly Check-ins</h1>
        <p className="text-text-secondary text-[13px] mt-1">Q3 2025 Review Cycle · Jul 1 – Sep 30</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-[2fr_1fr] gap-4">
        <Card className="p-5">
          <div className="font-display text-[13px] font-bold mb-5">KPI Progress Tracker</div>
          <div className="flex flex-col gap-5">
            {kpis.map((k, i) => {
              const met = k.current >= k.target;
              const ratio = k.current / k.target;
              const color = met ? 'bg-brand-emerald' : ratio > 0.8 ? 'bg-brand-amber' : 'bg-brand-red';
              return (
                <motion.div key={k.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[12px] font-semibold">{k.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-text-secondary font-mono">{k.val}</span>
                      {met ? <span className="bg-brand-emerald/10 text-brand-emerald text-[10px] font-bold px-1.5 py-0.5 rounded-full">✓ Met</span>
                           : <span className="bg-brand-amber/10 text-brand-amber text-[10px] font-bold px-1.5 py-0.5 rounded-full">In Progress</span>}
                    </div>
                  </div>
                  <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(ratio * 100, 100)}%` }} transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }} className={cn("h-full rounded-full", color)} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 flex flex-col">
          <div className="font-display text-[13px] font-bold mb-3">Review Notes</div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="flex-1 min-h-[140px] bg-bg-primary border border-border-primary rounded-lg p-3 text-[12px] text-text-primary outline-none resize-none focus:border-brand-blue transition-colors mb-3" placeholder="Add quarterly review notes..." />
          <button onClick={saveNotes} className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-md shadow-brand-blue/20">Save Notes</button>
          <div className="mt-4">
            <div className="text-[12px] font-bold mb-2">Previous Notes</div>
            <div className="bg-bg-primary rounded-lg p-3 text-[11px] text-text-secondary leading-relaxed border border-border-primary/50">
              &quot;Strong momentum in Product division. Engineering velocity needs recalibration per Q2 KPI gap analysis.&quot; — Vanessa Ruiz, Jul 15
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
