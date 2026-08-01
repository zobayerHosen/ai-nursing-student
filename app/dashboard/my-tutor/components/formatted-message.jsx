"use client";

import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders markdown-formatted AI tutor responses with rich,
 * readable typography and styled elements.
 *
 * Supports: headings, bold/italic, lists, tables, code blocks,
 * blockquotes, horizontal rules, and links.
 */
function FormattedMessage({ content, isUser = false }) {
  if (!content) return null;

  // For user messages, render plain text (no markdown parsing needed)
  if (isUser) {
    return <span>{content}</span>;
  }

  return (
    <div className="formatted-message">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h3 className="text-base font-bold text-gray-900 mt-4 mb-2 pb-1.5 border-b border-gray-200 first:mt-0">
              {children}
            </h3>
          ),
          h2: ({ children }) => (
            <h4 className="text-sm font-bold text-gray-900 mt-3.5 mb-1.5 pb-1 border-b border-gray-100 first:mt-0">
              {children}
            </h4>
          ),
          h3: ({ children }) => (
            <h5 className="text-sm font-semibold text-primary mt-3 mb-1.5 first:mt-0">
              {children}
            </h5>
          ),
          h4: ({ children }) => (
            <h6 className="text-sm font-semibold text-gray-700 mt-2.5 mb-1 first:mt-0">
              {children}
            </h6>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="text-sm leading-relaxed text-gray-700 mb-2 last:mb-0">
              {children}
            </p>
          ),

          // Bold & Italic
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-600">{children}</em>
          ),

          // Unordered lists
          ul: ({ children }) => (
            <ul className="my-2 space-y-1 list-none pl-0">{children}</ul>
          ),

          // Ordered lists
          ol: ({ children }) => (
            <ol className="my-2 space-y-1.5 list-none pl-0 counter-reset-list">
              {children}
            </ol>
          ),

          // List items
          li: ({ children, ordered, index }) => (
            <li className="flex gap-2 text-sm text-gray-700 leading-relaxed">
              <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="flex-1">{children}</span>
            </li>
          ),

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="my-2.5 pl-3 border-l-3 border-primary/40 bg-primary/5 rounded-r-lg py-2 pr-3">
              {children}
            </blockquote>
          ),

          // Inline code
          code: ({ inline, className, children }) => {
            if (inline) {
              return (
                <code className="bg-gray-100 text-primary font-mono text-xs px-1.5 py-0.5 rounded-md border border-gray-200">
                  {children}
                </code>
              );
            }
            return (
              <pre className="my-2.5 bg-gray-900 text-gray-100 rounded-xl p-3.5 overflow-x-auto text-xs leading-relaxed">
                <code className={className}>{children}</code>
              </pre>
            );
          },

          // Tables
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-xs">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 border-b border-gray-200">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-gray-600 border-t border-gray-100">
              {children}
            </td>
          ),

          // Horizontal rule
          hr: () => <hr className="my-3 border-gray-200" />,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default memo(FormattedMessage);
