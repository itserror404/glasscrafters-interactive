
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FeaturePanelProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeaturePanel: React.FC<FeaturePanelProps> = ({ title, description, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`modern-panel transition-all duration-300 ${isExpanded ? 'scale-[1.02]' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-center cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="text-white">
            {icon}
          </div>
          <h3 className="font-medium text-lg text-white">{title}</h3>
        </div>
        <button className="text-white/70 hover:text-white">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'mt-4 max-h-96' : 'max-h-0'}`}>
        <p className="text-white/80">{description}</p>
      </div>
    </div>
  );
};

export default FeaturePanel;
