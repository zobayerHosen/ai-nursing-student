// ============================================================
//  NodeActionsContext - React context for passing node action
//  callbacks (onEdit, onDelete, onLink) down to ConceptNode
//  components without relying on fragile node.data properties.
// ============================================================

'use client';

import React, { createContext, useContext } from 'react';

const NodeActionsContext = createContext({
  onEdit: () => {},
  onDelete: () => {},
  onLink: () => {},
  selectedNodeId: null,
});

export function NodeActionsProvider({ children, onEdit, onDelete, onLink, selectedNodeId }) {
  return (
    <NodeActionsContext.Provider value={{ onEdit, onDelete, onLink, selectedNodeId }}>
      {children}
    </NodeActionsContext.Provider>
  );
}

export function useNodeActions() {
  return useContext(NodeActionsContext);
}
