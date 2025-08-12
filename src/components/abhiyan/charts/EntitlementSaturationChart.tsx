// src/components/abhiyan/charts/EntitlementSaturationChart.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign } from 'lucide-react';
import { pmjdyData, jalJeevanMissionData } from '../data/abhiyan-data'; // Example data sources

interface EntitlementSaturationChartProps {
  // You might pass selected abhiyan data to make this dynamic
  selectedAbhiyan?: 'pmjdy' | 'jalJeevanMission';
}

const EntitlementSaturationChart: React.FC<EntitlementSaturationChartProps> = ({ selectedAbhiyan = 'pmjdy' }) => {
  let data;
  let title = 'Entitlement Saturation';
  let description = 'Percentage of eligible beneficiaries who have received their entitlements.';
  let value = 'N/A%';

  if (selectedAbhiyan === 'pmjdy') {
    data = pmjdyData.summaryMetrics.find(m => m.id === 'accounts-opened');
    title = 'PMJDY Account Saturation';
    if (data) {
      const totalAccounts = parseInt(data.value.replace(' Million', '').replace(',', '')) * 1000000;
      const totalEligible = 550000000; // Hypothetical total eligible population for PMJDY in India
      value = totalEligible > 0 ? `${((totalAccounts / totalEligible) * 100).toFixed(1)}%` : '0%';
      description = `Accounts opened vs. eligible population.`;
    }
  } else if (selectedAbhiyan === 'jalJeevanMission') {
    data = jalJeevanMissionData.summaryMetrics.find(m => m.id === 'fhtc-coverage');
    title = 'JJM FHTC Coverage Saturation';
    if (data) {
      value = data.value;
      description = 'Percentage of households with Functional Household Tap Connections.';
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-purple-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-70px)] flex flex-col justify-center items-center">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-4 w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          {/* Placeholder for an actual chart (e.g., Progress Bar or Gauge Chart) */}
          <p>Chart rendering for Entitlement Saturation</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EntitlementSaturationChart;