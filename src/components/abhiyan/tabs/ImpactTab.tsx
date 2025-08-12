// src/components/abhiyan/tabs/ImpactTab.tsx
import React from 'react';
import { StoryCard } from '@/components/abhiyan/ui/StoryCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ImpactTab = ({ data }: { data: any }) => {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Story Gallery: Impact & Innovation</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.stories.length > 0 ? (
                       data.stories.map((story: any) => <StoryCard key={story.id} story={story} />)
                    ) : <p className="col-span-full text-center text-gray-500">No impact stories match the current filter.</p>}
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Partnerships & Collaborations</CardTitle></CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader><TableRow><TableHead>Partner Name</TableHead><TableHead>Partner Type</TableHead><TableHead>Block</TableHead><TableHead>Nature of Engagement</TableHead></TableRow></TableHeader>
                        <TableBody>{data.partners.map((p: any) => (<TableRow key={p.id}><TableCell>{p.partnerName}</TableCell><TableCell>{p.partnerType}</TableCell><TableCell>{p.block}</TableCell><TableCell>{p.natureOfEngagement}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Media Coverage Log</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Platform</TableHead><TableHead>Title</TableHead><TableHead>Link</TableHead></TableRow></TableHeader>
                        <TableBody>{data.media.map((m: any, i: number) => (<TableRow key={i}><TableCell>{m.date}</TableCell><TableCell>{m.platform}</TableCell><TableCell>{m.title}</TableCell><TableCell><a href={m.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Source</a></TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};