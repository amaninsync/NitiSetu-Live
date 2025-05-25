
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import DistrictView from '@/components/dashboard/DistrictView';
import NITIAayogView from '@/components/dashboard/NITIAayogView';
import { districtOverview, asifabadOverview } from '@/data/district-dashboard-data';

const DistrictDashboard = () => {
  const [activeView, setActiveView] = useState('district');
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  const printOptions = {
    content: () => dashboardRef.current,
    documentTitle: `${activeView === 'district' ? districtOverview.name : asifabadOverview.name} Dashboard Report`,
    onBeforeGetContent: () => {
      console.log('Preparing to print dashboard');
      return Promise.resolve();
    },
    onAfterPrint: () => console.log('Dashboard printed successfully')
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen" ref={dashboardRef}>
      {/* Header with view toggle and Print Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeView === 'district' ? 'District Dashboard' : 'Aspirational District Dashboard'}
          </h1>
          <div className="inline-flex items-center rounded-md border border-gray-300 bg-white shadow-sm">
            <button
              onClick={() => setActiveView('district')}
              className={`rounded-l-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                activeView === 'district' 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'text-muted-foreground hover:bg-gray-100'
              }`}
            >
              District View
            </button>
            <button
              onClick={() => setActiveView('niti')}
              className={`rounded-r-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                activeView === 'niti' 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'text-muted-foreground hover:bg-gray-100'
              }`}
            >
              NITI Aayog View
            </button>
          </div>
        </div>
      </div>
      
      {activeView === 'district' ? <DistrictView /> : <NITIAayogView />}
    </div>
  );
};

export default DistrictDashboard;
