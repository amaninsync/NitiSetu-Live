// src/components/abhiyan/tabs/SaturationTab.tsx
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';
import * as XLSX from 'xlsx';

export const SaturationTab = ({ data }: { data: any[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const sortedData = useMemo(() => {
        let sortableData = [...data];
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    const filteredData = useMemo(() => {
        return sortedData.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [sortedData, searchTerm]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [filteredData, currentPage, pageSize]);

    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "SaturationData");
        XLSX.writeFile(workbook, "DhartiAaba_SaturationDetails.xlsx");
    };

    const columns = [
        { key: 'beneficiary', label: 'Beneficiary Name' },
        { key: 'gp', label: 'GP' },
        { key: 'block', label: 'Block' },
        { key: 'type', label: 'Entitlement Type' },
        { key: 'status', label: 'Status' },
        { key: 'applicationDate', label: 'Application Date' },
        { key: 'issueDate', label: 'Issue Date' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Search across all columns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Button onClick={handleExport}>Export to Excel</Button>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map(col => (
                                <TableHead key={col.key}>
                                    <Button variant="ghost" onClick={() => requestSort(col.key)}>
                                        {col.label}
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.beneficiary}</TableCell>
                                    <TableCell>{item.gp}</TableCell>
                                    <TableCell>{item.block}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.applicationDate || 'N/A'}</TableCell>
                                    <TableCell>{item.issueDate || 'N/A'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No results found.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
             <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Showing {paginatedData.length} of {filteredData.length} records</span>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                    <span>Page {currentPage}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage * pageSize >= filteredData.length}>Next</Button>
                </div>
            </div>
        </div>
    );
};