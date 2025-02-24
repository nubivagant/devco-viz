import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DevelopmentCorporationVisualization = () => {
  const [complexity, setComplexity] = useState(5);
  const [scale, setScale] = useState(5);
  const [data, setData] = useState([]);
  
  // Define the phases with their timing
  const phases = [
    { name: "Feasibility", start: 0, end: 18 },
    { name: "Interim Vehicle", start: 18, end: 36 },
    { name: "Delivery Phase", start: 36, end: 240 },
    { name: "Wind Down", start: 240, end: 300 }
  ];
  
  // Function implementations remain the same...
  const calculateSpecialistSkills = (complexity, scale, phase, progressFactor = 1) => {
    // ... (keeping the existing implementation)
    let baseSkills = 0;
    
    if (phase === "Feasibility") {
      baseSkills = 5;
      if (complexity <= 3) {
        baseSkills += complexity * 0.5;
      } else if (complexity <= 7) {
        baseSkills += 1.5 + (complexity - 3) * 0.8;
      } else {
        baseSkills += 4.7 + (complexity - 7) * 1;
      }
      baseSkills += scale * 0.2;
    } else if (phase === "Interim Vehicle") {
      baseSkills = 10;
      if (complexity <= 4) {
        baseSkills += complexity * 1.2;
      } else if (complexity <= 8) {
        baseSkills += 4.8 + (complexity - 4) * 1.5;
      } else {
        baseSkills += 10.8 + (complexity - 8) * 1.8;
      }
      if (scale <= 5) {
        baseSkills += scale * 0.8;
      } else {
        baseSkills += 4 + (scale - 5) * 1;
      }
    } else if (phase === "Delivery Phase" || phase === "Wind Down") {
      let complexityFactor = 0;
      if (complexity <= 3) {
        complexityFactor = complexity * 3;
      } else if (complexity <= 6) {
        complexityFactor = 9 + (complexity - 3) * 4;
      } else if (complexity <= 8) {
        complexityFactor = 21 + (complexity - 6) * 5;
      } else {
        complexityFactor = 31 + (complexity - 8) * 6;
      }
      let scaleFactor = 0;
      if (scale <= 3) {
        scaleFactor = scale * 2;
      } else if (scale <= 6) {
        scaleFactor = 6 + (scale - 3) * 3;
      } else if (scale <= 8) {
        scaleFactor = 15 + (scale - 6) * 4;
      } else {
        scaleFactor = 23 + (scale - 8) * 5;
      }
      baseSkills = complexityFactor + scaleFactor;
      if (phase === "Wind Down") {
        baseSkills = baseSkills * 0.4;
      }
    }
    return Math.ceil(baseSkills * progressFactor);
  };
  
  const calculateCorporateServices = (complexity, scale, phase, progressFactor = 1) => {
    // ... (keeping the existing implementation)
    let baseServices = 0;
    
    if (phase === "Feasibility") {
      baseServices = 2;
      if (complexity > 7 || scale > 7) {
        baseServices += 2;
      }
    } else if (phase === "Interim Vehicle") {
      baseServices = 4;
      if (scale <= 5) {
        baseServices += scale * 0.8;
      } else {
        baseServices += 4 + (scale - 5) * 1;
      }
      if (complexity > 5) {
        baseServices += (complexity - 5) * 0.6;
      }
    } else if (phase === "Delivery Phase" || phase === "Wind Down") {
      let scaleFactor = 0;
      if (scale <= 3) {
        scaleFactor = scale * 2;
      } else if (scale <= 6) {
        scaleFactor = 6 + (scale - 3) * 3;
      } else if (scale <= 8) {
        scaleFactor = 15 + (scale - 6) * 4;
      } else {
        scaleFactor = 23 + (scale - 8) * 5;
      }
      let complexityFactor = 0;
      if (complexity <= 5) {
        complexityFactor = complexity * 0.8;
      } else {
        complexityFactor = 4 + (complexity - 5) * 1;
      }
      baseServices = scaleFactor + complexityFactor;
      if (phase === "Wind Down") {
        baseServices = Math.max(4, baseServices * 0.3);
      }
    }
    return Math.ceil(baseServices * progressFactor);
  };

  useEffect(() => {
    const generateData = () => {
      const newData = [];
      for (let month = 0; month <= 300; month += 6) {
        const year = month / 12;
        const currentPhase = phases.find(phase => month >= phase.start && month < phase.end) || phases[phases.length - 1];
        let specialistSkills = 0;
        let corporateServices = 0;
        let progressFactor = 1;
        
        if (month >= 18 && month < 36) {
          const transitionProgress = (month - 18) / 18;
          progressFactor = 0.7 + (transitionProgress * 0.3);
        } else if (month >= 36 && month < 240) {
          const deliveryProgress = (month - 36) / (240 - 36);
          if (deliveryProgress < 0.2) {
            progressFactor = 0.8 + (deliveryProgress * 5 * 0.2);
          } else if (deliveryProgress < 0.75) {
            progressFactor = 1;
          } else {
            progressFactor = 1 - ((deliveryProgress - 0.75) * 0.6);
          }
        }
        
        specialistSkills = calculateSpecialistSkills(complexity, scale, currentPhase.name, progressFactor);
        corporateServices = calculateCorporateServices(complexity, scale, currentPhase.name, progressFactor);
        
        const total = specialistSkills + corporateServices;
        if (currentPhase.name === "Feasibility" && total > 15) {
          const scaling = 15 / total;
          specialistSkills = Math.ceil(specialistSkills * scaling);
          corporateServices = Math.ceil(corporateServices * scaling);
        } else if (currentPhase.name === "Interim Vehicle" && total > 35) {
          const scaling = 35 / total;
          specialistSkills = Math.ceil(specialistSkills * scaling);
          corporateServices = Math.ceil(corporateServices * scaling);
        } else if (currentPhase.name === "Delivery Phase" && total > 90) {
          const scaling = 90 / total;
          specialistSkills = Math.ceil(specialistSkills * scaling);
          corporateServices = Math.ceil(corporateServices * scaling);
        }
        
        newData.push({
          month,
          year,
          phase: currentPhase.name,
          specialistSkills,
          corporateServices,
          total: specialistSkills + corporateServices
        });
      }
      return newData;
    };
    
    setData(generateData());
  }, [complexity, scale]);
  
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-tpx-purple">Development Corporation Resource Requirements</h2>
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold mb-2 text-tpx-gray-800">Project Complexity (1-10): {complexity}</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={complexity} 
              onChange={(e) => setComplexity(parseInt(e.target.value))}
              className="w-full h-2 bg-tpx-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-2 flex justify-between text-xs text-tpx-gray-600">
              <span>Simple</span>
              <span>Average</span>
              <span>Complex</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-tpx-gray-800">Project Scale (1-10): {scale}</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={scale} 
              onChange={(e) => setScale(parseInt(e.target.value))}
              className="w-full h-2 bg-tpx-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-2 flex justify-between text-xs text-tpx-gray-600">
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="h-72 bg-white rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }}
                stroke="#616161"
              />
              <YAxis 
                domain={[0, 100]}
                label={{ value: 'Number of Staff', angle: -90, position: 'insideLeft' }}
                stroke="#616161"
              />
              <Tooltip 
                formatter={(value, name) => [value, name === 'specialistSkills' ? 'Specialist Skills' : name === 'corporateServices' ? 'Corporate Services' : 'Total']}
                labelFormatter={(value) => `Year ${value}`}
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E0E0E0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="specialistSkills" stroke="#6B00F2" name="Specialist Skills" strokeWidth={2} />
              <Line type="monotone" dataKey="corporateServices" stroke="#00B6F0" name="Corporate Services" strokeWidth={2} />
              <Line type="monotone" dataKey="total" stroke="#FF3366" name="Total Staff" strokeWidth={1} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        {phases.map((phase, index) => (
          <div key={index} className="p-4 bg-tpx-gray-100 rounded-lg border-l-4 border-tpx-purple">
            <p className="font-semibold text-tpx-purple mb-2">{phase.name}</p>
            <p className="text-sm text-tpx-gray-600">Months {phase.start}-{phase.end}</p>
            <p className="text-sm text-tpx-gray-600">({phase.start/12}-{phase.end/12} years)</p>
          </div>
        ))}
      </div>
      
      <div className="bg-tpx-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-tpx-purple mb-4">About This Model</h3>
        <p className="text-tpx-gray-700 mb-4">This visualization models staffing requirements across development phases:</p>
        <ul className="space-y-2 text-tpx-gray-700">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-tpx-purple rounded-full mr-2"></span>
            Feasibility phase maintains lean teams (≤15 staff)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-tpx-purple rounded-full mr-2"></span>
            Interim vehicle grows to 15-35 staff based on complexity/scale
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-tpx-purple rounded-full mr-2"></span>
            Delivery phase averages around 70 staff at typical complexity/scale
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-tpx-purple rounded-full mr-2"></span>
            Smooth transitions between phases prevent abrupt staffing changes
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-tpx-purple rounded-full mr-2"></span>
            Wind down phase maintains core capabilities while reducing staff
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DevelopmentCorporationVisualization;