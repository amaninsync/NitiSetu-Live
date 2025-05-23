
import React from 'react';
import { 
  FileSpreadsheet, 
  FormInput, 
  Globe, 
  MessageSquare, 
  Share2, 
  Plug 
} from 'lucide-react';
import DataCollectionCard from './DataCollectionCard';

const DataCollectionSection = () => {
  const dataCollectionMethods = [
    { icon: FormInput, title: 'Web Forms', description: 'User-friendly forms for direct data input.' },
    { icon: FileSpreadsheet, title: 'CSV/Excel Uploads', description: 'Seamless bulk data import capabilities.' },
    { icon: Globe, title: 'Web Scraping', description: 'Automated data collection from online sources.' },
    { icon: MessageSquare, title: 'WhatsApp Bot', description: 'Collect data via conversational interface.' },
    { icon: Share2, title: 'Manual Sharing', description: 'Simple interfaces for manual data entry.' },
    { icon: Plug, title: 'API Integrations', description: 'Connect with existing government systems.' }
  ];

  return (
    <div className="mb-20">
      <h3 className="text-2xl font-semibold text-center mb-12 features-animate fade-in">
        Data Collection Made Simple
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dataCollectionMethods.map((method, index) => (
          <DataCollectionCard
            key={index}
            icon={method.icon}
            title={method.title}
            description={method.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DataCollectionSection;
