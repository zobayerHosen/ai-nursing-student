// ============================================================
//  Color utility functions for nodes
// ============================================================

import { TYPE_DEFAULT_COLORS } from './constants';

/**
 * Lighten or darken a hex color by a percentage.
 * @param {string} hex - Hex color string (e.g. '#2C5F8D')
 * @param {number} percent - Percentage to shade (-100 to 100, negative = darker)
 * @returns {string} Adjusted hex color
 */
export function shadeColor(hex, percent) {
  if (!hex || hex[0] !== '#') return hex || '#CBD5E1';
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  let r = parseInt(full.slice(0, 2), 16);
  let g = parseInt(full.slice(2, 4), 16);
  let b = parseInt(full.slice(4, 6), 16);
  const amt = percent / 100;
  r = Math.max(0, Math.min(255, Math.round(r + (amt < 0 ? r * amt : (255 - r) * amt))));
  g = Math.max(0, Math.min(255, Math.round(g + (amt < 0 ? g * amt : (255 - g) * amt))));
  b = Math.max(0, Math.min(255, Math.round(b + (amt < 0 ? b * amt : (255 - b) * amt))));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Compute a readable text color (black or white) based on background brightness.
 * @param {string} hex - Background hex color
 * @returns {string} '#0F172A' for light backgrounds, '#FFFFFF' for dark backgrounds
 */
export function readableTextOn(hex) {
  if (!hex || hex[0] !== '#') return '#0F172A';
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  // Relative luminance (simplified W3C formula)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0F172A' : '#FFFFFF';
}

/**
 * Get the default colors for a node type.
 * @param {string} type - Node type key
 * @returns {{ fill: string, border: string, text: string }}
 */
export function getTypeDefaultColors(type) {
  return TYPE_DEFAULT_COLORS[type] || TYPE_DEFAULT_COLORS.diagnosis;
}

/**
 * Convert hex to rgba string
 */
export function hexToRgba(hex, alpha = 1) {
  if (!hex || hex[0] !== '#') return `rgba(100, 116, 139, ${alpha})`;
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
