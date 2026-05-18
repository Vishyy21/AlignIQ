"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { Plus, X, Edit3, Trash2, CheckCircle } from "lucide-react";
import { useState } from "react";

function GoalModal() {
  const { isGoalModalOpen, closeGoalModal, addGoal, editingGoal, updateGoal } = useStore();
  const [title, setTitle] = useState(editingGoal?.title || '');
  const [dept, setDept] = useState(editingGoal?.dept || 'Product');
  const [target, setTarget] = useState(editingGoal?.target?.toString() || '80');
  const [kpi, setKpi] = useState(editingGoal?.kpi || '');

  if (!isGoalModalOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) { useStore.getState().showToast('Please enter a title.'); return; }
    if (editingGoal) {
      updateGoal(editingGoal.id, { title, dept, target: parseInt(target) || 80, kpi: kpi || 'TBD' });
    } else {
      addGoal({ title, dept, owner: 'Vanessa Ruiz', progress: 0, target: parseInt(target) || 80, status: 'on-track', kpi: kpi || 'TBD', weight: 15, due: 'Q4 2025' });
    }
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center" onClick={closeGoalModal}>
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={e => e.stopPropagation()} className="w-[500px]">
          <Card className="p-6 relative shadow-2xl">
            <button onClick={closeGoalModal} className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"><X className="w-4 h-4" /></button>
            <div className="font-display text-[18px] font-black mb-1">{editingGoal ? 'Edit Initiative' : 'New Strategic Initiative'}</div>
            <div className="text-[12px] text-text-secondary mb-5">Define SMART objectives with KPI alignment</div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-bold text-text-secondary block mb-1">Initiative Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-lg py-2 px-3 text-[13px] text-text-primary outline-none focus:border-brand-blue transition-colors" placeholder="e.g., Accelerate Product Market Fit" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-text-secondary block mb-1">Department</label>
                  <select value={dept} onChange={e => setDept(e.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-lg py-2 px-3 text-[13px] text-text-primary outline-none">
                    {['Product','Engineering','Marketing','Sales','Finance','Operations','HR','Legal','Strategy'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-text-secondary block mb-1">Target %</label>
                  <input type="number" value={target} onChange={e => setTarget(e.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-lg py-2 px-3 text-[13px] text-text-primary outline-none" placeholder="85" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-text-secondary block mb-1">Strategic KPI</label>
                <input value={kpi} onChange={e => setKpi(e.target.value)} className="w-full bg-bg-primary border border-border-primary rounded-lg py-2 px-3 text-[13px] text-text-primary outline-none" placeholder="e.g., NPS ≥ 60, Revenue ≥ $10M" />
              </div>
            </div>
            <div className="flex gap-2 mt-5 justify-end">
              <button onClick={closeGoalModal} className="text-xs font-semibold text-text-secondary border border-border-primary px-4 py-1.5 rounded-lg hover:bg-bg-primary transition-colors">Cancel</button>
              <button onClick={handleSubmit} className="text-xs font-semibold text-white bg-brand-blue px-4 py-1.5 rounded-lg hover:bg-brand-blue/90 shadow-md transition-all">{editingGoal ? 'Save Changes' : 'Create Initiative'}</button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GoalsModule() {
  const { goals, openGoalModal, setEditingGoal, deleteGoal, updateGoal } = useStore();
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? goals : goals.filter(g => filter === 'On Track' ? g.status === 'on-track' : filter === 'At Risk' ? (g.status === 'at-risk' || g.status === 'behind') : g.status === 'complete');
  const statusCfg: Record<string, { label: string; cls: string }> = {
    'on-track': { label: 'On Track', cls: 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20' },
    'at-risk': { label: 'At Risk', cls: 'bg-brand-amber/10 text-brand-amber border-brand-amber/20' },
    'complete': { label: 'Complete', cls: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
    'behind': { label: 'Behind', cls: 'bg-brand-red/10 text-brand-red border-brand-red/20' },
  };

  return (
    <>
      <GoalModal />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Goal Workspace</h1>
            <p className="text-text-secondary text-[13px] mt-1">Strategic objective lifecycle management · {goals.length} active initiatives</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-bg-primary p-0.5 rounded-lg border border-border-primary/50">
              {['All','On Track','At Risk','Completed'].map(t => (
                <button key={t} onClick={() => setFilter(t)} className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-colors", filter === t ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary')}>{t}</button>
              ))}
            </div>
            <button onClick={openGoalModal} className="flex items-center gap-1.5 bg-brand-blue text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-blue/90 shadow-md"><Plus className="w-4 h-4" /> Add Goal</button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {filtered.map(g => {
              const s = statusCfg[g.status] || statusCfg['on-track'];
              const barColor = g.status === 'at-risk' ? 'bg-brand-amber' : g.status === 'complete' ? 'bg-brand-emerald' : g.status === 'behind' ? 'bg-brand-red' : 'bg-brand-blue';
              return (
                <motion.div key={g.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: 'spring' as const, stiffness: 300, damping: 24 }}>
                  <Card className="p-4 hover:border-brand-blue/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display text-[13px] font-bold group-hover:text-brand-blue transition-colors">{g.title}</span>
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", s.cls)}>{s.label}</span>
                        </div>
                        <div className="flex gap-4 text-[11px] text-text-secondary">
                          <span><strong className="text-text-primary">{g.dept}</strong></span>
                          <span>{g.owner}</span>
                          <span>KPI: {g.kpi}</span>
                          <span>Due: {g.due}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right"><div className="font-mono text-[16px] font-bold">{g.progress}%</div><div className="text-[10px] text-text-tertiary">of {g.target}%</div></div>
                        <div className="w-20"><div className="h-1 bg-bg-primary rounded-full overflow-hidden"><div className={cn("h-full rounded-full transition-all duration-700", barColor)} style={{ width: `${Math.min(g.progress / g.target * 100, 100)}%` }} /></div></div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingGoal(g)} className="p-1.5 text-text-tertiary hover:text-brand-blue hover:bg-bg-primary rounded-md transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                          {g.status !== 'complete' && <button onClick={() => updateGoal(g.id, { status: 'complete', progress: g.target })} className="p-1.5 text-text-tertiary hover:text-brand-emerald hover:bg-bg-primary rounded-md transition-colors"><CheckCircle className="w-3.5 h-3.5" /></button>}
                          <button onClick={() => deleteGoal(g.id)} className="p-1.5 text-text-tertiary hover:text-brand-red hover:bg-bg-primary rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
