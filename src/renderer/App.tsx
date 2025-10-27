import React, { useState, useEffect } from 'react';
import FileExplorer from './components/FileExplorer';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import StatusBar from './components/StatusBar';
import TabBar from './components/TabBar';
import './styles/App.css';

const { ipcRenderer } = (window as any).require('electron');

export interface FileTab {
  id: string;
  name: string;
  path: string;
  content: string;
  modified: boolean;
  language?: string;
}

const App: React.FC = () => {
  const [tabs, setTabs] = useState<FileTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [workspaceFolder, setWorkspaceFolder] = useState<string | null>(null);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showExplorer, setShowExplorer] = useState(true);

  useEffect(() => {
    //llisten for file open events from main process
    const handleFileOpened = (_event: any, fileData: any) => {
      openFile(fileData.path, fileData.name, fileData.content);
    };

    const handleFolderOpened = (_event: any, folderPath: string) => {
      setWorkspaceFolder(folderPath);
    };

    const handleSaveFile = () => {
      saveCurrentFile();
    };

    ipcRenderer.on('file-opened', handleFileOpened);
    ipcRenderer.on('folder-opened', handleFolderOpened);
    ipcRenderer.on('save-file', handleSaveFile);

    return () => {
      ipcRenderer.removeListener('file-opened', handleFileOpened);
      ipcRenderer.removeListener('folder-opened', handleFolderOpened);
      ipcRenderer.removeListener('save-file', handleSaveFile);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs, activeTabId]);

  const getLanguageFromPath = (filePath: string): string => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      html: 'html',
      css: 'css',
      scss: 'scss',
      json: 'json',
      md: 'markdown',
      xml: 'xml',
      yaml: 'yaml',
      yml: 'yaml',
      sh: 'shell',
      cpp: 'cpp',
      c: 'c',
      java: 'java',
      go: 'go',
      rs: 'rust',
      php: 'php',
      rb: 'ruby',
      sql: 'sql',
    };
    return languageMap[ext || ''] || 'plaintext';
  };

  const openFile = (path: string, name: string, content: string) => {
    // Check if file is already open
    const existingTab = tabs.find((tab) => tab.path === path);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    const newTab: FileTab = {
      id: Math.random().toString(36).substring(7),
      name,
      path,
      content,
      modified: false,
      language: getLanguageFromPath(path),
    };

    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (tabId: string) => {
    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      if (newTabs.length > 0) {
        const newActiveIndex = Math.max(0, tabIndex - 1);
        setActiveTabId(newTabs[newActiveIndex].id);
      } else {
        setActiveTabId(null);
      }
    }
  };

  const updateTabContent = (tabId: string, content: string) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId
          ? { ...tab, content, modified: true }
          : tab
      )
    );
  };

  const saveCurrentFile = async () => {
    if (!activeTabId) return;

    const tab = tabs.find((t) => t.id === activeTabId);
    if (!tab) return;

    const result = await ipcRenderer.invoke('write-file', tab.path, tab.content);
    if (result.success) {
      setTabs(
        tabs.map((t) =>
          t.id === activeTabId ? { ...t, modified: false } : t
        )
      );
    }
  };

  const handleFileSelect = async (filePath: string) => {
    const result = await ipcRenderer.invoke('read-file', filePath);
    if (result.success) {
      const fileName = filePath.split(/[\\/]/).pop() || 'untitled';
      openFile(filePath, fileName, result.content);
    }
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="app">
      <div className="main-container">
        {showExplorer && (
          <div className="sidebar">
            <FileExplorer
              workspaceFolder={workspaceFolder}
              onFileSelect={handleFileSelect}
            />
          </div>
        )}
        <div className="editor-container">
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onTabClick={setActiveTabId}
            onTabClose={closeTab}
          />
          <div className="editor-wrapper">
            {activeTab ? (
              <Editor
                content={activeTab.content}
                language={activeTab.language || 'plaintext'}
                onChange={(value) => updateTabContent(activeTab.id, value || '')}
              />
            ) : (
              <div className="welcome-screen">
                <h1>Nova Editor</h1>
                <p>A modern code editor</p>
                <div className="welcome-actions">
                  <button onClick={() => ipcRenderer.send('open-file')}>
                    Open File
                  </button>
                  <button onClick={() => ipcRenderer.send('open-folder')}>
                    Open Folder
                  </button>
                </div>
              </div>
            )}
          </div>
            {showTerminal && (
            <div className="terminal-wrapper">
              <Terminal workingDirectory={workspaceFolder || ''} />
            </div>
          )}
        </div>
      </div>
      <StatusBar
        activeFile={activeTab?.name}
        language={activeTab?.language}
        modified={activeTab?.modified}
      />
    </div>
  );
};

export default App;

