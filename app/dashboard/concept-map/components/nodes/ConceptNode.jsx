// ============================================================
//  ConceptNode - Custom React Flow Node
//  Renders cards for clinical concept maps with:
//  - Type-specific styling and custom colors
//  - Title & details layout with bullet lists
//  - Hover actions (Edit, Link, Delete) via NodeActionsContext
//  - Multi-directional connection handles
// ============================================================

'use client';

import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useNodeActions } from '@/lib/concept-map/NodeActionsContext';
import { NODE_TYPES, TYPE_DEFAULT_COLORS } from '@/lib/concept-map/constants';
import { shadeColor, hexToRgba } from '@/lib/concept-map/colors';
import { Edit2, Link2, Trash2 } from 'lucide-react';

export default function ConceptNode({ id, data, selected }) {
  const { onEdit, onDelete, onLink, selectedNodeId } = useNodeActions();
  const [hovered, setHovered] = useState(false);

  const nodeType = data.nodeType || 'diagnosis';
  const typeDef = NODE_TYPES[nodeType] || NODE_TYPES.diagnosis;
  const defaultColors = TYPE_DEFAULT_COLORS[nodeType] || TYPE_DEFAULT_COLORS.diagnosis;

  // Custom colors or defaults
  const fill = data.fill || defaultColors.fill;
  const border = data.border || shadeColor(fill, -12);
  const textColor = data.textColor || defaultColors.text;

  const isCentral = nodeType === 'central';

  /** Parse multiline body into bullet points or paragraphs */
  const renderBody = () => {
    if (!data.body) return null;
    
    const lines = data.body.split('\n').filter(line => line.trim() !== '');
    
    // Check if it looks like a list
    const isList = lines.some(line => line.trim().startsWith('•') || line.trim().startsWith('-'));
    
    if (isCentral) {
      return (
        <p className="text-xs mt-1.5 opacity-90 font-medium leading-relaxed max-w-[280px]">
          {data.body}
        </p>
      );
    }

    if (isList) {
      return (
        <ul className="text-left text-[11px] leading-relaxed mt-2 space-y-1 opacity-90 pl-1 list-none font-medium">
          {lines.map((line, idx) => {
            const cleanText = line.replace(/^[•-]\s*/, '').trim();
            return (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-400 mt-0.5 select-none shrink-0">•</span>
                <span>{cleanText}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <div className="text-left text-[11px] leading-relaxed mt-2 space-y-1 opacity-90 pl-1 font-medium whitespace-pre-wrap">
        {lines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative group transition-all duration-200 rounded-2xl border-2 text-left cursor-grab active:cursor-grabbing
        ${isCentral 
          ? 'px-6 py-5 shadow-xl shadow-indigo-500/10 min-w-[240px] text-center' 
          : 'px-4.5 py-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 min-w-[180px] max-w-[285px]'
        }
      `}
      style={{
        backgroundColor: fill,
        borderColor: selected ? '#3B82F6' : border,
        color: textColor,
        boxShadow: selected ? `0 0 0 3px ${hexToRgba('#3b82f6', 0.2)}` : undefined,
      }}
    >
      {/* 4-Directional Double Handles (Source + Target) for seamless routing */}
      {/* Left */}
      <Handle type="target" position={Position.Left} id="l-t" style={{ opacity: 0, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Left} id="l-s" style={{ opacity: 0, width: 8, height: 8 }} />

      {/* Right */}
      <Handle type="target" position={Position.Right} id="r-t" style={{ opacity: 0, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} id="r-s" style={{ opacity: 0, width: 8, height: 8 }} />

      {/* Top */}
      <Handle type="target" position={Position.Top} id="t-t" style={{ opacity: 0, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Top} id="t-s" style={{ opacity: 0, width: 8, height: 8 }} />

      {/* Bottom */}
      <Handle type="target" position={Position.Bottom} id="b-t" style={{ opacity: 0, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Bottom} id="b-s" style={{ opacity: 0, width: 8, height: 8 }} />

      {/* Node Content */}
      <div className="flex flex-col h-full select-none">
        {/* Node Category Badge */}
        {!isCentral && (
          <div className="flex items-center justify-between mb-1.5">
            <span 
              className="text-[9px] font-bold uppercase tracking-widest opacity-60"
              style={{ color: textColor }}
            >
              {typeDef.label}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className={`font-bold leading-snug tracking-tight ${isCentral ? 'text-base' : 'text-xs'}`}>
          {data.title || 'Untitled'}
        </h3>

        {/* Separator for styled non-central nodes */}
        {!isCentral && data.body && (
          <div 
            className="w-full h-px my-1.5 opacity-25" 
            style={{ backgroundColor: textColor }}
          />
        )}

        {/* Body details */}
        {renderBody()}
      </div>

      {/* Action Popover (Edit, Link, Delete) on Hover or Select */}
      {(hovered || selected) && !isCentral && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-2 py-1 rounded-xl shadow-xl z-50 animate-fadeUp">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(id);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-all"
            title="Edit Node"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLink?.(id);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-all"
            title="Link Node"
          >
            <Link2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Delete this node?')) onDelete?.(id);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all"
            title="Delete Node"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
