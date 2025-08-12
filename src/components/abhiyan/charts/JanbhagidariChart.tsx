// src/components/abhiyan/charts/JanbhagidariChart.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, Users2 } from 'lucide-react';
import { ebsbData, skillIndiaMissionData } from '../data/abhiyan-data'; // Example data sources

interface JanbhagidariChartProps {
  // Can be made dynamic based on selected abhiyan
  selectedAbhiyan?: 'ebsb' | 'skillIndia';
}

const JanbhagidariChart: React.FC<JanbhagidariChartProps> = ({ selectedAbhiyan = 'ebsb' }) => {
  let title = 'Janbhagidari (Public Participation)';
  let totalParticipants = 0;
  let description = 'Overall citizen engagement in various initiatives.';

  if (selectedAbhiyan === 'ebsb') {
    ebsbData.statePairingActivity.forEach(pairing => {
      totalParticipants += pairing.participantsAvg * pairing.totalEvents; // Simple aggregation
    });
    title = 'EBSB Citizen Engagement';
    description = `Total participants in cultural exchange events and programs.`;
  } else if (selectedAbhiyan === 'skillIndia') {
    skillIndiaMissionData.summaryMetrics.filter(m => m.id === 'training-centers' || m.id === 'industry-partnerships').forEach(m => {
      totalParticipants += parseInt(m.value.replace(/,/g, '') || '0');
    });
    title = 'Skill India Community Participation';
    description = `Engagement through training centers and industry partnerships.`;
  }


  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Handshake className="h-5 w-5 text-green-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-70px)] flex flex-col justify-center items-center">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{totalParticipants.toLocaleString()}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-4 w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          {/* Placeholder for an actual chart (e.g., Line Chart for participation over time or Bar Chart by activity type) */}
          <p>Chart rendering for Janbhagidari</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JanbhagidariChart;