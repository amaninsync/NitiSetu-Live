// src/components/abhiyan/ui/FilterControls.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { divisions, entitlementsData, certificatesData } from '../data/abhiyan-data';

// Helper to get unique locations
const allLocations = [...entitlementsData, ...certificatesData].map(d => ({ division: d.division, block: d.block, gp: d.gp }));
const uniqueBlocks = (division) => [...new Set(allLocations.filter(l => l.division === division).map(l => l.block))];
const uniqueGPs = (block) => [...new Set(allLocations.filter(l => l.block === block).map(l => l.gp))];

export const FilterControls = ({ onFilterChange }) => {
    const [division, setDivision] = useState('');
    const [block, setBlock] = useState('');
    const [gp, setGp] = useState('');
    const [date, setDate] = useState(undefined);

    const blocksForDivision = division ? uniqueBlocks(division) : [];
    const gpsForBlock = block ? uniqueGPs(block) : [];

    useEffect(() => {
        onFilterChange({ division, block, gp, date });
    }, [division, block, gp, date]);

    const handleReset = () => {
        setDivision('');
        setBlock('');
        setGp('');
        setDate(undefined);
    };

    return (
        <div className="flex flex-wrap items-end gap-3 p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex flex-col flex-grow min-w-[150px]">
                <label className="text-xs font-medium text-gray-600 mb-1">Division</label>
                <Select value={division} onValueChange={(value) => { setDivision(value); setBlock(''); setGp(''); }}>
                    <SelectTrigger><SelectValue placeholder="All Divisions" /></SelectTrigger>
                    <SelectContent>{divisions.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <div className="flex flex-col flex-grow min-w-[150px]">
                <label className="text-xs font-medium text-gray-600 mb-1">Block / Mandal</label>
                <Select value={block} onValueChange={(value) => { setBlock(value); setGp(''); }} disabled={!division}>
                    <SelectTrigger><SelectValue placeholder="All Blocks" /></SelectTrigger>
                    <SelectContent>{blocksForDivision.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <div className="flex flex-col flex-grow min-w-[150px]">
                <label className="text-xs font-medium text-gray-600 mb-1">Gram Panchayat</label>
                <Select value={gp} onValueChange={setGp} disabled={!block}>
                    <SelectTrigger><SelectValue placeholder="All GPs" /></SelectTrigger>
                    <SelectContent>{gpsForBlock.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <div className="flex flex-col flex-grow min-w-[240px]">
                 <label className="text-xs font-medium text-gray-600 mb-1">Date Range</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (date.to ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}` : format(date.from, "LLL dd, y")) : <span>Pick a date range</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="range" selected={date} onSelect={setDate} numberOfMonths={2} />
                    </PopoverContent>
                </Popover>
            </div>
            <Button onClick={handleReset} variant="ghost" className="self-end"><X className="h-4 w-4 mr-1" />Reset</Button>
        </div>
    );
};