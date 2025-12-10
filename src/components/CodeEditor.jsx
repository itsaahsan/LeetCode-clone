import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, language = 'javascript', fontSize = 14, fontFamily = 'Monaco, Menlo, Ubuntu Mono, monospace' }) => {
  const handleEditorChange = (value) => {
    onChange(value || '');
  };

  const getLanguage = (lang) => {
    const languageMap = {
      javascript: 'javascript',
      python: 'python',
      java: 'java'
    };
    return languageMap[lang] || 'javascript';
  };

  return (
    <div className="h-full editor-container">
      <Editor
        height="100%"
        language={getLanguage(language)}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize,
          fontFamily,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          bracketPairColorization: { enabled: true },
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoIndent: 'full',
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true
          },
          parameterHints: { enabled: true }
        }}
      />
    </div>
  );
};

export default CodeEditor;
