"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { useState } from "react";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };
const statusCfg: Record<string, { cls: string }> = {
  flagged: { cls: 'bg-brand-red/10 text-brand-red' },
  approved: { cls: 'bg-brand-emerald/10 text-brand-emerald' },
  logged: { cls: 'bg-bg-primary text-text-secondary' },
  actioned: { cls: 'bg-brand-blue/10 text-brand-blue' },
  completed: { cls: 'bg-brand-emerald/10 text-brand-emerald' },
  escalated: { cls: 'bg-brand-amber/10 text-brand-amber' },
};

export default function AuditModule() {
  const { auditLog, showToast } = useStore();
  const [filter, setFilter] = useState('All Events');
  const filters = ['All Events','Approvals','KPI Changes','AI Actions','User Actions'];

  const filtered = filter === 'All Events' ? auditLog :
    filter === 'Approvals' ? auditLog.filter(e => e.type.toLowerCase().includes('approval')) :
    filter === 'KPI Changes' ? auditLog.filter(e => e.type.toLowerCase().includes('kpi') || e.type.toLowerCase().includes('update')) :
    filter === 'AI Actions' ? auditLog.filter(e => e.actor === 'AI Engine') :
    auditLog.filter(e => e.actor !== 'AI Engine');

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      <motion.div variants={item} className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Audit Trail</h1>
          <p className="text-text-secondary text-[13px] mt-1">Compliance-grade governance history · Immutable log · {auditLog.length} events</p>
        </div>
        <div className="flex gap-2">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-surface border border-border-primary rounded-lg py-1.5 px-3 text-xs text-text-primary outline-none focus:border-brand-blue transition-colors">
            {filters.map(f => <option key={f}>{f}</option>)}
          </select>
          <button onClick={() => showToast('Audit CSV exported successfully.')} className="text-xs font-semibold text-text-secondary border border-border-primary px-3 py-1.5 rounded-lg hover:bg-bg-primary transition-colors">Export CSV</button>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card className="overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[140px_100px_120px_1fr_90px] gap-4 px-5 py-3 border-b border-border-primary bg-bg-primary/50 text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
            <span>Timestamp</span><span>Actor</span><span>Event Type</span><span>Description</span><span className="text-right">Status</span>
          </div>
          {/* Rows */}
          <div className="max-h-[500px] overflow-y-auto">
            {filtered.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(i * 0.03, 0.3) }} className="grid grid-cols-[140px_100px_120px_1fr_90px] gap-4 px-5 py-3 border-b border-border-primary/30 text-[12px] items-start hover:bg-bg-primary/30 transition-colors">
                <span className="font-mono text-text-tertiary text-[11px]">{e.ts}</span>
                <span className="font-semibold truncate">{e.actor}</span>
                <span className="text-text-secondary">{e.type}</span>
                <span className="text-text-secondary leading-relaxed">{e.desc}</span>
                <span className="text-right">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full capitalize inline-block", statusCfg[e.status]?.cls || 'bg-bg-primary text-text-tertiary')}>{e.status}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
