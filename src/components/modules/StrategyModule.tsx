"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { SEED_STRATEGY } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

export default function StrategyModule() {
  const cascadeData = SEED_STRATEGY.map(p => ({ name: p.title.split(' ').slice(0, 2).join(' '), progress: p.progress, color: p.color }));

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      <motion.div variants={item}>
        <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Strategic Objectives</h1>
        <p className="text-text-secondary text-[13px] mt-1">Annual pillars driving organizational alignment</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        {SEED_STRATEGY.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="p-5 hover:-translate-y-1 hover:shadow-xl transition-all cursor-default group" style={{ borderTopWidth: '3px', borderTopColor: p.color }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ background: p.color, boxShadow: `0 0 10px ${p.color}60` }} />
                <span className="text-[10px] text-text-tertiary font-semibold">{p.goals} goals</span>
              </div>
              <div className="font-display text-[13px] font-black mb-1 group-hover:text-brand-blue transition-colors">{p.title}</div>
              <p className="text-[11px] text-text-secondary leading-relaxed mb-4">{p.desc}</p>
              <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden mb-2">
                <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }} className="h-full rounded-full" style={{ background: p.color }} />
              </div>
              <div className="text-[11px] font-bold" style={{ color: p.color }}>{p.progress}% complete</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <Card className="p-5">
          <div className="font-display text-[14px] font-bold mb-4">Cascade Map</div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cascadeData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" opacity={0.5} />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text3)' }} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text2)', fontWeight: 600 }} width={100} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '10px', fontSize: '12px' }} formatter={(v: any) => `${v}%`} />
                <Bar dataKey="progress" name="Completion" radius={[0, 5, 5, 0]} barSize={16}>
                  {cascadeData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
