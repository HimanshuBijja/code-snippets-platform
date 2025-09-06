// components/ServerCodeBlock.tsx
import ClientCodeHighlighter from './ClientCodeHighlighter';

interface ServerCodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

// Server component that passes props to client component
export default function ServerCodeBlock({ 
  code, 
  language, 
  title, 
  showLineNumbers = true 
}: ServerCodeBlockProps) {
  return (
    <ClientCodeHighlighter
      code={code}
      language={language}
      title={title}
      showLineNumbers={showLineNumbers}
    />
  );
}