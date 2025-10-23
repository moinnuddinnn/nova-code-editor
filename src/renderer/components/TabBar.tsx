import React from 'react';
import { FileTab } from '../App';
import '../styles/TabBar.css';

interface TabBarProps {
  tabs: FileTab[];
  activeTabId: string | null;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
}: TabBarProps) => {
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
    e.stopPropagation();
    onTabClose(tabId);
  };

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.id === activeTabId ? 'active' : ''} ${
            tab.modified ? 'modified' : ''
          }`}
          onClick={() => onTabClick(tab.id)}
        >
          <span className="tab-name">
            {tab.name}
            {tab.modified && <span className="modified-indicator">●</span>}
          </span>
          <button
            className="tab-close"
            onClick={(e) => handleClose(e, tab.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabBar;

