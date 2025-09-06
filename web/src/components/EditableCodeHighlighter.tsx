// components/EditableCodeHighlighter.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Import theme
import 'prismjs/themes/prism-tomorrow.css';

// Import plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

// Import languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';

interface EditableCodeHighlighterProps {
  initialCode: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  onCodeChange?: (code: string) => void;
  editable?: boolean;
  className?: string;
}

export default function EditableCodeHighlighter({
  initialCode,
  language,
  title,
  showLineNumbers = true,
  onCodeChange,
  editable = true,
  className = ''
}: EditableCodeHighlighterProps) {
  const [code, setCode] = useState(initialCode);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!isEditing) {
      Prism.highlightAll();
    }
  }, [code, isEditing]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setIsEditing(false);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
      handleCodeChange(text);
    } catch (err) {
      console.error('Failed to paste from clipboard:', err);
    }
  };

  return (
    <div className={`code-block-container ${className}`}>
      <div className="code-header flex justify-between items-center bg-gray-800 text-white px-4 py-2 text-sm">
        <div className="flex items-center gap-2">
          {title && <span className="font-medium">{title}</span>}
          <span className="text-gray-400 text-xs">({language})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          
          <button
            onClick={pasteFromClipboard}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
          >
            📥 Paste
          </button>
          
          {editable && (
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs transition-colors"
            >
              {isEditing ? '💾 Save' : '✏️ Edit'}
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        {isEditing ? (
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`
                w-full h-64 p-4 bg-gray-900 text-gray-100 font-mono text-sm
                border-none outline-none resize-y
                ${showLineNumbers ? 'pl-12' : ''}
              `}
              style={{
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                lineHeight: '1.5',
                tabSize: 2
              }}
              placeholder="Paste or type your code here..."
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              Press Esc or Ctrl+S to save
            </div>
            {showLineNumbers && (
              <div className="absolute left-2 top-4 text-gray-500 text-sm font-mono leading-6 pointer-events-none">
                {code.split('\n').map((_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <pre
            ref={preRef}
            className={`
              language-${language} 
              ${showLineNumbers ? 'line-numbers' : ''} 
              !mt-0 !mb-0 overflow-x-auto
            `}
            style={{ minHeight: '100px' }}
          >
            <code className={`language-${language}`}>
              {code.trim() || '// Your code will appear here...'}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}