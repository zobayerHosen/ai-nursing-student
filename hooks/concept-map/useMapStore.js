'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const MAPS_KEY = 'stemrn_maps';
const CURRENT_MAP_KEY = 'stemrn_current_map_id';

function uid() {
  return 'n_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function loadAllMaps() {
  try {
    return JSON.parse(localStorage.getItem(MAPS_KEY) || '{}');
  } catch {
    return {};
  }
}

function persistAllMaps(maps) {
  try {
    localStorage.setItem(MAPS_KEY, JSON.stringify(maps));
  } catch (e) {
    console.error('Could not save maps — localStorage full?', e);
  }
}

function newMapId() {
  return 'map_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
}

const HEART_FAILURE_DEFAULT = {
  title: 'Heart Failure Clinical Concept Map',
  nodes: [
    { id: 'central-1', label: 'Heart Failure', details: 'Adult patient • Cardiac pump dysfunction with systemic manifestations', category: 'Central' },
    { id: 'risk-1', label: 'Risk Factors', details: '. Advanced age\n. History of hypertension\n. Coronary artery disease\n. Diabetes mellitus\n. Previous MI', category: 'Risk Factor' },
    { id: 'subjective-1', label: 'Subjective Data', details: '. Shortness of breath\n. Fatigue and weakness\n. Orthopnea\n. Paroxysmal nocturnal dyspnea\n. Decreased exercise tolerance', category: 'Subjective Data' },
    { id: 'objective-1', label: 'Objective Data', details: '. Elevated BP\n. Tachycardia\n. Crackles in lung bases\n. Peripheral edema\n. Jugular venous distention\n. S3 heart sound\n. Elevated BNP\n. Decreased ejection fraction on echo', category: 'Objective Data' },
    { id: 'nanda-1', label: 'Decreased Cardiac Output', details: '. r/t altered contractility and preload/afterload imbalance\n. AEB tachycardia, fatigue, dyspnea, decreased EF, elevated BNP', category: 'Nursing Diagnosis' },
    { id: 'nanda-2', label: 'Excess Fluid Volume', details: '. r/t compromised regulatory mechanisms and decreased cardiac output\n. AEB peripheral edema, crackles, JVD, weight gain, dyspnea', category: 'Nursing Diagnosis' },
    { id: 'nanda-3', label: 'Impaired Gas Exchange', details: '. r/t alveolar-capillary membrane changes and fluid in alveoli\n. AEB dyspnea, crackles, decreased SpO2, orthopnea', category: 'Nursing Diagnosis' },
    { id: 'nanda-4', label: 'Activity Intolerance', details: '. r/t imbalance between oxygen supply and demand\n. AEB fatigue, dyspnea on exertion, decreased exercise tolerance', category: 'Nursing Diagnosis' },
    { id: 'intervention-1', label: 'Cardiac Output Interventions', details: '. Monitor vital signs q4h\n. Continuous cardiac monitoring\n. Assess heart sounds for S3/S4\n. Monitor I&O strictly\n. Daily weights same time/scale\n. Assess for signs of decreased perfusion', category: 'Intervention' },
    { id: 'intervention-2', label: 'Fluid Management', details: '. Administer diuretics as ordered\n. Strict I&O monitoring\n. Daily weights\n. Fluid restriction as ordered\n. Monitor electrolytes\n. Assess edema and JVD\n. Elevate legs when sitting', category: 'Intervention' },
    { id: 'intervention-3', label: 'Respiratory Support', details: '. Administer oxygen as ordered\n. Monitor SpO2 continuously\n. Assess lung sounds q4h\n. Position in high Fowler\'s\n. Encourage deep breathing\n. Monitor respiratory rate and effort', category: 'Intervention' },
    { id: 'intervention-4', label: 'Activity Management', details: '. Balance rest and activity\n. Assist with ADLs as needed\n. Monitor response to activity\n. Gradual increase in activity as tolerated\n. Energy conservation techniques\n. Fall precautions', category: 'Intervention' },
    { id: 'med-1', label: 'Loop Diuretics (Furosemide)', details: '. For fluid overload and pulmonary congestion\n. Nursing: monitor K+, Mg, daily weight, BP, UOP, I&O\n. Assess for dehydration and electrolyte imbalance', category: 'Medication' },
    { id: 'med-2', label: 'ACE Inhibitors', details: '. For afterload reduction and cardiac remodeling prevention\n. Nursing: monitor BP, K+, renal function, assess for dry cough\n. Hold if SBP <100 mmHg', category: 'Medication' },
    { id: 'med-3', label: 'Beta Blockers', details: '. For heart rate control and improved cardiac function\n. Nursing: monitor HR and BP, hold if HR <60 or SBP <100\n. Assess for bronchospasm', category: 'Medication' },
    { id: 'med-4', label: 'Digoxin', details: '. For improved contractility and rate control in AFib\n. Nursing: monitor HR, K+, digoxin level, assess for toxicity\n. Hold if HR <60 bpm', category: 'Medication' },
    { id: 'complication-1', label: 'Acute Decompensation', details: '. Acute pulmonary edema\n. Cardiogenic shock\n. Respiratory failure requiring intubation\n. Sudden cardiac death', category: 'Complication' },
    { id: 'complication-2', label: 'Chronic Complications', details: '. Progressive renal insufficiency\n. Hepatic congestion and dysfunction\n. Cardiac cachexia\n. Thromboembolic events\n. Arrhythmias (AFib, VT)', category: 'Complication' },
  ],
  edges: [
    { id: 'e_risk', source: 'risk-1', target: 'central-1', label: 'contributes to' },
    { id: 'e_subj', source: 'subjective-1', target: 'central-1', label: 'evidenced by' },
    { id: 'e_obj', source: 'objective-1', target: 'central-1', label: 'evidenced by' },
    { id: 'e_dx1', source: 'central-1', target: 'nanda-1', label: 'priority' },
    { id: 'e_dx2', source: 'central-1', target: 'nanda-2', label: 'leads to' },
    { id: 'e_dx3', source: 'central-1', target: 'nanda-3', label: 'leads to' },
    { id: 'e_dx4', source: 'central-1', target: 'nanda-4', label: 'leads to' },
    { id: 'e_int1', source: 'nanda-1', target: 'intervention-1', label: 'managed by' },
    { id: 'e_int2', source: 'nanda-2', target: 'intervention-2', label: 'managed by' },
    { id: 'e_int3', source: 'nanda-3', target: 'intervention-3', label: 'managed by' },
    { id: 'e_int4', source: 'nanda-4', target: 'intervention-4', label: 'managed by' },
    { id: 'e_med1', source: 'central-1', target: 'med-1', label: 'treated with' },
    { id: 'e_med2', source: 'central-1', target: 'med-2', label: 'treated with' },
    { id: 'e_med3', source: 'central-1', target: 'med-3', label: 'treated with' },
    { id: 'e_med4', source: 'central-1', target: 'med-4', label: 'treated with' },
    { id: 'e_comp1', source: 'central-1', target: 'complication-1', label: 'progresses to' },
    { id: 'e_comp2', source: 'central-1', target: 'complication-2', label: 'long-term risk' },
  ],
};

export default function useMapStore() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [mapTitle, setMapTitle] = useState('Heart Failure Clinical Concept Map');
  const [currentMapId, setCurrentMapId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const historyRef = useRef([]);
  const futureRef = useRef([]);

  // Initialize from localStorage or default data
  useEffect(() => {
    try {
      const lastId = localStorage.getItem(CURRENT_MAP_KEY);
      if (lastId) {
        const maps = loadAllMaps();
        if (maps[lastId]) {
          const m = maps[lastId];
          setCurrentMapId(lastId);
          setMapTitle(m.title || 'Untitled');
          setNodes(m.nodes || []);
          setEdges(m.edges || []);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
    }
    // Load default heart failure map
    const id = newMapId();
    setCurrentMapId(id);
    setNodes(HEART_FAILURE_DEFAULT.nodes);
    setEdges(HEART_FAILURE_DEFAULT.edges);
    setMapTitle(HEART_FAILURE_DEFAULT.title);
    const maps = {};
    maps[id] = { id, title: HEART_FAILURE_DEFAULT.title, nodes: HEART_FAILURE_DEFAULT.nodes, edges: HEART_FAILURE_DEFAULT.edges, created: new Date().toISOString(), modified: new Date().toISOString() };
    persistAllMaps(maps);
    localStorage.setItem(CURRENT_MAP_KEY, id);
  }, []);

  const pushHistory = useCallback(() => {
    historyRef.current.push(JSON.stringify({ nodes, edges }));
    if (historyRef.current.length > 50) historyRef.current.shift();
    futureRef.current = [];
  }, [nodes, edges]);

  const undo = useCallback(() => {
    if (!historyRef.current.length) return;
    futureRef.current.push(JSON.stringify({ nodes, edges }));
    const prev = JSON.parse(historyRef.current.pop());
    setNodes(prev.nodes);
    setEdges(prev.edges);
  }, [nodes, edges]);

  const redo = useCallback(() => {
    if (!futureRef.current.length) return;
    historyRef.current.push(JSON.stringify({ nodes, edges }));
    const nxt = JSON.parse(futureRef.current.pop());
    setNodes(nxt.nodes);
    setEdges(nxt.edges);
  }, [nodes, edges]);

  const saveMap = useCallback(() => {
    let mapId = currentMapId;
    const maps = loadAllMaps();
    if (!mapId) {
      mapId = newMapId();
      setCurrentMapId(mapId);
      localStorage.setItem(CURRENT_MAP_KEY, mapId);
    }
    const existing = maps[mapId];
    const now = new Date().toISOString();
    maps[mapId] = { id: mapId, title: mapTitle, nodes, edges, created: existing?.created || now, modified: now };
    persistAllMaps(maps);
  }, [currentMapId, mapTitle, nodes, edges]);

  const loadMap = useCallback((mapId) => {
    const maps = loadAllMaps();
    const m = maps[mapId];
    if (!m) return;
    setCurrentMapId(mapId);
    localStorage.setItem(CURRENT_MAP_KEY, mapId);
    setNodes(m.nodes || []);
    setEdges(m.edges || []);
    setMapTitle(m.title || 'Untitled');
    setSelectedNodeId(null);
    historyRef.current = [];
    futureRef.current = [];
  }, []);

  const newBlankMap = useCallback(() => {
    setCurrentMapId(null);
    localStorage.removeItem(CURRENT_MAP_KEY);
    setNodes([]);
    setEdges([]);
    setMapTitle('Untitled Concept Map');
    setSelectedNodeId(null);
    historyRef.current = [];
    futureRef.current = [];
  }, []);

  const deleteMap = useCallback((mapId) => {
    const maps = loadAllMaps();
    delete maps[mapId];
    persistAllMaps(maps);
    if (currentMapId === mapId) newBlankMap();
  }, [currentMapId, newBlankMap]);

  const renameMap = useCallback((mapId, newTitle) => {
    const maps = loadAllMaps();
    if (!maps[mapId]) return;
    maps[mapId].title = newTitle;
    maps[mapId].modified = new Date().toISOString();
    persistAllMaps(maps);
    if (currentMapId === mapId) setMapTitle(newTitle);
  }, [currentMapId]);

  const getAllMaps = useCallback(() => Object.values(loadAllMaps()), []);

  const updateNode = useCallback((nodeId, updates) => {
    pushHistory();
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, ...updates } : n));
  }, [pushHistory]);

  const deleteNodeById = useCallback((nodeId) => {
    pushHistory();
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setEdges(prev => prev.filter(e => e.source !== nodeId && e.target !== nodeId));
  }, [pushHistory]);

  const addNode = useCallback((nodeType) => {
    pushHistory();
    const categoryMap = {
      central: 'Central', subjective: 'Subjective Data', objective: 'Objective Data',
      risk: 'Risk Factor', diagnosis: 'Nursing Diagnosis', intervention: 'Intervention',
      medication: 'Medication', complication: 'Complication', outcome: 'Outcome',
    };
    const defaults = {
      central: { label: 'Central Concept', details: 'Define the core clinical picture' },
      subjective: { label: 'Subjective data', details: '• patient reports...' },
      objective: { label: 'Objective data', details: '• vital / lab / exam findings' },
      diagnosis: { label: 'Nursing diagnosis', details: 'r/t ...\nAEB ...' },
      intervention: { label: 'Intervention', details: '• nursing action' },
      medication: { label: 'Medication', details: '• drug name\n• indication\n• nursing considerations' },
      complication: { label: 'Complication', details: '• potential adverse event' },
      risk: { label: 'Risk factor', details: '• vulnerability' },
      outcome: { label: 'Expected outcome', details: 'Patient will...\nMeasurable: ...' },
    };
    const def = defaults[nodeType] || defaults.diagnosis;
    const newNode = { id: uid(), label: def.label, details: def.details, category: categoryMap[nodeType] || 'Nursing Diagnosis' };
    setNodes(prev => [...prev, newNode]);
    return newNode;
  }, [pushHistory]);

  return {
    nodes, setNodes, edges, setEdges,
    mapTitle, setMapTitle,
    currentMapId, selectedNodeId, setSelectedNodeId,
    undo, redo, saveMap, loadMap, newBlankMap, deleteMap, renameMap, getAllMaps,
    updateNode, deleteNodeById, addNode,
  };
}
