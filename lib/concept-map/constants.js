// ============================================================
//  STEMRN Concept Map - Constants & Node Type Definitions
// ============================================================

/** All node types with display labels, CSS class names, default titles/bodies */
export const NODE_TYPES = {
  central:      { label: 'Central Concept',  color: '#2C5F8D', border: '#1E4266', textColor: '#FFFFFF' },
  subjective:   { label: 'Subjective Data',  color: '#F0F7FC', border: '#D0E0EE', textColor: '#0F172A' },
  objective:    { label: 'Objective Data',   color: '#EEF4FA', border: '#C5D9EB', textColor: '#0F172A' },
  diagnosis:    { label: 'Nursing Dx',       color: '#FFE8ED', border: '#FBC4CE', textColor: '#0F172A' },
  intervention: { label: 'Intervention',     color: '#FFF5E6', border: '#FBDFB0', textColor: '#0F172A' },
  outcome:      { label: 'Expected Outcome', color: '#E8F8EE', border: '#B8E4C9', textColor: '#0F172A' },
  risk:         { label: 'Risk Factor',      color: '#F3EEF9', border: '#D6C7EA', textColor: '#0F172A' },
  complication: { label: 'Complication',     color: '#FDE7E7', border: '#F5B8B8', textColor: '#0F172A' },
  medication:   { label: 'Medication',       color: '#E3F2FD', border: '#90CAF9', textColor: '#0F172A' },
};

/** Default content for new nodes of each type */
export const NODE_DEFAULTS = {
  central:      { title: 'Central Concept', body: 'Define the core clinical picture' },
  subjective:   { title: 'Subjective data', body: '• patient reports...' },
  objective:    { title: 'Objective data', body: '• vital / lab / exam findings' },
  diagnosis:    { title: 'Nursing diagnosis', body: 'r/t ...\nAEB ...' },
  intervention: { title: 'Intervention', body: '• nursing action' },
  outcome:      { title: 'Expected outcome', body: 'Patient will...\nMeasurable: ...' },
  risk:         { title: 'Risk factor', body: '• vulnerability' },
  complication: { title: 'Complication', body: '• potential adverse event' },
  medication:   { title: 'Medication', body: '• drug name (class)\n• indication\n• nursing considerations' },
};

/** Default link phrases displayed as chips in the edge modal */
export const COMMON_PHRASES = [
  'leads to', 'caused by', 'evidenced by', 'managed by',
  'treated with', 'prevented by', 'expect', 'r/t', 'AEB',
  'contributes to', 'worsens', 'improves', 'monitored by',
  'feedback loop ↻', 'vicious cycle ↻', 'escalate ↻',
];

/** Categories for filtering in the sidebar */
export const CATEGORIES = ['All', 'Architecture', 'Frontend', 'Backend', 'DevOps', 'Security', 'Other'];

/** Fill color presets for the color picker in edit modal */
export const FILL_PRESETS = [
  '#FFFFFF', '#FAFBFC', '#EEF4FA', '#E5E7EB', '#CBD5E1', '#64748B', '#1E293B', '#0F172A', '#2C5F8D',
  '#EEF4FA', '#DCE9F5', '#FE5E7E', '#E14564',
  '#EAF2FB', '#C7D9F4', '#60A5FA', '#2563EB',
  '#FDE9E3', '#F0A89A', '#F08A7E', '#DC2626',
  '#FFF4DC', '#E7C57A', '#FE5E7E', '#92400E',
  '#E8F5E9', '#A5D6A7', '#4ADE80', '#15803D',
  '#F0EBFA', '#C5B8E8', '#A78BFA', '#6D28D9',
  '#FFE4E4', '#E89E9E', '#F472B6', '#BE185D',
  '#E0F2FE', '#7DD3FC',
];

/** Text color presets for the color picker */
export const TEXT_PRESETS = [
  '#0F172A', '#1E293B', '#334155', '#475569', '#64748B',
  '#FFFFFF', '#F8FAFC', '#FEF3C7', '#FEE2E2', '#DBEAFE',
  '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#65A30D',
  '#16A34A', '#0891B2', '#2563EB', '#7C3AED', '#DB2777',
  '#2C5F8D', '#E14564', '#FE5E7E', '#B91C1C', '#7F1D1D',
  '#14532D', '#134E4A', '#1E3A8A', '#4C1D95', '#831843',
];

/** Default mapping from node type to its default colors */
export const TYPE_DEFAULT_COLORS = {
  central:      { fill: '#2C5F8D', border: '#1E4266', text: '#FFFFFF' },
  subjective:   { fill: '#F0F7FC', border: '#D0E0EE', text: '#0F172A' },
  objective:    { fill: '#EEF4FA', border: '#C5D9EB', text: '#0F172A' },
  diagnosis:    { fill: '#FFE8ED', border: '#FBC4CE', text: '#0F172A' },
  intervention: { fill: '#FFF5E6', border: '#FBDFB0', text: '#0F172A' },
  outcome:      { fill: '#E8F8EE', border: '#B8E4C9', text: '#0F172A' },
  risk:         { fill: '#F3EEF9', border: '#D6C7EA', text: '#0F172A' },
  complication: { fill: '#FDE7E7', border: '#F5B8B8', text: '#0F172A' },
  medication:   { fill: '#E3F2FD', border: '#90CAF9', text: '#0F172A' },
};

/** Generate a unique ID for nodes and edges */
export function uid() {
  return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
