// ============================================================
//  useMapStore - Central state management for the concept map
//  Manages nodes, edges, undo/redo history, and localStorage
// ============================================================

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { uid, TYPE_DEFAULT_COLORS, NODE_DEFAULTS } from '@/lib/concept-map/constants';
import { layoutGeneratedMap, applyNodeAdditions } from '@/lib/concept-map/layoutEngine';
import { getDemoMaps } from '@/lib/concept-map/sampleData';

const MAPS_KEY = 'stemrn_maps';
const CURRENT_MAP_KEY = 'stemrn_current_map_id';

/**
 * Load all saved maps from localStorage
 */
function loadAllMaps() {
  try {
    return JSON.parse(localStorage.getItem(MAPS_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

/**
 * Persist all maps to localStorage
 */
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

/**
 * Create a new node object suitable for React Flow.
 * The `nodeType` field in `data` maps to our custom component type.
 */
export function createFlowNode(nodeType, position = { x: 400, y: 400 }, overrides = {}) {
  const defaults = NODE_DEFAULTS[nodeType] || NODE_DEFAULTS.diagnosis;
  return {
    id: uid(),
    type: 'conceptNode',
    position,
    data: {
      nodeType,
      title: overrides.title || defaults.title,
      body: overrides.body || defaults.body,
      fill: overrides.fill || null,
      border: overrides.border || null,
      textColor: overrides.textColor || null,
    },
  };
}

/**
 * Main hook that manages the concept map state.
 */
export default function useMapStore() {
  // React Flow node/edge state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Selection state
  const [selectedNode, setSelectedNode] = useState(null);

  // Undo/redo history stacks
  const historyRef = useRef([]);
  const futureRef = useRef([]);

  // Map metadata
  const [mapTitle, setMapTitle] = useState('Untitled Concept Map');
  const [currentMapId, setCurrentMapId] = useState(null);
  const [caraHasGenerated, setCaraHasGenerated] = useState(false);

  // Link mode
  const [linkMode, setLinkMode] = useState(false);
  const [linkSource, setLinkSource] = useState(null);

  // Initialize from localStorage or demos
  useEffect(() => {
    try {
      const lastId = localStorage.getItem(CURRENT_MAP_KEY);
      if (lastId) {
        const maps = loadAllMaps();
        if (maps[lastId]) {
          const m = maps[lastId];
          setCurrentMapId(lastId);
          setMapTitle(m.title || 'Untitled Concept Map');
          setNodes(m.nodes || []);
          setEdges(m.edges || []);
          setCaraHasGenerated((m.nodes || []).length > 0);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
    }

    // No saved map: load demo data
    loadDemoData();
  }, []);

  /**
   * Load the demo CHF map into state
   */
  function loadDemoData() {
    const { CHF_MAP, PNEUMONIA_MAP } = getDemoMaps();
    const { nodes: chfNodes, edges: chfEdges, title } = layoutGeneratedMap(CHF_MAP);

    // Build second demo for history
    const { nodes: pnNodes, edges: pnEdges, title: pnTitle } = layoutGeneratedMap(PNEUMONIA_MAP);

    const now = new Date();
    const yesterday = new Date(now.getTime() - 86400000);
    const lastWeek = new Date(now.getTime() - 7 * 86400000);

    const maps = {};

    // Pneumonia (older)
    const pnId = 'map_demo_pneumonia';
    maps[pnId] = {
      id: pnId,
      title: pnTitle,
      nodes: pnNodes,
      edges: pnEdges,
      created: lastWeek.toISOString(),
      modified: yesterday.toISOString(),
    };

    // CHF (current)
    const chfId = 'map_demo_chf';
    maps[chfId] = {
      id: chfId,
      title: title,
      nodes: chfNodes,
      edges: chfEdges,
      created: yesterday.toISOString(),
      modified: now.toISOString(),
    };

    persistAllMaps(maps);
    localStorage.setItem(CURRENT_MAP_KEY, chfId);

    setCurrentMapId(chfId);
    setMapTitle(title);
    setNodes(chfNodes);
    setEdges(chfEdges);
    setCaraHasGenerated(true);
  }

  /**
   * Push current state onto undo history
   */
  const pushHistory = useCallback(() => {
    historyRef.current.push(JSON.stringify({ nodes, edges }));
    if (historyRef.current.length > 50) historyRef.current.shift();
    futureRef.current = [];
  }, [nodes, edges]);

  /**
   * Undo last action
   */
  const undo = useCallback(() => {
    if (!historyRef.current.length) return;
    futureRef.current.push(JSON.stringify({ nodes, edges }));
    const prev = JSON.parse(historyRef.current.pop());
    setNodes(prev.nodes);
    setEdges(prev.edges);
  }, [nodes, edges, setNodes, setEdges]);

  /**
   * Redo last undone action
   */
  const redo = useCallback(() => {
    if (!futureRef.current.length) return;
    historyRef.current.push(JSON.stringify({ nodes, edges }));
    const nxt = JSON.parse(futureRef.current.pop());
    setNodes(nxt.nodes);
    setEdges(nxt.edges);
  }, [nodes, edges, setNodes, setEdges]);

  /**
   * Save current map to localStorage
   */
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

    maps[mapId] = {
      id: mapId,
      title: mapTitle,
      nodes,
      edges,
      created: existing?.created || now,
      modified: now,
    };

    persistAllMaps(maps);
  }, [currentMapId, mapTitle, nodes, edges]);

  /**
   * Load a specific map by ID
   */
  const loadMap = useCallback((mapId) => {
    const maps = loadAllMaps();
    const m = maps[mapId];
    if (!m) return;

    setCurrentMapId(mapId);
    localStorage.setItem(CURRENT_MAP_KEY, mapId);
    setNodes(m.nodes || []);
    setEdges(m.edges || []);
    setMapTitle(m.title || 'Untitled Concept Map');
    setCaraHasGenerated((m.nodes || []).length > 0);
    historyRef.current = [];
    futureRef.current = [];
  }, [setNodes, setEdges]);

  /**
   * Start a new blank map
   */
  const newBlankMap = useCallback(() => {
    setCurrentMapId(null);
    localStorage.removeItem(CURRENT_MAP_KEY);
    setNodes([]);
    setEdges([]);
    setMapTitle('Untitled Concept Map');
    setCaraHasGenerated(false);
    setSelectedNode(null);
    historyRef.current = [];
    futureRef.current = [];
  }, [setNodes, setEdges]);

  /**
   * Delete a map by ID
   */
  const deleteMap = useCallback((mapId) => {
    const maps = loadAllMaps();
    delete maps[mapId];
    persistAllMaps(maps);
    if (currentMapId === mapId) {
      newBlankMap();
    }
  }, [currentMapId, newBlankMap]);

  /**
   * Rename a map
   */
  const renameMap = useCallback((mapId, newTitle) => {
    const maps = loadAllMaps();
    if (!maps[mapId]) return;
    maps[mapId].title = newTitle;
    maps[mapId].modified = new Date().toISOString();
    persistAllMaps(maps);
    if (currentMapId === mapId) {
      setMapTitle(newTitle);
    }
  }, [currentMapId]);

  /**
   * Add a node to the map
   */
  const addNode = useCallback((nodeType, position, overrides = {}) => {
    pushHistory();
    const newNode = createFlowNode(nodeType, position, overrides);
    setNodes((nds) => [...nds, newNode]);
    return newNode;
  }, [pushHistory, setNodes]);

  /**
   * Update a node's data
   */
  const updateNode = useCallback((nodeId, newData) => {
    pushHistory();
    setNodes((nds) =>
      nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...newData } } : n))
    );
  }, [pushHistory, setNodes]);

  /**
   * Delete a node and its connected edges
   */
  const deleteNodeById = useCallback((nodeId) => {
    pushHistory();
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode((prev) => (prev?.id === nodeId ? null : prev));
  }, [pushHistory, setNodes, setEdges]);

  /**
   * Add an edge between two nodes with an optional label
   */
  const addEdgeWithLabel = useCallback((source, target, label = '') => {
    pushHistory();
    const newEdge = {
      id: uid(),
      source,
      target,
      label,
      type: 'smoothstep',
      data: { emphasis: false },
    };
    setEdges((eds) => [...eds, newEdge]);
  }, [pushHistory, setEdges]);

  /**
   * Update an edge's label/data
   */
  const updateEdge = useCallback((edgeId, newData) => {
    pushHistory();
    setEdges((eds) =>
      eds.map((e) => (e.id === edgeId ? { ...e, ...newData } : e))
    );
  }, [pushHistory, setEdges]);

  /**
   * Delete an edge
   */
  const deleteEdgeById = useCallback((edgeId) => {
    pushHistory();
    setEdges((eds) => eds.filter((e) => e.id !== edgeId));
  }, [pushHistory, setEdges]);

  /**
   * Generate a full map from AI response data
   */
  const generateFromAI = useCallback((aiData) => {
    pushHistory();
    const { nodes: newNodes, edges: newEdges, title } = layoutGeneratedMap(aiData);
    setNodes(newNodes);
    setEdges(newEdges);
    setMapTitle(title || 'Concept Map');
    setCaraHasGenerated(true);
    setSelectedNode(null);
    return { nodes: newNodes, edges: newEdges, title };
  }, [pushHistory, setNodes, setEdges]);

  /**
   * Apply incremental AI additions to the map
   */
  const applyAIGeneratedAdditions = useCallback((additions) => {
    pushHistory();
    const result = applyNodeAdditions(additions, nodes, edges);
    setNodes(result.nodes);
    setEdges(result.edges);
  }, [pushHistory, nodes, edges, setNodes, setEdges]);

  /**
   * Get all maps for the history modal
   */
  const getAllMaps = useCallback(() => {
    return Object.values(loadAllMaps());
  }, []);

  return {
    // State
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    mapTitle,
    setMapTitle,
    currentMapId,
    caraHasGenerated,
    linkMode,
    setLinkMode,
    linkSource,
    setLinkSource,

    // React Flow handlers
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,

    // Undo/redo
    undo,
    redo,

    // Map CRUD
    saveMap,
    loadMap,
    newBlankMap,
    deleteMap,
    renameMap,
    getAllMaps,

    // Node operations
    addNode,
    updateNode,
    deleteNodeById,
    addEdgeWithLabel,
    updateEdge,
    deleteEdgeById,

    // AI operations
    generateFromAI,
    applyAIGeneratedAdditions,
  };
}
