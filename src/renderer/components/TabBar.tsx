import React from 'react';
import '../styles/TabBar.css';

export interface FileTab {
  id: string;
  name: string;
  path: string;
  content: string;
  modified: boolean;
  language?: string;
}

interface TabBarProps {
  tabs: FileTab[];
  activeTabId: string | null;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTabId, onTabClick, onTabClose }) => {
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.id === activeTabId ? 'active' : ''} ${tab.modified ? 'modified' : ''}`}
          onClick={() => onTabClick(tab.id)}
        >
          <span className="tab-name">{tab.name}</span>
          <button
            className="tab-close"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            title="Close tab"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
