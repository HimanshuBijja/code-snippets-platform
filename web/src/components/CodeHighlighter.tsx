// components/SyntaxHighlightedEditor.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
import 'prismjs/components/prism-bash';

interface SyntaxHighlightedEditorProps {
  initialCode: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  onCodeChange?: (code: string) => void;
  editable?: boolean;
  className?: string;
}

export default function SyntaxHighlightedEditor({
  initialCode,
  language,
  title,
  showLineNumbers = true,
  onCodeChange,
  editable = true,
  className = ''
}: SyntaxHighlightedEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Highlight code in real-time
  const highlightCode = useCallback((text: string) => {
    if (highlightRef.current) {
      const highlighted = Prism.highlight(
        text + '\n', // Add newline to prevent layout issues
        Prism.languages[language] || Prism.languages.plain,
        language
      );
      highlightRef.current.innerHTML = highlighted;
    }
  }, [language]);

  useEffect(() => {
    if (isEditing) {
      highlightCode(code);
    } else {
      Prism.highlightAll();
    }
  }, [code, isEditing, highlightCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
    if (isEditing) {
      highlightCode(newCode);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = code.length;
      }
    }, 0);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const syncScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      const scrollTop = textareaRef.current.scrollTop;
      const scrollLeft = textareaRef.current.scrollLeft;
      
      if (highlightRef.current.parentElement) {
        highlightRef.current.parentElement.scrollTop = scrollTop;
        highlightRef.current.parentElement.scrollLeft = scrollLeft;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
      handleCodeChange(newValue);
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
      handleCodeChange(text);
    } catch (err) {
      console.error('Failed to paste from clipboard:', err);
    }
  };

  const getLineNumbers = (text: string) => {
    const lines = text.split('\n');
    return lines.map((_, index) => index + 1).join('\n');
  };

  return (
    <div className={`code-block-container ${className}`}>
      <div className="code-header flex justify-between items-center bg-gray-800 text-white px-4 py-2 text-sm">
        <div className="flex items-center gap-2">
          {title && <span className="font-medium">{title}</span>}
          <span className="text-gray-400 text-xs">({language})</span>
          {isEditing && <span className="text-green-400 text-xs">● EDITING</span>}
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

      <div ref={containerRef} className="relative">
        {isEditing ? (
          <div className="relative bg-gray-900">
            {/* Line numbers for editing mode */}
            {showLineNumbers && (
              <div className="absolute left-0 top-0 w-12 bg-gray-800 text-gray-500 text-sm font-mono leading-6 text-right pr-3 pt-4 pb-4 select-none z-10 border-r border-gray-700">
                <pre className="whitespace-pre">{getLineNumbers(code)}</pre>
              </div>
            )}

            {/* Syntax highlighted background */}
            <div 
              className={`absolute top-0 ${showLineNumbers ? 'left-12' : 'left-0'} right-0 pointer-events-none overflow-hidden`}
              style={{ 
                color: 'transparent',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}
            >
              <pre className="p-4 font-mono text-sm leading-6 m-0 overflow-hidden">
                <code 
                  ref={highlightRef}
                  className={`language-${language}`}
                  style={{ 
                    background: 'transparent',
                    color: 'inherit'
                  }}
                />
              </pre>
            </div>

            {/* Transparent textarea overlay */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onScroll={syncScroll}
              onKeyDown={handleKeyDown}
              className={`
                w-full h-64 p-4 bg-transparent text-transparent font-mono text-sm leading-6
                border-none outline-none resize-y relative z-20 caret-white
                ${showLineNumbers ? 'pl-16' : ''}
              `}
              style={{
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, monospace',
                caretColor: '#10b981'
              }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              placeholder=""
            />

            <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
              Press Esc or Ctrl+S to save
            </div>
          </div>
        ) : (
          <pre
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