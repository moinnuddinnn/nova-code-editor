import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import '../styles/Editor.css';

interface EditorProps {
  content: string;
  language: string;
  onChange: (value: string | undefined) => void;
}

const Editor: React.FC<EditorProps> = ({ content, language, onChange }: EditorProps) => {
  return (
    <div className="monaco-editor-wrapper">
      <MonacoEditor
        height="100%"
        language={language}
        value={content}
        theme="vs-dark"
        onChange={onChange}
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

