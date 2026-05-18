import { create } from 'zustand';
import {
  Goal, Approval, AuditEvent, Notification, AIInsight, ActivityItem,
  GoalStatus, ApprovalStatus,
  SEED_GOALS, SEED_APPROVALS, SEED_NOTIFICATIONS, SEED_AI_INSIGHTS,
  SEED_ACTIVITY, DASHBOARD_KPIS, generateId, now,
} from '@/lib/data';
import {
  AI_RESPONSES, RICH_AUDIT_LOG, GOVERNANCE_ALERTS, ESCALATION_EVENTS,
  ROLE_CONFIGS, UserRole,
} from '@/lib/enterprise';

export interface AIMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

interface KPI {
  id: string; label: string; value: number; suffix: string;
  icon: string; color: string; trend: string; trendVal: string; progress: number;
}

interface AlignIQStore {
  // User / Role
  role: UserRole;
  setRole: (r: UserRole) => void;

  // Navigation
  activeModule: 'dashboard' | 'goals' | 'strategy' | 'reviews' | 'checkins' | 'analytics' | 'audit' | 'kpigov' | 'escalations' | 'settings';
  setActiveModule: (m: AlignIQStore['activeModule']) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // UI Panels
  isAIOpen: boolean; toggleAI: () => void;
  isNotifsOpen: boolean; toggleNotifs: () => void;

  // KPIs
  kpis: KPI[];
  updateKPI: (id: string, value: number) => void;

  // Goals
  goals: Goal[];
  addGoal: (g: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, u: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;

  // Approvals
  approvals: Approval[];
  processApproval: (id: string, action: ApprovalStatus) => void;

  // Audit
  auditLog: AuditEvent[];
  addAuditEvent: (e: Omit<AuditEvent, 'id'>) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id'>) => void;
  markNotifRead: (id: string) => void;
  unreadCount: () => number;

  // Activity
  activityFeed: ActivityItem[];
  addActivity: (i: Omit<ActivityItem, 'id'>) => void;

  // AI
  aiMessages: AIMessage[];
  isAILoading: boolean;
  sendAIQuery: (q: string) => void;
  addAIMessage: (m: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  aiInsights: AIInsight[];

  // Computed health
  orgHealth: number;
  alignmentScore: number;
  recalculateHealth: () => void;

  // Toast
  toast: string | null;
  showToast: (m: string) => void;

  // Goal Modal
  isGoalModalOpen: boolean;
  openGoalModal: () => void;
  closeGoalModal: () => void;
  editingGoal: Goal | null;
  setEditingGoal: (g: Goal | null) => void;

  // Simulation
  isSimulating: boolean;
  simulateScenario: (scenario: string) => void;
}

function pickAIResponse(q: string): string {
  const ql = q.toLowerCase();
  if (ql.includes('simulate') || ql.includes('miss') || ql.includes('what happens')) return AI_RESPONSES.simulation;
  if (ql.includes('risk') || ql.includes('alert') || ql.includes('governance')) return AI_RESPONSES.risks;
  if (ql.includes('kpi') || ql.includes('summary') || ql.includes('brief')) return AI_RESPONSES.kpis;
  if (ql.includes('at-risk') || ql.includes('behind') || ql.includes('lagging')) return AI_RESPONSES.atRisk;
  if (ql.includes('correct') || ql.includes('action') || ql.includes('suggest') || ql.includes('fix')) return AI_RESPONSES.corrective;
  if (ql.includes('retain') || ql.includes('customer') || ql.includes('churn')) return AI_RESPONSES.retention;
  if (ql.includes('overview') || ql.includes('executive') || ql.includes('board')) return AI_RESPONSES.summary;
  return AI_RESPONSES.default;
}

export const useStore = create<AlignIQStore>((set, get) => ({
  // Role
  role: 'Admin',
  setRole: (role) => {
    set({ role });
    const cfg = ROLE_CONFIGS[role];
    get().showToast(`Switched to ${cfg.name} — ${cfg.role}`);
    get().addAuditEvent({ ts: now(), actor: 'System', type: 'Role Switch', desc: `Dashboard context switched to ${role}: ${cfg.name}`, status: 'logged' });
  },

  // Nav
  activeModule: 'dashboard',
  setActiveModule: (m) => set({ activeModule: m }),

  // Theme
  theme: 'dark',
  toggleTheme: () => set(s => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

  // Panels
  isAIOpen: false,
  toggleAI: () => set(s => ({ isAIOpen: !s.isAIOpen, isNotifsOpen: false })),
  isNotifsOpen: false,
  toggleNotifs: () => set(s => ({ isNotifsOpen: !s.isNotifsOpen, isAIOpen: false })),

  // KPIs
  kpis: DASHBOARD_KPIS,
  updateKPI: (id, value) => set(s => ({
    kpis: s.kpis.map(k => k.id === id ? { ...k, value, progress: Math.round(value) } : k),
  })),

  // Goals
  goals: SEED_GOALS,
  addGoal: (goal) => {
    const id = generateId();
    set(s => ({ goals: [{ ...goal, id }, ...s.goals] }));
    const cfg = ROLE_CONFIGS[get().role];
    get().addAuditEvent({ ts: now(), actor: cfg.name, type: 'Goal Created', desc: `Initiative created: "${goal.title}" — ${goal.dept}`, status: 'logged' });
    get().addNotification({ text: `New initiative: "${goal.title}"`, time: 'Just now', type: 'system', read: false });
    get().addActivity({ icon: 'check', text: `Goal Created: ${goal.title}`, sub: `${goal.dept} · ${goal.owner}`, time: 'NOW', color: '#5B8CFF' });
    get().recalculateHealth();
    get().closeGoalModal();
    get().showToast(`Initiative "${goal.title}" created.`);
  },
  updateGoal: (id, updates) => {
    set(s => ({ goals: s.goals.map(g => g.id === id ? { ...g, ...updates } : g) }));
    get().recalculateHealth();
    const cfg = ROLE_CONFIGS[get().role];
    get().addAuditEvent({ ts: now(), actor: cfg.name, type: 'Goal Updated', desc: `Initiative updated: ID ${id}`, status: 'logged' });
  },
  deleteGoal: (id) => {
    const g = get().goals.find(x => x.id === id);
    set(s => ({ goals: s.goals.filter(x => x.id !== id) }));
    get().recalculateHealth();
    if (g) get().showToast(`"${g.title}" removed.`);
  },

  // Approvals
  approvals: SEED_APPROVALS,
  processApproval: (id, action) => {
    const a = get().approvals.find(x => x.id === id);
    set(s => ({ approvals: s.approvals.map(x => x.id === id ? { ...x, status: action } : x) }));
    const cfg = ROLE_CONFIGS[get().role];
    if (a) {
      get().addAuditEvent({ ts: now(), actor: cfg.name, type: 'Approval', desc: `${action}: ${a.title}`, status: action === 'approved' ? 'approved' : action === 'rejected' ? 'flagged' : 'escalated' });
      get().addNotification({ text: `${a.title} — ${action}`, time: 'Just now', type: 'approval', read: false });
      get().showToast(`${action.charAt(0).toUpperCase() + action.slice(1)}: ${a.title}`);
    }
  },

  // Audit — seeded with rich enterprise logs
  auditLog: RICH_AUDIT_LOG,
  addAuditEvent: (e) => set(s => ({ auditLog: [{ ...e, id: generateId() }, ...s.auditLog] })),

  // Notifications
  notifications: SEED_NOTIFICATIONS,
  addNotification: (n) => set(s => ({ notifications: [{ ...n, id: generateId() }, ...s.notifications] })),
  markNotifRead: (id) => set(s => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),
  unreadCount: () => get().notifications.filter(n => !n.read).length,

  // Activity
  activityFeed: SEED_ACTIVITY,
  addActivity: (i) => set(s => ({ activityFeed: [{ ...i, id: generateId() }, ...s.activityFeed].slice(0, 20) })),

  // AI
  aiMessages: [{
    id: 'ai-init', role: 'ai' as const, timestamp: 'Just now',
    content: `Good morning, ${ROLE_CONFIGS.Admin.name}. I'm monitoring **${SEED_GOALS.length} active initiatives**, **10 KPI streams**, and **${RICH_AUDIT_LOG.length} governance events** this cycle.\n\n**2 critical signals** require your attention:\n• Sales Operations APAC pipeline −22% vs Q4 target\n• Engineering review SLA breach in 6 days\n\nAsk me anything about your strategic portfolio.`,
  }],
  isAILoading: false,
  aiInsights: SEED_AI_INSIGHTS,
  addAIMessage: (m) => set(s => ({ aiMessages: [...s.aiMessages, { ...m, id: generateId(), timestamp: now() }] })),
  sendAIQuery: (q) => {
    if (!get().isAIOpen) set({ isAIOpen: true });
    get().addAIMessage({ role: 'user', content: q });
    set({ isAILoading: true });
    const delay = 1000 + Math.random() * 600;
    setTimeout(() => {
      get().addAIMessage({ role: 'ai', content: pickAIResponse(q) });
      set({ isAILoading: false });
      get().addAuditEvent({ ts: now(), actor: 'AI Governance Engine', type: 'AI Query', desc: `Query processed: "${q.substring(0, 70)}${q.length > 70 ? '…' : ''}"`, status: 'actioned' });
    }, delay);
  },

  // Health
  orgHealth: 88.7,
  alignmentScore: 94.2,
  recalculateHealth: () => {
    const goals = get().goals;
    if (!goals.length) return;
    const avg = goals.reduce((s, g) => s + g.progress, 0) / goals.length;
    const onTrackR = goals.filter(g => g.status === 'on-track' || g.status === 'complete').length / goals.length;
    const health = Math.round((avg * 0.6 + onTrackR * 100 * 0.4) * 10) / 10;
    const alignment = Math.min(99, Math.round((avg * 0.65 + onTrackR * 100 * 0.35 + 8) * 10) / 10);
    set({ orgHealth: health, alignmentScore: alignment });
    get().updateKPI('kpi1', alignment);
    get().updateKPI('kpi2', health);
  },

  // Toast
  toast: null,
  showToast: (m) => { set({ toast: m }); setTimeout(() => set({ toast: null }), 3500); },

  // Modal
  isGoalModalOpen: false,
  openGoalModal: () => set({ isGoalModalOpen: true }),
  closeGoalModal: () => set({ isGoalModalOpen: false, editingGoal: null }),
  editingGoal: null,
  setEditingGoal: (g) => set({ editingGoal: g, isGoalModalOpen: true }),

  // Simulation (WOW moment)
  isSimulating: false,
  simulateScenario: (scenario) => {
    set({ isSimulating: true });
    get().sendAIQuery(scenario);
    setTimeout(() => { get().updateKPI('kpi1', 87.1); get().updateKPI('kpi2', 81.3); get().updateKPI('kpi3', 48.2); }, 800);
    setTimeout(() => {
      get().addNotification({ text: '⚠ Simulation: Sales Q4 miss — cascading impact calculated', time: 'Just now', type: 'risk', read: false });
      get().addAuditEvent({ ts: now(), actor: 'AI Governance Engine', type: 'Simulation', desc: `Scenario simulation: "${scenario.substring(0, 60)}" — impact cascaded across 4 KPIs`, status: 'flagged' });
    }, 1500);
    setTimeout(() => { set({ isSimulating: false }); }, 3200);
  },
}));
