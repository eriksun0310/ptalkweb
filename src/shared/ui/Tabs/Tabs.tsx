'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={clsx('border-b border-gray-200', className)}>
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={clsx(
                'flex-1 py-3 text-base font-medium transition-colors relative',
                isActive
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.label}
              {/* 底部指示線 */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
