"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { DEPT_PERFORMANCE, SEED_GOV_METRICS } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

const donutData = [
  { name: 'On Track', value: 3, color: '#5B8CFF' },
  { name: 'At Risk', value: 4, color: '#FBBF24' },
  { name: 'Complete', value: 1, color: '#34D399' },
];

const radarData = [
  { subject: 'Engagement', current: 72, target: 80 },
  { subject: 'Productivity', current: 81, target: 85 },
  { subject: 'Retention', current: 68, target: 80 },
  { subject: 'Development', current: 45, target: 70 },
  { subject: 'Alignment', current: 88, target: 90 },
];

export default function AnalyticsModule() {
  const { goals } = useStore();
  const deptData = DEPT_PERFORMANCE.map(d => ({ name: d.dept, score: d.score, color: d.color }));

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      <motion.div variants={item}>
        <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Analytics Center</h1>
        <p className="text-text-secondary text-[13px] mt-1">Governance metrics, performance intelligence, and predictive models</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        {/* Department Performance */}
        <Card className="p-5 col-span-2">
          <div className="font-display text-[13px] font-bold mb-4">Department Performance Index</div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text3)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text3)' }} domain={[0, 105]} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '10px', fontSize: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="score" name="Performance" radius={[5, 5, 0, 0]} barSize={32}>
                  {deptData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Donut */}
        <Card className="p-5">
          <div className="font-display text-[13px] font-bold mb-4">Initiative Distribution</div>
          <div className="h-[180px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutData} innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                  {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '10px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="font-mono text-[22px] font-bold">{goals.length}</div>
              <div className="text-[9px] font-bold text-text-tertiary uppercase tracking-wider">Initiatives</div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {donutData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-[10px] text-text-secondary font-semibold">{d.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 gap-4">
        {/* Radar */}
        <Card className="p-5">
          <div className="font-display text-[13px] font-bold mb-4">Workforce Visibility</div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" opacity={0.5} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'var(--text2)' }} />
                <PolarRadiusAxis tick={{ fontSize: 9, fill: 'var(--text3)' }} domain={[0, 100]} axisLine={false} />
                <Radar name="Current" dataKey="current" stroke="#5B8CFF" fill="#5B8CFF" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Target" dataKey="target" stroke="#7C4DFF" fill="#7C4DFF" fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="5 3" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '10px', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Governance Metrics */}
        <Card className="p-5">
          <div className="font-display text-[13px] font-bold mb-4">Governance Metrics</div>
          <div className="flex flex-col gap-3.5">
            {SEED_GOV_METRICS.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-center justify-between pb-3 border-b border-border-primary/50 last:border-0 last:pb-0">
                <span className="text-[12px] text-text-secondary">{m.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[13px] font-bold">{m.val}</span>
                  <span className="text-[10px] font-bold text-brand-emerald">{m.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
