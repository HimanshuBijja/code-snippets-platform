// app/code-examples/page.tsx

import AdvancedCodeHighlighter from '../../components/AdvancedCodeHighlighter';

export default function CodeExamplesPage() {
  const reactCode = `
import { useState, useEffect } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  return (
    <div className="p-6">
      <h1>Todo App</h1>
      <input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a todo..."
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}
`;

  const nextConfigCode = `
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

module.exports = nextConfig;
`;

  const apiRouteCode = `
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newUser: User = {
    id: users.length + 1,
    ...body
  };
  users.push(newUser);
  
  return NextResponse.json(newUser, { status: 201 });
}
`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Code Examples</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">React Component</h2>
          <AdvancedCodeHighlighter 
            code={reactCode}
            language="tsx"
            title="TodoApp.tsx"
            showLineNumbers={true}
            showCopyButton={true}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Next.js Configuration</h2>
          <AdvancedCodeHighlighter 
            code={nextConfigCode}
            language="javascript"
            title="next.config.js"
            showLineNumbers={true}
            showCopyButton={true}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">API Route</h2>
          <AdvancedCodeHighlighter 
            code={apiRouteCode}
            language="typescript"
            title="app/api/users/route.ts"
            showLineNumbers={true}
            showCopyButton={true}
          />
        </section>
      </div>
    </div>
  );
}