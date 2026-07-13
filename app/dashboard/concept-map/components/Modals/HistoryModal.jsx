// ============================================================
//  HistoryModal - Browse and manage saved concept maps
//  Supports search, sort, rename, duplicate, delete, import/export
// ============================================================

'use client';

import React, { useState, useEffect } from 'react';

export default function HistoryModal({
  isOpen,
  onClose,
  maps,
  currentMapId,
  onLoadMap,
  onDeleteMap,
  onRenameMap,
  onNewMap,
  onImportMap,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('modified');
  const [localMaps, setLocalMaps] = useState([]);
  const fileInputRef = React.useRef(null);

  // Refresh maps list when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalMaps(maps || []);
      setSearchQuery('');
      setSortBy('modified');
    }
  }, [isOpen, maps]);

  if (!isOpen) return null;

  /** Filter and sort maps */
  const filteredMaps = localMaps
    .filter((m) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (m.title || '').toLowerCase().includes(q) ||
        (m.nodes || []).some((n) => (n.data?.title || '').toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'modified') return (b.modified || '').localeCompare(a.modified || '');
      if (sortBy === 'created') return (b.created || '').localeCompare(a.created || '');
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'size') return (b.nodes?.length || 0) - (a.nodes?.length || 0);
      return 0;
    });

  /** Format a date string as relative time */
  function formatRelativeTime(iso) {
    if (!iso) return '—';
    const then = new Date(iso);
    const now = new Date();
    const diff = (now - then) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return then.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: then.getFullYear() === now.getFullYear() ? undefined : 'numeric',
    });
  }

  /** Handle map deletion with confirmation */
  function handleDelete(mapId, title) {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) {
      onDeleteMap(mapId);
      setLocalMaps((prev) => prev.filter((m) => m.id !== mapId));
    }
  }

  /** Handle rename with prompt */
  function handleRename(mapId, currentTitle) {
    const newTitle = prompt('Rename this map:', currentTitle);
    if (newTitle && newTitle.trim()) {
      onRenameMap(mapId, newTitle.trim());
      setLocalMaps((prev) =>
        prev.map((m) => (m.id === mapId ? { ...m, title: newTitle.trim() } : m))
      );
    }
  }

  /** Handle JSON file import */
  function handleImportFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (!data.nodes) throw new Error('Not a valid map file');
        onImportMap(data, file.name.replace(/\.json$/i, ''));
        // Refresh the list
        setLocalMaps((prev) => [...prev, {
          id: 'map_imported_' + Date.now(),
          title: data.title || file.name.replace(/\.json$/i, ''),
          nodes: data.nodes,
          edges: data.edges || [],
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
        }]);
      } catch (err) {
        alert('Could not import: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[85vh] flex flex-col relative z-30">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-sm font-bold text-slate-800">My Concept Maps</h2>
            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
              {localMaps.length} map{localMaps.length !== 1 ? 's' : ''} saved
              {localMaps.length > 0 && (
                <span className="ml-1">
                  · {localMaps.reduce((s, m) => s + (m.nodes?.length || 0), 0)} total nodes
                </span>
              )}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search + Actions */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-200 bg-slate-50/50">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search maps by title or content..."
              className="w-full text-xs font-semibold px-8 py-2 rounded-xl bg-white border border-slate-200 text-slate-800
                         focus:outline-none focus:border-[#2C5F8D] transition-all"
            />
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-500
                       focus:outline-none focus:border-[#2C5F8D]"
          >
            <option value="modified">Recently modified</option>
            <option value="created">Recently created</option>
            <option value="title">Title (A→Z)</option>
            <option value="size">Most nodes</option>
          </select>

          <button
            onClick={onNewMap}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#2C5F8D] text-white hover:bg-[#1E4266]
                       shadow-md shadow-[#2C5F8D]/10 transition-all flex items-center gap-1.5 cursor-pointer border border-[#2C5F8D]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Map
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600
                       hover:bg-slate-200 hover:text-slate-700 transition-all cursor-pointer border border-transparent"
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImportFile}
          />
        </div>

        {/* Map List */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-[250px] bg-white">
          {filteredMaps.length > 0 ? (
            filteredMaps.map((m) => {
              const nodeCount = m.nodes?.length || 0;
              const edgeCount = m.edges?.length || 0;
              const isCurrent = m.id === currentMapId;

              return (
                <div
                  key={m.id}
                  onClick={() => { onLoadMap(m.id); onClose(); }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all relative group flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-rose-500/5 border-rose-300 hover:border-rose-400'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-350 hover:bg-slate-100/50'
                  }`}
                >
                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRename(m.id, m.title); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400
                                 hover:bg-slate-200 hover:text-slate-700 transition-all cursor-pointer"
                      title="Rename"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(m.id, m.title); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400
                                 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
                      title="Delete"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      </svg>
                    </button>
                  </div>

                  <div>
                    {/* Title */}
                    <div className="text-xs font-bold text-slate-800 pr-6 mb-2 truncate">
                      {m.title || 'Untitled'}
                    </div>

                    {/* Preview snippet */}
                    <div className="text-[11px] font-medium text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                      {m.nodes?.slice(0, 2).map((n) => n.data?.title).filter(Boolean).join(' · ') || 'Empty map'}
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 flex-wrap font-medium">
                    <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500 font-bold">
                      {nodeCount} nodes
                    </span>
                    <span>{edgeCount} links</span>
                    <span className="text-slate-300">·</span>
                    <span>{formatRelativeTime(m.modified)}</span>
                    {isCurrent && (
                      <span className="ml-auto text-rose-500 font-bold text-[9px] uppercase tracking-wider">● current</span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400 bg-white">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                   className="mb-3 opacity-40">
                <circle cx="12" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
                <path d="M12 7v3M12 10l-5.5 7M12 10l5.5 7" />
              </svg>
              <p className="text-xs font-bold mb-1">No maps found</p>
              <p className="text-[11px]">Build your first concept map and it will save here automatically.</p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => {
              if (confirm('Delete ALL saved maps? This cannot be undone.')) {
                try {
                  localStorage.removeItem('stemrn_maps');
                  localStorage.removeItem('stemrn_current_map_id');
                  onNewMap();
                  setLocalMaps([]);
                } catch (e) { console.error(e); }
              }
            }}
            className="text-[11px] font-semibold text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            Clear all maps
          </button>
        </div>
      </div>
    </div>
  );
}
