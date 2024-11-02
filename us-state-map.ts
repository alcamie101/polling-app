import React from 'react';
import { statePopulations } from './state-data-utils';

interface StateMapProps {
  pollData: Array<{
    state: string;
    margin: number;
    sampleSize: number;
  }>;
}

// This would contain the SVG paths for all 50 states
// For brevity, I'm not including all paths here but in practice
// you would want to include detailed SVG paths for each state
const statePathData = {
  'CA': 'M64,176L67,168L67,154L63,148L61,147L58,147L56,146...',
  // ... paths for all other states
};

export const StateMap: React.FC<StateMapProps> = ({ pollData }) => {
  const getStateColor = (stateCode: string) => {
    const stateData = pollData.find(p => p.state === stateCode);
    if (!stateData) return "#CCCCCC";
    
    const intensity = Math.min(Math.abs(stateData.margin) * 8, 100) / 100;
    
    if (stateData.margin > 0) {
      const blue = Math.floor(155 * intensity);
      return `rgb(${200 - blue}, ${200 - blue}, 255)`;
    } else {
      const red = Math.floor(155 * intensity);
      return `rgb(255, ${200 - red}, ${200 - red})`;
    }
  };

  return (
    <svg viewBox="0 0 959 593">
      {Object.entries(statePathData).map(([stateCode, path]) => (
        <path
          key={stateCode}
          d={path}
          fill={getStateColor(stateCode)}
          stroke="#fff"
          strokeWidth="0.5"
          className="hover:opacity-80 cursor-pointer transition-opacity"
          title={`${statePopulations[stateCode].name}: ${
            pollData.find(p => p.state === stateCode)?.margin.toFixed(1)
          }%`}
        />
      ))}
    </svg>
  );
};
