// src/components/MCHKitDashboard.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// --- DATA (FULLY POPULATED) ---

// Data parsed from your MCH KIT PDF
const mchKitData = {
    registrations: [
        { particular: 'Number of Registrations in 1st Trimester (%)', currentMonth: '288 (99)', fy: '1929 (98)' },
        { particular: 'Number of Registrations in 2nd Trimester (%)', currentMonth: '4 (1)', fy: '24 (1)' },
        { particular: 'Number of Registrations in 3rd Trimester (%)', currentMonth: '0 (0)', fy: '5 (0)' },
        { particular: 'Registrations in 4th trimester (at delivery) (%)', currentMonth: '0 (0)', fy: '1 (0)' },
    ],
    pregnancyStage: [
        { particular: 'Deliveries Due', currentMonth: '313', fy: '4806', nextMonth: '491' },
        { particular: 'ANC3 Due', currentMonth: '0', fy: '113', nextMonth: '1' },
        { particular: 'ANC4 Due', currentMonth: '2', fy: '69', nextMonth: '67' },
        { particular: 'HR Cases Due', currentMonth: '182', fy: '2697', nextMonth: '315' },
        { particular: 'HR Cases - Birth Planning not done', currentMonth: '11', fy: '2007', nextMonth: '111' },
        { particular: 'HR Cases - ANC 3 & 4 not done', currentMonth: '0', fy: '0', nextMonth: '0' },
    ],
    deliveries: [
        { particular: '1. Total Deliveries', currentMonth: '44', fy: '714' },
        { particular: '2. Total Deliveries in Public Institutions', currentMonth: '31', fy: '347' },
        { particular: '% C-sec Deliveries in Public Institutions', currentMonth: '0', fy: '0' },
        { particular: 'Total Deliveries in Private Institutions', currentMonth: '13', fy: '367' },
        { particular: '% C-sec Deliveries in Private Institutions', currentMonth: '69', fy: '72' },
        { particular: '3. Maternal Death Reported', currentMonth: '0', fy: '0' },
        { particular: '4. Still Birth Reported', currentMonth: '0', fy: '9' },
        { particular: '5. Low Birth Weight Babies (<1.8 kgs)', currentMonth: '0', fy: '18' },
        { particular: 'Not Admitted in SNCU', currentMonth: '0', fy: '4' },
        { particular: '6. Infant Deaths Reported', currentMonth: '0', fy: '0' },
        { particular: '7. Neonatal Deaths Reported', currentMonth: '0', fy: '2' },
        { particular: '8. Child Deaths Reported', currentMonth: '0', fy: '0' },
    ],
    immunization: [
        { particular: 'Immunization @ 3 1/2 Months Due', currentMonth: '297', fy: '1513', nextMonth: '514' },
        { particular: 'Immunization @ 9 Months Due', currentMonth: '429', fy: '3785', nextMonth: '730' },
    ],
};

// Data from "MCH...Current Month....csv" - FULLY POPULATED
const firstTrimesterCurrentMonthData = [
  {"Sub-Center":"AD","Expected Pregnancies":"8","Registration in First Trimester":"7","Percentage":"88"},
  {"Sub-Center":"ADA","Expected Pregnancies":"16","Registration in First Trimester":"16","Percentage":"100"},
  {"Sub-Center":"ANDEVELLY","Expected Pregnancies":"12","Registration in First Trimester":"12","Percentage":"100"},
  {"Sub-Center":"ANKODA","Expected Pregnancies":"1","Registration in First Trimester":"1","Percentage":"100"},
  {"Sub-Center":"Ankusapur","Expected Pregnancies":"17","Registration in First Trimester":"17","Percentage":"100"},
  {"Sub-Center":"Babejhari","Expected Pregnancies":"21","Registration in First Trimester":"21","Percentage":"100"},
  {"Sub-Center":"Balaji Ankapur","Expected Pregnancies":"1","Registration in First Trimester":"1","Percentage":"100"},
  {"Sub-Center":"Bejjur","Expected Pregnancies":"12","Registration in First Trimester":"12","Percentage":"100"},
  {"Sub-Center":"BHIMARAM","Expected Pregnancies":"1","Registration in First Trimester":"1","Percentage":"100"},
  {"Sub-Center":"BOMBAIGUDA","Expected Pregnancies":"2","Registration in First Trimester":"2","Percentage":"100"},
  {"Sub-Center":"Chintalamanepally","Expected Pregnancies":"3","Registration in First Trimester":"3","Percentage":"100"},
  {"Sub-Center":"Chirrakunta","Expected Pregnancies":"12","Registration in First Trimester":"12","Percentage":"100"},
  {"Sub-Center":"DAHEGAON","Expected Pregnancies":"13","Registration in First Trimester":"13","Percentage":"100"},
  {"Sub-Center":"Ginnedhari","Expected Pregnancies":"14","Registration in First Trimester":"14","Percentage":"100"},
  {"Sub-Center":"GOYAGAON","Expected Pregnancies":"10","Registration in First Trimester":"10","Percentage":"100"},
  {"Sub-Center":"GUDIPET","Expected Pregnancies":"13","Registration in First Trimester":"13","Percentage":"100"},
  {"Sub-Center":"Gundi","Expected Pregnancies":"13","Registration in First Trimester":"13","Percentage":"100"},
  {"Sub-Center":"JAINOOR","Expected Pregnancies":"18","Registration in First Trimester":"18","Percentage":"100"},
  {"Sub-Center":"JAMBULDHARI","Expected Pregnancies":"12","Registration in First Trimester":"12","Percentage":"100"},
  {"Sub-Center":"KARJAVALLI","Expected Pregnancies":"4","Registration in First Trimester":"4","Percentage":"100"},
  {"Sub-Center":"KERAMERI","Expected Pregnancies":"15","Registration in First Trimester":"15","Percentage":"100"},
  {"Sub-Center":"KOSINI","Expected Pregnancies":"1","Registration in First Trimester":"1","Percentage":"100"},
  {"Sub-Center":"KOUTHALA","Expected Pregnancies":"21","Registration in First Trimester":"21","Percentage":"100"},
  {"Sub-Center":"LINGAPUR","Expected Pregnancies":"15","Registration in First Trimester":"15","Percentage":"100"},
  {"Sub-Center":"MANGI","Expected Pregnancies":"24","Registration in First Trimester":"24","Percentage":"100"},
  {"Sub-Center":"REBBANA","Expected Pregnancies":"18","Registration in First Trimester":"18","Percentage":"100"},
  {"Sub-Center":"SIRPUR(T)","Expected Pregnancies":"28","Registration in First Trimester":"28","Percentage":"100"},
  {"Sub-Center":"SIRPUR-U","Expected Pregnancies":"13","Registration in First Trimester":"13","Percentage":"100"},
  {"Sub-Center":"TIRAYANI","Expected Pregnancies":"15","Registration in First Trimester":"15","Percentage":"100"},
  {"Sub-Center":"WANKIDI","Expected Pregnancies":"14","Registration in First Trimester":"14","Percentage":"100"},
  {"Sub-Center":"YELLARAM","Expected Pregnancies":"14","Registration in First Trimester":"14","Percentage":"100"},
];

// Data from "MCH...FY....csv" - FULLY POPULATED
const firstTrimesterFYData = [
  {"Sub-Center":"AD","Expected Pregnancies":"98","Registration in First Trimester":"95","Percentage":"97"},
  {"Sub-Center":"ADA","Expected Pregnancies":"194","Registration in First Trimester":"192","Percentage":"99"},
  {"Sub-Center":"ANDEVELLY","Expected Pregnancies":"141","Registration in First Trimester":"141","Percentage":"100"},
  {"Sub-Center":"ANKODA","Expected Pregnancies":"12","Registration in First Trimester":"12","Percentage":"100"},
  {"Sub-Center":"Ankusapur","Expected Pregnancies":"195","Registration in First Trimester":"194","Percentage":"99"},
  {"Sub-Center":"Babejhari","Expected Pregnancies":"256","Registration in First Trimester":"250","Percentage":"98"},
  {"Sub-Center":"Balaji Ankapur","Expected Pregnancies":"10","Registration in First Trimester":"10","Percentage":"100"},
  {"Sub-Center":"Bejjur","Expected Pregnancies":"144","Registration in First Trimester":"143","Percentage":"99"},
  {"Sub-Center":"BHIMARAM","Expected Pregnancies":"13","Registration in First Trimester":"13","Percentage":"100"},
  {"Sub-Center":"BOMBAIGUDA","Expected Pregnancies":"24","Registration in First Trimester":"24","Percentage":"100"},
  {"Sub-Center":"Chintalamanepally","Expected Pregnancies":"36","Registration in First Trimester":"36","Percentage":"100"},
  {"Sub-Center":"Chirrakunta","Expected Pregnancies":"144","Registration in First Trimester":"144","Percentage":"100"},
  {"Sub-Center":"DAHEGAON","Expected Pregnancies":"154","Registration in First Trimester":"153","Percentage":"99"},
  {"Sub-Center":"Ginnedhari","Expected Pregnancies":"171","Registration in First Trimester":"164","Percentage":"96"},
  {"Sub-Center":"GOYAGAON","Expected Pregnancies":"115","Registration in First Trimester":"114","Percentage":"99"},
  {"Sub-Center":"GUDIPET","Expected Pregnancies":"153","Registration in First Trimester":"151","Percentage":"99"},
  {"Sub-Center":"Gundi","Expected Pregnancies":"159","Registration in First Trimester":"159","Percentage":"100"},
  {"Sub-Center":"JAINOOR","Expected Pregnancies":"216","Registration in First Trimester":"215","Percentage":"100"},
  {"Sub-Center":"JAMBULDHARI","Expected Pregnancies":"144","Registration in First Trimester":"143","Percentage":"99"},
  {"Sub-Center":"KARJAVALLI","Expected Pregnancies":"45","Registration in First Trimester":"45","Percentage":"100"},
  {"Sub-Center":"KERAMERI","Expected Pregnancies":"180","Registration in First Trimester":"180","Percentage":"100"},
  {"Sub-Center":"KOSINI","Expected Pregnancies":"15","Registration in First Trimester":"15","Percentage":"100"},
  {"Sub-Center":"KOUTHALA","Expected Pregnancies":"255","Registration in First Trimester":"255","Percentage":"100"},
  {"Sub-Center":"LINGAPUR","Expected Pregnancies":"176","Registration in First Trimester":"175","Percentage":"99"},
  {"Sub-Center":"MANGI","Expected Pregnancies":"284","Registration in First Trimester":"283","Percentage":"100"},
  {"Sub-Center":"REBBANA","Expected Pregnancies":"216","Registration in First Trimester":"216","Percentage":"100"},
  {"Sub-Center":"SIRPUR(T)","Expected Pregnancies":"331","Registration in First Trimester":"329","Percentage":"99"},
  {"Sub-Center":"SIRPUR-U","Expected Pregnancies":"155","Registration in First Trimester":"154","Percentage":"99"},
  {"Sub-Center":"TIRAYANI","Expected Pregnancies":"182","Registration in First Trimester":"182","Percentage":"100"},
  {"Sub-Center":"WANKIDI","Expected Pregnancies":"169","Registration in First Trimester":"169","Percentage":"100"},
  {"Sub-Center":"YELLARAM","Expected Pregnancies":"163","Registration in First Trimester":"163","Percentage":"100"},
];


// Reusable table component for the report sections
const ReportSectionTable = ({ title, data, headers }) => (
    <Card>
        <CardHeader><CardTitle className="text-lg font-semibold">{title}</CardTitle></CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-left text-muted-foreground">
                            {headers.map(h => <th key={h} className="p-2 font-medium">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className="border-b last:border-b-0 hover:bg-muted/50">
                                {Object.values(row).map((val, i) => <td key={i} className={`p-2 ${i === 0 ? 'font-medium' : ''}`}>{String(val)}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardContent>
    </Card>
);

export const MCHKitDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <ReportSectionTable title="1. Registrations (MCH 2.1)" data={mchKitData.registrations} headers={["Particular", "Current Month", "FY Achievement"]} />
                <ReportSectionTable title="2. Pregnancy Stage" data={mchKitData.pregnancyStage} headers={["Particular", "Current Month", "FY", "Next Month"]} />
                <ReportSectionTable title="3. Deliveries (MCH 2.2)" data={mchKitData.deliveries} headers={["Particular", "Current Month", "FY Achievement"]} />
                <ReportSectionTable title="4. Immunization (MCH 7.0)" data={mchKitData.immunization} headers={["Particular", "Current Month", "FY", "Next Month"]} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detailed Report: 1st Trimester Registrations</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ReportSectionTable title="Current Month" data={firstTrimesterCurrentMonthData} headers={["Sub-Center", "Expected Pregnancies", "1st Trimester Reg.", "%"]} />
                    <ReportSectionTable title="Financial Year (FY)" data={firstTrimesterFYData} headers={["Sub-Center", "Expected Pregnancies", "1st Trimester Reg.", "%"]} />
                </CardContent>
            </Card>
        </div>
    );
};