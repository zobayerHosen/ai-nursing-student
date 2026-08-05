"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Menu } from "lucide-react";
import toast from "react-hot-toast";
import ConceptMapSidebar from "./concept-map-sidebar";
import ConceptMapHeader from "./concept-map-header";
import ConceptMapCanvas from "./concept-map-canvas";
import { AddNodeModal, EditNodeModal, EdgeLabelModal } from "./concept-map-modals";
import HistoryModal from "./history-modal";
import {
  useGetConceptMap,
  useGenerateConceptMap,
  useSaveConceptMap,
  useGetConceptMaps,
  useSelectConceptMap,
  useCreateConceptMap,
  useDeleteConceptMap,
  useClearAllConceptMaps,
  useImportConceptMap,
} from "@/hooks/concept-map";

/* ─── helpers ─── */
function suggestEdgeLabel(sourceNode, targetNode) {
  if (!sourceNode || !targetNode) return "leads to";
  const tc = targetNode.category;
  if (tc === "Intervention") return "managed by";
  if (tc === "Medication") return "treated with";
  if (tc === "Complication") return "progresses to";
  if (tc === "Nursing Diagnosis") return "leads to";
  if (tc === "Risk Factor") return "contributes to";
  return "leads to";
}

const EMPTY_MAP = { id: null, title: "Clinical Concept Map", nodes: [], edges: [] };

const ConceptMapShell = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mapData, setMapData] = useState(EMPTY_MAP);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [pendingEdge, setPendingEdge] = useState(null);
  const canvasRef = useRef(null);
  const hydratedRef = useRef(false);

  /* ─── API hooks ─── */
  const {
    mapData: serverMap,
    isLoading: isLoadingMap,
    isError: loadError,
  } = useGetConceptMap();

  const { generate, isPending: isGenerating } = useGenerateConceptMap();
  const { save, isPending: isSaving } = useSaveConceptMap();

  // My Maps / History hooks
  const {
    maps,
    totalMaps,
    totalNodes,
    isLoading: isMapsLoading,
    refetch: refetchMaps,
  } = useGetConceptMaps();
  const { selectMap, isPending: isSelecting } = useSelectConceptMap();
  const { createMap, isPending: isCreating } = useCreateConceptMap();
  const { deleteMap, isPending: isDeleting } = useDeleteConceptMap();
  const { clearAll, isPending: isClearing } = useClearAllConceptMaps();
  const { importMap, isPending: isImporting } = useImportConceptMap();

  /* ─── Hydrate from server on first load (once only) ─── */
  useEffect(() => {
    if (!hydratedRef.current && serverMap && serverMap.nodes?.length > 0) {
      hydratedRef.current = true;
      setMapData(serverMap);
    }
  }, [serverMap]);

  const editingNode = (mapData?.nodes || []).find((n) => n.id === editingNodeId) || null;

  /* ─── Rename (title change → save to backend) ─── */
  const handleRenameMap = useCallback(async (newTitle) => {
    const title = (newTitle || "").trim();
    if (!title || title === mapData.title) return;

    setMapData((prev) => ({ ...prev, title }));

    try {
      await save({
        title,
        nodes: mapData.nodes || [],
        edges: mapData.edges || [],
      });
      toast.success("Map renamed!");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Could not rename the map.");
    }
  }, [save, mapData]);

  /* ─── node CRUD ─── */
  const handleAddNode = useCallback(({ label, details, category, parentId }) => {
    const newId = `n_${Date.now()}`;
    setMapData((prev) => {
      const newNode = { id: newId, label, details, category };
      const newEdges = parentId
        ? [...prev.edges, { id: `e_${parentId}_${newId}`, source: parentId, target: newId, label: category === "Intervention" ? "managed by" : "leads to" }]
        : prev.edges;
      return { ...prev, nodes: [...prev.nodes, newNode], edges: newEdges };
    });
    setAddModalOpen(false);
    toast.success("Node added to the map!");
  }, []);

  const handleSaveNode = useCallback(({ id, label, details, category }) => {
    setMapData((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === id ? { ...n, label, details, category } : n)),
    }));
    setEditingNodeId(null);
    toast.success("Node updated!");
  }, []);

  const handleDeleteNode = useCallback((id) => {
    setMapData((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((n) => n.id !== id),
      edges: prev.edges.filter((e) => e.source !== id && e.target !== id),
    }));
    setEditingNodeId(null);
    toast.success("Node deleted.");
  }, []);

  /* ─── connect mode ─── */
  const handleEdgePicked = useCallback((sourceId, targetId) => {
    const sourceNode = (mapData?.nodes || []).find((n) => n.id === sourceId);
    const targetNode = (mapData?.nodes || []).find((n) => n.id === targetId);
    if (!sourceNode || !targetNode) return;
    setPendingEdge({
      source: sourceId,
      target: targetId,
      sourceLabel: sourceNode.label,
      targetLabel: targetNode.label,
    });
  }, [mapData?.nodes]);

  const handleAddEdge = useCallback(
    (label) => {
      if (!pendingEdge) return;
      const edgeId = `e_${pendingEdge.source}_${pendingEdge.target}_${Date.now()}`;
      setMapData((prev) => ({
        ...prev,
        edges: [...prev.edges, { id: edgeId, source: pendingEdge.source, target: pendingEdge.target, label }],
      }));
      setPendingEdge(null);
      toast.success("Connection added!");
    },
    [pendingEdge]
  );

  /* ─── API: Save canvas to backend (PUT /api/concept-map/) ─── */
  const handleSaveCanvas = useCallback(async () => {
    try {
      await save({
        title: mapData.title || "Clinical Concept Map",
        nodes: mapData.nodes || [],
        edges: mapData.edges || [],
      });
      toast.success("Canvas saved to the server!");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Could not save the canvas.");
    }
  }, [save, mapData]);

  /* ─── API: Generate map from prompt (POST /api/concept-map/generate/) ─── */
  const handleSendPrompt = useCallback(async (promptText) => {
    if (!promptText?.trim()) return;
    try {
      const result = await generate({ prompt: promptText });
      if (result) {
        const data = result?.data ?? result;
        let normalized;
        if (data.map && Array.isArray(data.map.nodes)) {
          normalized = {
            id: data.map.id || null,
            title: data.map.title || "Clinical Concept Map",
            nodes: data.map.nodes || [],
            edges: data.map.edges || [],
          };
        } else if (Array.isArray(data.nodes)) {
          normalized = {
            id: data.id || null,
            title: data.title || "Clinical Concept Map",
            nodes: data.nodes || [],
            edges: data.edges || [],
          };
        } else {
          normalized = { id: null, title: "Clinical Concept Map", nodes: [], edges: [] };
        }
        setMapData(normalized);
        toast.success("Concept map generated by CARA AI!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to generate concept map.");
    }
  }, [generate]);

  /* ─── History: Select a map from My Maps ─── */
  const handleSelectMap = useCallback(async (mapId) => {
    try {
      const result = await selectMap(mapId);
      if (result) {
        const data = result?.data ?? result;
        let normalized;
        if (data.map && Array.isArray(data.map.nodes)) {
          normalized = {
            id: data.map.id || null,
            title: data.map.title || "Clinical Concept Map",
            nodes: data.map.nodes || [],
            edges: data.map.edges || [],
          };
        } else if (Array.isArray(data.nodes)) {
          normalized = {
            id: data.id || null,
            title: data.title || "Clinical Concept Map",
            nodes: data.nodes || [],
            edges: data.edges || [],
          };
        } else {
          normalized = EMPTY_MAP;
        }
        setMapData(normalized);
        setHistoryOpen(false);
        toast.success("Map loaded from history.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to load map.");
    }
  }, [selectMap]);

  /* ─── History: Create new empty map ─── */
  const handleCreateMap = useCallback(async () => {
    try {
      const result = await createMap({ title: "Untitled Concept Map" });
      if (result) {
        const data = result?.data ?? result;
        let normalized;
        if (data.map && Array.isArray(data.map.nodes)) {
          normalized = {
            id: data.map.id || null,
            title: data.map.title || "Untitled Concept Map",
            nodes: data.map.nodes || [],
            edges: data.map.edges || [],
          };
        } else {
          normalized = {
            id: data.id || null,
            title: data.title || "Untitled Concept Map",
            nodes: data.nodes || [],
            edges: data.edges || [],
          };
        }
        setMapData(normalized);
        setHistoryOpen(false);
        toast.success("New concept map created!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create map.");
    }
  }, [createMap]);

  /* ─── History: Delete a specific map ─── */
  const handleDeleteMap = useCallback(async (mapId) => {
    try {
      await deleteMap(mapId);
      // If the deleted map is the current one, reset
      if (mapData?.id === mapId) {
        setMapData(EMPTY_MAP);
      }
      toast.success("Map deleted.");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to delete map.");
    }
  }, [deleteMap, mapData?.id]);

  /* ─── History: Clear all maps ─── */
  const handleClearAll = useCallback(async () => {
    try {
      await clearAll();
      setMapData(EMPTY_MAP);
      toast.success("All concept maps deleted.");
      setHistoryOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to clear maps.");
    }
  }, [clearAll]);

  /* ─── History: Import a map from JSON ─── */
  const handleImportMap = useCallback(async (jsonData) => {
    try {
      const result = await importMap({
        title: jsonData.title || "Imported Concept Map",
        nodes: jsonData.nodes || [],
        edges: jsonData.edges || [],
      });
      if (result) {
        const data = result?.data ?? result;
        let normalized;
        if (data.map && Array.isArray(data.map.nodes)) {
          normalized = {
            id: data.map.id || null,
            title: data.map.title || "Imported Concept Map",
            nodes: data.map.nodes || [],
            edges: data.map.edges || [],
          };
        } else {
          normalized = {
            id: data.id || null,
            title: data.title || "Imported Concept Map",
            nodes: data.nodes || [],
            edges: data.edges || [],
          };
        }
        setMapData(normalized);
        setHistoryOpen(false);
        toast.success("Map imported successfully!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to import map.");
    }
  }, [importMap]);

  return (
    <div className="flex flex-col xl:flex-row h-dvh xl:h-full xl:min-h-[calc(100vh-80px)] relative w-full bg-[#EEF0F3] overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-200 transform transition-transform duration-300 xl:relative xl:translate-x-0
          ${isSidebarOpen ? "translate-x-0 z-50 shadow-2xl" : "-translate-x-full"} w-[88%] sm:w-80 md:w-88 xl:w-80 shrink-0 bg-white border-r border-[#E5E7EB] flex flex-col`}
      >
        <ConceptMapSidebar
          onClose={() => setIsSidebarOpen(false)}
          onSendPrompt={handleSendPrompt}
          isGenerating={isGenerating}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        <ConceptMapHeader
          title={mapData?.title}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onRenameMap={handleRenameMap}
          onAddNode={() => setAddModalOpen(true)}
          onDownloadPDF={() => canvasRef.current?.exportPDF()}
          onResetLayout={() => canvasRef.current?.resetLayout()}
          onSaveCanvas={handleSaveCanvas}
          onOpenHistory={() => setHistoryOpen(true)}
          isSaving={isSaving}
        />
        <ConceptMapCanvas
          ref={canvasRef}
          mapData={mapData}
          onNodeClick={setEditingNodeId}
          onEdgePicked={handleEdgePicked}
        />
      </main>

      {/* Modals — key forces remount so form state resets each time */}
      <AddNodeModal
        open={addModalOpen}
        nodes={mapData?.nodes || []}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddNode}
      />
      <EditNodeModal
        key={editingNodeId || "none"}
        node={editingNode}
        onClose={() => setEditingNodeId(null)}
        onSave={handleSaveNode}
        onDelete={handleDeleteNode}
      />
      <EdgeLabelModal
        key={pendingEdge ? "edge-open" : "edge-closed"}
        edge={pendingEdge}
        defaultLabel={pendingEdge ? suggestEdgeLabel(
          (mapData?.nodes || []).find((n) => n.id === pendingEdge.source),
          (mapData?.nodes || []).find((n) => n.id === pendingEdge.target)
        ) : "leads to"}
        onClose={() => setPendingEdge(null)}
        onConfirm={handleAddEdge}
      />

      {/* History / My Maps Modal */}
      <HistoryModal
        open={historyOpen}
        maps={maps}
        totalMaps={totalMaps}
        totalNodes={totalNodes}
        currentMapId={mapData?.id}
        isLoading={isMapsLoading}
        isSelecting={isSelecting}
        isCreating={isCreating}
        isDeleting={isDeleting}
        isClearing={isClearing}
        isImporting={isImporting}
        onClose={() => setHistoryOpen(false)}
        onSelectMap={handleSelectMap}
        onCreateMap={handleCreateMap}
        onDeleteMap={handleDeleteMap}
        onClearAll={handleClearAll}
        onImportMap={handleImportMap}
      />
    </div>
  );
};

export default ConceptMapShell;
