// src/components/abhiyan/ui/DataTable.tsx
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export const DataTable = ({ columns, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Records per page

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return data.slice(startIndex, startIndex + pageSize);
    }, [data, currentPage, pageSize]);
    
    const totalPages = Math.ceil(data.length / pageSize);

    return (
        <div>
            <div className="border rounded-lg overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map(col => <TableHead key={col.key}>{col.label}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map(col => <TableCell key={col.key}>{row[col.key]}</TableCell>)}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No data available.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                <span>Page {currentPage} of {totalPages}</span>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages}>Next</Button>
                </div>
            </div>
        </div>
    );
};