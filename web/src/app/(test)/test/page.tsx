"use client";
import { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

export default function CodeEditor() {
  const monaco = useMonaco();
  const [isTSX, setIsTSX] = useState(true);
  const [code, setCode] = useState(
    `const App = () => <div>Hello Monaco!</div>;`
  );

  useEffect(() => {
    if (monaco) {
      // Configure TypeScript compiler options
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        allowNonTsExtensions: true,
        allowJs: true,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        strict: false,
        skipLibCheck: true,
      });

      // Configure JavaScript compiler options
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        allowNonTsExtensions: true,
        allowJs: true,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      });

      // Add React type definitions
      const reactTypes = `
        declare module 'react' {
          export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
            type: T;
            props: P;
            key: Key | null;
          }
          export type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any> | null) | (new (props: P) => Component<P, any>);
          export type Key = string | number;
          export class Component<P = {}, S = {}> {}
          export function createElement<P extends {}>(
            type: string | JSXElementConstructor<P>,
            props?: P | null,
            ...children: ReactNode[]
          ): ReactElement<P>;
          export type ReactNode = ReactElement | string | number | boolean | null | undefined;
        }
        declare global {
          namespace JSX {
            interface Element extends React.ReactElement<any, any> {}
            interface IntrinsicElements {
              [elemName: string]: any;
            }
          }
        }
      `;

      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        reactTypes,
        'ts:react.d.ts'
      );

      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        reactTypes,
        'ts:react.d.ts'
      );

      // Define custom theme
      monaco.editor.defineTheme("myTheme", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "keyword", foreground: "C678DD" },
          { token: "string", foreground: "98C379" },
          { token: "number", foreground: "D19A66" },
          { token: "type", foreground: "61DAFB" },
          { token: "identifier", foreground: "E06C75" },
        ],
        colors: {
          "editor.background": "#16191D",
          "editorLineNumber.foreground": "#ABB2BF",
          "editor.foreground": "#ABB2BF",
        },
      });

      // Set the theme
      monaco.editor.setTheme("myTheme");
    }
  }, [monaco]);

  const handleEditorDidMount = (editor, monaco) => {
    // Additional configuration when editor mounts
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ 
        padding: "10px", 
        background: "#222", 
        color: "#fff",
        borderBottom: "1px solid #444"
      }}>
        <button 
          onClick={() => setIsTSX(!isTSX)}
          style={{
            padding: "8px 16px",
            background: "#0066CC",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Switch to {isTSX ? "JSX" : "TSX"}
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          Current: {isTSX ? "TypeScript React" : "JavaScript React"}
        </span>
      </div>
      <Editor
        height="100%"
        language={isTSX ? "typescript" : "javascript"}
        value={code}
        theme="myTheme"
        onChange={(val) => setCode(val || "")}
        onMount={handleEditorDidMount}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
          glyphMargin: true,
          useTabStops: false,
          fontSize: 14,
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
          tabCompletion: "on",
          wordBasedSuggestions: "matchingDocuments"
        }}
      />
    </div>
  );
}