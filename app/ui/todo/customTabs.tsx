"use client";

import { useState } from 'react';

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export default function CustomTabs({ tabs, defaultTab }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  if (!tabs.length) return null;

  return (
    <div className="flex flex-col w-full">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}