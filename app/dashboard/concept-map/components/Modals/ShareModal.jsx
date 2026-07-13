// ============================================================
//  ShareModal - Share and export options
//  Copy shareable link, download as JSON/PNG/PDF
// ============================================================

'use client';

import React, { useState, useCallback } from 'react';

export default function ShareModal({ isOpen, onClose, nodes, edges, mapTitle, canvasRef }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  /** Copy a shareable link to clipboard */
  const copyLink = useCallback(() => {
    const payload = encodeURIComponent(
      JSON.stringify({ title: mapTitle, nodes, edges })
    );
    const link = `${window.location.origin}${window.location.pathname}#map=${payload.slice(0, 200)}...`;

    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [mapTitle, nodes, edges]);

  /** Download as JSON */
  function downloadJSON() {
    const data = { title: mapTitle, nodes, edges, exported: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (mapTitle || 'concept-map').replace(/\s+/g, '_') + '.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Download as PNG using html2canvas */
  async function downloadPNG() {
    try {
      const html2canvas = (await import('html2canvas')).default;
      // Use the React Flow wrapper element
      const element = document.querySelector('.react-flow') || document.querySelector('[data-canvas]');
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: '#f8fafc',
        scale: 2,
        useCORS: true,
      });
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = (mapTitle || 'concept-map').replace(/\s+/g, '_') + '.png';
      a.click();
    } catch (err) {
      console.error('PNG export error:', err);
      alert('Could not export PNG. Make sure html2canvas is installed.');
    }
  }

  /** Export as PDF */
  async function exportPDF() {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const element = document.querySelector('.react-flow') || document.querySelector('[data-canvas]');
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: '#f8fafc',
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a3' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 30;
      const imgW = pageW - margin * 2;
      const imgH = canvas.height * (imgW / canvas.width);

      // Header
      pdf.setFillColor(44, 95, 141);
      pdf.rect(0, 0, pageW, 42, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.text('STEMRN · ' + (mapTitle || 'Concept Map'), margin, 27);

      // Image
      pdf.addImage(imgData, 'PNG', margin, 54, imgW, Math.min(imgH, pageH - 80));

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 120);
      pdf.text(
        `Generated ${new Date().toLocaleDateString()} · stemrn.com · For educational use — not a substitute for clinical judgment.`,
        margin,
        pageH - 12
      );

      pdf.save((mapTitle || 'concept-map').replace(/\s+/g, '_') + '.pdf');
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Could not export PDF. Make sure html2canvas and jspdf are installed.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md mx-4 relative z-30">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Share Concept Map</h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Export or share your map with others</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Shareable Link */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Shareable link
              </label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/stemrn/map`}
                  className="flex-1 text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 font-mono focus:outline-none"
                />
                <button
                  onClick={copyLink}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#2C5F8D] hover:bg-[#1E4266] text-white transition-all cursor-pointer border border-[#2C5F8D]"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Export buttons */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                Download as
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={downloadJSON}
                  className="py-3 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200
                             text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer"
                >
                  📄 JSON
                </button>
                <button
                  onClick={downloadPNG}
                  className="py-3 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200
                             text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer"
                >
                  🖼️ PNG
                </button>
                <button
                  onClick={exportPDF}
                  className="py-3 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200
                             text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer"
                >
                  📑 PDF
                </button>
              </div>
            </div>

            {/* CARA Tip */}
            <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 text-[11px] text-slate-600 leading-relaxed font-medium">
              <strong className="text-rose-500">✦ CARA Tip:</strong> For permanent sharing, download the JSON and
              re-upload later, or export as PDF for a clean printable format.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
