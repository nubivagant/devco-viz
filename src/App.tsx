import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const DevelopmentCorporationPreview = () => {
  // Individual complexity sliders for each specialist skill
  const [planningComplexity, setPlanningComplexity] = useState(5);
  const [landAssemblyComplexity, setLandAssemblyComplexity] = useState(5);
  const [developmentComplexity, setDevelopmentComplexity] = useState(5);
  
  // Overall project scale
  const [scale, setScale] = useState(5);
  
  // Editable staffing thresholds
  const [thresholds, setThresholds] = useState({
    feasibility: 15,
    interimVehicle: 35,
    deliveryPhase: 90
  });
  
  // State for chart data that will be dynamically updated
  const [chartData, setChartData] = useState([]);
  
  // Define the phases with their timing
  const phases = [
    { name: "Feasibility", start: 0, end: 18 },
    { name: "Interim Vehicle", start: 18, end: 36 },
    { name: "Delivery Phase", start: 36, end: 240 },
    { name: "Wind Down", start: 240, end: 300 }
  ];

  // Handle threshold changes
  const handleThresholdChange = (phase, value) => {
    setThresholds(prev => ({
      ...prev,
      [phase]: parseInt(value)
    }));
  };

  // Calculate chart data based on complexity and scale inputs
  useEffect(() => {
    // Generate data points for each year (0 to 25)
    const years = [0, 1, 2, 3, 5, 10, 15, 20, 25];
    
    const newData = years.map(year => {
      // Base values that get modified by complexity and scale
      let planningBase = 0;
      let landAssemblyBase = 0;
      let developmentBase = 0;
      let corporateServicesBase = 0;
      
      // Calculate phase-specific staffing based on thresholds
      if (year * 12 < phases[1].start) {
        // Feasibility phase
        planningBase = 5;
        landAssemblyBase = 2;
        developmentBase = 1;
        corporateServicesBase = 4;
      } else if (year * 12 < phases[2].start) {
        // Interim Vehicle phase
        planningBase = 6;
        landAssemblyBase = 4;
        developmentBase = 3;
        corporateServicesBase = 7;
      } else if (year * 12 < phases[3].start) {
        // Delivery Phase
        // Peak somewhere in the middle
        const phasePosition = (year * 12 - phases[2].start) / (phases[3].start - phases[2].start);
        const peakFactor = phasePosition < 0.3 ? phasePosition / 0.3 : (1 - phasePosition) / 0.7;
        
        planningBase = 8 + 4 * peakFactor;
        landAssemblyBase = 6 + 8 * peakFactor;
        developmentBase = 10 + 14 * peakFactor;
        corporateServicesBase = 15 + 6 * peakFactor;
      } else {
        // Wind Down phase
        const phasePosition = (year * 12 - phases[3].start) / (phases[3].end - phases[3].start);
        const windDownFactor = 1 - phasePosition;
        
        planningBase = 8 * windDownFactor;
        landAssemblyBase = 4 * windDownFactor;
        developmentBase = 8 * windDownFactor;
        corporateServicesBase = 10 * windDownFactor;
      }
      
      // Apply complexity and scale modifiers
      const planningSkills = Math.round(planningBase * (0.7 + planningComplexity / 10) * (0.7 + scale / 10));
      const landAssemblySkills = Math.round(landAssemblyBase * (0.7 + landAssemblyComplexity / 10) * (0.7 + scale / 10));
      const developmentSkills = Math.round(developmentBase * (0.7 + developmentComplexity / 10) * (0.7 + scale / 10));
      const corporateServices = Math.round(corporateServicesBase * (0.7 + (planningComplexity + landAssemblyComplexity + developmentComplexity) / 30) * (0.7 + scale / 10));
      
      const total = planningSkills + landAssemblySkills + developmentSkills + corporateServices;
      
      return {
        year,
        planningSkills,
        landAssemblySkills,
        developmentSkills,
        corporateServices,
        total
      };
    });
    
    setChartData(newData);
  }, [planningComplexity, landAssemblyComplexity, developmentComplexity, scale, thresholds]);

  // Calculate phase reference lines for the chart
  const phaseReferenceLines = phases.map(phase => ({
    x: phase.start / 12, // Convert months to years
    label: phase.name
  }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold text-gray-800">Year {label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value} staff
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Development Corporation Resource Requirements</h2>
      
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-purple-700">Complexity & Scale Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium mb-4 text-gray-800">Specialist Skills Complexity</h4>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-800">Planning Complexity: {planningComplexity}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={planningComplexity}
                onChange={(e) => setPlanningComplexity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-600">
                <span>Simple</span>
                <span>Complex</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-800">Land Assembly Complexity: {landAssemblyComplexity}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={landAssemblyComplexity}
                onChange={(e) => setLandAssemblyComplexity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-600">
                <span>Simple</span>
                <span>Complex</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-800">Development Complexity: {developmentComplexity}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={developmentComplexity}
                onChange={(e) => setDevelopmentComplexity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-600">
                <span>Simple</span>
                <span>Complex</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-gray-800">Project Scale & Thresholds</h4>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-800">Project Scale: {scale}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-600">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-gray-800">Staffing Thresholds</h4>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-800">Feasibility</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={thresholds.feasibility}
                    onChange={(e) => handleThresholdChange('feasibility', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1 text-gray-800">Interim Vehicle</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={thresholds.interimVehicle}
                    onChange={(e) => handleThresholdChange('interimVehicle', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1 text-gray-800">Delivery Phase</label>
                  <input
                    type="number"
                    min="20"
                    max="200"
                    value={thresholds.deliveryPhase}
                    onChange={(e) => handleThresholdChange('deliveryPhase', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 bg-white p-4 border border-gray-200 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-purple-700">Staffing Requirements Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Years', position: 'bottom', offset: 0 }} 
            />
            <YAxis 
              label={{ value: 'Staff Count', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Phase transition lines */}
            {phaseReferenceLines.map((line, index) => (
              <ReferenceLine
                key={index}
                x={line.x}
                stroke="#8884d8"
                strokeDasharray="3 3"
                label={{ value: line.label, position: 'top', fill: '#8884d8' }}
              />
            ))}
            
            {/* Threshold reference line */}
            <ReferenceLine y={thresholds.feasibility} stroke="#FF5733" strokeDasharray="3 3" 
              label={{ value: 'Feasibility Threshold', position: 'left', fill: '#FF5733' }} />
            <ReferenceLine y={thresholds.interimVehicle} stroke="#33A8FF" strokeDasharray="3 3" 
              label={{ value: 'Interim Vehicle Threshold', position: 'right', fill: '#33A8FF' }} />
            <ReferenceLine y={thresholds.deliveryPhase} stroke="#33FF57" strokeDasharray="3 3" 
              label={{ value: 'Delivery Phase Threshold', position: 'left', fill: '#33FF57' }} />
            
            <Line 
              type="monotone" 
              dataKey="planningSkills" 
              stroke="#8884d8" 
              name="Planning Skills"
              strokeWidth={2} 
            />
            <Line 
              type="monotone" 
              dataKey="landAssemblySkills" 
              stroke="#82ca9d" 
              name="Land Assembly Skills"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="developmentSkills" 
              stroke="#ffc658" 
              name="Development Skills"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="corporateServices" 
              stroke="#8dd1e1" 
              name="Corporate Services"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#ff7300" 
              name="Total Staff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {phases.map((phase, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg border-l-4 border-purple-700">
            <p className="font-semibold text-purple-700 mb-2">{phase.name}</p>
            <p className="text-sm text-gray-600">Months {phase.start}-{phase.end}</p>
            <p className="text-sm text-gray-600">({(phase.start/12).toFixed(1)}-{(phase.end/12).toFixed(1)} years)</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Specialist Skills Breakdown</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              <strong>Planning:</strong> Urban planning, community engagement, master planning
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <strong>Land Assembly:</strong> Site acquisition, remediation, legal/property expertise
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <strong>Development:</strong> Project management, construction oversight, design
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Corporate Services</h3>
          <p className="text-gray-700 mb-3">Supporting functions that enable the delivery of specialist work:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Finance, HR, Legal, Communications, IT, Administration
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Scales with project complexity and size
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Maintained at reduced level during wind-down phase
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">About This Model</h3>
        <p className="text-gray-700 mb-4">This visualization models staffing requirements across development phases:</p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-purple-700 rounded-full mr-2"></span>
            Feasibility phase maintains lean teams (≤{thresholds.feasibility} staff)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-purple-700 rounded-full mr-2"></span>
            Interim vehicle grows to {thresholds.interimVehicle} staff based on complexity/scale
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-purple-700 rounded-full mr-2"></span>
            Delivery phase averages around {Math.round(thresholds.deliveryPhase * 0.8)} staff at typical complexity/scale
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-purple-700 rounded-full mr-2"></span>
            Smooth transitions between phases prevent abrupt staffing changes
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-purple-700 rounded-full mr-2"></span>
            Wind down phase maintains core capabilities while reducing staff
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DevelopmentCorporationPreview;