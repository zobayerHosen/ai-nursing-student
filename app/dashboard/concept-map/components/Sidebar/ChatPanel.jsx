// ============================================================
//  ChatPanel - CARA AI chat interface with message history,
//  file attachments, voice input, and auto-suggestions
// ============================================================

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { generateMapFromSnapshot, caraRefine } from '@/lib/concept-map/api';

/**
 * Renders markdown-style text (bold/italic) as HTML.
 */
function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

export default function ChatPanel({
  onGenerateMap,
  onRefineMap,
  currentMap,
  caraHasGenerated,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      addCaraMessage(
        `Hi — I'm <strong>CARA</strong>. Tell me about your patient and I'll build a comprehensive concept map.<br/><br/>` +
        `I work with <strong>single illnesses</strong> or <strong>patients with multiple comorbidities</strong> — the more detail you give me, the richer the map.<br/><br/>` +
        `<strong>Quick example:</strong><br/>` +
        `<em>"72F admitted for CHF exacerbation. Hx: HTN, T2DM, CKD stage 3. C/o SOB, fatigue, 2-pillow orthopnea. BP 158/92, HR 104, SpO2 89% RA, crackles bilaterally, 2+ pitting edema BLE. BNP 980, Cr 2.1, HbA1c 8.4%."</em><br/><br/>` +
        `Or just try <strong>"65M with pneumonia, SpO2 88%"</strong> and I'll fill in realistic clinical context.`
      );
    }
  }, []);

  /** Add a CARA (AI) message to the chat */
  function addCaraMessage(html, asHtml = true) {
    setMessages((prev) => [...prev, { role: 'assistant', content: html }]);
  }

  /** Add a user message to the chat */
  function addUserMessage(text) {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
  }

  /** Add a loading/thinking indicator */
  function addThinkingMessage() {
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        isThinking: true,
        content: '<span class="thinking-dots">⏳ Generating map...</span>',
      },
    ]);
  }

  /** Remove the last thinking message */
  function removeThinkingMessage() {
    setMessages((prev) => prev.filter((m) => !m.isThinking));
  }

  /** Send user input to CARA */
  const handleSend = useCallback(async () => {
    const val = input.trim();
    if (!val && attachments.length === 0) return;

    addUserMessage(val);
    addThinkingMessage();
    setIsLoading(true);

    try {
      if (!caraHasGenerated) {
        // First message: generate the full map
        const aiData = await generateMapFromSnapshot(val, '', attachments);
        removeThinkingMessage();

        onGenerateMap(aiData);

        const dxCount = (aiData.diagnoses || []).length;
        const intCount = (aiData.interventions || []).length;
        addCaraMessage(
          `Done! I built the map for <em>${aiData.centralConcept?.title || 'your patient'}</em>.<br/><br/>` +
          `<strong>${dxCount}</strong> nursing diagnoses · <strong>${intCount}</strong> interventions · linked to SMART outcomes.<br/><br/>` +
          `Tell me anything to <strong>add, change, or explain</strong>.`
        );
      } else {
        // Follow-up refinement
        const mapSnapshot = currentMap || {};
        const refinement = await caraRefine(val, attachments, mapSnapshot);
        removeThinkingMessage();

        if (refinement.action === 'regenerate') {
          onGenerateMap(refinement.map);
        } else if (refinement.action === 'add_nodes' && refinement.additions) {
          onRefineMap(refinement.additions);
        }

        addCaraMessage(refinement.message || 'Done.');
      }
    } catch (err) {
      removeThinkingMessage();
      addCaraMessage(
        `⚠️ I couldn't process that right now. ${err.message || ''}<br/>` +
        `You can still build manually using the <strong>Add Node</strong> tab or try describing your patient again.`
      );
    }

    setInput('');
    setAttachments([]);
    setIsLoading(false);
  }, [input, attachments, caraHasGenerated, onGenerateMap, onRefineMap, currentMap]);

  /** Handle file attachment */
  function handleFileSelect(e) {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const dataUrl = evt.target.result;
        const isImage = /^image\//.test(file.type);
        setAttachments((prev) => [
          ...prev,
          {
            name: file.name,
            type: file.type,
            size: file.size,
            kind: isImage ? 'image' : 'other',
            dataUrl: isImage ? dataUrl : null,
            data: dataUrl?.split(',')[1],
          },
        ]);
      };
      if (/^image\//.test(file.type) || file.type === 'application/pdf') {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
    e.target.value = '';
  }

  /** Remove an attachment by index */
  function removeAttachment(idx) {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  }

  /** Handle Enter to send, Shift+Enter for newline */
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3 space-y-2"
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.role === 'user' ? (
              // User message bubble
              <div className="flex justify-end">
                <div
                  className="bg-[#2C5F8D] text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-xs font-semibold max-w-[90%] shadow-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
              </div>
            ) : (
              // CARA message bubble
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px] font-bold flex-none shadow-sm select-none">
                  C
                </div>
                <div
                  className={`rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs leading-relaxed font-semibold
                    ${msg.isThinking
                      ? 'bg-slate-50 text-slate-500 border border-slate-100'
                      : 'bg-slate-100/80 text-slate-700 border border-slate-200/50'
                    }`}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 px-3 py-2 border-t border-slate-200 bg-slate-50">
          {attachments.map((att, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 shadow-sm"
            >
              {att.kind === 'image' && att.dataUrl ? (
                <img src={att.dataUrl} alt="" className="w-5 h-5 rounded object-cover" />
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              )}
              <span className="max-w-[120px] truncate">{att.name}</span>
              <button
                onClick={() => removeAttachment(idx)}
                className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="flex-none px-3 py-3 border-t border-slate-200 bg-slate-50">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your patient..."
              rows={2}
              className="w-full resize-none text-xs font-semibold px-3 py-2.5 pr-20 rounded-xl border
                         bg-white border-slate-200 text-slate-800 placeholder-slate-400
                         focus:outline-none focus:border-[#2C5F8D] focus:ring-1 focus:ring-[#2C5F8D]/30
                         transition-all font-sans"
              disabled={isLoading}
            />

            {/* Input action icons */}
            <div className="absolute right-2 bottom-2 flex items-center gap-0.5">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400
                           hover:text-rose-500 hover:bg-slate-100 transition-all cursor-pointer"
                title="Attach file"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.txt,.md,.csv"
                className="hidden"
                onChange={handleFileSelect}
                multiple
              />
            </div>
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={isLoading || (!input.trim() && attachments.length === 0)}
            className="w-10 h-10 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center
                       transition-all shadow-md shadow-rose-600/10 disabled:opacity-40 disabled:cursor-not-allowed flex-none cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
