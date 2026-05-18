"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { Plus, X, Edit3, Trash2, CheckCircle, Lock, Unlock, Download, Share2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Goal } from "@/lib/data";

// ── Quarterly Cycle Indicator ──────────────────────────────────────
const CYCLES = [
  { label: 'Goal Setting', short: 'GS' },
  { label: 'Q1', short: 'Q1' },
  { label: 'Q2', short: 'Q2' },
  { label: 'Q3', short: 'Q3' },
  { label: 'Q4', short: 'Q4' },
];
const ACTIVE_CYCLE = 2; // 0-indexed — Q3 is index 3, Goal Setting = 0

function CycleIndicator() {
  return (
    <div className="flex items-center gap-1 bg-bg-primary border border-border-primary/50 rounded-xl px-3 py-2">
      {CYCLES.map((c, i) => (
        <div key={c.label} className="flex items-center gap-1">
          {i > 0 && <div className="w-4 h-px bg-border-primary" />}
          <div className={cn(
            "flex flex-col items-center px-2.5 py-1 rounded-lg text-center transition-all",
            i === ACTIVE_CYCLE
              ? "bg-brand-blue/15 border border-brand-blue/30 text-brand-blue"
              : "text-text-tertiary"
          )}>
            <span className={cn("text-[10px] font-black tracking-wide", i === ACTIVE_CYCLE ? "text-brand-blue" : "text-text-tertiary")}>
              {c.short}
            </span>
            {i === ACTIVE_CYCLE && (
              <span className="text-[8px] font-bold text-brand-blue/70 mt-0.5">ACTIVE</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Goal Modal with BRD Validation ────────────────────────────────
function GoalModal() {
  const { isGoalModalOpen, closeGoalModal, addGoal, editingGoal, updateGoal, goals, role } = useStore();
  const [title, setTitle] = useState(editingGoal?.title || '');
  const [dept, setDept] = useState(editingGoal?.dept || 'Product');
  const [target, setTarget] = useState(editingGoal?.target?.toString() || '80');
  const [weight, setWeight] = useState(editingGoal?.weight?.toString() || '20');
  const [kpi, setKpi] = useState(editingGoal?.kpi || '');
  const [shared, setShared] = useState(false);

  if (!isGoalModalOpen) return null;

  // BRD Validation
  const currentTotalWeight = goals.filter(g => editingGoal ? g.id !== editingGoal.id : true)
    .reduce((sum, g) => sum + (g.weight || 0), 0);
  const newTotalWeight = currentTotalWeight + (parseInt(weight) || 0);
  const weightNum = parseInt(weight) || 0;

  const errors: string[] = [];
  if (!title.trim()) errors.push('Initiative title is required.');
  if (!editingGoal && goals.length >= 8) errors.push('Maximum 8 goals allowed per employee.');
  if (weightNum < 10) errors.push('Minimum weightage per goal is 10%.');
  if (weightNum > 100) errors.push('Maximum weightage per goal is 100%.');
  if (!editingGoal && newTotalWeight > 100) errors.push(`Total weightage would exceed 100% (currently ${currentTotalWeight}% allocated).`);

  const isSharedGoal = !!(editingGoal && role === 'Employee');

  const handleSubmit = () => {
    if (errors.length > 0) return;
    if (editingGoal) {
      updateGoal(editingGoal.id, {
        title: isSharedGoal ? editingGoal.title : title,
        dept,
        target: isSharedGoal ? editingGoal.target : (parseInt(target) || 80),
        kpi: kpi || 'TBD',
        weight: weightNum,
      });
    } else {
      addGoal({
        title, dept, owner: 'Vanessa Ruiz', progress: 0,
        target: parseInt(target) || 80, status: 'on-track',
        kpi: kpi || 'TBD', weight: weightNum, due: 'Q4 2025',
        locked: false, shared,
      });
    }
  };

  const remaining = 100 - currentTotalWeight;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center"
        onClick={closeGoalModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()} className="w-[520px]"
        >
          <Card className="p-6 relative shadow-2xl">
            <div role="button" tabIndex={0} onClick={closeGoalModal} onKeyDown={e => e.key === 'Enter' && closeGoalModal()} className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </div>
            <div className="font-display text-[18px] font-black mb-1">
              {editingGoal ? 'Edit Initiative' : 'New Strategic Initiative'}
            </div>
            <div className="text-[12px] text-text-secondary mb-5">Define SMART objectives with KPI alignment · BRD-validated</div>

            {/* Weightage Budget Bar */}
            <div className="mb-4 p-3 bg-bg-primary rounded-lg border border-border-primary/50">
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-text-secondary font-semibold">Weightage Budget</span>
                <span className={cn("font-bold", currentTotalWeight >= 100 ? "text-brand-red" : "text-brand-emerald")}>
                  {currentTotalWeight}% used · {remaining}% remaining
                </span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", currentTotalWeight >= 100 ? "bg-brand-red" : "bg-brand-blue")}
                  style={{ width: `${Math.min(currentTotalWeight, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-bold text-text-secondary block mb-1">
                  Initiative Title {isSharedGoal && <span className="text-brand-amber ml-1">(Shared — Read Only)</span>}
                </label>
                <input
                  value={isSharedGoal ? editingGoal!.title : title}
                  onChange={e => !isSharedGoal && setTitle(e.target.value)}
                  readOnly={isSharedGoal}
                  className={cn(
                    "w-full bg-bg-primary border border-border-primary rounded-lg py-2 px-3 text-[13px] text-text-primary outline-none focus:border-brand-blue transition-colors",
                    isSharedGoal && "opacity-60 cursor-not-allowed"
                  )}
                  placeholder="e.g., Accelerate Product Market Fit"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-text-secondary block mb-1">Department</label>
                  <select value={dept} onChange={e => setDept(e.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-lg py-2 px-3 text-[13px] text-text-primary outline-none">
                    {['Product','Engineering','Marketing','Sales','Finance','Operations','HR','Legal','Strategy'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-text-secondary block mb-1">
                    Weightage % <span className="text-text-tertiary">(min 10%)</span>
                  </label>
                  <input
                    type="number" value={weight} onChange={e => setWeight(e.target.value)}
                    className={cn(
                      "w-full bg-bg-primary border rounded-lg py-2 px-3 text-[13px] text-text-primary outline-none transition-colors",
                      weightNum < 10 ? "border-brand-red" : "border-border-primary focus:border-brand-blue"
                    )}
                    placeholder="20" min="10" max="100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-text-secondary block mb-1">
                    Target % {isSharedGoal && <span className="text-brand-amber">(Read Only)</span>}
                  </label>
                  <input
                    type="number" value={isSharedGoal ? editingGoal!.target.toString() : target}
                    onChange={e => !isSharedGoal && setTarget(e.target.value)}
                    readOnly={isSharedGoal}
                    className={cn("w-full bg-bg-primary border border-border-primary rounded-lg py-2 px-3 text-[13px] text-text-primary outline-none", isSharedGoal && "opacity-60 cursor-not-allowed")}
                    placeholder="85"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-text-secondary block mb-1">Strategic KPI</label>
                  <input value={kpi} onChange={e => setKpi(e.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-lg py-2 px-3 text-[13px] text-text-primary outline-none" placeholder="e.g., NPS ≥ 60" />
                </div>
              </div>

              {/* Shared Goal toggle for Manager/Admin */}
              {(role === 'Manager' || role === 'Admin') && !editingGoal && (
                <div className="flex items-center gap-2 p-3 bg-brand-blue/5 border border-brand-blue/15 rounded-lg cursor-pointer" onClick={() => setShared(s => !s)}>
                  <Share2 className="w-3.5 h-3.5 text-brand-blue" />
                  <span className="text-[12px] font-semibold text-text-primary flex-1">Shared Goal</span>
                  <div className={cn("w-8 h-4 rounded-full transition-colors relative", shared ? "bg-brand-blue" : "bg-border-primary")}>
                    <div className={cn("absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all", shared ? "left-4" : "left-0.5")} />
                  </div>
                </div>
              )}
            </div>

            {/* Inline validation errors */}
            {errors.length > 0 && (
              <div className="mt-3 flex flex-col gap-1">
                {errors.map((err, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-brand-red bg-brand-red/5 border border-brand-red/15 rounded-lg px-2.5 py-1.5">
                    <span className="font-bold">✕</span> {err}
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-5 justify-end">
              <div role="button" tabIndex={0} onClick={closeGoalModal} onKeyDown={e => e.key === 'Enter' && closeGoalModal()} className="text-xs font-semibold text-text-secondary border border-border-primary px-4 py-1.5 rounded-lg hover:bg-bg-primary transition-colors cursor-pointer">
                Cancel
              </div>
              <div
                role="button" tabIndex={0}
                onClick={errors.length === 0 ? handleSubmit : undefined}
                onKeyDown={e => e.key === 'Enter' && errors.length === 0 && handleSubmit()}
                className={cn(
                  "text-xs font-semibold px-4 py-1.5 rounded-lg shadow-md transition-all cursor-pointer",
                  errors.length === 0
                    ? "text-white bg-brand-blue hover:bg-brand-blue/90"
                    : "text-text-tertiary bg-border-primary cursor-not-allowed opacity-50"
                )}
              >
                {editingGoal ? 'Save Changes' : 'Create Initiative'}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── CSV Export ─────────────────────────────────────────────────────
function exportGoalsCSV(goals: Goal[]) {
  const header = ['Title', 'Department', 'Owner', 'Status', 'Progress %', 'Target %', 'KPI', 'Weight %', 'Due', 'Locked'];
  const rows = goals.map(g => [
    `"${g.title}"`, g.dept, g.owner, g.status, g.progress, g.target, `"${g.kpi}"`, g.weight, g.due,
    (g as Goal & { locked?: boolean }).locked ? 'Yes' : 'No',
  ]);
  const csv = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `aligniq-goals-q3-2025.csv`; a.click();
  URL.revokeObjectURL(url);
}

// ── Main Module ────────────────────────────────────────────────────
export default function GoalsModule() {
  const { goals, openGoalModal, setEditingGoal, deleteGoal, updateGoal, role, showToast } = useStore();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? goals :
    goals.filter(g =>
      filter === 'On Track' ? g.status === 'on-track' :
      filter === 'At Risk' ? (g.status === 'at-risk' || g.status === 'behind') :
      filter === 'Completed' ? g.status === 'complete' :
      filter === 'Locked' ? (g as Goal & { locked?: boolean }).locked : true
    );

  const totalWeight = useMemo(() => goals.reduce((s, g) => s + (g.weight || 0), 0), [goals]);
  const weightOk = totalWeight === 100;

  const statusCfg: Record<string, { label: string; cls: string }> = {
    'on-track': { label: 'On Track', cls: 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20' },
    'at-risk': { label: 'At Risk', cls: 'bg-brand-amber/10 text-brand-amber border-brand-amber/20' },
    'complete': { label: 'Complete', cls: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
    'behind': { label: 'Behind', cls: 'bg-brand-red/10 text-brand-red border-brand-red/20' },
  };

  const handleUnlock = (id: string) => {
    updateGoal(id, { locked: false } as Partial<Goal>);
    showToast('Goal unlocked by Admin.');
  };

  return (
    <>
      <GoalModal />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Goal Workspace</h1>
            <p className="text-text-secondary text-[13px] mt-1">Strategic objective lifecycle management · {goals.length}/8 initiatives</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <CycleIndicator />
            <div className="flex gap-2 items-center">
              {/* Weight Compliance Badge */}
              <div className={cn(
                "text-[11px] font-bold px-3 py-1 rounded-full border",
                weightOk
                  ? "bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20"
                  : "bg-brand-amber/10 text-brand-amber border-brand-amber/20"
              )}>
                Weight: {totalWeight}% {weightOk ? "✓ Balanced" : `(${totalWeight > 100 ? 'over' : 100 - totalWeight + '% unallocated'})`}
              </div>
              <div role="button" tabIndex={0} onClick={() => exportGoalsCSV(goals)} onKeyDown={e => e.key === 'Enter' && exportGoalsCSV(goals)}
                className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary border border-border-primary px-3 py-1.5 rounded-lg hover:bg-bg-primary transition-colors cursor-pointer">
                <Download className="w-3.5 h-3.5" /> Export CSV
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar + Add */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex bg-bg-primary p-0.5 rounded-lg border border-border-primary/50">
            {['All', 'On Track', 'At Risk', 'Completed', 'Locked'].map(t => (
              <div role="button" tabIndex={0} key={t}
                onClick={() => setFilter(t)}
                onKeyDown={e => e.key === 'Enter' && setFilter(t)}
                className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer", filter === t ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary')}
              >{t}</div>
            ))}
          </div>
          {role !== 'Employee' || goals.length < 8 ? (
            <div role="button" tabIndex={0} onClick={openGoalModal} onKeyDown={e => e.key === 'Enter' && openGoalModal()}
              className="flex items-center gap-1.5 bg-brand-blue text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-blue/90 shadow-md cursor-pointer">
              <Plus className="w-4 h-4" /> Add Goal
            </div>
          ) : (
            <div className="text-[11px] text-brand-red font-semibold px-3 py-1.5 bg-brand-red/5 border border-brand-red/20 rounded-lg">Max 8 goals reached</div>
          )}
        </div>

        {/* Goals list */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {filtered.map(g => {
              const s = statusCfg[g.status] || statusCfg['on-track'];
              const barColor = g.status === 'at-risk' ? 'bg-brand-amber' : g.status === 'complete' ? 'bg-brand-emerald' : g.status === 'behind' ? 'bg-brand-red' : 'bg-brand-blue';
              const isLocked = !!(g as Goal & { locked?: boolean }).locked;
              const isShared = !!(g as Goal & { shared?: boolean }).shared;

              return (
                <motion.div key={g.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                  <Card className={cn("p-4 transition-all group", isLocked ? "border-brand-amber/30 opacity-80" : "hover:border-brand-blue/30")}>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-display text-[13px] font-bold group-hover:text-brand-blue transition-colors">{g.title}</span>
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", s.cls)}>{s.label}</span>
                          {isLocked && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-amber/10 text-brand-amber border border-brand-amber/20 flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> Locked</span>}
                          {isShared && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-indigo/10 text-brand-blue border border-brand-blue/20 flex items-center gap-1"><Share2 className="w-2.5 h-2.5" /> Shared</span>}
                        </div>
                        <div className="flex gap-4 text-[11px] text-text-secondary flex-wrap">
                          <span><strong className="text-text-primary">{g.dept}</strong></span>
                          <span>{g.owner}</span>
                          <span>KPI: {g.kpi}</span>
                          <span>Due: {g.due}</span>
                          <span className="text-brand-blue font-semibold">Weight: {g.weight}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-mono text-[16px] font-bold">{g.progress}%</div>
                          <div className="text-[10px] text-text-tertiary">of {g.target}%</div>
                        </div>
                        <div className="w-20">
                          <div className="h-1 bg-bg-primary rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all duration-700", barColor)} style={{ width: `${Math.min(g.progress / g.target * 100, 100)}%` }} />
                          </div>
                        </div>
                        {!isLocked && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div role="button" tabIndex={0} onClick={() => setEditingGoal(g)} onKeyDown={e => e.key === 'Enter' && setEditingGoal(g)} className="p-1.5 text-text-tertiary hover:text-brand-blue hover:bg-bg-primary rounded-md transition-colors cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></div>
                            {g.status !== 'complete' && (
                              <div role="button" tabIndex={0} onClick={() => updateGoal(g.id, { status: 'complete', progress: g.target })} onKeyDown={e => e.key === 'Enter' && updateGoal(g.id, { status: 'complete', progress: g.target })} className="p-1.5 text-text-tertiary hover:text-brand-emerald hover:bg-bg-primary rounded-md transition-colors cursor-pointer"><CheckCircle className="w-3.5 h-3.5" /></div>
                            )}
                            <div role="button" tabIndex={0} onClick={() => deleteGoal(g.id)} onKeyDown={e => e.key === 'Enter' && deleteGoal(g.id)} className="p-1.5 text-text-tertiary hover:text-brand-red hover:bg-bg-primary rounded-md transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></div>
                          </div>
                        )}
                        {isLocked && role === 'Admin' && (
                          <div role="button" tabIndex={0} onClick={() => handleUnlock(g.id)} onKeyDown={e => e.key === 'Enter' && handleUnlock(g.id)}
                            className="flex items-center gap-1 text-[11px] font-bold text-brand-amber bg-brand-amber/10 border border-brand-amber/20 px-2 py-1 rounded-md hover:bg-brand-amber/20 transition-colors cursor-pointer">
                            <Unlock className="w-3 h-3" /> Unlock
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-text-tertiary text-sm">No goals match this filter.</div>
          )}
        </div>
      </motion.div>
    </>
  );
}
