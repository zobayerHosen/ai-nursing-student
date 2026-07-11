// ============================================================
//  Layout Engine - Converts AI-generated map data into
//  positioned nodes and edges ready for React Flow
// ============================================================

import { uid } from './constants';

/**
 * Layout an AI-generated concept map into positioned nodes and edges.
 * Uses a spider/radial layout with columns for each category.
 *
 * @param {object} ai - The AI response containing centralConcept, subjective, objective, etc.
 * @returns {{ nodes: Array, edges: Array, title: string }}
 */
export function layoutGeneratedMap(ai) {
  const nodes = [];
  const edges = [];

  // Canvas center region — React Flow uses pixel coordinates
  const CX = 600, CY = 400;
  const LEFT_X = 80, LEFT_GAP = 220;
  const RISK_Y = 40;
  const COMP_Y = 750;
  const DX_X = 1100, DX_GAP = 200;
  const INT_X = 1500, INT_GAP = 200;
  const OUT_X = 1900, OUT_GAP = 200;
  const MED_X = 400, MED_Y_START = 700;

  // --- Central Node ---
  const centralId = uid();
  nodes.push({
    id: centralId,
    type: 'central', // This maps to our custom node type, NOT React Flow's built-in
    position: { x: CX, y: CY },
    data: {
      nodeType: 'central',
      title: ai.centralConcept?.title || ai.title || 'Central Concept',
      body: ai.centralConcept?.body || '',
      nodeTypeConfig: 'central',
    },
  });

  // --- Subjective (upper left) ---
  const subjList = ai.subjective || [];
  const subjStart = CY - ((subjList.length - 1) * LEFT_GAP) / 2 - 100;
  subjList.forEach((s, i) => {
    const id = uid();
    nodes.push({
      id,
      type: 'conceptNode',
      position: { x: LEFT_X, y: subjStart + i * LEFT_GAP },
      data: { nodeType: 'subjective', title: s.title, body: s.body },
    });
    edges.push({ id: uid(), source: centralId, target: id, label: 'evidenced by', type: 'smoothstep' });
  });

  // --- Objective (lower left) ---
  const objList = ai.objective || [];
  const objStart = subjStart + subjList.length * LEFT_GAP + 60;
  objList.forEach((o, i) => {
    const id = uid();
    nodes.push({
      id,
      type: 'conceptNode',
      position: { x: LEFT_X, y: objStart + i * LEFT_GAP },
      data: { nodeType: 'objective', title: o.title, body: o.body },
    });
    edges.push({ id: uid(), source: centralId, target: id, label: 'evidenced by', type: 'smoothstep' });
  });

  // --- Risk (above central) ---
  (ai.risk || []).forEach((r, i) => {
    const id = uid();
    nodes.push({
      id,
      type: 'conceptNode',
      position: { x: CX - 100 + i * 200, y: RISK_Y },
      data: { nodeType: 'risk', title: r.title, body: r.body },
    });
    edges.push({ id: uid(), source: id, target: centralId, label: 'contributes to', type: 'smoothstep' });
  });

  // --- Diagnoses (right of central) ---
  const diagnoses = ai.diagnoses || [];
  const dxStart = CY - (diagnoses.length - 1) * DX_GAP / 2;
  const dxIds = [];
  diagnoses.forEach((d, i) => {
    const id = uid();
    dxIds.push(id);
    nodes.push({
      id,
      type: 'conceptNode',
      position: { x: DX_X, y: dxStart + i * DX_GAP },
      data: { nodeType: 'diagnosis', title: d.title, body: d.body },
    });
    edges.push({
      id: uid(), source: centralId, target: id,
      label: i === 0 ? 'priority' : 'leads to',
      type: 'smoothstep',
    });
  });

  // --- Interventions ---
  const interventions = ai.interventions || [];
  const intStart = CY - (interventions.length - 1) * INT_GAP / 2;
  const intIds = [];
  interventions.forEach((iv, i) => {
    const id = uid();
    intIds.push(id);
    nodes.push({
      id,
      type: 'conceptNode',
      position: { x: INT_X, y: intStart + i * INT_GAP },
      data: { nodeType: 'intervention', title: iv.title, body: iv.body },
    });
    const dxIdx = typeof iv.diagnosisIndex === 'number'
      ? iv.diagnosisIndex
      : Math.min(i, dxIds.length - 1);
    if (dxIds[dxIdx]) {
      edges.push({ id: uid(), source: dxIds[dxIdx], target: id, label: 'managed by', type: 'smoothstep' });
    }
  });

  // --- Outcomes ---
  const outcomes = ai.outcomes || [];
  const outStart = CY - (outcomes.length - 1) * OUT_GAP / 2;
  const outIds = [];
  outcomes.forEach((o, i) => {
    const id = uid();
    outIds.push(id);
    nodes.push({
      id,
      type: 'conceptNode',
      position: { x: OUT_X, y: outStart + i * OUT_GAP },
      data: { nodeType: 'outcome', title: o.title, body: o.body },
    });
    const intIdx = typeof o.interventionIndex === 'number'
      ? o.interventionIndex
      : Math.min(i, intIds.length - 1);
    if (intIds[intIdx]) {
      edges.push({ id: uid(), source: intIds[intIdx], target: id, label: 'expect', type: 'smoothstep' });
    }
  });

  // --- Feedback loop: last outcome back to central ---
  if (outIds.length) {
    edges.push({
      id: uid(),
      source: outIds[outIds.length - 1],
      target: centralId,
      label: 'feedback loop ↻',
      type: 'smoothstep',
      data: { emphasis: true },
    });
  }

  // --- Complications (below central) ---
  (ai.complications || []).forEach((c, i) => {
    const id = uid();
    nodes.push({
      id,
      type: 'conceptNode',
      position: { x: CX - 200 + i * 400, y: COMP_Y },
      data: { nodeType: 'complication', title: c.title, body: c.body },
    });
    edges.push({ id: uid(), source: centralId, target: id, label: 'long-term risk', type: 'smoothstep' });
  });

  // --- Medications (below left) ---
  (ai.medications || []).forEach((m, i) => {
    const id = uid();
    nodes.push({
      id,
      type: 'conceptNode',
      position: { x: MED_X, y: MED_Y_START + i * 200 },
      data: { nodeType: 'medication', title: m.title, body: m.body },
    });
    edges.push({ id: uid(), source: centralId, target: id, label: 'treated with', type: 'smoothstep' });
  });

  return { nodes, edges, title: ai.title || 'Concept Map' };
}

/**
 * Apply incremental node additions to the existing map (for AI refinement).
 * Places new nodes near existing nodes of the same type or at sensible default positions.
 *
 * @param {Array} additions - Array of { type, title, body, linkFromNodeId, linkToNodeId, phrase }
 * @param {Array} existingNodes - Current nodes in the map
 * @param {Array} existingEdges - Current edges in the map
 * @returns {{ nodes: Array, edges: Array }}
 */
export function applyNodeAdditions(additions, existingNodes, existingEdges) {
  const newNodes = [...existingNodes];
  const newEdges = [...existingEdges];

  additions.forEach((a) => {
    const sameType = newNodes.filter((n) => n.data.nodeType === a.type);
    let x = 800, y = 600;
    if (sameType.length) {
      const last = sameType[sameType.length - 1];
      x = last.position.x;
      y = last.position.y + 220;
    } else {
      const defaults = {
        subjective: { x: 80, y: 400 },
        objective: { x: 80, y: 700 },
        risk: { x: 600, y: 40 },
        diagnosis: { x: 1100, y: 500 },
        intervention: { x: 1500, y: 500 },
        outcome: { x: 1900, y: 500 },
        complication: { x: 600, y: 750 },
        medication: { x: 400, y: 900 },
      };
      const d = defaults[a.type] || { x: 800, y: 800 };
      x = d.x;
      y = d.y;
    }

    const id = uid();
    newNodes.push({
      id,
      type: 'conceptNode',
      position: { x, y },
      data: { nodeType: a.type, title: a.title, body: a.body || '' },
    });

    if (a.linkFromNodeId && newNodes.find((n) => n.id === a.linkFromNodeId)) {
      newEdges.push({ id: uid(), source: a.linkFromNodeId, target: id, label: a.phrase || 'leads to', type: 'smoothstep' });
    } else if (a.linkToNodeId && newNodes.find((n) => n.id === a.linkToNodeId)) {
      newEdges.push({ id: uid(), source: id, target: a.linkToNodeId, label: a.phrase || 'leads to', type: 'smoothstep' });
    } else {
      // Auto-link to central
      const central = newNodes.find((n) => n.data.nodeType === 'central');
      if (central && id !== central.id) {
        const defaultPhrase = {
          subjective: 'evidenced by',
          objective: 'evidenced by',
          risk: 'contributes to',
          diagnosis: 'leads to',
          complication: 'long-term risk',
          medication: 'treated with',
        }[a.type] || 'related to';
        newEdges.push({ id: uid(), source: central.id, target: id, label: a.phrase || defaultPhrase, type: 'smoothstep' });
      }
    }
  });

  return { nodes: newNodes, edges: newEdges };
}
