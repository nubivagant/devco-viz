import React, { useState, useEffect } from 'react';

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

  // Sample data for the chart
  const sampleData = [
    { year: 0, planningSkills: 5, landAssemblySkills: 2, developmentSkills: 1, corporateServices: 4, total: 12 },
    { year: 1, planningSkills: 6, landAssemblySkills: 4, developmentSkills: 3, corporateServices: 7, total: 20 },
    { year: 2, planningSkills: 7, landAssemblySkills: 8, developmentSkills: 7, corporateServices: 12, total: 34 },
    { year: 3, planningSkills: 10, landAssemblySkills: 12, developmentSkills: 15, corporateServices: 18, total: 55 },
    { year: 5, planningSkills: 12, landAssemblySkills: 14, developmentSkills: 24, corporateServices: 21, total: 71 },
    { year: 10, planningSkills: 10, landAssemblySkills: 8, developmentSkills: 21, corporateServices: 18, total: 57 },
    { year: 15, planningSkills: 10, landAssemblySkills: 6, developmentSkills: 19, corporateServices: 17, total: 52 },
    { year: 20, planningSkills: 8, landAssemblySkills: 4, developmentSkills: 16, corporateServices: 15, total: 43 },
    { year: 25, planningSkills: 4, landAssemblySkills: 1, developmentSkills: 6, corporateServices: 6, total: 17 }
  ];

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

  // Simple chart component
  const SimpleChart = () => {
    return (
      <div className="relative h-64 w-full border border-gray-300 rounded p-4 bg-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl text-gray-400 mb-2">Chart Preview</div>
            <div className="flex space-x-4 justify-center">
              <div className="h-4 w-4 bg-purple-500 rounded-full"></div>
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
              <div className="h-4 w-4 bg-blue-400 rounded-full"></div>
              <div className="h-4 w-4 bg-red-500 rounded-full"></div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Interactive chart would display here with staffing projections
            </div>
          </div>
        </div>
      </div>
    );
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

      <div className="mb-8">
        <SimpleChart />
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
