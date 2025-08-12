// src/pages/abhiyan/AbhiyanDashboardPage.tsx
import React, { useState, useMemo, useRef } from 'react';
import { BarChart2, ChevronRight, ShieldCheck, Target, Users, Megaphone, CheckCircle, Handshake, Star, FileText } from 'lucide-react';
import { AbhiyanKPICard } from '@/components/abhiyan/AbhiyanKPICard';
import { FilterControls } from '@/components/abhiyan/ui/FilterControls';
import { OverviewTab } from '@/components/abhiyan/tabs/OverviewTab'; // This will be our new detailed overview
import { SaturationTab } from '@/components/abhiyan/tabs/SaturationTab';
import { ActivitiesTab } from '@/components/abhiyan/tabs/ActivitiesTab';
import { ImpactTab } from '@/components/abhiyan/tabs/ImpactTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { entitlementsData, certificatesData, campsData, gramSabhaData, mediaOutreachData, iecData, janbhagidariData, impactStoriesData, partnershipsData } from '../components/abhiyan/data/abhiyan-data';
import { isWithinInterval } from 'date-fns';

export const AbhiyanDashboardPage: React.FC = () => {
    const [filters, setFilters] = useState({});

    // Memoized filtered data
    const filteredData = useMemo(() => {
        const combined = [...entitlementsData, ...certificatesData].map(d => ({ ...d, type: d.scheme || d.certificateType, date: d.issueDate || d.applicationDate }));
        
        const applyFilters = (data) => data.filter(item => {
            const divisionMatch = !filters.division || item.division === filters.division;
            const blockMatch = !filters.block || item.block === filters.block;
            const gpMatch = !filters.gp || item.gp === filters.gp;
            const dateMatch = !filters.date?.from || !item.date || isWithinInterval(new Date(item.date), { start: filters.date.from, end: filters.date.to || filters.date.from });
            return divisionMatch && blockMatch && gpMatch && dateMatch;
        });

        return {
            entitlements: applyFilters(combined),
            camps: applyFilters(campsData),
            gramSabhas: applyFilters(gramSabhaData),
            media: applyFilters(mediaOutreachData),
            iec: applyFilters(iecData),
            janbhagidari: applyFilters(janbhagidariData),
            stories: applyFilters(impactStoriesData),
            partners: applyFilters(partnershipsData),
        };
    }, [filters]);

    // KPI Calculations
    const totalEntitlementsDelivered = filteredData.entitlements.filter(e => e.status === 'Issued/Delivered').length;
    const totalIdentified = filteredData.entitlements.length;
    const overallSaturation = totalIdentified > 0 ? ((totalEntitlementsDelivered / totalIdentified) * 100).toFixed(1) : "0.0";
    const totalCamps = filteredData.camps.length;
    const totalGramSabhas = filteredData.gramSabhas.length;
    const totalBeneficiariesReached = filteredData.camps.reduce((acc, camp) => acc + camp.attendees, 0);
    const totalMediaMentions = filteredData.media.length;

    return (
        <div className="space-y-6 max-w-[1800px] mx-auto p-4 sm:p-6 bg-gray-50/50 min-h-screen">
            <header>
                <div className="flex items-center gap-x-2 text-sm text-gray-500">
                    <span>Dashboards</span> <ChevronRight className="h-4 w-4" /> <span className="text-gray-800 font-medium">Dharti Aaba Abhiyan</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-2 flex items-center gap-3">
                    <ShieldCheck className="h-8 w-8 text-green-600" /> Dharti Aaba Janbhagidari Abhiyan
                </h1>
                <p className="text-gray-600 mt-1">Real-time monitoring of India's Largest Campaign for Tribal Empowerment.</p>
            </header>

            <FilterControls onFilterChange={setFilters} />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                <AbhiyanKPICard title="Entitlements Delivered" value={totalEntitlementsDelivered.toLocaleString()} icon={CheckCircle} tooltip="Total Aadhaar, Certificates, etc. issued and delivered. (Source: Templates 1, 2)" color="text-green-600" />
                <AbhiyanKPICard title="Overall Saturation" value={`${overallSaturation}%`} icon={Target} tooltip="District-wide percentage of delivered entitlements vs. total need. (Source: Templates 1, 2)" color="text-blue-600" />
                <AbhiyanKPICard title="Camps Conducted" value={totalCamps.toLocaleString()} icon={Megaphone} tooltip="Total service delivery camps held across all blocks. (Source: Template 7)" color="text-purple-600" />
                <AbhiyanKPICard title="Gram Sabhas Held" value={totalGramSabhas.toLocaleString()} icon={Users} tooltip="Total special Gram Sabhas for community participation. (Source: Template 5)" color="text-orange-600" />
                <AbhiyanKPICard title="Beneficiaries Reached" value={totalBeneficiariesReached.toLocaleString()} icon={Handshake} tooltip="Cumulative attendees across all service delivery camps. (Source: Template 7)" color="text-teal-600" />
                <AbhiyanKPICard title="Media & Digital Outreach" value={totalMediaMentions.toLocaleString()} icon={FileText} tooltip="Total media mentions and digital outreach activities. (Source: Template 10)" color="text-indigo-600" />
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                    <TabsTrigger value="overview"><BarChart2 className="h-4 w-4 mr-2"/>Overview</TabsTrigger>
                    <TabsTrigger value="saturation"><Target className="h-4 w-4 mr-2"/>Saturation Details</TabsTrigger>
                    <TabsTrigger value="activities"><Megaphone className="h-4 w-4 mr-2"/>Activities Log</TabsTrigger>
                    <TabsTrigger value="impact"><Star className="h-4 w-4 mr-2"/>Impact & Innovation</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6"><OverviewTab data={filteredData} /></TabsContent>
                <TabsContent value="saturation" className="mt-6"><SaturationTab data={filteredData.entitlements} /></TabsContent>
                <TabsContent value="activities" className="mt-6"><ActivitiesTab data={filteredData} /></TabsContent>
                <TabsContent value="impact" className="mt-6"><ImpactTab data={filteredData} /></TabsContent>
            </Tabs>
        </div>
    );
};