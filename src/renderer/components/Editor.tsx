import React, { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import '../styles/Editor.css';

interface EditorProps {
  content: string;
  language: string;
  onChange: (value: string | undefined) => void;
}

const Editor: React.FC<EditorProps> = ({ content, language, onChange }: EditorProps) => {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    try {
      editorRef.current = editor;
      
      // Ensure the editor has proper dimensions
      const ensureLayout = () => {
        if (editor && editor.layout) {
          try {
            editor.layout();
          } catch (error) {
            console.warn('Monaco Editor layout error:', error);
          }
        }
      };

      // Initial layout with multiple attempts
      setTimeout(ensureLayout, 0);
      setTimeout(ensureLayout, 100);
      setTimeout(ensureLayout, 500);

      // Set up resize observer for the container
      if (containerRef.current && window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
          setTimeout(ensureLayout, 0);
        });
        resizeObserver.observe(containerRef.current);
        
        // Cleanup function
        return () => {
          resizeObserver.disconnect();
        };
      }
    } catch (error) {
      console.error('Error mounting Monaco Editor:', error);
    }
  };

  useEffect(() => {
    // Force layout update when component mounts or updates
    if (editorRef.current) {
      const ensureLayout = () => {
        if (editorRef.current && editorRef.current.layout) {
          try {
            editorRef.current.layout();
          } catch (error) {
            console.warn('Monaco Editor layout error:', error);
          }
        }
      };
      setTimeout(ensureLayout, 100);
    }
  }, [content, language]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current && editorRef.current.layout) {
        try {
          editorRef.current.layout();
        } catch (error) {
          console.warn('Monaco Editor layout error:', error);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="monaco-editor-wrapper" ref={containerRef}>
      <MonacoEditor
        height="100%"
        language={language}
        value={content}
        theme="vs-dark"
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: 'Consolas, "Courier New", monospace',
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        }}
      />
    </div>
  );
};

export default Editor;

