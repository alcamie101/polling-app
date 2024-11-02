import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { 
  statePopulations, 
  regionalBaselines, 
  calculateStateSampleSize, 
  generateStatePolling 
} from './state-data-utils';
import { StateMap } from './us-state-map';

interface PollData {
  state: string;
  stateName: string;
  region: string;
  sampleSize: number;
  democrat: number;
  republican: number;
  margin: number;
}

const ElectionDashboard = () => {
  const [pollData, setPollData] = useState<PollData[]>([]);

  // Generate polling data for all states
  const generateTestData = () => {
    const statePolls = Object.entries(statePopulations).map(([stateCode, info]) => {
      const { name, population, region } = info;
      const baseline = regionalBaselines[region];
      const { democrat, republican, margin } = generateStatePolling(
        stateCode,
        baseline.demMin,
        baseline.demMax
      );

      return {
        state: stateCode,
        stateName: name,
        region,
        sampleSize: calculateStateSampleSize(population),
        democrat,
        republican,
        margin
      };
    });

    setPollData(statePolls);
  };

  // Calculate regional averages
  const calculateRegionalData = () => {
    return Object.values(regionalBaselines).map(region => {
      const statesInRegion = pollData.filter(poll => poll.region === region);
      const totalSampleSize = statesInRegion.reduce((sum, poll) => sum + poll.sampleSize, 0);
      
      const weightedDem = statesInRegion.reduce((sum, poll) => 
        sum + (poll.democrat * poll.sampleSize), 0) / totalSampleSize;
      
      const weightedRep = statesInRegion.reduce((sum, poll) => 
        sum + (poll.republican * poll.sampleSize), 0) / totalSampleSize;

      return {
        region,
        sampleSize: totalSampleSize,
        democrat: Number(weightedDem.toFixed(1)),
        republican: Number(weightedRep.toFixed(1)),
        margin: Number((weightedDem - weightedRep).toFixed(1))
      };
    });
  };

  // Calculate national average
  const calculateNationalAverage = () => {
    const totalSampleSize = pollData.reduce((sum, poll) => sum + poll.sampleSize, 0);
    
    const weightedDem = pollData.reduce((sum, poll) => 
      sum + (poll.democrat * poll.sampleSize), 0) / totalSampleSize;
    
    const weightedRep = pollData.reduce((sum, poll) => 
      sum + (poll.republican * poll.sampleSize), 0) / totalSampleSize;

    return {
      sampleSize: totalSampleSize,
      democrat: Number(weightedDem.toFixed(1)),
      republican: Number(weightedRep.toFixed(1)),
      margin: Number((weightedDem - weightedRep).toFixed(1))
    };
  };

  const formatMargin = (margin: number): string => {
    return `${margin > 0 ? '+' : ''}${margin.toFixed(1)}%`;
  };

  return (
    <div className="w-full max-w-6xl p-6 space-y-6">
      <button
        onClick={generateTestData}
        className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        <Database className="w-4 h-4" />
        Generate Test Data
      </button>

      {pollData.length > 0 && (
        <>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">State Poll Results</h3>
            <StateMap pollData={pollData} />
          </div>

          <div className="mt-8 space-y-8">
            {/* State Results */}
            <div>
              <h4 className="text-lg font-semibold mb-4">State-by-State Results</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">State</th>
                      <th className="p-2 text-left">Region</th>
                      <th className="p-2 text-right">Sample Size</th>
                      <th className="p-2 text-right">Democrat</th>
                      <th className="p-2 text-right">Republican</th>
                      <th className="p-2 text-right">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pollData
                      .sort((a, b) => b.margin - a.margin)
                      .map((poll) => (
                        <tr key={poll.state} className="border-t">
                          <td className="p-2"