"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { Check, X, ArrowUpRight, AlertTriangle, Lock } from "lucide-react";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

export default function ReviewsModule() {
  const { approvals, processApproval, showToast } = useStore();
  const pending = approvals.filter(a => a.status === 'pending');
  const processed = approvals.filter(a => a.status !== 'pending');
  const avatarColors = ['#1857C8','#5203D5','#059669','#D97706','#DC2626'];

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      <motion.div variants={item} className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Manager Review Hub</h1>
          <p className="text-text-secondary text-[13px] mt-1">Pending approvals, reviews, and escalations</p>
        </div>
        {pending.length > 0 && <span className="bg-brand-amber/10 text-brand-amber text-xs font-bold px-3 py-1.5 rounded-full border border-brand-amber/20">{pending.length} Pending Approval</span>}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-[1fr_300px] gap-4">
        {/* Approval Queue */}
        <Card className="p-5">
          <div className="text-[13px] font-bold mb-4">Approval Queue</div>
          <div className="flex flex-col">
            {pending.length === 0 && <div className="text-text-tertiary text-sm py-8 text-center">All approvals processed ✓</div>}
            {pending.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 py-3 border-b border-border-primary/50 last:border-0 group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: avatarColors[i % 5] }}>{a.requester.split(' ').map(n => n[0]).join('')}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold truncate">{a.title}</div>
                  <div className="text-[11px] text-text-secondary">{a.requester} · {a.dept} · {a.time}</div>
                </div>
                <div className="text-right mr-2">
                  <div className="text-[12px] font-bold">{a.amount}</div>
                  <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", a.priority === 'high' ? 'bg-brand-red/10 text-brand-red' : 'bg-brand-amber/10 text-brand-amber')}>{a.priority}</span>
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => processApproval(a.id, 'approved')} className="flex items-center gap-1 bg-brand-blue hover:bg-brand-blue/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors"><Check className="w-3 h-3" /> Approve</button>
                  <button onClick={() => processApproval(a.id, 'rejected')} className="flex items-center gap-1 bg-transparent border border-brand-red/30 text-brand-red text-[11px] font-bold px-2.5 py-1 rounded-md hover:bg-brand-red/10 transition-colors"><X className="w-3 h-3" /> Reject</button>
                  <button onClick={() => processApproval(a.id, 'escalated')} className="flex items-center gap-1 bg-transparent border border-border-primary text-text-secondary text-[11px] font-bold px-2.5 py-1 rounded-md hover:bg-bg-primary transition-colors"><ArrowUpRight className="w-3 h-3" /></button>
                </div>
              </motion.div>
            ))}
            {processed.length > 0 && (
              <>
                <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mt-4 mb-2">Processed</div>
                {processed.map(a => (
                  <div key={a.id} className="flex items-center gap-3 py-2.5 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center text-[11px] font-bold text-text-tertiary shrink-0">{a.requester.split(' ').map(n => n[0]).join('')}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-medium truncate">{a.title}</div>
                      <div className="text-[11px] text-text-tertiary">{a.requester}</div>
                    </div>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full capitalize", a.status === 'approved' ? 'bg-brand-emerald/10 text-brand-emerald' : a.status === 'rejected' ? 'bg-brand-red/10 text-brand-red' : 'bg-brand-amber/10 text-brand-amber')}>{a.status}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </Card>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="p-4">
            <div className="text-[12px] font-bold mb-3">Review Summary</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { val: '18', label: 'Approved', color: 'text-brand-emerald' },
                { val: String(pending.length), label: 'Pending', color: 'text-brand-amber' },
                { val: '2', label: 'Rejected', color: 'text-brand-red' },
                { val: '5', label: 'Escalated', color: 'text-brand-blue' },
              ].map(s => (
                <div key={s.label} className="bg-bg-primary rounded-lg p-3 text-center">
                  <div className={cn("font-mono text-[20px] font-bold", s.color)}>{s.val}</div>
                  <div className="text-[10px] text-text-secondary font-semibold mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-[12px] font-bold mb-3">Escalation Matrix</div>
            <div className="flex flex-col gap-2.5 text-[11px]">
              <div className="flex justify-between items-center"><span className="text-text-secondary">L1 → Director</span><span className="bg-brand-amber/10 text-brand-amber font-bold px-2 py-0.5 rounded-full text-[10px]">2 active</span></div>
              <div className="flex justify-between items-center"><span className="text-text-secondary">L2 → VP</span><span className="bg-brand-red/10 text-brand-red font-bold px-2 py-0.5 rounded-full text-[10px]">1 critical</span></div>
              <div className="flex justify-between items-center"><span className="text-text-secondary">L3 → C-Suite</span><span className="bg-brand-emerald/10 text-brand-emerald font-bold px-2 py-0.5 rounded-full text-[10px]">Clear</span></div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-[12px] font-bold mb-3 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-brand-blue" /> Quick Actions</div>
            <div className="flex flex-col gap-2">
              <button onClick={() => showToast('Bulk approval initiated for 2 low-priority items.')} className="w-full text-xs font-semibold bg-brand-blue/10 text-brand-blue py-2 rounded-lg hover:bg-brand-blue/20 transition-colors">Bulk Approve Low Priority</button>
              <button onClick={() => showToast('Reminder sent to 3 pending reviewers.')} className="w-full text-xs font-semibold bg-bg-primary text-text-secondary py-2 rounded-lg border border-border-primary hover:bg-surface-hover transition-colors">Send Reminders</button>
            </div>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
