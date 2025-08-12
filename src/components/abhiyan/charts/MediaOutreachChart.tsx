// src/components/abhiyan/charts/MediaOutreachChart.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, MessageCircle } from 'lucide-react';
import { betiBachaoBetiPadhaoData, ebsbData } from '../data/abhiyan-data'; // Example data sources

interface MediaOutreachChartProps {
  selectedAbhiyan?: 'bbbp' | 'ebsb';
}

const MediaOutreachChart: React.FC<MediaOutreachChartProps> = ({ selectedAbhiyan = 'bbbp' }) => {
  let title = 'Media & Outreach Effectiveness';
  let primaryValue = 'N/A';
  let description = 'Effectiveness of awareness and media campaigns.';

  if (selectedAbhiyan === 'bbbp') {
    const mediaMetric = betiBachaoBetiPadhaoData.summaryMetrics.find(m => m.id === 'media-campaigns');
    if (mediaMetric) {
      primaryValue = mediaMetric.value;
      title = 'BBBP Media Campaigns Reach';
      description = mediaMetric.description;
    }
  } else if (selectedAbhiyan === 'ebsb') {
    const mediaMetric = ebsbData.summaryMetrics.find(m => m.id === 'media-coverage-ebsb');
    if (mediaMetric) {
      primaryValue = mediaMetric.value;
      title = 'EBSB Media Coverage';
      description = mediaMetric.description;
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Megaphone className="h-5 w-5 text-orange-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-70px)] flex flex-col justify-center items-center">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{primaryValue}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-4 w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          {/* Placeholder for an actual chart (e.g., a Gauge showing reach, or a Bar Chart for different campaign types) */}
          <p>Chart rendering for Media Outreach</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaOutreachChart;