"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { ENTERPRISE_KPIS } from "@/lib/enterprise";
import { useStore } from "@/store/store";
import { ArrowUpRight, ArrowDownRight, Minus, Sparkles } from "lucide-react";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

export default function KPIGovModule() {
  const { sendAIQuery, showToast } = useStore();
  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      <motion.div variants={item} className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">KPI Governance</h1>
          <p className="text-text-secondary text-[13px] mt-1">Enterprise KPI health, risk classification, and AI recommendations</p>
        </div>
        <button onClick={() => showToast('KPI governance report exported.')} className="text-xs font-semibold border border-border-primary px-4 py-1.5 rounded-lg hover:bg-bg-primary text-text-secondary transition-colors">Export Report</button>
      </motion.div>
      <motion.div variants={item} className="flex flex-col gap-3">
        {ENTERPRISE_KPIS.map((k, i) => {
          const statusCls = k.status === 'on-track' ? 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20' : 'bg-brand-amber/10 text-brand-amber border-brand-amber/20';
          const riskCls = k.risk === 'high' ? 'text-brand-red' : k.risk === 'medium' ? 'text-brand-amber' : 'text-brand-emerald';
          const ratio = Math.min(k.current / k.target, 1.02);
          const barColor = k.status === 'on-track' ? 'bg-brand-blue' : k.risk === 'high' ? 'bg-brand-red' : 'bg-brand-amber';
          return (
            <motion.div key={k.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-4 hover:border-brand-blue-mid/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-display text-[13px] font-bold">{k.title}</span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize", statusCls)}>{k.status.replace('-', ' ')}</span>
                      <span className="text-[10px] text-text-tertiary">· {k.dept}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(ratio * 100, 100)}%` }} transition={{ duration: 1, delay: i * 0.08 }} className={cn("h-full rounded-full", barColor)} />
                      </div>
                      <span className="font-mono text-[12px] font-bold shrink-0">{k.current}% <span className="text-text-tertiary font-normal">/ {k.target}%</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-brand-blue-mid shrink-0" />
                      <span className="text-[11px] text-text-secondary italic">{k.aiRec}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1">
                      {k.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 text-brand-emerald" /> : k.trend === 'down' ? <ArrowDownRight className="w-3.5 h-3.5 text-brand-red" /> : <Minus className="w-3.5 h-3.5 text-text-tertiary" />}
                      <span className={cn("text-[11px] font-bold capitalize", k.trend === 'up' ? 'text-brand-emerald' : k.trend === 'down' ? 'text-brand-red' : 'text-text-tertiary')}>{k.trend}</span>
                    </div>
                    <span className={cn("text-[10px] font-bold capitalize", riskCls)}>{k.risk} risk</span>
                    <button onClick={() => sendAIQuery(`Analyze KPI: ${k.title}`)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-brand-blue-mid bg-brand-blue-mid/10 px-2 py-1 rounded-md hover:bg-brand-blue-mid/20">AI Analysis</button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
