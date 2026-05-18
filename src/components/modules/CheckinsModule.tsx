"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { SEED_CHECKIN_KPIS } from "@/lib/data";
import { useState } from "react";
import { MessageSquare, CheckCircle2, Clock, AlertCircle, Save } from "lucide-react";

const CYCLE_PHASES = [
  { label: 'Goal Setting', color: 'text-text-tertiary' },
  { label: 'Q1', color: 'text-text-tertiary' },
  { label: 'Q2', color: 'text-text-tertiary' },
  { label: 'Q3 — Active', color: 'text-brand-blue' },
  { label: 'Q4', color: 'text-text-tertiary' },
];

type CheckInStatus = 'not-started' | 'on-track' | 'completed';
const STATUS_CFG: Record<CheckInStatus, { label: string; icon: React.ElementType; cls: string }> = {
  'not-started': { label: 'Not Started', icon: Clock, cls: 'text-text-tertiary bg-bg-primary border-border-primary' },
  'on-track': { label: 'On Track', icon: AlertCircle, cls: 'text-brand-amber bg-brand-amber/10 border-brand-amber/20' },
  'completed': { label: 'Completed', icon: CheckCircle2, cls: 'text-brand-emerald bg-brand-emerald/10 border-brand-emerald/20' },
};

interface CheckInEntry {
  kpiId: string;
  planned: number;
  actual: number;
  status: CheckInStatus;
}

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

export default function CheckinsModule() {
  const { showToast, addAuditEvent, role } = useStore();
  const [managerComment, setManagerComment] = useState('');
  const [savedComment, setSavedComment] = useState('"Strong momentum in Product division. Engineering velocity needs recalibration per Q2 KPI gap analysis." — Vanessa Ruiz, Jul 15');
  const [checkins, setCheckins] = useState<CheckInEntry[]>(
    SEED_CHECKIN_KPIS.map(k => ({
      kpiId: k.id,
      planned: k.target,
      actual: k.current,
      status: k.current >= k.target ? 'completed' : k.current / k.target >= 0.75 ? 'on-track' : 'not-started',
    }))
  );
  const [submitted, setSubmitted] = useState(false);

  const updateCheckin = (kpiId: string, field: 'actual' | 'status', value: string | number | CheckInStatus) => {
    setCheckins(prev => prev.map(c => c.kpiId === kpiId ? { ...c, [field]: value } : c));
  };

  const handleSubmit = () => {
    addAuditEvent({
      ts: 'Just now', actor: role === 'Manager' ? 'Manager' : 'Vanessa Ruiz',
      type: 'Check-in', desc: `Q3 quarterly check-in submitted with ${checkins.filter(c => c.status === 'completed').length} KPIs completed`,
      status: 'logged'
    });
    showToast('Q3 Check-in submitted and recorded to audit trail.');
    setSubmitted(true);
  };

  const handleSaveComment = () => {
    if (!managerComment.trim()) { showToast('Please enter a comment.'); return; }
    setSavedComment(`"${managerComment}" — Manager, Q3 2025`);
    addAuditEvent({ ts: 'Just now', actor: 'Manager', type: 'Check-in Comment', desc: `Manager comment saved for Q3 review`, status: 'logged' });
    showToast('Manager comment saved.');
    setManagerComment('');
  };

  const completedCount = checkins.filter(c => c.status === 'completed').length;
  const overallProgress = Math.round((completedCount / checkins.length) * 100);

  return (
    <motion.div
      initial="hidden" animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
      className="flex flex-col gap-5 max-w-[1400px] mx-auto"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Quarterly Check-ins</h1>
          <p className="text-text-secondary text-[13px] mt-1">Q3 2025 Review Cycle · Jul 1 – Sep 30</p>
        </div>
        <div className={cn(
          "text-[12px] font-bold px-3 py-1.5 rounded-full border",
          submitted ? "bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20" : "bg-brand-blue/10 text-brand-blue border-brand-blue/20"
        )}>
          {submitted ? '✓ Submitted' : 'Draft — Q3 Active'}
        </div>
      </motion.div>

      {/* Cycle Timeline */}
      <motion.div variants={item}>
        <div className="flex items-center gap-0 bg-bg-primary border border-border-primary/50 rounded-xl overflow-hidden">
          {CYCLE_PHASES.map((p, i) => (
            <div key={p.label} className={cn(
              "flex-1 text-center py-2 text-[11px] font-bold transition-all",
              p.label.includes('Active')
                ? "bg-brand-blue/15 text-brand-blue border-b-2 border-brand-blue"
                : "text-text-tertiary border-b-2 border-transparent"
            )}>
              {p.label}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-[1fr_340px] gap-4">

        {/* KPI Check-in Table */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="font-display text-[13px] font-bold">KPI Planned vs Actual</div>
            <div className="text-[11px] text-text-secondary">
              {completedCount}/{checkins.length} KPIs completed ·
              <span className={cn("ml-1 font-bold", overallProgress >= 80 ? "text-brand-emerald" : overallProgress >= 50 ? "text-brand-amber" : "text-brand-red")}>{overallProgress}%</span>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[1fr_80px_80px_140px] gap-2 text-[10px] font-black text-text-tertiary uppercase tracking-wider pb-2 border-b border-border-primary/50 mb-3">
            <span>KPI</span><span className="text-center">Planned</span><span className="text-center">Actual</span><span className="text-center">Status</span>
          </div>

          <div className="flex flex-col gap-3">
            {SEED_CHECKIN_KPIS.map((k, i) => {
              const entry = checkins.find(c => c.kpiId === k.id)!;
              const ratio = entry.actual / entry.planned;
              const barColor = ratio >= 1 ? 'bg-brand-emerald' : ratio >= 0.75 ? 'bg-brand-amber' : 'bg-brand-red';
              const SIcon = STATUS_CFG[entry.status].icon;
              return (
                <motion.div key={k.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="grid grid-cols-[1fr_80px_80px_140px] gap-2 items-center py-2 border-b border-border-primary/30 last:border-0"
                >
                  <div>
                    <div className="text-[12px] font-semibold mb-1">{k.label}</div>
                    <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden w-full">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${Math.min(ratio * 100, 100)}%` }}
                        transition={{ duration: 1, delay: i * 0.12, ease: "easeOut" }}
                        className={cn("h-full rounded-full", barColor)}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[12px] font-mono font-bold text-text-secondary">{entry.planned}{k.unit}</span>
                  </div>
                  <div className="text-center">
                    {submitted ? (
                      <span className={cn("text-[12px] font-mono font-bold", ratio >= 1 ? "text-brand-emerald" : "text-brand-amber")}>{entry.actual}{k.unit}</span>
                    ) : (
                      <input
                        type="number"
                        value={entry.actual}
                        onChange={e => updateCheckin(k.id, 'actual', parseFloat(e.target.value) || 0)}
                        className="w-full bg-bg-primary border border-border-primary rounded-md py-0.5 px-1.5 text-[12px] text-center text-text-primary outline-none focus:border-brand-blue transition-colors font-mono"
                      />
                    )}
                  </div>
                  <div>
                    {submitted ? (
                      <div className={cn("flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border w-full justify-center", STATUS_CFG[entry.status].cls)}>
                        <SIcon className="w-3 h-3" />{STATUS_CFG[entry.status].label}
                      </div>
                    ) : (
                      <select
                        value={entry.status}
                        onChange={e => updateCheckin(k.id, 'status', e.target.value as CheckInStatus)}
                        className="w-full bg-bg-primary border border-border-primary rounded-lg py-1 px-2 text-[11px] text-text-primary outline-none focus:border-brand-blue transition-colors"
                      >
                        <option value="not-started">Not Started</option>
                        <option value="on-track">On Track</option>
                        <option value="completed">Completed</option>
                      </select>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {!submitted && (
            <div className="mt-4">
              <div role="button" tabIndex={0}
                onClick={handleSubmit}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                className="w-full bg-gradient-to-r from-brand-blue to-[#5203D5] hover:opacity-90 text-white text-xs font-bold py-2.5 rounded-lg transition-all shadow-md shadow-brand-blue/20 cursor-pointer text-center"
              >
                Submit Q3 Check-in
              </div>
            </div>
          )}
        </Card>

        {/* Manager Comment + Progress Panel */}
        <div className="flex flex-col gap-4">
          {/* Overall Progress */}
          <Card className="p-4">
            <div className="font-display text-[13px] font-bold mb-3">Review Summary</div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Completed', count: checkins.filter(c => c.status === 'completed').length, color: 'bg-brand-emerald', textColor: 'text-brand-emerald' },
                { label: 'On Track', count: checkins.filter(c => c.status === 'on-track').length, color: 'bg-brand-amber', textColor: 'text-brand-amber' },
                { label: 'Not Started', count: checkins.filter(c => c.status === 'not-started').length, color: 'bg-brand-red', textColor: 'text-brand-red' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-text-secondary">{s.label}</span>
                      <span className={cn("font-bold", s.textColor)}>{s.count}</span>
                    </div>
                    <div className="h-1 bg-bg-primary rounded-full">
                      <div className={cn("h-full rounded-full transition-all", s.color)} style={{ width: `${(s.count / checkins.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Manager Comment */}
          <Card className="p-4 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-brand-blue" />
              <div className="font-display text-[13px] font-bold">
                {role === 'Manager' || role === 'Admin' ? 'Add Manager Comment' : 'Manager Comments'}
              </div>
            </div>
            {(role === 'Manager' || role === 'Admin') && (
              <>
                <textarea
                  value={managerComment}
                  onChange={e => setManagerComment(e.target.value)}
                  className="w-full min-h-[100px] bg-bg-primary border border-border-primary rounded-lg p-3 text-[12px] text-text-primary outline-none resize-none focus:border-brand-blue transition-colors mb-2"
                  placeholder="Add Q3 review notes for employee visibility..."
                />
                <div role="button" tabIndex={0}
                  onClick={handleSaveComment}
                  onKeyDown={e => e.key === 'Enter' && handleSaveComment()}
                  className="flex items-center justify-center gap-1.5 w-full bg-brand-blue/10 text-brand-blue text-xs font-bold py-2 rounded-lg hover:bg-brand-blue/20 transition-colors cursor-pointer mb-3"
                >
                  <Save className="w-3.5 h-3.5" /> Save Comment
                </div>
              </>
            )}
            <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1.5">Previous Comments</div>
            <div className="bg-bg-primary rounded-lg p-3 text-[11px] text-text-secondary leading-relaxed border border-border-primary/50 italic">
              {savedComment}
            </div>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
