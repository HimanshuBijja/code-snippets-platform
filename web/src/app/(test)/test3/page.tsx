// app/enhanced-editor/page.tsx
'use client';

import SyntaxHighlightedEditor from '@/components/CodeHighlighter';
import { useState } from 'react';

export default function EnhancedEditorPage() {
  const [reactCode, setReactCode] = useState(`import React, { useState, useEffect } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a todo..."
          className="border p-2 flex-1"
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li 
            key={todo.id}
            className="flex items-center gap-2"
          >
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'line-through' : ''}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;`);

  const [pythonCode, setPythonCode] = useState(`# Python Data Analysis Example
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def analyze_data(filename):
    """
    Analyze data from a CSV file and create visualizations
    """
    # Load the data
    try:
        df = pd.read_csv(filename)
        print(f"Loaded {len(df)} records from {filename}")
    except FileNotFoundError:
        print(f"File {filename} not found!")
        return None
    
    # Basic statistics
    print("\\nDataset Info:")
    print(f"Shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")
    
    # Handle missing values
    if df.isnull().sum().sum() > 0:
        print("\\nMissing values found:")
        print(df.isnull().sum())
        df = df.fillna(df.mean(numeric_only=True))
    
    # Generate summary statistics
    summary = df.describe()
    print("\\nSummary Statistics:")
    print(summary)
    
    # Create visualizations
    numeric_columns = df.select_dtypes(include=[np.number]).columns
    
    if len(numeric_columns) >= 2:
        plt.figure(figsize=(12, 8))
        
        # Correlation heatmap
        plt.subplot(2, 2, 1)
        correlation_matrix = df[numeric_columns].corr()
        plt.imshow(correlation_matrix, cmap='coolwarm', aspect='auto')
        plt.title('Correlation Matrix')
        plt.colorbar()
        
        # Histogram of first numeric column
        plt.subplot(2, 2, 2)
        plt.hist(df[numeric_columns[0]], bins=20, alpha=0.7)
        plt.title(f'Distribution of {numeric_columns[0]}')
        plt.xlabel(numeric_columns[0])
        plt.ylabel('Frequency')
        
        # Scatter plot if we have at least 2 numeric columns
        plt.subplot(2, 2, 3)
        plt.scatter(df[numeric_columns[0]], df[numeric_columns[1]], alpha=0.6)
        plt.xlabel(numeric_columns[0])
        plt.ylabel(numeric_columns[1])
        plt.title('Scatter Plot')
        
        # Box plot
        plt.subplot(2, 2, 4)
        df[numeric_columns[:3]].boxplot()
        plt.title('Box Plot')
        plt.xticks(rotation=45)
        
        plt.tight_layout()
        plt.show()
    
    return df

# Usage example
if __name__ == "__main__":
    # Example usage
    data = analyze_data("sample_data.csv")
    
    if data is not None:
        print("\\nFirst 5 rows:")
        print(data.head())
        
        # Additional analysis
        print("\\nData types:")
        print(data.dtypes)`);

  const [cssCode, setCssCode] = useState(`/* Modern CSS Grid Layout with Dark Theme */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1f2937;
  --accent-color: #10b981;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --border-color: #374151;
  --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Grid Layout System */
.grid {
  display: grid;
  gap: 2rem;
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}

/* Card Component */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.card-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--border-color);
}

/* Animated gradient background */
.gradient-bg {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--accent-color),
    #8b5cf6
  );
  background-size: 200% 200%;
  animation: gradientShift 6s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Loading animation */
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}`);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Syntax Highlighted Editor</h1>
      
      <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
        <h2 className="font-semibold mb-2">✨ New Features:</h2>
        <ul className="text-sm space-y-1">
          <li>• <strong>Real-time syntax highlighting</strong> while editing</li>
          <li>• Transparent textarea overlay with colored background</li>
          <li>• Line numbers in edit mode</li>
          <li>• Green cursor for better visibility</li>
          <li>• Synchronized scrolling between layers</li>
        </ul>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">React/TypeScript Component</h2>
          <SyntaxHighlightedEditor
            initialCode={reactCode}
            language="tsx"
            title="TodoApp.tsx"
            showLineNumbers={true}
            onCodeChange={setReactCode}
            editable={true}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Python Data Analysis</h2>
          <SyntaxHighlightedEditor
            initialCode={pythonCode}
            language="python"
            title="data_analysis.py"
            showLineNumbers={true}
            onCodeChange={setPythonCode}
            editable={true}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Modern CSS</h2>
          <SyntaxHighlightedEditor
            initialCode={cssCode}
            language="css"
            title="styles.css"
            showLineNumbers={true}
            onCodeChange={setCssCode}
            editable={true}
          />
        </section>
      </div>
    </div>
  );
}