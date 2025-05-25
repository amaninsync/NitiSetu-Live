
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportUtils } from '@/utils/export-utils';
import { Card } from "@/components/ui/card";

interface ExportableCardProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  exportOptions?: boolean;
}

export const ExportableCard: React.FC<ExportableCardProps> = ({ 
  children, 
  title, 
  className = "", 
  exportOptions = true 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleExport = (format: 'png' | 'jpg' | 'pdf') => {
    const sanitizedTitle = title.replace(/\s+/g, '-').toLowerCase();
    
    switch (format) {
      case 'png':
      case 'jpg':
        exportUtils.exportAsImage(cardRef, sanitizedTitle, format);
        break;
      case 'pdf':
        exportUtils.exportAsPDF(cardRef, sanitizedTitle);
        break;
      default:
        console.error('Unsupported export format');
    }
  };
  
  return (
    <Card className={`relative ${className}`} ref={cardRef}>
      {exportOptions && (
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('png')}>
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('jpg')}>
                Export as JPG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {children}
    </Card>
  );
};

interface ExportableTableProps {
  data: any[];
  title: string;
  children: React.ReactNode;
}

export const ExportableTable: React.FC<ExportableTableProps> = ({ 
  data, 
  title, 
  children 
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  
  const handleExport = (format: 'png' | 'pdf' | 'xlsx' | 'csv') => {
    const sanitizedTitle = title.replace(/\s+/g, '-').toLowerCase();
    
    switch (format) {
      case 'png':
        exportUtils.exportAsImage(tableRef, sanitizedTitle, 'png');
        break;
      case 'pdf':
        exportUtils.exportAsPDF(tableRef, sanitizedTitle);
        break;
      case 'xlsx':
      case 'csv':
        exportUtils.exportTableData(data, sanitizedTitle, format);
        break;
      default:
        console.error('Unsupported export format');
    }
  };
  
  return (
    <div className="relative" ref={tableRef}>
      <div className="absolute top-0 right-0 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('png')}>
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('xlsx')}>
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </div>
  );
};

interface ExportableChartProps {
  title: string;
  children: React.ReactElement;
}

export const ExportableChart: React.FC<ExportableChartProps> = ({ 
  title, 
  children 
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  const handleExport = (format: 'png' | 'jpg' | 'pdf') => {
    const sanitizedTitle = title.replace(/\s+/g, '-').toLowerCase();
    
    switch (format) {
      case 'png':
      case 'jpg':
        exportUtils.exportAsImage(chartRef, sanitizedTitle, format);
        break;
      case 'pdf':
        exportUtils.exportAsPDF(chartRef, sanitizedTitle);
        break;
      default:
        console.error('Unsupported export format');
    }
  };
  
  return (
    <div className="relative" ref={chartRef}>
      <div className="absolute top-0 right-0 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('png')}>
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('jpg')}>
              Export as JPG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </div>
  );
};
