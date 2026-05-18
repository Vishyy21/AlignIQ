"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/store/store";
import { COMPANY, DEPARTMENTS } from "@/lib/enterprise";
import { cn } from "@/lib/utils";
import { Building2, Globe, Users, Shield, Bell, Palette } from "lucide-react";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

export default function SettingsModule() {
  const { theme, toggleTheme, role, showToast } = useStore();

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      <motion.div variants={item}>
        <h1 className="font-display text-[24px] font-black tracking-tight text-text-primary">Organization Settings</h1>
        <p className="text-text-secondary text-[13px] mt-1">Enterprise configuration · Governance policies · System preferences</p>
      </motion.div>

      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <div className="flex flex-col gap-4">
          {/* Company Info */}
          <motion.div variants={item}>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-4 h-4 text-brand-blue-mid" />
                <span className="font-display text-[13px] font-bold">Company Information</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Organization Name', COMPANY.name],
                  ['Industry', COMPANY.industry],
                  ['Total Employees', COMPANY.employees.toLocaleString()],
                  ['Fiscal Year', COMPANY.fiscalYear],
                  ['Active Regions', COMPANY.regions.length.toString()],
                  ['Review Cycle', COMPANY.cycle],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">{label}</div>
                    <div className="text-[13px] font-semibold text-text-primary">{val}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Departments */}
          <motion.div variants={item}>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-brand-blue-mid" />
                <span className="font-display text-[13px] font-bold">Department Overview</span>
              </div>
              <div className="flex flex-col gap-2">
                {DEPARTMENTS.slice(0, 6).map(d => (
                  <div key={d.id} className="flex items-center gap-3 py-2 border-b border-border-primary/30 last:border-0">
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold">{d.name}</div>
                      <div className="text-[11px] text-text-tertiary">{d.kpis} KPIs · {d.reviewCompletion}% review completion</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-bg-primary rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-brand-blue" style={{ width: `${d.score}%` }} />
                      </div>
                      <span className="font-mono text-[12px] font-bold w-8 text-right">{d.score}</span>
                      <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full capitalize", d.escalationRisk === 'high' ? 'bg-brand-red/10 text-brand-red' : d.escalationRisk === 'medium' ? 'bg-brand-amber/10 text-brand-amber' : 'bg-brand-emerald/10 text-brand-emerald')}>{d.escalationRisk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Regions */}
          <motion.div variants={item}>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4"><Globe className="w-4 h-4 text-brand-blue-mid" /><span className="font-display text-[13px] font-bold">Active Regions</span></div>
              <div className="flex flex-col gap-2">
                {COMPANY.regions.map(r => (
                  <div key={r} className="flex items-center justify-between py-1.5">
                    <span className="text-[12px] font-semibold">{r}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald shadow-[0_0_6px_rgba(5,150,105,0.5)]" />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Governance Policy */}
          <motion.div variants={item}>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4"><Shield className="w-4 h-4 text-brand-blue-mid" /><span className="font-display text-[13px] font-bold">Governance Policy</span></div>
              <div className="flex flex-col gap-3 text-[12px]">
                {[['Review SLA', '48 hours'],['Escalation Threshold', '7 days'],['Audit Retention', '7 years'],['KPI Review Cadence', 'Weekly']].map(([k,v]) => (
                  <div key={k} className="flex justify-between border-b border-border-primary/30 pb-2 last:border-0">
                    <span className="text-text-secondary">{k}</span><span className="font-bold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Preferences */}
          <motion.div variants={item}>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4"><Palette className="w-4 h-4 text-brand-blue-mid" /><span className="font-display text-[13px] font-bold">Preferences</span></div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-secondary">Theme</span>
                  <button onClick={toggleTheme} className="text-[11px] font-bold bg-brand-blue/10 text-brand-blue-mid px-3 py-1 rounded-md hover:bg-brand-blue/20 transition-colors capitalize">{theme} Mode</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-secondary">Notifications</span>
                  <button onClick={() => showToast('Notifications updated.')} className="text-[11px] font-bold bg-brand-emerald/10 text-brand-emerald px-3 py-1 rounded-md">Enabled</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-secondary">Current Role</span>
                  <span className="text-[11px] font-bold text-brand-blue-mid">{role}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
