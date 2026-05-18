// ============================================================
// ALIGNIQ Enterprise Systems — Full Enterprise Dataset
// ============================================================

export const COMPANY = {
  name: 'ALIGNIQ Enterprise Systems',
  industry: 'Enterprise Governance & Strategic Operations',
  employees: 12400,
  regions: ['North America', 'APAC', 'EMEA', 'LATAM'],
  fiscalYear: 'FY 2025',
  cycle: 'Q3 2025 Review Active',
};

// ── EMPLOYEES ──────────────────────────────────────────────
export const EMPLOYEES = [
  { id:'e1', name:'Vishesh Sharma', role:'Chief Governance Officer', dept:'Executive Operations', region:'North America', perf:97, gov:99, reviewCompletion:100, level:'C-Suite', manager:null, status:'on-track' },
  { id:'e2', name:'Priya Mehta', role:'VP Strategic Operations', dept:'Strategic Planning', region:'APAC', perf:92, gov:95, reviewCompletion:100, level:'VP', manager:'e1', status:'on-track' },
  { id:'e3', name:'Aarav Khanna', role:'Director of KPI Governance', dept:'Governance & Compliance', region:'North America', perf:88, gov:94, reviewCompletion:100, level:'Director', manager:'e1', status:'on-track' },
  { id:'e4', name:'Ritika Verma', role:'Workforce Alignment Lead', dept:'Human Resources', region:'EMEA', perf:84, gov:87, reviewCompletion:92, level:'Lead', manager:'e2', status:'on-track' },
  { id:'e5', name:'Kabir Singh', role:'Senior Governance Analyst', dept:'Governance & Compliance', region:'North America', perf:79, gov:91, reviewCompletion:88, level:'Senior', manager:'e3', status:'on-track' },
  { id:'e6', name:'Aanya Kapoor', role:'Compliance Operations Manager', dept:'Governance & Compliance', region:'LATAM', perf:82, gov:89, reviewCompletion:95, level:'Manager', manager:'e3', status:'on-track' },
  { id:'e7', name:'Marcus Thorne', role:'VP Sales Operations', dept:'Sales Operations', region:'North America', perf:78, gov:74, reviewCompletion:76, level:'VP', manager:'e1', status:'at-risk' },
  { id:'e8', name:'Sofia Reyes', role:'AI Governance Lead', dept:'AI Governance', region:'North America', perf:91, gov:93, reviewCompletion:100, level:'Lead', manager:'e1', status:'on-track' },
  { id:'e9', name:'Leon Fischer', role:'Director Customer Success', dept:'Customer Success', region:'EMEA', perf:94, gov:88, reviewCompletion:100, level:'Director', manager:'e2', status:'on-track' },
  { id:'e10', name:'Diana Chen', role:'HR Strategic Programs Lead', dept:'Human Resources', region:'APAC', perf:74, gov:81, reviewCompletion:72, level:'Lead', manager:'e4', status:'at-risk' },
  { id:'e11', name:'James Okafor', role:'Legal & Compliance Director', dept:'Governance & Compliance', region:'EMEA', perf:93, gov:97, reviewCompletion:100, level:'Director', manager:'e3', status:'on-track' },
  { id:'e12', name:'Robert Kim', role:'CFO Operations Director', dept:'Finance Operations', region:'North America', perf:86, gov:90, reviewCompletion:98, level:'Director', manager:'e1', status:'on-track' },
  { id:'e13', name:'Elena Vasquez', role:'Product Strategy Director', dept:'Product Strategy', region:'LATAM', perf:88, gov:84, reviewCompletion:94, level:'Director', manager:'e2', status:'on-track' },
  { id:'e14', name:'Nikhil Bose', role:'Engineering Governance Lead', dept:'Engineering', region:'APAC', perf:71, gov:76, reviewCompletion:68, level:'Lead', manager:'e3', status:'at-risk' },
  { id:'e15', name:'Amara Osei', role:'Strategic Planning Analyst', dept:'Strategic Planning', region:'EMEA', perf:81, gov:83, reviewCompletion:87, level:'Analyst', manager:'e2', status:'on-track' },
];

// ── DEPARTMENTS ────────────────────────────────────────────
export const DEPARTMENTS = [
  { id:'d1', name:'Engineering', score:54, kpis:8, reviewCompletion:68, govHealth:71, escalationRisk:'high', trend:'down' },
  { id:'d2', name:'Product Strategy', score:88, kpis:6, reviewCompletion:94, govHealth:88, escalationRisk:'low', trend:'up' },
  { id:'d3', name:'Governance & Compliance', score:97, kpis:12, reviewCompletion:100, govHealth:97, escalationRisk:'low', trend:'stable' },
  { id:'d4', name:'Human Resources', score:72, kpis:7, reviewCompletion:79, govHealth:76, escalationRisk:'medium', trend:'down' },
  { id:'d5', name:'Sales Operations', score:61, kpis:9, reviewCompletion:74, govHealth:63, escalationRisk:'high', trend:'down' },
  { id:'d6', name:'Strategic Planning', score:84, kpis:6, reviewCompletion:89, govHealth:86, escalationRisk:'low', trend:'up' },
  { id:'d7', name:'Customer Success', score:91, kpis:7, reviewCompletion:100, govHealth:94, escalationRisk:'low', trend:'up' },
  { id:'d8', name:'Finance Operations', score:86, kpis:10, reviewCompletion:98, govHealth:89, escalationRisk:'low', trend:'stable' },
  { id:'d9', name:'AI Governance', score:93, kpis:5, reviewCompletion:100, govHealth:96, escalationRisk:'low', trend:'up' },
  { id:'d10', name:'Executive Operations', score:99, kpis:4, reviewCompletion:100, govHealth:99, escalationRisk:'low', trend:'stable' },
];

// ── KPIs ───────────────────────────────────────────────────
export const ENTERPRISE_KPIS = [
  { id:'k1', title:'Customer Retention Rate', current:81, target:92, dept:'Customer Success', trend:'down', status:'at-risk', risk:'medium', impact:'Revenue −$4.2M if unresolved', aiRec:'Activate lifecycle intervention protocol for enterprise tier.' },
  { id:'k2', title:'Governance Compliance Velocity', current:97, target:95, dept:'Governance & Compliance', trend:'up', status:'on-track', risk:'low', impact:'+12% review throughput', aiRec:'Sustain current cadence. Expand protocol to LATAM region.' },
  { id:'k3', title:'Workforce Alignment Index', current:72, target:85, dept:'Human Resources', trend:'down', status:'at-risk', risk:'high', impact:'−18pp alignment gap', aiRec:'Initiate cross-functional alignment sprint across APAC and EMEA.' },
  { id:'k4', title:'Strategic KPI Completion', current:68, target:80, dept:'Strategic Planning', trend:'up', status:'at-risk', risk:'medium', impact:'+8% if Q3 velocity holds', aiRec:'Accelerate lagging initiative reviews before Q3 close.' },
  { id:'k5', title:'Operational Efficiency Index', current:78, target:82, dept:'Engineering', trend:'stable', status:'on-track', risk:'low', impact:'Cost savings $2.1M YTD', aiRec:'Automate remaining 3 manual review workflows.' },
  { id:'k6', title:'Q3 Governance Health Score', current:88, target:90, dept:'Executive Operations', trend:'up', status:'on-track', risk:'low', impact:'Board-level confidence +14%', aiRec:'Target 91+ for Q4 to exceed benchmark.' },
  { id:'k7', title:'AI Model Confidence Score', current:98, target:95, dept:'AI Governance', trend:'up', status:'on-track', risk:'low', impact:'Decision quality +22%', aiRec:'Retrain Sales pipeline model on Q3 actuals.' },
  { id:'k8', title:'Cross-Functional Review Rate', current:74, target:90, dept:'Strategic Planning', trend:'down', status:'at-risk', risk:'high', impact:'Governance gap risk: HIGH', aiRec:'Mandatory review completion enforcement by Aug 31.' },
  { id:'k9', title:'Executive Oversight Score', current:94, target:90, dept:'Executive Operations', trend:'stable', status:'on-track', risk:'low', impact:'Stakeholder NPS +8pts', aiRec:'Benchmark against Tier-1 governance frameworks.' },
  { id:'k10', title:'APAC Revenue Attainment', current:78, target:90, dept:'Sales Operations', trend:'down', status:'at-risk', risk:'high', impact:'Q4 target at risk −$8.4M', aiRec:'Immediate territory realignment recommended.' },
];

// ── GOVERNANCE ALERTS ─────────────────────────────────────
export const GOVERNANCE_ALERTS = [
  { id:'ga1', severity:'critical', title:'Engineering Review Completion Below Threshold', desc:'Review completion dropped 12.4% in APAC region — Engineering dept at 68% vs 90% target.', dept:'Engineering', time:'8 min ago', action:'Escalate to Director' },
  { id:'ga2', severity:'high', title:'Sales Operations KPI Drift Detected', desc:'Q4 revenue attainment trajectory 14.2pp below target. NA and APAC sectors most affected.', dept:'Sales Operations', time:'34 min ago', action:'Trigger KPI Recalibration' },
  { id:'ga3', severity:'medium', title:'Workforce Alignment Index Declining', desc:'3 consecutive weeks of decline. HR programs in EMEA showing −8.3% engagement.', dept:'Human Resources', time:'2h ago', action:'Review HR Initiatives' },
  { id:'ga4', severity:'medium', title:'Cross-Functional Review Backlog', desc:'14 pending reviews exceeding 48-hour SLA. Finance and Engineering most impacted.', dept:'Multiple', time:'4h ago', action:'Initiate Bulk Review' },
  { id:'ga5', severity:'low', title:'AI Model Recalibration Recommended', desc:'Sales pipeline model trained on Q1 data. Recommend retraining on Q3 actuals.', dept:'AI Governance', time:'6h ago', action:'Schedule Retraining' },
];

// ── ESCALATION EVENTS ─────────────────────────────────────
export const ESCALATION_EVENTS = [
  { id:'esc1', level:'L2', title:'Sales Q4 Target Miss Risk', desc:'APAC sales pipeline 22% below Q4 target. VP Sales escalation triggered.', dept:'Sales Operations', owner:'Marcus Thorne', escalatedTo:'VP Executive', priority:'critical', created:'2025-07-18 14:32', status:'open' },
  { id:'esc2', level:'L1', title:'Engineering Review SLA Breach', desc:'Q3 technical governance review 18 days past SLA. Director-level review required.', dept:'Engineering', owner:'Nikhil Bose', escalatedTo:'Director Engineering', priority:'high', created:'2025-07-17 09:15', status:'open' },
  { id:'esc3', level:'L1', title:'HR Alignment Program Stagnation', desc:'Workforce alignment declined 3 consecutive cycles. Intervention protocol required.', dept:'Human Resources', owner:'Diana Chen', escalatedTo:'Director HR', priority:'medium', created:'2025-07-16 11:40', status:'in-progress' },
  { id:'esc4', level:'L3', title:'LATAM Governance Framework Audit', desc:'Regional compliance gaps identified in LATAM operations. C-Suite visibility required.', dept:'Governance & Compliance', owner:'Aanya Kapoor', escalatedTo:'C-Suite', priority:'high', created:'2025-07-15 16:20', status:'resolved' },
];

// ── ORG HEALTH TREND ───────────────────────────────────────
export const ORG_HEALTH_TREND = [
  { month:'Jan', health:81.2, alignment:76.4, velocity:68.1, compliance:94.2 },
  { month:'Feb', health:83.8, alignment:79.2, velocity:71.4, compliance:95.1 },
  { month:'Mar', health:82.1, alignment:77.8, velocity:69.8, compliance:94.8 },
  { month:'Apr', health:85.4, alignment:81.3, velocity:73.2, compliance:96.3 },
  { month:'May', health:87.9, alignment:84.1, velocity:76.8, compliance:97.1 },
  { month:'Jun', health:86.3, alignment:83.0, velocity:74.9, compliance:96.7 },
  { month:'Jul', health:88.7, alignment:87.2, velocity:78.3, compliance:98.4 },
];

// ── QUARTERLY REVIEW DATA ────────────────────────────────
export const QUARTERLY_REVIEWS = [
  { id:'qr1', employee:'Priya Mehta', dept:'Strategic Planning', rating:4.8, planned:95, actual:92, managerNote:'Exceptional cross-functional alignment. Q4 elevation recommended.', status:'complete' },
  { id:'qr2', employee:'Nikhil Bose', dept:'Engineering', rating:3.2, planned:85, actual:68, managerNote:'Engineering velocity lagging. Implement sprint restructure for Q4.', status:'action-required' },
  { id:'qr3', employee:'Leon Fischer', dept:'Customer Success', rating:4.9, planned:90, actual:94, managerNote:'NPS excellence. CX transformation model to be replicated across EMEA.', status:'complete' },
  { id:'qr4', employee:'Marcus Thorne', dept:'Sales Operations', rating:3.4, planned:90, actual:74, managerNote:'APAC pipeline requires immediate territory realignment.', status:'at-risk' },
  { id:'qr5', employee:'Diana Chen', dept:'Human Resources', rating:3.6, planned:80, actual:72, managerNote:'Digital upskilling program needs acceleration. External L&D recommended.', status:'at-risk' },
  { id:'qr6', employee:'James Okafor', dept:'Governance & Compliance', rating:4.9, planned:95, actual:97, managerNote:'Zero violations. Legal framework exceeding global compliance standards.', status:'complete' },
  { id:'qr7', employee:'Robert Kim', dept:'Finance Operations', rating:4.4, planned:82, actual:86, managerNote:'OpEx trajectory strong. Q4 cost optimization on track.', status:'complete' },
  { id:'qr8', employee:'Sofia Reyes', dept:'AI Governance', rating:4.7, planned:88, actual:91, managerNote:'AI model governance framework sets industry benchmark.', status:'complete' },
];

// ── RICH AI RESPONSES ─────────────────────────────────────
export const AI_RESPONSES: Record<string, string> = {
  default: `I've analyzed your organizational state across **${7} active governance cycles**, **${ENTERPRISE_KPIS.length} KPI streams**, and **${EMPLOYEES.length} employee review records**.\n\nCurrent governance confidence: **98.2%**. Two escalation signals require executive attention before Q3 close.`,

  risks: `**Governance Risk Analysis — Q3 2025**\n\n**Critical (2 items):**\n• Sales Operations: APAC pipeline −22% vs Q4 target. Projected revenue impact: **−$8.4M**\n• Engineering: Review completion at 68% — SLA breach risk in 6 days\n\n**Medium Risk (3 items):**\n• Workforce Alignment Index declining 3rd consecutive cycle (−8.3pp)\n• Cross-functional review backlog: 14 items past 48h SLA\n• Customer Retention at 81% vs 92% target — lifecycle intervention needed\n\n**Recommended Actions:**\n1. Trigger L2 escalation for Sales Operations immediately\n2. Enforce engineering review completion by Aug 31\n3. Activate HR alignment intervention protocol\n\nConfidence Score: **94.7%**`,

  kpis: `**Q3 KPI Executive Briefing — ALIGNIQ Enterprise**\n\n**Performing Above Target:**\n• Governance Compliance Velocity: **97%** vs 95% target ↑\n• AI Model Confidence Score: **98%** vs 95% target ↑\n• Executive Oversight Score: **94%** vs 90% target ↑\n\n**At Risk:**\n• Customer Retention: **81%** vs 92% target — Q4 impact: −$4.2M\n• Cross-Functional Review Rate: **74%** vs 90% target — governance gap\n• APAC Revenue Attainment: **78%** vs 90% target\n\n**Strategic Recommendation:** Reallocate 2 governance analysts from Compliance (performing above target) to Sales Operations and HR for Q4 sprint acceleration.`,

  simulation: `**🔮 Scenario Simulation: Sales Q4 Target Miss**\n\n**Cascading Organizational Impact:**\n\n| Metric | Current | Projected | Delta |\n|---|---|---|---|\n| Alignment Score | 94.2% | **87.1%** | −7.1pp |\n| Org Health | 88.7 | **81.3** | −7.4 |\n| Initiative Velocity | 62.5 | **48.2** | −14.3 |\n| Q4 Revenue | $90M target | **$74.8M** | −$15.2M |\n\n**Escalation Triggers:**\n• L2 → VP Sales (auto-triggered)\n• L3 → C-Suite if unresolved by Sep 15\n• 4 downstream KPIs affected\n\n**AI Corrective Recommendations:**\n1. Immediate territory realignment: APAC → redistribute to NA leads\n2. Activate ML-driven lead scoring ($180K reallocation from Marketing)\n3. Weekly executive review cadence through Q4\n4. Customer Success partnership on retention to offset revenue impact\n\n**Recovery probability with intervention: 71%** | Confidence: **91.2%**`,

  summary: `**Executive Governance Summary — Week 29, Q3 2025**\n\nOrganizational Health: **88.7/100** (+1.2 WoW)\n\n**Top Priorities:**\n1. Sales Operations requires immediate executive intervention — Q4 pipeline at risk\n2. Engineering governance SLA breach imminent — 6-day window\n3. HR Alignment program needs external L&D injection\n\n**Green Signals:**\n• Customer Experience transformation: **Complete** (NPS 64 achieved)\n• Compliance framework: 0 violations across all regions\n• AI Governance velocity: **93%** above industry benchmark\n\n**Board Recommendation:** Governance confidence remains HIGH. Two targeted interventions needed before Q3 close to protect Q4 trajectory.`,

  atRisk: `**At-Risk Initiative Analysis**\n\n**4 initiatives flagged for governance review:**\n\n1. **Sales Intelligence AI** (Marketing) — 33% vs 65% target\n   → Owner: Sofia Reyes | Gap: 32pp | Due: Q4 2025\n   → Action: Immediate $120K reallocation to ML lead scoring\n\n2. **Workforce Digital Upskilling** (HR) — 45% vs 70%\n   → Owner: Diana Chen | Gap: 25pp | Due: Q4 2025\n   → Action: Partner with Coursera Enterprise for accelerated delivery\n\n3. **Platform Infrastructure Modernization** (Engineering) — 54% vs 80%\n   → Owner: Nikhil Bose | Gap: 26pp | Due: Q4 2025\n   → Action: Redistribute 2 sprint teams from completed CX initiative\n\n4. **APAC Market Penetration** (Sales) — 78% vs 90%\n   → Owner: Marcus Thorne | Gap: 12pp | Due: Q3 2025\n   → Action: Territory realignment + executive sponsorship activation\n\nEstimated recovery with intervention: **+18% aggregate velocity** within 6 weeks.`,

  corrective: `**Strategic Corrective Action Plan — Q3 2025**\n\nGenerated by AI Governance Engine | Confidence: 96.3%\n\n**Immediate (0–7 days):**\n• Escalate Sales Operations to L2 review\n• Enforce Engineering review completion — mandatory by Aug 31\n• Schedule emergency HR alignment workshop for APAC cohort\n\n**Short-Term (7–30 days):**\n• Reallocate $180K from Marketing to ML-driven Sales Intelligence\n• Redistribute 2 engineering sprint teams to Infrastructure modernization\n• Launch Coursera Enterprise partnership for HR upskilling acceleration\n\n**Strategic (30–90 days):**\n• Implement cross-functional governance board for lagging departments\n• Retrain AI pipeline model on Q3 actuals\n• Expand Compliance framework model to LATAM region\n\n**Projected impact:** +22% governance velocity by Q4 close.`,

  retention: `**Customer Retention Intelligence Brief**\n\nCurrent Rate: **81%** | Target: **92%** | Gap: **−11pp**\n\n**Root Cause Analysis:**\n• Enterprise tier churn: +3.2pp QoQ (primary driver)\n• Onboarding completion rate: 74% (below 85% threshold)\n• Time-to-value: 47 days vs 30-day benchmark\n\n**AI-Generated Recommendation:**\n"Increase enterprise customer retention from **81% to 92%** before Q4 through strategic lifecycle optimization — specifically: dedicated CSM assignment for accounts >$500K ARR, automated health score alerts at 60-day intervals, and executive sponsor program for at-risk enterprise accounts."\n\n**Projected Impact:** +$4.2M ARR protection if target achieved.`,
};

// ── RICH AUDIT LOG ─────────────────────────────────────────
export const RICH_AUDIT_LOG = [
  { id:'ral1', ts:'2025-07-18 14:32', actor:'AI Governance Engine', type:'Risk Alert', desc:'APAC Sales pipeline deviation flagged — 22% below Q4 target. L2 escalation auto-triggered.', status:'flagged' as const },
  { id:'ral2', ts:'2025-07-18 12:15', actor:'Vishesh Sharma', type:'Approval', desc:'Q3 Governance Review approved for Finance Operations. Compliance score: 98.4%.', status:'approved' as const },
  { id:'ral3', ts:'2025-07-18 11:40', actor:'Priya Mehta', type:'KPI Update', desc:'Strategic KPI Completion recalibrated to 68% — Q3 velocity holding at target trajectory.', status:'logged' as const },
  { id:'ral4', ts:'2025-07-18 09:44', actor:'Marcus Thorne', type:'Update', desc:'APAC revenue milestone confirmed: $74.2M vs $90M Q3 target. Escalation threshold reached.', status:'escalated' as const },
  { id:'ral5', ts:'2025-07-17 16:20', actor:'AI Governance Engine', type:'Auto-Align', desc:'Customer Retention lifecycle targets recalibrated for Enterprise tier based on Q2 actuals.', status:'actioned' as const },
  { id:'ral6', ts:'2025-07-17 14:05', actor:'Diana Chen', type:'Check-in', desc:'Q3 Workforce Upskilling check-in submitted — 45% completion vs 70% target.', status:'logged' as const },
  { id:'ral7', ts:'2025-07-17 11:32', actor:'James Okafor', type:'Compliance', desc:'Global Compliance Framework — Full legal review passed. 0 violations across all regions.', status:'approved' as const },
  { id:'ral8', ts:'2025-07-16 17:48', actor:'Leon Fischer', type:'Goal Lock', desc:'Customer Experience Transformation marked COMPLETE. NPS score: 64 (target: 60). Overachieved.', status:'completed' as const },
  { id:'ral9', ts:'2025-07-16 15:20', actor:'Robert Kim', type:'KPI Update', desc:'OpEx reduction Q3 trajectory: −11.2% vs −12% target. On track for Q4 adjustment.', status:'logged' as const },
  { id:'ral10', ts:'2025-07-16 10:00', actor:'AI Governance Engine', type:'Report', desc:'Q2 Sustainability Governance report finalized. ESG score: 79 vs 82 target. Action plan generated.', status:'actioned' as const },
  { id:'ral11', ts:'2025-07-15 16:30', actor:'Nikhil Bose', type:'Escalation', desc:'Infrastructure modernization timeline risk escalated to Director Engineering. 26pp gap from target.', status:'escalated' as const },
  { id:'ral12', ts:'2025-07-15 09:15', actor:'Sofia Reyes', type:'AI Model', desc:'Sales Intelligence AI model retrained on Q2 data. Accuracy improved to 94.3%.', status:'actioned' as const },
  { id:'ral13', ts:'2025-07-14 14:00', actor:'Aanya Kapoor', type:'Compliance', desc:'LATAM governance framework audit complete. 3 minor gaps identified. Remediation plan active.', status:'logged' as const },
  { id:'ral14', ts:'2025-07-14 11:20', actor:'Vishesh Sharma', type:'Strategic Review', desc:'Q3 Executive Governance review board convened. 8 initiatives reviewed. 2 escalated.', status:'approved' as const },
  { id:'ral15', ts:'2025-07-13 16:45', actor:'AI Governance Engine', type:'Prediction', desc:'Q4 revenue risk model updated. Sales Operations trajectory projects −$8.4M if unaddressed.', status:'flagged' as const },
];

// ── ROLE-BASED DASHBOARD CONFIG ────────────────────────────
export const ROLE_CONFIGS = {
  Admin: {
    name: 'Vishesh Sharma',
    role: 'Chief Governance Officer',
    initials: 'VS',
    greeting: 'Executive Command Center',
    kpiCards: ['Alignment Score', 'Org Health Index', 'Initiative Velocity', 'Decision Confidence'],
    canApprove: true, canEscalate: true, canDelete: true, seeAllDepts: true,
  },
  Manager: {
    name: 'Priya Mehta',
    role: 'VP Strategic Operations',
    initials: 'PM',
    greeting: 'Strategic Operations Hub',
    kpiCards: ['Team Alignment', 'Review Completion', 'KPI Velocity', 'Escalation Risk'],
    canApprove: true, canEscalate: true, canDelete: false, seeAllDepts: false,
  },
  Employee: {
    name: 'Kabir Singh',
    role: 'Senior Governance Analyst',
    initials: 'KS',
    greeting: 'Personal Governance Workspace',
    kpiCards: ['My Goals', 'Review Status', 'My KPI Score', 'Check-in Due'],
    canApprove: false, canEscalate: false, canDelete: false, seeAllDepts: false,
  },
};

export type UserRole = keyof typeof ROLE_CONFIGS;
