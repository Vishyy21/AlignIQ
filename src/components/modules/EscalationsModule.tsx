"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { ESCALATION_EVENTS } from "@/lib/enterprise";
import { useStore } from "@/store/store";
import { AlertOctagon, ArrowUpRight, CheckCircle } from "lucide-react";
import { useState } from "react";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

export default function EscalationsModule() {
  const { showToast, addAuditEvent } = useStore();
  const [events, setEvents] = useState(ESCALATION_EVENTS);

  const resolve = (id: string) => {
    setEvents(e => e.map(x => x.id === id ? { ...x, status: 'resolved' as const } : x));
    addAuditEvent({ ts: new Date().toISOString().replace('T',' ').substring(0,16), actor: 'Vishesh Sharma', type: 'Escalation', desc: `Escalation resolved: ID ${id}`, status: 'approved' });
    showToast('Escalation resolved and logged to audit trail.');
  };

  const levelColor: Record<string, string> = { L1: 'text-brand-amber', L2: 'text-brand-red', L3: 'text-[#FF4D4D]' };
  const levelBg: Record<string, string> = { L1: 'bg-brand-amber/10 border-brand-amber/20', L2: 'bg-brand-red/10 border-brand-red/20', L3: 'bg-[#FF4D4D]/10 border-[#FF4D4D]/20' };
  const priorityDot: Record<string, string> = { critical: 'bg-brand-red', high: 'bg-brand-amber', medium: 'bg-brand-blue-mid' };

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      <motion.div variants={item} className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Escalation Matrix</h1>
          <p className="text-text-secondary text-[13px] mt-1">Active governance escalations and resolution workflows</p>
        </div>
        <div className="flex items-center gap-2">
          {['L1','L2','L3'].map(l => (
            <div key={l} className={cn("flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg border", levelBg[l], levelColor[l])}>
              <AlertOctagon className="w-3 h-3" />{l}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        {[['Open', 'bg-brand-red/10 text-brand-red'], ['In Progress', 'bg-brand-amber/10 text-brand-amber'], ['Resolved', 'bg-brand-emerald/10 text-brand-emerald']].map(([s, cls]) => (
          <Card key={s} className="p-4 text-center">
            <div className={cn("font-mono text-[28px] font-black mb-0.5", cls.split(' ')[1])}>{events.filter(e => e.status === s.toLowerCase().replace(' ', '-')).length}</div>
            <div className="text-[11px] text-text-secondary font-semibold">{s}</div>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-3">
        {events.map((e, i) => (
          <motion.div key={e.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className={cn("p-5 transition-all", e.status === 'resolved' && 'opacity-60')}>
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <div className={cn("text-[10px] font-black px-2 py-1 rounded-lg border", levelBg[e.level], levelColor[e.level])}>{e.level}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display text-[13px] font-bold">{e.title}</span>
                    <span className={cn("w-1.5 h-1.5 rounded-full", priorityDot[e.priority])} />
                    <span className="text-[10px] font-bold capitalize text-text-secondary">{e.priority}</span>
                  </div>
                  <p className="text-[12px] text-text-secondary mb-2">{e.desc}</p>
                  <div className="flex gap-4 text-[11px] text-text-tertiary">
                    <span>Owner: <strong className="text-text-secondary">{e.owner}</strong></span>
                    <span>Escalated to: <strong className="text-text-secondary">{e.escalatedTo}</strong></span>
                    <span>Dept: <strong className="text-text-secondary">{e.dept}</strong></span>
                    <span>{e.created}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {e.status !== 'resolved' ? (
                    <>
                      <button onClick={() => resolve(e.id)} className="flex items-center gap-1 text-[11px] font-bold text-brand-emerald bg-brand-emerald/10 px-2.5 py-1 rounded-md hover:bg-brand-emerald/20 transition-colors"><CheckCircle className="w-3 h-3" />Resolve</button>
                      <button onClick={() => showToast(`Escalation ${e.id} forwarded to C-Suite.`)} className="flex items-center gap-1 text-[11px] font-bold text-brand-amber bg-brand-amber/10 px-2.5 py-1 rounded-md hover:bg-brand-amber/20 transition-colors"><ArrowUpRight className="w-3 h-3" />Escalate</button>
                    </>
                  ) : (
                    <span className="text-[11px] font-bold text-brand-emerald bg-brand-emerald/10 px-2.5 py-1 rounded-md">✓ Resolved</span>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
