"use client";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";
import { ArrowUpRight, ArrowDownRight, Target, Activity, Zap, Shield, Sparkles, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CHART_DATA, RISK_HEATMAP } from "@/lib/data";

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round((start + (end - start) * eased) * 10) / 10);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <>{display}{suffix}</>;
}

const iconMap: Record<string, React.ElementType> = { target: Target, activity: Activity, zap: Zap, shield: Shield };

export default function DashboardModule() {
  const { kpis, activityFeed, aiInsights, setActiveModule, simulateScenario, isSimulating, sendAIQuery } = useStore();
  const [chartPeriod, setChartPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');
  const chartData = CHART_DATA[chartPeriod].labels.map((name, i) => ({ name, alignment: CHART_DATA[chartPeriod].alignment[i], velocity: CHART_DATA[chartPeriod].velocity[i] }));

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      <motion.div variants={item} className="flex items-end justify-between">
        <div>
          <div className="text-[11px] font-bold text-text-tertiary tracking-[0.06em] uppercase mb-1.5">Dashboard › Overview</div>
          <h1 className="font-display text-[28px] font-black tracking-tight text-text-primary leading-tight">Executive Governance Dashboard</h1>
          <p className="text-text-secondary text-[13px] mt-1.5">Real-time intelligence across all global business units · <span className="text-brand-emerald font-semibold">All systems operational</span></p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => useStore.getState().showToast('Report exported successfully.')} className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-text-primary bg-transparent border border-border-primary hover:bg-bg-primary px-3 py-1.5 rounded-lg transition-all">Export</button>
          <button onClick={() => useStore.getState().showToast('Executive report generated.')} className="flex items-center gap-2 text-xs font-semibold text-white bg-brand-blue hover:bg-brand-blue/90 px-4 py-1.5 rounded-lg transition-all shadow-md shadow-brand-blue/20">Create Report</button>
        </div>
      </motion.div>

      {/* KPI Row */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = iconMap[kpi.icon] || Target;
          const bgMap: Record<string, string> = { blue: 'bg-brand-blue-light', cyan: 'bg-brand-cyan/10', indigo: 'bg-brand-indigo/10' };
          const clrMap: Record<string, string> = { blue: 'text-brand-blue', cyan: 'text-brand-cyan', indigo: 'text-brand-indigo' };
          return (
            <Card key={kpi.id} className={cn("p-4 hover:-translate-y-1 hover:shadow-xl transition-all cursor-default group", isSimulating && "animate-pulse")}>
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-lg", bgMap[kpi.color] || bgMap.blue)}><Icon className={cn("w-4 h-4", clrMap[kpi.color] || clrMap.blue)} /></div>
                {kpi.trend === 'up' && <span className="bg-brand-emerald/10 text-brand-emerald text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3"/> {kpi.trendVal}</span>}
                {kpi.trend === 'down' && <span className="bg-brand-red/10 text-brand-red text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5"><ArrowDownRight className="w-3 h-3"/> {kpi.trendVal}</span>}
                {kpi.trend === 'stable' && <span className="bg-brand-cyan/10 text-brand-cyan text-[11px] font-bold px-2 py-0.5 rounded-full">{kpi.trendVal}</span>}
                {kpi.trend === 'ai' && <span className="bg-brand-blue/10 text-brand-blue text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-brand-blue/20"><Sparkles className="w-3 h-3"/>{kpi.trendVal}</span>}
              </div>
              <div className="text-[11px] text-text-secondary font-semibold mb-1">{kpi.label}</div>
              <div className="font-mono text-[28px] font-bold tracking-tight leading-none"><AnimatedCounter value={kpi.value} suffix={kpi.suffix} /></div>
              <div className="h-1 bg-bg-primary rounded-full mt-3 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${kpi.progress}%` }} transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }} className={cn("h-full rounded-full", kpi.color === 'cyan' ? 'bg-brand-cyan' : kpi.color === 'indigo' ? 'bg-brand-indigo' : 'bg-brand-blue')} />
              </div>
            </Card>
          );
        })}
      </motion.div>

      {/* Chart + Risk */}
      <motion.div variants={item} className="grid grid-cols-[1fr_300px] gap-4">
        <Card className="p-5 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-display text-[14px] font-bold text-text-primary">Organizational Performance Trend</div>
              <div className="text-[11px] text-text-secondary mt-0.5">Alignment vs Initiative velocity · H1 2025</div>
            </div>
            <div className="flex bg-bg-primary p-0.5 rounded-md border border-border-primary/50">
              {(['weekly','monthly','quarterly'] as const).map(t => (
                <button key={t} onClick={() => setChartPeriod(t)} className={cn("px-3 py-1 text-[11px] font-bold rounded-sm transition-colors capitalize", chartPeriod === t ? 'bg-surface text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-secondary')}>{t}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gAlign" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#5B8CFF" stopOpacity={0.3}/><stop offset="95%" stopColor="#5B8CFF" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gVel" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7C4DFF" stopOpacity={0.15}/><stop offset="95%" stopColor="#7C4DFF" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text3)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text3)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '10px', fontSize: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }} />
                <Area type="monotone" dataKey="alignment" name="Alignment" stroke="#5B8CFF" strokeWidth={2.5} fillOpacity={1} fill="url(#gAlign)" activeDot={{ r: 5, strokeWidth: 0, fill: '#5B8CFF' }} />
                <Area type="monotone" dataKey="velocity" name="Velocity" stroke="#7C4DFF" strokeWidth={2} fillOpacity={1} fill="url(#gVel)" strokeDasharray="5 3" activeDot={{ r: 4, strokeWidth: 0, fill: '#7C4DFF' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="font-display text-[14px] font-bold text-text-primary mb-1">Risk Heatmap</div>
          <div className="text-[11px] text-text-secondary mb-4">Dept volatility · Q3</div>
          <div className="grid grid-cols-3 gap-1.5 mb-5">
            {RISK_HEATMAP.map(r => (
              <div key={r.dept} className={cn("aspect-square rounded-md flex items-center justify-center text-[10px] font-black tracking-wider transition-all hover:scale-110 cursor-pointer",
                r.level === 'high' ? "bg-brand-red text-white shadow-[0_4px_12px_rgba(220,38,38,0.4)]" :
                r.level === 'medium' ? "bg-brand-amber/15 text-brand-amber" : "bg-brand-emerald/15 text-brand-emerald"
              )}>{r.dept}</div>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-[11px] font-semibold">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_8px_rgba(220,38,38,0.6)]" />High: Marketing Volatility</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-amber" />Mid: Financial Q4 Proj.</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-emerald" />Stable: 7 Departments</div>
          </div>
        </Card>
      </motion.div>

      {/* AI Insights + Activity */}
      <motion.div variants={item} className="grid grid-cols-[360px_1fr] gap-4">
        <Card className="p-5 relative overflow-hidden group" glow>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-colors duration-700" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-brand-blue rounded-md shadow-md shadow-brand-blue/20"><Sparkles className="w-3.5 h-3.5 text-white" /></div>
              <span className="font-display text-[14px] font-bold">AI Governance Insights</span>
            </div>
            <span className="bg-brand-blue/10 text-brand-blue text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-brand-blue/20 animate-pulse">Live</span>
          </div>
          <div className="bg-bg-primary/50 border border-brand-blue/20 rounded-lg p-3 mb-4 relative z-10 backdrop-blur-sm">
            <div className="text-[10px] font-black text-brand-red uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> Governance Risk Detected</div>
            <p className="text-[12px] text-text-primary leading-relaxed mb-3">ML models flagged a <strong>14% deviation</strong> in "Sustainable Growth" · NA sector. Projected: <strong className="text-brand-red">−$1.2M</strong></p>
            <div className="flex gap-2">
              <button onClick={() => simulateScenario("What happens if Sustainable Growth misses target?")} className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white text-[11px] font-bold py-1.5 rounded-md transition-colors">
                {isSimulating ? '⟳ Simulating...' : 'Auto-Align'}
              </button>
              <button onClick={() => setActiveModule('analytics')} className="flex-1 bg-transparent border border-border-primary hover:bg-surface text-text-secondary hover:text-text-primary text-[11px] font-bold py-1.5 rounded-md transition-colors">Details</button>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 relative z-10 text-[12px]">
            <div className="flex justify-between items-center pb-2.5 border-b border-border-primary/50"><span className="text-text-secondary">Model Confidence</span><span className="font-black text-brand-blue">{aiInsights[0]?.confidence ?? 98.2}%</span></div>
            <div className="flex justify-between items-center pb-2.5 border-b border-border-primary/50"><span className="text-text-secondary">Actionable Items</span><span className="font-bold">12 New</span></div>
            <div className="flex justify-between items-center"><span className="text-text-secondary">Last Audit Cycle</span><span className="font-bold">14 min ago</span></div>
          </div>
        </Card>
        <Card className="p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display text-[14px] font-bold">Operational Activity Feed</div>
            <button onClick={() => setActiveModule('audit')} className="text-[11px] font-semibold text-text-secondary hover:text-brand-blue transition-colors">View Full Log →</button>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto pr-2 -mr-2 gap-4">
            {activityFeed.slice(0, 6).map((log, i) => (
              <div key={log.id} className="flex gap-3 group">
                <div className="flex flex-col items-center pt-1 relative">
                  <div className="w-2 h-2 rounded-full z-10 outline outline-4 outline-surface" style={{ background: log.color }} />
                  {i < 5 && <div className="absolute top-3 bottom-[-16px] w-[1px] bg-border-primary group-hover:bg-brand-blue/30 transition-colors" />}
                </div>
                <div>
                  <div className="text-[12px] text-text-primary leading-tight font-medium">{log.text}</div>
                  <div className="text-[11px] text-text-tertiary mt-0.5">{log.sub}</div>
                  <div className="text-[10px] text-text-tertiary mt-0.5 font-medium">{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
