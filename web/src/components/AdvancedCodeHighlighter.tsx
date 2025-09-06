// components/AdvancedCodeHighlighter.tsx
'use client'; // Required for App Router

import { useEffect, useState } from 'react';
import Prism from 'prismjs';

// Import theme
import 'prismjs/themes/prism-tomorrow.css';

// Import plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

// Import languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

interface AdvancedCodeHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  title?: string;
  className?: string;
}

const AdvancedCodeHighlighter: React.FC<AdvancedCodeHighlighterProps> = ({
  code,
  language,
  showLineNumbers = true,
  showCopyButton = true,
  title,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={`code-block-container ${className}`}>
      {(title || showCopyButton) && (
        <div className="code-header flex justify-between items-center bg-gray-800 text-white px-4 py-2 text-sm">
          {title && <span className="font-medium">{title}</span>}
          {showCopyButton && (
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
      
      <div className="relative">
        <pre 
          className={`
            ${showLineNumbers ? 'line-numbers' : ''} 
            language-${language}
            !mt-0 !mb-0 overflow-x-auto
          `}
        >
          <code className={`language-${language}`}>
            {code.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AdvancedCodeHighlighter;