"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Menu } from "lucide-react";
import toast from "react-hot-toast";
import ConceptMapSidebar from "./concept-map-sidebar";
import ConceptMapHeader from "./concept-map-header";
import ConceptMapCanvas from "./concept-map-canvas";
import { AddNodeModal, EditNodeModal, EdgeLabelModal } from "./concept-map-modals";
import {
  useGetConceptMap,
  useGenerateConceptMap,
  useSaveConceptMap,
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

const EMPTY_MAP = { title: "Clinical Concept Map", nodes: [], edges: [] };

const ConceptMapShell = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mapData, setMapData] = useState(EMPTY_MAP);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState(null);
  // const [connectMode, setConnectMode] = useState(false);
  const [pendingEdge, setPendingEdge] = useState(null); // { source, target, sourceLabel, targetLabel }
  const canvasRef = useRef(null);
  const hydratedRef = useRef(false);

  /* ─── API hooks ─── */
  const {
    mapData: serverMap,
    isLoading: isLoadingMap,
    isError: loadError,
  } = useGetConceptMap();
  console.log("serverMap", serverMap);

  const {
    generate,
    isPending: isGenerating,
  } = useGenerateConceptMap();

  const {
    save,
    isPending: isSaving,
  } = useSaveConceptMap();

  /* ─── Hydrate from server on first load (once only) ─── */
  useEffect(() => {
    if (!hydratedRef.current && serverMap && serverMap.nodes?.length > 0) {
      hydratedRef.current = true;
      setMapData(serverMap);
    }
  }, [serverMap]);

  const editingNode = (mapData?.nodes || []).find((n) => n.id === editingNodeId) || null;

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
  // const handleToggleConnect = useCallback(() => {
  //   setConnectMode((m) => !m);
  // }, []);

  /* two nodes picked on the canvas → open the label modal */
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

  /* Esc exits connect mode */
  // useEffect(() => {
  //   if (!connectMode) return;
  //   const onKey = (e) => {
  //     if (e.key === "Escape") setConnectMode(false);
  //   };
  //   window.addEventListener("keydown", onKey);
  //   return () => window.removeEventListener("keydown", onKey);
  // }, [connectMode]);

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
        // normalizeMapObject is handled inside the hook, but we also get
        // the raw response — re-normalize for the local state
        const data = result?.data ?? result;
        let normalized;
        if (data.map && Array.isArray(data.map.nodes)) {
          normalized = {
            title: data.map.title || "Clinical Concept Map",
            nodes: data.map.nodes || [],
            edges: data.map.edges || [],
          };
        } else if (Array.isArray(data.nodes)) {
          normalized = {
            title: data.title || "Clinical Concept Map",
            nodes: data.nodes || [],
            edges: data.edges || [],
          };
        } else {
          normalized = { title: "Clinical Concept Map", nodes: [], edges: [] };
        }
        setMapData(normalized);
        toast.success("Concept map generated by CARA AI!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to generate concept map.");
    }
  }, [generate]);

  return (
    <div className="flex flex-col xl:flex-row h-full xl:min-h-[calc(100vh-80px)] relative w-full bg-[#EEF0F3]">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 xl:relative xl:translate-x-0
          ${isSidebarOpen ? "translate-x-0 z-[999]" : "-translate-x-full"} w-[85%] md:w-[330px] shrink-0 bg-white border-r border-[#E5E7EB] flex flex-col`}
      >
        <ConceptMapSidebar
          onClose={() => setIsSidebarOpen(false)}
          onSendPrompt={handleSendPrompt}
          isGenerating={isGenerating}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile toggle */}
        <div className="xl:hidden p-4 border-b border-black/10 flex items-center gap-3 bg-white sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <Menu size={20} className="text-[#2C5F8D]" />
          </button>
          <h2 className="font-semibold text-lg text-[#2C5F8D]">Concept Map</h2>
        </div>

        <ConceptMapHeader
          title={mapData?.title}
          onAddNode={() => setAddModalOpen(true)}
          onDownloadPDF={() => canvasRef.current?.exportPDF()}
          onResetLayout={() => canvasRef.current?.resetLayout()}
          onSaveCanvas={handleSaveCanvas}
          // onToggleConnect={handleToggleConnect}
          // isConnectMode={connectMode}
          isSaving={isSaving}
        />
        <ConceptMapCanvas
          ref={canvasRef}
          mapData={mapData}
          onNodeClick={setEditingNodeId}
          // connectMode={connectMode}
          onEdgePicked={handleEdgePicked}
        />
      </main>

      {/* Modals — key forces remount so form state resets each time */}
      <AddNodeModal
        key={addModalOpen ? "open" : "closed"}
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
    </div>
  );
};

export default ConceptMapShell;
