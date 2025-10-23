import React from 'react';
import '../styles/StatusBar.css';

interface StatusBarProps {
  activeFile?: string;
  language?: string;
  modified?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({
  activeFile,
  language,
  modified,
}: StatusBarProps) => {
  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="status-item">
          {activeFile || 'No file open'}
        </span>
        {modified && (
          <span className="status-item modified">● Modified</span>
        )}
      </div>
      <div className="status-right">
        {language && (
          <span className="status-item language">{language}</span>
        )}
        <span className="status-item">UTF-8</span>
        <span className="status-item">LF</span>
      </div>
    </div>
  );
};

export default StatusBar;

