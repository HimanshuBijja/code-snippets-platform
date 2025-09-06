// components/ClientCodeHighlighter.tsx
'use client';

import { useEffect } from 'react';
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

interface ClientCodeHighlighterProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function ClientCodeHighlighter({ 
  code, 
  language, 
  title, 
  showLineNumbers = true,
  className = '' 
}: ClientCodeHighlighterProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className={`code-block-container ${className}`}>
      {title && (
        <div className="code-header bg-gray-800 text-white px-4 py-2 text-sm font-medium border-b border-gray-700">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className={`language-${language} ${showLineNumbers ? 'line-numbers' : ''} !mt-0 !mb-0`}>
          <code className={`language-${language}`}>
            {code.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
}