import React, { useState, useEffect } from 'react';
import '../styles/FileExplorer.css';

const { ipcRenderer } = (window as any).require('electron');

interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  expanded?: boolean;
  children?: FileItem[];
}

interface FileExplorerProps {
  workspaceFolder: string | null;
  onFileSelect: (path: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  workspaceFolder,
  onFileSelect,
}: FileExplorerProps) => {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    if (workspaceFolder) {
      loadDirectory(workspaceFolder);
    }
  }, [workspaceFolder]);

  const loadDirectory = async (dirPath: string) => {
    try {
      const result = await ipcRenderer.invoke('read-directory', dirPath);
      if (result.success) {
        setFiles(result.items);
      } else {
        console.error('Failed to load directory:', result.error);
      }
    } catch (error) {
      console.error('Error loading directory:', error);
    }
  };

  const toggleDirectory = async (item: FileItem, index: number) => {
    if (!item.isDirectory) {
      try {
        onFileSelect(item.path);
      } catch (error) {
        console.error('Error selecting file:', error);
      }
      return;
    }

    try {
      const newFiles = [...files];
      if (item.expanded) {
        newFiles[index] = { ...item, expanded: false, children: [] };
      } else {
        const result = await ipcRenderer.invoke('read-directory', item.path);
        if (result.success) {
          newFiles[index] = {
            ...item,
            expanded: true,
            children: result.items,
          };
        } else {
          console.error('Failed to load directory:', result.error);
        }
      }
      setFiles(newFiles);
    } catch (error) {
      console.error('Error toggling directory:', error);
    }
  };

  const renderFileTree = (items: FileItem[], level: number = 0) => {
    return items.map((item, index) => (
      <div key={item.path}>
        <div
          className={`file-item ${item.isDirectory ? 'directory' : 'file'}`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => toggleDirectory(item, index)}
        >
          <span className="icon">
            {item.isDirectory ? (item.expanded ? '📂' : '📁') : '📄'}
          </span>
          <span className="name">{item.name}</span>
        </div>
        {item.expanded && item.children && (
          <div className="children">
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <h3>Explorer</h3>
      </div>
      <div className="explorer-content">
        {workspaceFolder ? (
          <div className="file-tree">
            <div className="workspace-folder">
              {workspaceFolder.split(/[\\/]/).pop()}
            </div>
            {renderFileTree(files)}
          </div>
        ) : (
          <div className="no-folder">
            <p>No folder opened</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;

