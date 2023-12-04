import React, { useState } from "react";

import "./style.scss";

interface Params {
  data: any,
  onTabChange: any
}

const SwitchTabs = ({ data, onTabChange }: Params) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab: string, index: number) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switching-tabs">
      <div className="tab-items">
        {data.map((tab: string, index: number) => (
          <span
            key={index}
            className={`tab-item ${selectedTab === index ? "active" : ""}`}
            onClick={(e) => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="moving-bg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;