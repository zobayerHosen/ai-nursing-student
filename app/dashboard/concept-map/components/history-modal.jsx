"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Plus,
  Trash2,
  FolderOpen,
  Loader2,
  AlertTriangle,
} from "lucide-react";

/* ── Elapsed time helper (mirrors HTML) ── */
function getElapsedTimeText(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function HistoryModal({
  open,
  maps = [],
  totalMaps = 0,
  totalNodes = 0,
  currentMapId,
  isLoading = false,
  isSelecting = false,
  isCreating = false,
  isDeleting = false,
  isClearing = false,
  isImporting = false,
  onClose,
  onSelectMap,
  onCreateMap,
  onDeleteMap,
  onClearAll,
  onImportMap,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("modified_desc");
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    type: null,
    mapId: null,
    title: "",
    message: "",
  });
  const importRef = useRef(null);

  // Filter
  let filtered = maps;
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = maps.filter(
      (m) =>
        (m.title || "").toLowerCase().includes(q) ||
        (m.subtitle || "").toLowerCase().includes(q) ||
        (m.snippet || "").toLowerCase().includes(q)
    );
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "modified_desc")
      return new Date(b.updated_at) - new Date(a.updated_at);
    if (sortBy === "modified_asc")
      return new Date(a.updated_at) - new Date(b.updated_at);
    if (sortBy === "alpha_asc")
      return (a.title || "").localeCompare(b.title || "");
    if (sortBy === "alpha_desc")
      return (b.title || "").localeCompare(a.title || "");
    return 0;
  });

  // Import file handler
  // const handleImportFile = (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     try {
  //       const json = JSON.parse(event.target.result);
  //       if (!json.nodes || !json.edges) {
  //         alert("Invalid concept map file. Must contain 'nodes' and 'edges'.");
  //         return;
  //       }
  //       onImportMap?.({
  //         title: json.title || file.name.replace(/\.[^/.]+$/, ""),
  //         nodes: json.nodes,
  //         edges: json.edges,
  //       });
  //     } catch (err) {
  //       alert("Failed to parse file: " + err.message);
  //     }
  //   };
  //   reader.readAsText(file);
  //   e.target.value = "";
  // };

  const handleDeleteClick = (e, mapId, title) => {
    e.stopPropagation();
    setConfirmState({
      isOpen: true,
      type: "delete",
      mapId,
      title,
      message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
    });
  };

  const handleClearAllClick = () => {
    setConfirmState({
      isOpen: true,
      type: "clearAll",
      mapId: null,
      title: "Clear All Maps",
      message: "Are you sure you want to delete all maps? This action cannot be undone.",
    });
  };

  const confirmAction = () => {
    if (confirmState.type === "delete") {
      onDeleteMap?.(confirmState.mapId);
    } else if (confirmState.type === "clearAll") {
      onClearAll?.();
    }
    setConfirmState({ isOpen: false, type: null, mapId: null, title: "", message: "" });
  };
  
  const cancelConfirm = () => {
    setConfirmState({ isOpen: false, type: null, mapId: null, title: "", message: "" });
  };

  const isBusy = isSelecting || isCreating || isDeleting || isClearing || isImporting;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-200 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl max-w-3xl w-full shadow-xl border border-slate-100 flex flex-col max-h-[85vh]"
          >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 shrink-0">
          <div>
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <FolderOpen size={20} className="text-violet-600" />
              My Concept Maps
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {totalMaps} maps • {totalNodes} total nodes
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-50 shrink-0 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-45">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search maps..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
          >
            <option value="modified_desc">Newest first</option>
            <option value="modified_asc">Oldest first</option>
            <option value="alpha_asc">A → Z</option>
            <option value="alpha_desc">Z → A</option>
          </select>

          {/* Action buttons */}
          <button
            type="button"
            onClick={onCreateMap}
            disabled={isBusy}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 rounded-lg shadow-sm cursor-pointer disabled:opacity-50 transition"
          >
            {isCreating ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
            New Map
          </button>

          {/* <button
            type="button"
            onClick={() => importRef.current?.click()}
            disabled={isBusy}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg cursor-pointer disabled:opacity-50 transition"
          >
            {isImporting ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            Import
          </button>
          <input
            ref={importRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            className="hidden"
          /> */}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-sky-600 animate-spin" />
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <FolderOpen className="w-7 h-7 text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 mb-1">
                {searchQuery ? "No maps match your search" : "No concept maps yet"}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs">
                {searchQuery
                  ? "Try a different search term."
                  : "Create your first concept map using the AI sidebar or click 'New Map'."}
              </p>
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((m) => {
                const isCurrent = m.id === currentMapId || m.is_current;
                return (
                  <div
                    key={m.id}
                    onClick={() => onSelectMap?.(m.id)}
                    className={`relative p-4 rounded-2xl border transition duration-200 bg-white shadow-2xs cursor-pointer group flex flex-col justify-between hover:shadow-md ${isCurrent
                      ? "border-rose-300 bg-rose-50/20 ring-1 ring-rose-300"
                      : "border-slate-200 hover:border-slate-300"
                      }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-slate-800 text-sm tracking-tight line-clamp-1">
                          {m.title || "Untitled Concept Map"}
                        </h4>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteClick(e, m.id, m.title)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded transition opacity-0 group-hover:opacity-100 duration-150 cursor-pointer shrink-0"
                          title="Delete Map"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      {m.subtitle && (
                        <p className="text-[10px] font-bold text-rose-500 mt-1 uppercase tracking-wide">
                          {m.subtitle}
                        </p>
                      )}
                      {m.snippet && (
                        <p className="text-[11px] text-slate-500 mt-2 italic line-clamp-2">
                          {m.snippet}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-lg border border-sky-100">
                          {m.nodes_count || 0} nodes
                        </span>
                        <span className="text-slate-400">
                          {m.edges_count || 0} links
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>{getElapsedTimeText(m.updated_at)}</span>
                      </div>
                      {isCurrent && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                          <span>current</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-full flex items-end justify-end px-6 py-2 border-t border-slate-200">
          {maps.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllClick}
              disabled={isBusy}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer disabled:opacity-50 transition"
            >
              {isClearing ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
              Clear All Maps
            </button>
          )}
        </div>
      </motion.div>

          {/* Confirmation Modal */}
          <AnimatePresence>
            {confirmState.isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4 mx-auto">
                      <AlertTriangle className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                      {confirmState.title === "Clear All Maps" ? "Clear All Maps" : "Delete Map"}
                    </h3>
                    <p className="text-sm text-slate-500 text-center mb-6">
                      {confirmState.message}
                    </p>
                    <div className="flex items-center gap-3 w-full">
                      <button
                        type="button"
                        onClick={cancelConfirm}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={confirmAction}
                        className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition cursor-pointer shadow-md shadow-rose-200"
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
