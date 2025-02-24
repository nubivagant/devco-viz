import React from 'react';
import DevelopmentCorporationVisualization from './components/DevelopmentCorporationVisualization';
import { Building2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Development Corporation Dashboard</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <DevelopmentCorporationVisualization />
        </div>
      </div>
    </div>
  );
}

export default App;