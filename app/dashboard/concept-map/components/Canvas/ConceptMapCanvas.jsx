// ============================================================
//  ConceptMapCanvas - React Flow canvas wrapper
//  Wraps the ReactFlow component with custom node types,
//  background grid, controls, minimap, and event handlers
// ============================================================

'use client';

import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  MarkerType,
  SelectionMode,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ConceptNode from '../nodes/ConceptNode';

// Define custom node types for React Flow
const nodeTypes = {
  conceptNode: ConceptNode,
  central: ConceptNode,
};

/**
 * Custom edge component that renders SVG paths with labels.
 * We use built-in smoothstep edges with labels handled via edge data.
 */
const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: false,
  style: { stroke: '#94A3B8', strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#94A3B8',
    width: 20,
    height: 20,
  },
};

/**
 * ConceptMapCanvas - The main React Flow canvas.
 *
 * Props:
 * - nodes, edges: React Flow state
 * - onNodesChange, onEdgesChange: React Flow state setters
 * - onConnect: callback when user creates a new connection
 * - onNodeClick: callback when a node is clicked
 * - onNodeDoubleClick: callback for double-click (edit)
 * - onPaneClick: callback when canvas background is clicked
 * - onNodeDelete: callback when delete key is pressed on a node
 * - onEdgeClick: callback when an edge label is clicked
 * - onReactFlowInit: callback receiving the ReactFlow instance (for external zoom/fit control)
 * - nodeTypesOverrides: optional extra node types
 */
export default function ConceptMapCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onNodeDoubleClick,
  onPaneClick,
  onNodeDelete,
  onEdgeClick,
  linkMode,
  linkSource,
  setLinkSource,
  setLinkMode,
  onAddEdge,
  onReactFlowInit,
}) {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  /**
   * When a node is clicked, if link mode is on, manage link source/target flow.
   */
  const handleNodeClick = useCallback(
    (event, node) => {
      if (linkMode) {
        if (!linkSource) {
          // First click: set as link source
          setLinkSource(node.id);
        } else if (linkSource !== node.id) {
          // Second click: create edge
          onAddEdge?.(linkSource, node.id);
          setLinkSource(null);
          setLinkMode(false);
        }
        return;
      }
      onNodeClick?.(event, node);
    },
    [linkMode, linkSource, setLinkSource, setLinkMode, onAddEdge, onNodeClick]
  );

  /**
   * Handle pane click - deselect nodes, exit link mode
   */
  const handlePaneClick = useCallback(() => {
    if (linkMode) {
      setLinkSource(null);
      setLinkMode(false);
    }
    onPaneClick?.();
  }, [linkMode, setLinkSource, setLinkMode, onPaneClick]);

  /**
   * Fit the view to show all nodes when the component mounts or nodes change.
   */
  const fitView = useCallback(() => {
    if (reactFlowInstance) {
      setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.3, duration: 300 });
      }, 100);
    }
  }, [reactFlowInstance]);

  // Fit view when nodes change on initial load
  useEffect(() => {
    if (nodes.length > 0 && reactFlowInstance) {
      fitView();
    }
  }, [nodes.length, reactFlowInstance, fitView]);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full relative">
      {/* Link mode banner */}
      {linkMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full text-xs font-medium
                        text-white bg-blue-600 shadow-lg shadow-blue-600/30 animate-pulse pointer-events-none">
          {linkSource
            ? 'Click the target node to connect'
            : 'Click the source node first'}
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={handlePaneClick}
        onInit={(instance) => {
          setReactFlowInstance(instance);
          onReactFlowInit?.(instance);
        }}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        selectionMode={SelectionMode.Partial}
        selectionOnDrag={false}
        panOnDrag={!linkMode}
        panOnScroll={false}
        zoomOnScroll={true}
        deleteKeyCode={['Backspace', 'Delete']}
        onNodesDelete={(deleted) => {
          deleted.forEach((node) => onNodeDelete?.(node.id));
        }}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.2}
        maxZoom={2.5}
        className="bg-slate-50"
      >
        {/* Grid background */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="rgba(148, 163, 184, 0.15)"
        />

        {/* Minimap */}
        <MiniMap
          nodeStrokeColor={(n) => {
            const type = n.data?.nodeType;
            if (type === 'central') return '#2C5F8D';
            if (type === 'diagnosis') return '#FB7185';
            if (type === 'intervention') return '#FBBF24';
            if (type === 'outcome') return '#34D399';
            return '#94A3B8';
          }}
          nodeColor={(n) => {
            const type = n.data?.nodeType;
            if (type === 'central') return '#2C5F8D';
            if (type === 'diagnosis') return '#FDA4AF';
            if (type === 'intervention') return '#FCD34D';
            if (type === 'outcome') return '#6EE7B7';
            return '#CBD5E1';
          }}
          maskColor="rgba(241, 245, 249, 0.6)"
          className="bg-white/90! border! border-slate-200! rounded-xl! shadow-md!"
          style={{ width: 180, height: 120 }}
        />

        {/* Controls */}
        <Controls
          className="bg-white/90 border! border-slate-200! rounded-xl! shadow-md! backdrop-blur-sm!"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}

/**
 * Re-export the nodeTypes for use in dynamic imports if needed.
 */
export { nodeTypes, defaultEdgeOptions };
