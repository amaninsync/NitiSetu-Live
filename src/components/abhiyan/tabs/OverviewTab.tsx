// src/components/abhiyan/tabs/OverviewTab.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from 'recharts';

// Chart Components (can be moved to their own files if they grow)
const EntitlementSaturationChart = ({ data }: { data: any[] }) => {
    const chartData = [...new Set(data.map(d => d.type))].map(type => {
        const total = data.filter(d => d.type === type).length;
        const delivered = data.filter(d => d.type === type && d.status === 'Issued/Delivered').length;
        return { name: type, Saturation: total > 0 ? (delivered / total) * 100 : 0 };
    });
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
                <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(value) => `${(value as number).toFixed(1)}%`} />
                <Bar dataKey="Saturation" fill="#3b82f6" barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    );
};

const ApplicationStatusFunnel = ({ data }: { data: any[] }) => {
    const total = data.length;
    const applied = data.filter(d => d.status !== 'Does Not Have').length;
    const inProgress = data.filter(d => d.status === 'In Progress').length;
    const issued = data.filter(d => d.status === 'Issued/Delivered').length;
    const funnelData = [
        { value: total, name: 'Total Identified' },
        { value: applied, name: 'Applied' },
        { value: inProgress, name: 'In Progress' },
        { value: issued, name: 'Issued' },
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                    <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                </Funnel>
            </FunnelChart>
        </ResponsiveContainer>
    );
};

const JanbhagidariChart = ({ data }: { data: any[] }) => {
    const chartData = [
        { name: 'PRI Members', value: data.filter(d => d.meetingType === 'PRI Meeting').reduce((sum, item) => sum + item.participants, 0) },
        { name: 'SHG Leaders', value: data.filter(d => d.meetingType === 'SHG Leaders Meet').reduce((sum, item) => sum + item.participants, 0) },
        { name: 'Youth Volunteers', value: data.filter(d => d.meetingType === 'Youth Volunteers Mobilization').reduce((sum, item) => sum + item.participants, 0) },
    ];
    const COLORS = ['#0ea5e9', '#8b5cf6', '#f97316'];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

const MediaOutreachMixChart = ({ data }: { data: any[] }) => {
    const chartData = [...new Set(data.map(d => d.platform))].map(platform => ({
        name: platform,
        Count: data.filter(d => d.platform === platform).length,
    }));
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Count" fill="#14b8a6" />
            </BarChart>
        </ResponsiveContainer>
    );
};


export const OverviewTab = ({ data }: { data: any }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Entitlement Saturation Chart</CardTitle>
                    <CardDescription>Saturation % for each scheme/certificate type.</CardDescription>
                </CardHeader>
                <CardContent><EntitlementSaturationChart data={data.entitlements} /></CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Application Status Funnel</CardTitle>
                    <CardDescription>From identification to delivery.</CardDescription>
                </CardHeader>
                <CardContent><ApplicationStatusFunnel data={data.entitlements} /></CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Janbhagidari Participation</CardTitle>
                    <CardDescription>Participant categories in community meetings.</CardDescription>
                </CardHeader>
                <CardContent><JanbhagidariChart data={data.janbhagidari} /></CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Media & Digital Outreach Mix</CardTitle>
                    <CardDescription>Breakdown of outreach by platform type.</CardDescription>
                </CardHeader>
                <CardContent><MediaOutreachMixChart data={data.media} /></CardContent>
            </Card>
        </div>
    );
};