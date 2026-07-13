// ============================================================
//  Main Page - STEMRN Concept Map Application
//  Wires together all components:
//  - Header with title editor and action buttons
//  - Toolbar with canvas tools
//  - LeftSidebar with AI chat and node palette
//  - ConceptMapCanvas with React Flow
//  - RightInspector for node details
//  - Modals for editing, sharing, history
// ============================================================

'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { addEdge } from '@xyflow/react';

// Import our components
import Header from '../components/Header';
import Toolbar from '../components/Toolbar';
import LeftSidebar from '../components/Sidebar/LeftSidebar';
import RightInspector from '../components/Sidebar/RightInspector';
import EditNodeModal from '../components/Modals/EditNodeModal';
import EdgeModal from '../components/Modals/EdgeModal';
import ShareModal from '../components/Modals/ShareModal';
import HistoryModal from '../components/Modals/HistoryModal';
import { NodeActionsProvider } from '@/lib/concept-map/NodeActionsContext';
import useMapStore from '@/hooks/concept-map/useMapStore';
import { layoutGeneratedMap } from '@/lib/concept-map/layoutEngine';

// Dynamically import the canvas to avoid SSR issues with React Flow
const ConceptMapCanvas = dynamic(
  () => import('../components/Canvas/ConceptMapCanvas'),
  { ssr: false }
);

export default function ConceptMapShell() {
  // --- State Management ---
  const store = useMapStore();
  const {
    nodes, edges, selectedNode, setSelectedNode,
    mapTitle, setMapTitle,
    caraHasGenerated,
    linkMode, setLinkMode, linkSource, setLinkSource,
    onNodesChange, onEdgesChange,
    undo, redo, saveMap,
    loadMap, newBlankMap, deleteMap, renameMap, getAllMaps,
    addNode, updateNode, deleteNodeById, addEdgeWithLabel,
    updateEdge, deleteEdgeById, generateFromAI, applyAIGeneratedAdditions,
  } = store;

  // --- Modal States ---
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [edgeModalOpen, setEdgeModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [editingEdge, setEditingEdge] = useState(null);

  // --- Toolbar Mode (select/add/link) ---
  const [activeTool, setActiveTool] = useState('select');
  const [pendingNodeType, setPendingNodeType] = useState(null);

  // --- Zoom Level ---
  const [zoomLevel, setZoomLevel] = useState('100%');

  // React Flow instance ref for zoom/fit control
  const reactFlowInstanceRef = useRef(null);

  // Refs for auto-save (avoid stale closure)
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  const mapTitleRef = useRef(mapTitle);
  useEffect(() => { nodesRef.current = nodes; }, [nodes]);
  useEffect(() => { edgesRef.current = edges; }, [edges]);
  useEffect(() => { mapTitleRef.current = mapTitle; }, [mapTitle]);

  // Refs
  const reactFlowWrapper = useRef(null);

  // --- Auto-save (every 30s) ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (nodesRef.current.length > 0) saveMap();
    }, 30000);
    return () => clearInterval(interval);
  }, [saveMap]);

  // Save on title change
  useEffect(() => {
    if (nodes.length > 0) {
      const timer = setTimeout(() => saveMap(), 1000);
      return () => clearTimeout(timer);
    }
  }, [mapTitle, nodes, saveMap]);

  // --- Keyboard Shortcuts ---
  useEffect(() => {
    function handleKeyDown(e) {
      // Ignore if typing in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Delete selected node
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNode && !e.target.closest('.react-flow')) {
          deleteNodeById(selectedNode.id);
        }
      }

      // Edit selected node
      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        if (selectedNode) {
          e.preventDefault();
          setEditModalOpen(true);
        }
      }

      // Escape - deselect
      if (e.key === 'Escape') {
        setSelectedNode(null);
        setLinkMode(false);
        setLinkSource(null);
        setActiveTool('select');
      }

      // Undo/Redo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); undo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'y') { e.preventDefault(); redo(); }

      // Save
      if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); saveMap(); }

      // Tool shortcuts
      if (e.key === 'v' || e.key === 'V') setActiveTool('select');
      if (e.key === 'a' || e.key === 'A') setActiveTool('add');
      if (e.key === 'l' || e.key === 'L') {
        setActiveTool(activeTool === 'link' ? 'select' : 'link');
        setLinkMode(activeTool !== 'link');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, linkMode, undo, redo, saveMap, deleteNodeById, setLinkMode, setLinkSource, setSelectedNode, activeTool]);

  // --- Event Handlers ---

  /** Handle canvas node click - select node */
  const handleNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  /** Handle canvas node double-click - open edit modal */
  const handleNodeDoubleClick = useCallback((event, node) => {
    setSelectedNode(node);
    setEditModalOpen(true);
  }, [setSelectedNode]);

  /** Handle pane click - deselect */
  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  /** Handle connect event (drag from handle to handle) */
  const handleConnect = useCallback((params) => {
    addEdgeWithLabel(params.source, params.target, '');
  }, [addEdgeWithLabel]);

  /** Handle edge click - open edge edit modal */
  const handleEdgeClick = useCallback((event, edge) => {
    setEditingEdge(edge);
    setEdgeModalOpen(true);
  }, []);

  /** Handle node deletion from canvas */
  const handleNodeDelete = useCallback((nodeId) => {
    deleteNodeById(nodeId);
  }, [deleteNodeById]);

  /** Edit action from toolbar */
  const handleEditClick = useCallback(() => {
    if (selectedNode) {
      setEditModalOpen(true);
    } else {
      // Flash warning
      const btn = document.activeElement;
      if (btn) {
        btn.classList.add('ring-2', 'ring-rose-500');
        setTimeout(() => btn.classList.remove('ring-2', 'ring-rose-500'), 500);
      }
    }
  }, [selectedNode]);

  /** Add node tool - activates add mode where clicking canvas places a node */
  const handleAddTool = useCallback(() => {
    setActiveTool('select');
    setPendingNodeType('diagnosis');
    // Place a node at a default position
    const newNode = addNode('diagnosis', {
      x: 300 + Math.random() * 200,
      y: 200 + Math.random() * 300,
    });
    setSelectedNode(newNode);
    setEditModalOpen(true);
  }, [addNode, setSelectedNode]);

  /** Link tool toggle */
  const handleLinkTool = useCallback(() => {
    const newMode = !linkMode;
    setLinkMode(newMode);
    setLinkSource(null);
    setActiveTool(newMode ? 'link' : 'select');
  }, [linkMode, setLinkMode, setLinkSource]);

  /** Zoom controls - use React Flow instance methods */
  const handleZoomIn = useCallback(() => {
    if (reactFlowInstanceRef.current) {
      reactFlowInstanceRef.current.zoomIn();
      const z = reactFlowInstanceRef.current.getZoom();
      setZoomLevel(Math.round(z * 100) + '%');
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (reactFlowInstanceRef.current) {
      reactFlowInstanceRef.current.zoomOut();
      const z = reactFlowInstanceRef.current.getZoom();
      setZoomLevel(Math.round(z * 100) + '%');
    }
  }, []);

  /** AI map generation callback */
  const handleGenerateMap = useCallback((aiData) => {
    const result = generateFromAI(aiData);
    setSelectedNode(null);
    // The canvas will auto-fit via its own useEffect
  }, [generateFromAI, setSelectedNode]);

  /** AI refinement callback */
  const handleRefineMap = useCallback((additions) => {
    applyAIGeneratedAdditions(additions);
  }, [applyAIGeneratedAdditions]);

  /** Add node from palette (click on canvas will place it) */
  const handlePaletteAddNode = useCallback((nodeType) => {
    const newNode = addNode(nodeType, {
      x: 300 + Math.random() * 300,
      y: 200 + Math.random() * 300,
    });
    setSelectedNode(newNode);
    setEditModalOpen(true);
  }, [addNode, setSelectedNode]);

  /** Save edited node from modal */
  const handleEditNodeSave = useCallback((nodeId, data) => {
    updateNode(nodeId, data);
  }, [updateNode]);

  /** Save edge from modal */
  const handleEdgeSave = useCallback((edgeId, data) => {
    updateEdge(edgeId, data);
  }, [updateEdge]);

  /** Delete edge from modal */
  const handleEdgeDelete = useCallback((edgeId) => {
    deleteEdgeById(edgeId);
  }, [deleteEdgeById]);

  /** Add edge from link mode (two-click) */
  const handleAddEdge = useCallback((source, target) => {
    addEdgeWithLabel(source, target, '');
  }, [addEdgeWithLabel]);

  /** Get current map snapshot for AI refinement */
  const currentMapSnapshot = {
    title: mapTitle,
    nodes: nodes.map((n) => ({ id: n.id, type: n.data?.nodeType, title: n.data?.title, body: n.data?.body })),
    edges: edges.map((e) => ({ from: e.source, to: e.target, phrase: e.label })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]
                      bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]
                      pointer-events-none opacity-50" />

      {/* Ambient glow effects */}
      <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-rose-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <Header
        mapTitle={mapTitle}
        onTitleChange={setMapTitle}
        onHistoryOpen={() => setHistoryModalOpen(true)}
        onExport={() => {
          setShareModalOpen(true);
        }}
        nodeCount={nodes.length}
        edgeCount={edges.length}
      />

      {/* Toolbar */}
      <Toolbar
        activeTool={activeTool}
        onSelect={() => { setActiveTool('select'); setLinkMode(false); setLinkSource(null); }}
        onAdd={handleAddTool}
        onLink={handleLinkTool}
        onEdit={handleEditClick}
        onUndo={undo}
        onRedo={redo}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFit={() => {
          if (reactFlowInstanceRef.current) {
            reactFlowInstanceRef.current.fitView({ padding: 0.3, duration: 300 });
          }
        }}
        onSave={saveMap}
        onPrint={() => window.print()}
        zoomLevel={zoomLevel}
        nodeCount={nodes.length}
        edgeCount={edges.length}
      />

      {/* Main layout: LeftSidebar | Canvas | RightInspector */}
      <main className="flex-1 flex overflow-hidden relative z-10" style={{ minHeight: 0 }}>
        {/* Left Sidebar */}
        <LeftSidebar
          onGenerateMap={handleGenerateMap}
          onRefineMap={handleRefineMap}
          currentMap={currentMapSnapshot}
          caraHasGenerated={caraHasGenerated}
          onAddNode={handlePaletteAddNode}
        />

        {/* Canvas Area */}
        <NodeActionsProvider
          onEdit={(nodeId) => {
            const node = nodes.find(n => n.id === nodeId);
            if (node) {
              setSelectedNode(node);
              setEditModalOpen(true);
            }
          }}
          onDelete={(nodeId) => deleteNodeById(nodeId)}
          onLink={(nodeId) => {
            setLinkMode(true);
            setLinkSource(nodeId);
            setActiveTool('link');
          }}
          selectedNodeId={selectedNode?.id}
        >
        <section className="flex-1 flex flex-col min-w-0 relative" data-canvas>
          {/* Link mode indicator */}
          {linkMode && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full text-xs font-medium
                            bg-blue-600 text-white shadow-lg shadow-blue-600/30 animate-pulse">
              {linkSource
                ? 'Click the target node to connect'
                : 'Click the source node first'}
            </div>
          )}

          <div className="flex-1 w-full h-full" ref={reactFlowWrapper}>
            <ConceptMapCanvas
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={handleConnect}
              onNodeClick={handleNodeClick}
              onNodeDoubleClick={handleNodeDoubleClick}
              onPaneClick={handlePaneClick}
              onNodeDelete={handleNodeDelete}
              onEdgeClick={handleEdgeClick}
              linkMode={linkMode}
              linkSource={linkSource}
              setLinkSource={setLinkSource}
              setLinkMode={setLinkMode}
              onAddEdge={handleAddEdge}
              onReactFlowInit={(instance) => { reactFlowInstanceRef.current = instance; }}
            />
          </div>
        </section>
        </NodeActionsProvider>

        {/* Right Inspector */}
        <RightInspector
          selectedNode={selectedNode}
          onUpdateNode={handleEditNodeSave}
          onDeleteNode={deleteNodeById}
          allNodes={nodes}
          onSelectNode={setSelectedNode}
        />
      </main>

      {/* === MODALS === */}

      {/* Edit Node Modal */}
      <EditNodeModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        node={selectedNode}
        onSave={handleEditNodeSave}
        onDelete={deleteNodeById}
      />

      {/* Edge Label Modal */}
      <EdgeModal
        isOpen={edgeModalOpen}
        onClose={() => { setEdgeModalOpen(false); setEditingEdge(null); }}
        edge={editingEdge}
        onSave={handleEdgeSave}
        onDelete={handleEdgeDelete}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        nodes={nodes}
        edges={edges}
        mapTitle={mapTitle}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        maps={getAllMaps()}
        currentMapId={store.currentMapId}
        onLoadMap={loadMap}
        onDeleteMap={deleteMap}
        onRenameMap={renameMap}
        onNewMap={() => { newBlankMap(); setHistoryModalOpen(false); }}
        onImportMap={(data, fileName) => {
          // Import a map from JSON data
          const result = layoutGeneratedMap({
            centralConcept: { title: data.title || fileName },
            ...data
          });
          generateFromAI(result);
        }}
      />
    </div>
  );
}
