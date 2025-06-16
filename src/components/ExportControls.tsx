// src/components/ExportControls.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Define the props the component will accept
interface ExportControlsProps {
  data: any[]; // Data array for CSV export
  fileName: string; // Base name for the exported files
  componentRef: React.RefObject<HTMLDivElement>; // Ref to the component to capture
}

export const ExportControls: React.FC<ExportControlsProps> = ({ data, fileName, componentRef }) => {
  
  // 1. Export to CSV
  const handleCSVExport = () => {
    if (data.length === 0) {
      alert("No data to export.");
      return;
    }
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Export to PNG
  const handlePNGExport = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current, { useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  // 3. Export to PDF
  const handlePDFExport = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current, { useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileName}.pdf`);
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleCSVExport}><Download className="h-4 w-4 mr-2" />CSV</Button>
        <Button variant="outline" size="sm" onClick={handlePNGExport}><Download className="h-4 w-4 mr-2" />PNG</Button>
        <Button variant="outline" size="sm" onClick={handlePDFExport}><Download className="h-4 w-4 mr-2" />PDF</Button>
    </div>
  );
};