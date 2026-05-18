// ========== ALIGNIQ — Enterprise Seed Data ==========

export type GoalStatus = 'on-track' | 'at-risk' | 'complete' | 'behind';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'escalated';
export type AuditEventStatus = 'flagged' | 'approved' | 'logged' | 'actioned' | 'completed' | 'escalated';
export type InsightType = 'risk' | 'opportunity' | 'optimization';

export interface Goal {
  id: string;
  title: string;
  dept: string;
  owner: string;
  progress: number;
  target: number;
  status: GoalStatus;
  kpi: string;
  weight: number;
  due: string;
  description?: string;
  locked?: boolean;   // BRD: goals lock after manager approval
  shared?: boolean;   // BRD: shared goals assigned by manager/admin
}

export interface Approval {
  id: string;
  title: string;
  requester: string;
  dept: string;
  amount: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  status: ApprovalStatus;
}

export interface AuditEvent {
  id: string;
  ts: string;
  actor: string;
  type: string;
  desc: string;
  status: AuditEventStatus;
}

export interface Notification {
  id: string;
  text: string;
  time: string;
  type: 'risk' | 'approval' | 'reminder' | 'system' | 'ai';
  read: boolean;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: string;
  type: InsightType;
  timestamp: string;
}

export interface StrategyPillar {
  id: string;
  title: string;
  desc: string;
  progress: number;
  color: string;
  goals: number;
}

export interface CheckInKPI {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  val: string;
}

export interface GovMetric {
  label: string;
  val: string;
  trend: string;
}

export interface ActivityItem {
  id: string;
  icon: 'upload' | 'refresh' | 'alert' | 'check' | 'person';
  text: string;
  sub: string;
  time: string;
  color: string;
}

// ── GOALS ──
export const SEED_GOALS: Goal[] = [
  { id: 'g1', title: 'Accelerate Market Penetration APAC', dept: 'Sales', owner: 'Marcus Thorne', progress: 78, target: 90, status: 'on-track', kpi: 'Revenue +$8.4M', weight: 30, due: 'Q3 2025' },
  { id: 'g2', title: 'Platform Infrastructure Modernization', dept: 'Engineering', owner: 'Priya Nair', progress: 54, target: 80, status: 'at-risk', kpi: 'Uptime 99.9%', weight: 25, due: 'Q4 2025' },
  { id: 'g3', title: 'Customer Experience Transformation', dept: 'Product', owner: 'Leon Fischer', progress: 91, target: 85, status: 'complete', kpi: 'NPS ≥ 60', weight: 20, due: 'Q2 2025' },
  { id: 'g4', title: 'Sustainable Growth Initiative', dept: 'Strategy', owner: 'Vanessa Ruiz', progress: 62, target: 85, status: 'at-risk', kpi: 'ESG Score 82', weight: 25, due: 'Q3 2025' },
  { id: 'g5', title: 'Workforce Digital Upskilling', dept: 'HR', owner: 'Diana Chen', progress: 45, target: 70, status: 'at-risk', kpi: 'Completion 70%', weight: 15, due: 'Q4 2025' },
  { id: 'g6', title: 'Global Compliance Framework', dept: 'Legal', owner: 'James Okafor', progress: 88, target: 95, status: 'on-track', kpi: '0 Violations', weight: 20, due: 'Q3 2025' },
  { id: 'g7', title: 'AI-Powered Sales Intelligence', dept: 'Marketing', owner: 'Sofia Reyes', progress: 33, target: 65, status: 'at-risk', kpi: 'Pipeline +40%', weight: 18, due: 'Q4 2025' },
  { id: 'g8', title: 'Cost Optimization Program', dept: 'Finance', owner: 'Robert Kim', progress: 72, target: 75, status: 'on-track', kpi: 'OpEx −12%', weight: 22, due: 'Q3 2025' },
];

// ── APPROVALS ──
export const SEED_APPROVALS: Approval[] = [
  { id: 'a1', title: 'Q3 Budget Reallocation · Marketing', requester: 'Sofia Reyes', dept: 'Marketing', amount: '$240K', priority: 'high', time: '2h ago', status: 'pending' },
  { id: 'a2', title: 'Headcount Expansion · Engineering', requester: 'Priya Nair', dept: 'Engineering', amount: '4 FTEs', priority: 'medium', time: '5h ago', status: 'pending' },
  { id: 'a3', title: 'Vendor Contract Renewal · AWS', requester: 'Robert Kim', dept: 'Finance', amount: '$1.8M', priority: 'high', time: '1d ago', status: 'pending' },
];

// ── AUDIT EVENTS ──
export const SEED_AUDIT: AuditEvent[] = [
  { id: 'au1', ts: '2025-07-18 14:32', actor: 'AI Engine', type: 'KPI Alert', desc: '14% deviation detected in Sustainable Growth Initiative — North America', status: 'flagged' },
  { id: 'au2', ts: '2025-07-18 12:15', actor: 'Vanessa Ruiz', type: 'Approval', desc: 'Approved Q3 budget reallocation for Sales division ($180K)', status: 'approved' },
  { id: 'au3', ts: '2025-07-18 09:44', actor: 'Marcus Thorne', type: 'Update', desc: 'Updated APAC revenue milestone: +$8.4M confirmed for Q3', status: 'logged' },
  { id: 'au4', ts: '2025-07-17 16:20', actor: 'AI Engine', type: 'Auto-Align', desc: 'Auto-calibrated CLV targets for Enterprise tier based on Q2 actuals', status: 'actioned' },
  { id: 'au5', ts: '2025-07-17 14:05', actor: 'Diana Chen', type: 'Check-in', desc: 'Q3 Workforce Upskilling check-in submitted — 45% completion rate', status: 'logged' },
  { id: 'au6', ts: '2025-07-17 11:32', actor: 'James Okafor', type: 'Compliance', desc: 'Global Compliance Framework — Legal review passed, 0 violations', status: 'approved' },
  { id: 'au7', ts: '2025-07-16 17:48', actor: 'Leon Fischer', type: 'Goal Lock', desc: 'Customer Experience Transformation marked Complete — NPS 64 achieved', status: 'completed' },
  { id: 'au8', ts: '2025-07-16 15:20', actor: 'Robert Kim', type: 'KPI Update', desc: 'OpEx reduction updated: Q3 trajectory at −11.2% vs −12% target', status: 'logged' },
  { id: 'au9', ts: '2025-07-16 10:00', actor: 'AI Engine', type: 'Report', desc: 'Q2 Sustainability Governance report finalized by Compliance Division', status: 'logged' },
  { id: 'au10', ts: '2025-07-15 16:30', actor: 'Priya Nair', type: 'Escalation', desc: 'Infrastructure modernization timeline risk escalated to VP Engineering', status: 'escalated' },
];

// ── NOTIFICATIONS ──
export const SEED_NOTIFICATIONS: Notification[] = [
  { id: 'n1', text: 'AI flagged governance risk in Sustainable Growth', time: '14 min ago', type: 'risk', read: false },
  { id: 'n2', text: 'Marcus Thorne approved APAC budget reallocation', time: '2h ago', type: 'approval', read: false },
  { id: 'n3', text: 'Q3 Check-in deadline approaching for 4 teams', time: '5h ago', type: 'reminder', read: false },
  { id: 'n4', text: 'AI Governance report generated for Q2', time: '1d ago', type: 'ai', read: true },
];

// ── AI INSIGHTS ──
export const SEED_AI_INSIGHTS: AIInsight[] = [
  { id: 'ai1', title: 'Revenue Risk: NA Sector', description: '14% deviation in Sustainable Growth initiative projected to impact Q4 revenue by −$1.2M', confidence: 98.2, impact: '−$1.2M', type: 'risk', timestamp: '14 min ago' },
  { id: 'ai2', title: 'Engineering Velocity Opportunity', description: 'Platform modernization can be accelerated 23% by redistributing sprint capacity from completed CX initiative', confidence: 91.5, impact: '+23% velocity', type: 'opportunity', timestamp: '2h ago' },
  { id: 'ai3', title: 'Sales Pipeline Optimization', description: 'AI sales intelligence adoption at 33% — recommend shifting $120K from traditional pipeline to ML-driven lead scoring', confidence: 87.3, impact: '+40% pipeline', type: 'optimization', timestamp: '5h ago' },
];

// ── STRATEGY PILLARS ──
export const SEED_STRATEGY: StrategyPillar[] = [
  { id: 's1', title: 'Revenue Acceleration', desc: 'Drive 18% YoY growth across all product lines and geographies', progress: 74, color: '#5B8CFF', goals: 3 },
  { id: 's2', title: 'Operational Excellence', desc: 'Optimize cost structures and process efficiency enterprise-wide', progress: 68, color: '#00B4D8', goals: 4 },
  { id: 's3', title: 'Talent & Culture', desc: 'Build high-performance teams and digital-native capabilities', progress: 52, color: '#5203D5', goals: 2 },
  { id: 's4', title: 'Technology Modernization', desc: 'Cloud-first infrastructure and AI-powered decision systems', progress: 60, color: '#059669', goals: 3 },
  { id: 's5', title: 'Sustainability & ESG', desc: 'Carbon neutrality roadmap and governance compliance framework', progress: 81, color: '#D97706', goals: 2 },
  { id: 's6', title: 'Customer Experience', desc: 'Net Promoter Score leadership in Enterprise SaaS segment', progress: 91, color: '#DC2626', goals: 2 },
];

// ── CHECK-IN KPIs ──
export const SEED_CHECKIN_KPIS: CheckInKPI[] = [
  { id: 'ck1', label: 'Revenue Target', current: 74, target: 90, unit: '$M', val: '$74.2M / $90M' },
  { id: 'ck2', label: 'NPS Score', current: 64, target: 60, unit: '', val: '64 / 60 ✓' },
  { id: 'ck3', label: 'Employee Engagement', current: 72, target: 80, unit: '%', val: '72% / 80%' },
  { id: 'ck4', label: 'Digital Transformation Index', current: 58, target: 75, unit: '%', val: '58% / 75%' },
  { id: 'ck5', label: 'Compliance Score', current: 96, target: 95, unit: '%', val: '96% / 95% ✓' },
];

// ── GOV METRICS ──
export const SEED_GOV_METRICS: GovMetric[] = [
  { label: 'Policy Compliance Rate', val: '98.4%', trend: '+0.6%' },
  { label: 'Avg. Review Cycle Time', val: '4.2 days', trend: '−1.1 days' },
  { label: 'Escalation Resolution', val: '94.1%', trend: '+2.3%' },
  { label: 'Audit Trail Coverage', val: '100%', trend: '—' },
  { label: 'AI Confidence Score', val: '98.2%', trend: '+0.4%' },
];

// ── ACTIVITY FEED ──
export const SEED_ACTIVITY: ActivityItem[] = [
  { id: 'act1', icon: 'upload', text: 'New Audit Report Uploaded', sub: 'Compliance Division finalized Q2 Sustainability Governance report.', time: '2H AGO', color: '#5B8CFF' },
  { id: 'act2', icon: 'refresh', text: 'KPI Recalibration', sub: "AI adjusted 'Customer Lifetime Value' targets for Enterprise tier.", time: '4H AGO', color: '#5203D5' },
  { id: 'act3', icon: 'alert', text: 'Risk Flag — Sustainable Growth', sub: '14% deviation detected. North America sector. Projected −$1.2M.', time: '5H AGO', color: '#DC2626' },
  { id: 'act4', icon: 'check', text: 'Goal Completed: CX Transformation', sub: 'Leon Fischer marked NPS objective complete. Score: 64.', time: '1D AGO', color: '#059669' },
  { id: 'act5', icon: 'person', text: 'Comment from Marcus Thorne', sub: '"APAC pipeline exceeded projections by 12%. Recommend immediate scale-up."', time: '1D AGO', color: '#00B4D8' },
];

// ── CHART DATA ──
export const CHART_DATA = {
  weekly: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], alignment: [72,85,55,82,68,98,77], velocity: [60,70,45,75,58,88,65] },
  monthly: { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'], alignment: [65,72,68,81,74,86,91], velocity: [55,62,60,72,66,79,84] },
  quarterly: { labels: ['Q1','Q2','Q3','Q4'], alignment: [61,70,78,84], velocity: [55,63,71,80] },
};

// ── KPI DASHBOARD ──
export const DASHBOARD_KPIS = [
  { id: 'kpi1', label: 'Alignment Score', value: 94.2, suffix: '%', icon: 'target', color: 'blue', trend: 'up', trendVal: '12.4%', progress: 94 },
  { id: 'kpi2', label: 'Org Health Index', value: 88.7, suffix: '', icon: 'activity', color: 'cyan', trend: 'stable', trendVal: 'Stable', progress: 88 },
  { id: 'kpi3', label: 'Initiative Velocity', value: 62.5, suffix: '', icon: 'zap', color: 'indigo', trend: 'down', trendVal: '2.1%', progress: 62 },
  { id: 'kpi4', label: 'Decision Confidence', value: 97.1, suffix: '', icon: 'shield', color: 'blue', trend: 'ai', trendVal: 'AI Optimized', progress: 97 },
];

// ── DEPT PERFORMANCE ──
export const DEPT_PERFORMANCE = [
  { dept: 'Product', score: 91, color: '#5B8CFF' },
  { dept: 'Engineering', score: 54, color: '#7C4DFF' },
  { dept: 'Marketing', score: 33, color: '#F87171' },
  { dept: 'Sales', score: 78, color: '#34D399' },
  { dept: 'Finance', score: 72, color: '#22D3EE' },
  { dept: 'Operations', score: 68, color: '#FBBF24' },
  { dept: 'Legal', score: 88, color: '#34D399' },
  { dept: 'HR', score: 45, color: '#94A3B8' },
];

// ── RISK HEATMAP ──
export const RISK_HEATMAP = [
  { dept: 'HR', level: 'low' },
  { dept: 'R&D', level: 'medium' },
  { dept: 'OPS', level: 'low' },
  { dept: 'FIN', level: 'medium' },
  { dept: 'LGL', level: 'low' },
  { dept: 'MKT', level: 'high' },
  { dept: 'IT', level: 'low' },
  { dept: 'CS', level: 'medium' },
  { dept: 'S&O', level: 'low' },
];

// ── AI QUICK PROMPTS ──
export const AI_QUICK_PROMPTS = [
  'Analyze governance risks',
  'Generate Q3 KPI summary',
  'Identify at-risk goals',
  'Suggest corrective actions',
  'Simulate Q4 Sales miss',
];

// Helper to generate unique IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

// Helper to get current timestamp
export function now(): string {
  return new Date().toISOString().replace('T', ' ').substring(0, 16);
}
