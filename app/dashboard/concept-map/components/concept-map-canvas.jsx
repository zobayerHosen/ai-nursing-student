"use client";

import { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { Plus, Minus, Maximize2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./concept-map-canvas.css";

/* ── category → visual class mapping */
const CAT_STYLES = {
  Central:           { bg: "#1f3a5f", border: "#1f3a5f", ink: "#ffffff", eyebrow: "#b9c9de", head: "#ffffff" },
  "Risk Factor":     { bg: "#ede4fb", border: "#9b6fd6", ink: "#3d2466", eyebrow: "#7c3aed", head: "#7c3aed" },
  "Subjective Data": { bg: "#ffffff", border: "#d0d5dd", ink: "#1f2937", eyebrow: "#4b5563", head: "#1f2937" },
  "Objective Data":  { bg: "#ffffff", border: "#d0d5dd", ink: "#1f2937", eyebrow: "#4b5563", head: "#1f2937" },
  "Nursing Diagnosis":{ bg: "#fde5ef", border: "#ec6ba0", ink: "#7a1450", eyebrow: "#db2777", head: "#db2777" },
  Intervention:      { bg: "#fff2e0", border: "#f0a94e", ink: "#6b4200", eyebrow: "#c2760a", head: "#c2760a" },
  Medication:        { bg: "#e3f2fb", border: "#6fb6de", ink: "#073d5c", eyebrow: "#0f6fa3", head: "#0f6fa3" },
  Complication:      { bg: "#fde3e3", border: "#ea8888", ink: "#7a1414", eyebrow: "#c62828", head: "#c62828" },
};
const DEFAULT_STYLE = { bg: "#eee", border: "#999", ink: "#333", eyebrow: "#666", head: "#333" };

const ConceptMapCanvas = forwardRef(function ConceptMapCanvas(
  { mapData, onNodeClick, onEdgePicked },
  ref
) {
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const layoutRef = useRef(null);
  const svgRef = useRef(null);
  const viewRef = useRef({ x: 0, y: 0, scale: 1 });
  const cardsRef = useRef({});
  const edgesDataRef = useRef([]);
  const manualPos = useRef({});
  const [nodeCount, setNodeCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);

  const onNodeClickRef = useRef(onNodeClick);
  const onEdgePickedRef = useRef(onEdgePicked);

  useEffect(() => { onNodeClickRef.current = onNodeClick; }, [onNodeClick]);
  useEffect(() => { onEdgePickedRef.current = onEdgePicked; }, [onEdgePicked]);

  /* ── helpers */
  const applyTransform = useCallback(() => {
    const v = viewRef.current;
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(${v.x}px,${v.y}px) scale(${v.scale})`;
    }
  }, []);

  const relRect = useCallback((el, root) => {
    let x = 0, y = 0, node = el;
    while (node && node !== root) { x += node.offsetLeft; y += node.offsetTop; node = node.offsetParent; if (!node) break; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight, cx: x + el.offsetWidth / 2, cy: y + el.offsetHeight / 2 };
  }, []);

  const boundaryPoint = useCallback((rect, to) => {
    const dx = to.x - rect.cx, dy = to.y - rect.cy;
    if (dx === 0 && dy === 0) return { x: rect.cx, y: rect.cy };
    const hw = rect.w / 2, hh = rect.h / 2;
    const s = Math.min(Math.abs(hw / (dx || 1e-6)), Math.abs(hh / (dy || 1e-6)));
    return { x: rect.cx + dx * s, y: rect.cy + dy * s };
  }, []);

  const drawEdges = useCallback(() => {
    const layout = layoutRef.current;
    const svg = svgRef.current;
    if (!layout || !svg) return;
    svg.innerHTML = "";
    const w = layout.offsetWidth, h = layout.offsetHeight;
    svg.setAttribute("width", w); svg.setAttribute("height", h);
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    if (canvasRef.current) { canvasRef.current.style.width = w + "px"; canvasRef.current.style.height = h + "px"; }

    const groups = {};
    edgesDataRef.current.forEach(e => {
      const key = [e.s.dataset.nodeId, e.t.dataset.nodeId].sort().join("|");
      (groups[key] = groups[key] || []).push(e);
    });

    Object.values(groups).forEach(group => {
      group.forEach((e, i) => {
        const sR = relRect(e.s, layout), tR = relRect(e.t, layout);
        const p1 = boundaryPoint(sR, tR), p2 = boundaryPoint(tR, sR);
        const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
        const ddx = p2.x - p1.x, ddy = p2.y - p1.y;
        const len = Math.hypot(ddx, ddy) || 1;
        const nx = -ddy / len, ny = ddx / len;
        const spread = (i - (group.length - 1) / 2) * 14;
        const cx = mx + nx * spread, cy = my + ny * spread;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`);
        path.setAttribute("class", "cm-edge-line");
        svg.appendChild(path);

        if (e.label) {
          const lx = 0.25 * p1.x + 0.5 * cx + 0.25 * p2.x;
          const ly = 0.25 * p1.y + 0.5 * cy + 0.25 * p2.y;
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", lx); text.setAttribute("y", ly);
          text.setAttribute("class", "cm-edge-label");
          text.setAttribute("text-anchor", "middle");
          text.textContent = e.label;
          svg.appendChild(text);
          requestAnimationFrame(() => {
            try {
              const bbox = text.getBBox();
              const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
              rect.setAttribute("x", bbox.x - 3); rect.setAttribute("y", bbox.y - 1);
              rect.setAttribute("width", bbox.width + 6); rect.setAttribute("height", bbox.height + 2);
              rect.setAttribute("rx", 3); rect.setAttribute("class", "cm-edge-label-bg");
              svg.insertBefore(rect, text);
            } catch (_) {}
          });
        }
      });
    });
  }, [relRect, boundaryPoint]);

  const fitToView = useCallback(() => {
    const vp = viewportRef.current, layout = layoutRef.current;
    if (!vp || !layout) return;
    const lw = layout.offsetWidth, lh = layout.offsetHeight;
    if (!lw || !lh) return;
    const scale = Math.min(vp.clientWidth / lw, vp.clientHeight / lh, 1) * 0.92;
    viewRef.current.scale = Math.max(0.2, scale);
    viewRef.current.x = (vp.clientWidth - lw * viewRef.current.scale) / 2;
    viewRef.current.y = (vp.clientHeight - lh * viewRef.current.scale) / 2;
    applyTransform();
  }, [applyTransform]);

  const zoomBy = useCallback((factor) => {
    viewRef.current.scale = Math.min(2.5, Math.max(0.2, viewRef.current.scale * factor));
    applyTransform();
  }, [applyTransform]);

  /* ── makeDraggable (drag + click-to-edit with touch support) ── */
  const makeDraggable = useCallback((card) => {
    let dragging = false, isMoved = false, startX = 0, startY = 0, origL = 0, origT = 0, frame = null;

    const onMove = (e) => {
      if (!dragging) return;
      isMoved = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = (clientX - startX) / viewRef.current.scale;
      const dy = (clientY - startY) / viewRef.current.scale;
      card.style.left = (origL + dx) + "px"; card.style.top = (origT + dy) + "px";
      if (!frame) { frame = requestAnimationFrame(() => { drawEdges(); frame = null; }); }
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false; card.classList.remove("cm-dragging");
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      manualPos.current[card.dataset.nodeId] = { x: parseFloat(card.style.left), y: parseFloat(card.style.top) };
      drawEdges();
    };

    const onStart = (e) => {
      if (e.touches && e.touches.length > 1) return;
      e.stopPropagation();
      if (!e.touches) e.preventDefault();
      dragging = true; isMoved = false;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX; startY = clientY;
      origL = parseFloat(card.style.left) || 0; origT = parseFloat(card.style.top) || 0;
      card.classList.add("cm-dragging");
      document.body.style.userSelect = "none";
      if (e.touches) {
        window.addEventListener("touchmove", onMove, { passive: false });
        window.addEventListener("touchend", onUp);
      } else {
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
      }
    };

    card.addEventListener("mousedown", onStart);
    card.addEventListener("touchstart", onStart, { passive: false });

    card.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isMoved) return;
      onNodeClickRef.current?.(card.dataset.nodeId);
    });
  }, [drawEdges]);

  /* ── resolveOverlaps ──────────────────────────────── */
  const resolveOverlaps = useCallback((elById, pinnedIds) => {
    const pad = 16, pinned = new Set(pinnedIds || []);
    const ids = Object.keys(elById);
    const items = ids.map(id => ({
      id, el: elById[id],
      x: parseFloat(elById[id].style.left) || 0, y: parseFloat(elById[id].style.top) || 0,
      w: elById[id].offsetWidth, h: elById[id].offsetHeight,
    }));
    for (let iter = 0; iter < 400; iter++) {
      let any = false;
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i], b = items[j];
          const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + pad;
          const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + pad;
          if (ox > 0 && oy > 0) {
            any = true;
            const aP = pinned.has(a.id), bP = pinned.has(b.id);
            if (ox < oy) {
              const push = ox / 2, dir = (a.x + a.w / 2) < (b.x + b.w / 2) ? 1 : -1;
              if (!aP) a.x -= dir * push * (bP ? 2 : 1);
              if (!bP) b.x += dir * push * (aP ? 2 : 1);
            } else {
              const push = oy / 2, dir = (a.y + a.h / 2) < (b.y + b.h / 2) ? 1 : -1;
              if (!aP) a.y -= dir * push * (bP ? 2 : 1);
              if (!bP) b.y += dir * push * (aP ? 2 : 1);
            }
          }
        }
      }
      if (!any) break;
    }
    items.forEach(it => { it.el.style.left = it.x + "px"; it.el.style.top = it.y + "px"; });
  }, []);

  const normalizeLayoutBounds = useCallback((layout, elById) => {
    const items = Object.values(elById).map(el => ({
      el, x: parseFloat(el.style.left) || 0, y: parseFloat(el.style.top) || 0,
      w: el.offsetWidth, h: el.offsetHeight,
    }));
    if (!items.length) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    items.forEach(it => {
      minX = Math.min(minX, it.x); minY = Math.min(minY, it.y);
      maxX = Math.max(maxX, it.x + it.w); maxY = Math.max(maxY, it.y + it.h);
    });
    const shiftX = minX < 0 ? -minX : 0, shiftY = minY < 0 ? -minY : 0;
    items.forEach(it => { it.el.style.left = (it.x + shiftX) + "px"; it.el.style.top = (it.y + shiftY) + "px"; });
    layout.style.width = (maxX + shiftX + 80) + "px";
    layout.style.height = (maxY + shiftY + 80) + "px";
  }, []);

  /* ── build card DOM element ───────────────────────── */
  const makeCard = useCallback((node, category) => {
    const s = CAT_STYLES[category] || DEFAULT_STYLE;
    const isWide = category !== "Central" && category !== "Intervention";
    const div = document.createElement("div");
    div.className = "cm-card" + (category === "Central" ? " cm-central" : "");
    div.dataset.nodeId = node.id;
    div.style.cssText = `background:${s.bg};border-color:${s.border};color:${s.ink};width:${isWide ? 230 : 210}px;`;
    div.innerHTML = `
      <div class="cm-eyebrow" style="color:${s.eyebrow}">${esc(category)}</div>
      <div class="cm-label" style="color:${s.head}">${esc(node.label || "(no label)")}</div>
      <div class="cm-details">${esc(node.details || "")}</div>`;
    return div;
  }, []);

  /* ── render map (ported from HTML) ────────────────── */
  const renderMap = useCallback(() => {
    if (!mapData || !mapData.nodes?.length) return;
    const nodes = mapData.nodes, edges = mapData.edges || [];
    const byId = {}; nodes.forEach(n => byId[n.id] = n);
    const byCat = {}; nodes.forEach(n => { const c = n.category || "Unknown"; (byCat[c] = byCat[c] || []).push(n); });

    // Stage: invisible off-screen container
    const stage = document.createElement("div");
    stage.style.cssText = "position:absolute;left:-99999px;top:0;visibility:hidden;display:flex;flex-direction:column;align-items:center;gap:28px;padding:40px;width:max-content;";
    document.body.appendChild(stage);

    const stagedCat = {}, orderedIds = [];
    const addCard = (n, cat, parent) => { const c = makeCard(n, cat); parent.appendChild(c); stagedCat[n.id] = c; orderedIds.push(n.id); };

    // Risk row
    const riskNodes = byCat["Risk Factor"] || [];
    if (riskNodes.length) { const row = mkDiv("cm-row cm-top-risk"); riskNodes.forEach(n => addCard(n, "Risk Factor", row)); stage.appendChild(row); }

    // Main row
    const mainRow = mkDiv("cm-main-row");
    const leftStack = mkDiv("cm-col-stack");
    ["Subjective Data", "Objective Data"].forEach(cat => (byCat[cat] || []).forEach(n => addCard(n, cat, leftStack)));
    mainRow.appendChild(leftStack);

    const centerWrap = mkDiv("");
    (byCat["Central"] || []).forEach(n => addCard(n, "Central", centerWrap));
    mainRow.appendChild(centerWrap);

    const rightStack = mkDiv("cm-col-stack");
    const usedInt = new Set();
    (byCat["Nursing Diagnosis"] || []).forEach(dx => {
      const pair = mkDiv("cm-pair-block");
      addCard(dx, "Nursing Diagnosis", pair);
      const managedIds = edges.filter(e => e.source === dx.id && e.label === "managed by" && byId[e.target]?.category === "Intervention").map(e => e.target);
      if (managedIds.length) {
        const col = mkDiv("cm-pair-interventions");
        managedIds.forEach(iid => { usedInt.add(iid); addCard(byId[iid], "Intervention", col); });
        pair.appendChild(col);
      }
      rightStack.appendChild(pair);
    });
    mainRow.appendChild(rightStack);
    stage.appendChild(mainRow);

    const leftoverInt = (byCat["Intervention"] || []).filter(n => !usedInt.has(n.id));
    if (leftoverInt.length) { const row = mkDiv("cm-row"); leftoverInt.forEach(n => addCard(n, "Intervention", row)); stage.appendChild(row); }
    if (byCat["Medication"]?.length) { const row = mkDiv("cm-row"); byCat["Medication"].forEach(n => addCard(n, "Medication", row)); stage.appendChild(row); }
    if (byCat["Complication"]?.length) { const row = mkDiv("cm-row"); byCat["Complication"].forEach(n => addCard(n, "Complication", row)); stage.appendChild(row); }

    const KNOWN = new Set(Object.keys(CAT_STYLES));
    const otherCats = Object.keys(byCat).filter(c => !KNOWN.has(c));
    if (otherCats.length) {
      const cap = document.createElement("div");
      cap.className = "cm-section-caption";
      cap.textContent = "Unrecognized categories";
      stage.appendChild(cap);
      const row = mkDiv("cm-row");
      otherCats.forEach(c => byCat[c].forEach(n => addCard(n, c, row)));
      stage.appendChild(row);
    }

    // Phase 2: measure & place
    requestAnimationFrame(() => {
      const positions = {};
      orderedIds.forEach(id => { if (stagedCat[id]) { const r = relRect(stagedCat[id], stage); positions[id] = { x: r.x, y: r.y, w: r.w, h: r.h }; } });
      if (stage.parentNode) document.body.removeChild(stage);

      const layout = layoutRef.current;
      if (!layout) return;
      layout.innerHTML = ""; layout.style.width = "max-content"; layout.style.height = "";

      const elById = {};
      orderedIds.forEach(id => {
        const n = byId[id]; if (!n) return;
        const cat = n.category || "Unknown";
        const card = makeCard(n, cat);
        card.style.position = "absolute";
        const pos = manualPos.current[id] || positions[id] || { x: 100, y: 100 };
        card.style.left = pos.x + "px"; card.style.top = pos.y + "px";
        layout.appendChild(card);
        elById[id] = card;
      });

      resolveOverlaps(elById, Object.keys(manualPos.current));
      normalizeLayoutBounds(layout, elById);
      Object.values(elById).forEach(makeDraggable);
      cardsRef.current = elById;

      edgesDataRef.current = [];
      edges.forEach(e => {
        const s = elById[e.source], t = elById[e.target];
        if (s && t) edgesDataRef.current.push({ s, t, label: e.label || "" });
      });

      setNodeCount(nodes.length);
      setEdgeCount(edgesDataRef.current.length);
      requestAnimationFrame(() => { drawEdges(); if (Object.keys(manualPos.current).length === 0) fitToView(); });
    });
  }, [mapData, makeCard, relRect, resolveOverlaps, normalizeLayoutBounds, makeDraggable, drawEdges, fitToView]);

  /* ── imperative API exposed to parent ─────────────── */
  const resetLayout = useCallback(() => {
    manualPos.current = {};
    renderMap();
  }, [renderMap]);

  const exportPDF = useCallback(async () => {
    const layout = layoutRef.current;
    const canvasEl = canvasRef.current;
    const svg = svgRef.current;
    if (!layout || !canvasEl) return;
    const cards = Array.from(layout.querySelectorAll(".cm-card"));
    if (!cards.length) return;

    // 1. Compute exact bounding box across all cards
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const originalPositions = [];
    cards.forEach(card => {
      const left = parseFloat(card.style.left) || 0;
      const top = parseFloat(card.style.top) || 0;
      const width = card.offsetWidth;
      const height = card.offsetHeight;
      originalPositions.push({ card, left, top });
      if (left < minX) minX = left;
      if (top < minY) minY = top;
      if (left + width > maxX) maxX = left + width;
      if (top + height > maxY) maxY = top + height;
    });

    const padding = 60;
    const shiftX = -minX + padding;
    const shiftY = -minY + padding;
    const exportWidth = Math.ceil(maxX - minX + padding * 2);
    const exportHeight = Math.ceil(maxY - minY + padding * 2);

    // 2. Temporarily shift cards so left-most node sits at padding
    const origTransform = canvasEl.style.transform;
    const origWidth = canvasEl.style.width;
    const origHeight = canvasEl.style.height;
    canvasEl.style.transform = "none";
    canvasEl.style.width = exportWidth + "px";
    canvasEl.style.height = exportHeight + "px";
    layout.style.width = exportWidth + "px";
    layout.style.height = exportHeight + "px";

    cards.forEach(item => {
      item.style.left = ((parseFloat(item.style.left) || 0) + shiftX) + "px";
      item.style.top = ((parseFloat(item.style.top) || 0) + shiftY) + "px";
    });
    drawEdges();

    if (svg) {
      svg.setAttribute("width", exportWidth);
      svg.setAttribute("height", exportHeight);
      svg.setAttribute("viewBox", `0 0 ${exportWidth} ${exportHeight}`);
    }

    const restore = () => {
      originalPositions.forEach(item => {
        item.card.style.left = item.left + "px";
        item.card.style.top = item.top + "px";
      });
      canvasEl.style.transform = origTransform;
      canvasEl.style.width = origWidth;
      canvasEl.style.height = origHeight;
      drawEdges();
    };

    try {
      const canvas = await html2canvas(canvasEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: exportWidth,
        height: exportHeight,
        windowWidth: exportWidth,
        windowHeight: exportHeight,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({
        unit: "pt",
        format: [exportWidth + 20, exportHeight + 20],
        orientation: exportWidth > exportHeight ? "landscape" : "portrait",
      });
      pdf.addImage(imgData, "JPEG", 10, 10, exportWidth, exportHeight);
      pdf.save(`Clinical_Concept_Map_${Date.now()}.pdf`);
    } catch (err) {
      // Fallback: browser print
      window.print();
    } finally {
      restore();
    }
  }, [drawEdges]);

  useImperativeHandle(ref, () => ({ resetLayout, exportPDF }), [resetLayout, exportPDF]);

  /* pan & zoom with touch support */
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    let dragging = false, lastX = 0, lastY = 0, initialPinchDist = null, initialScale = 1;

    const getTouchDist = (e) => {
      if (!e.touches || e.touches.length < 2) return 0;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      return Math.hypot(dx, dy);
    };

    const onDown = (e) => {
      if (e.target.closest(".cm-card")) return;
      dragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      lastX = clientX; lastY = clientY;
      if (e.touches && e.touches.length === 2) {
        initialPinchDist = getTouchDist(e);
        initialScale = viewRef.current.scale;
      }
      vp.classList.add("cm-panning");
    };

    const onUp = (e) => {
      if (e.touches && e.touches.length > 0) return;
      dragging = false; initialPinchDist = null; vp.classList.remove("cm-panning");
    };

    const onMove = (e) => {
      if (!dragging) return;
      if (e.touches && e.touches.length === 2 && initialPinchDist) {
        const dist = getTouchDist(e);
        if (dist > 0) {
          const newScale = Math.min(2.5, Math.max(0.2, initialScale * (dist / initialPinchDist)));
          viewRef.current.scale = newScale;
          applyTransform();
        }
        return;
      }
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      viewRef.current.x += clientX - lastX;
      viewRef.current.y += clientY - lastY;
      lastX = clientX; lastY = clientY;
      applyTransform();
    };

    const onWheel = (e) => { e.preventDefault(); zoomBy(e.deltaY < 0 ? 1.08 : 1 / 1.08); };
    const onResize = () => { drawEdges(); fitToView(); };

    vp.addEventListener("mousedown", onDown);
    vp.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    vp.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);

    return () => {
      vp.removeEventListener("mousedown", onDown);
      vp.removeEventListener("touchstart", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      vp.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, [applyTransform, zoomBy, drawEdges, fitToView]);

  /* render on data change — preserve manual positions */
  useEffect(() => { renderMap(); }, [renderMap]);

  return (
    <div className="cm-wrapper">
      {/* Stats bar */}
      <div className="cm-stats-bar">
        <span className="cm-stats-text">{Math.round(viewRef.current.scale * 100)}%</span>
        <span className="cm-stats-dot" />
        <span className="cm-stats-text">{nodeCount} nodes</span>
        <span className="cm-stats-dot" />
        <span className="cm-stats-text">{edgeCount} links</span>
      </div>

      {/* Viewport */}
      <div ref={viewportRef} className="cm-viewport">
        <div ref={canvasRef} className="cm-canvas">
          <div ref={layoutRef} className="cm-layout" />
          <svg ref={svgRef} className="cm-edges" />
        </div>

        {/* Zoom bar */}
        <div className="cm-zoombar">
          <button type="button" onClick={() => zoomBy(1.2)} className="cm-zoom-btn" title="Zoom in"><Plus size={16} /></button>
          <button type="button" onClick={() => zoomBy(1 / 1.2)} className="cm-zoom-btn" title="Zoom out"><Minus size={16} /></button>
          <button type="button" onClick={fitToView} className="cm-zoom-btn cm-zoom-fit" title="Fit to view"><Maximize2 size={14} /></button>
        </div>
      </div>
    </div>
  );
});

/* tiny helpers */
function esc(str) { return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function mkDiv(cls) { const d = document.createElement("div"); if (cls) d.className = cls; return d; }

export default ConceptMapCanvas;
