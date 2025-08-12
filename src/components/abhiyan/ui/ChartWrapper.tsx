// src/components/abhiyan/ui/ChartWrapper.tsx
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Table } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DataTable } from './DataTable'; // Assuming DataTable is in the same folder

export const ChartWrapper = ({ title, description, children, data, columns }) => {
    const chartRef = useRef(null);

    const handleExport = async (format) => {
        if (!chartRef.current) return;
        const canvas = await html2canvas(chartRef.current, { backgroundColor: '#ffffff' });
        if (format === 'PNG') {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${title.replace(/ /g, '_')}.png`;
            link.click();
        } else {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${title.replace(/ /g, '_')}.pdf`);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </div>
                <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon"><Table className="h-4 w-4" /></Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                            <DialogHeader><DialogTitle>Raw Data: {title}</DialogTitle></DialogHeader>
                            <DataTable columns={columns} data={data} />
                        </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => handleExport('PNG')}>Export as PNG</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleExport('PDF')}>Export as PDF</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent ref={chartRef} className="p-4">
                {children}
            </CardContent>
        </Card>
    );
};