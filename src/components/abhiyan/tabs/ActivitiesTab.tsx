// src/components/abhiyan/tabs/ActivitiesTab.tsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera } from 'lucide-react';

const ServiceDeliveryCamps = ({ data }: { data: any[] }) => (
    <Table>
        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Location</TableHead><TableHead>Block</TableHead><TableHead>Attendees</TableHead><TableHead>Services Offered</TableHead><TableHead>Media</TableHead></TableRow></TableHeader>
        <TableBody>{data.map((camp, i) => (<TableRow key={i}><TableCell>{camp.date}</TableCell><TableCell>{camp.location}</TableCell><TableCell>{camp.block}</TableCell><TableCell>{camp.attendees}</TableCell><TableCell>{camp.services.join(', ')}</TableCell><TableCell><Button variant="outline" size="icon"><Camera className="h-4 w-4" /></Button></TableCell></TableRow>))}</TableBody>
    </Table>
);

const SpecialGramSabhas = ({ data }: { data: any[] }) => (
    <Table>
        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>GP</TableHead><TableHead>Block</TableHead><TableHead>Total</TableHead><TableHead>Women</TableHead><TableHead>Youth</TableHead><TableHead>PVTGs</TableHead><TableHead>Resolutions</TableHead></TableRow></TableHeader>
        <TableBody>{data.map((gs, i) => (<TableRow key={i}><TableCell>{gs.date}</TableCell><TableCell>{gs.gp}</TableCell><TableCell>{gs.block}</TableCell><TableCell>{gs.attendees}</TableCell><TableCell>{gs.women}</TableCell><TableCell>{gs.youth}</TableCell><TableCell>{gs.pvtgs}</TableCell><TableCell>
            <Dialog>
                <DialogTrigger asChild><Button variant="link">View</Button></DialogTrigger>
                <DialogContent><DialogHeader><DialogTitle>Resolutions for {gs.gp} on {gs.date}</DialogTitle></DialogHeader><p className="py-4 whitespace-pre-line">{gs.resolutions}</p></DialogContent>
            </Dialog>
        </TableCell></TableRow>))}</TableBody>
    </Table>
);

const IecAndMobilization = ({ iecData, janbhagidariData }: { iecData: any[], janbhagidariData: any[] }) => (
    <div className="space-y-6">
        <div>
            <h4 className="font-semibold mb-2">IEC Activities</h4>
            <Table>
                <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Location</TableHead><TableHead>Estimated Reach</TableHead></TableRow></TableHeader>
                <TableBody>{iecData.map((activity, i) => (<TableRow key={i}><TableCell>{activity.date}</TableCell><TableCell>{activity.type}</TableCell><TableCell>{activity.location}</TableCell><TableCell>{activity.reach.toLocaleString()}</TableCell></TableRow>))}</TableBody>
            </Table>
        </div>
        <div>
            <h4 className="font-semibold mb-2">Janbhagidari Meetings</h4>
            <Table>
                <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Meeting Type</TableHead><TableHead>Participants</TableHead></TableRow></TableHeader>
                <TableBody>{janbhagidariData.map((meeting, i) => (<TableRow key={i}><TableCell>{meeting.date}</TableCell><TableCell>{meeting.meetingType}</TableCell><TableCell>{meeting.participants}</TableCell></TableRow>))}</TableBody>
            </Table>
        </div>
    </div>
);


export const ActivitiesTab = ({ data }: { data: any }) => {
    return (
        <Tabs defaultValue="camps" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="camps">Service Delivery Camps</TabsTrigger>
                <TabsTrigger value="sabhas">Special Gram Sabhas</TabsTrigger>
                <TabsTrigger value="iec">IEC & Mobilization</TabsTrigger>
            </TabsList>
            <div className="mt-4 border rounded-lg p-4">
                 <TabsContent value="camps"><ServiceDeliveryCamps data={data.camps} /></TabsContent>
                 <TabsContent value="sabhas"><SpecialGramSabhas data={data.gramSabhas} /></TabsContent>
                 <TabsContent value="iec"><IecAndMobilization iecData={data.iec} janbhagidariData={data.janbhagidari} /></TabsContent>
            </div>
        </Tabs>
    );
};