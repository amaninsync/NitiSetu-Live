
import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

export const exportUtils = {
  // Export component as image (PNG or JPG)
  exportAsImage: async (elementRef: React.RefObject<HTMLElement>, fileName: string, format = 'png') => {
    if (!elementRef.current) return;
    
    try {
      const canvas = await html2canvas(elementRef.current, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const image = canvas.toDataURL(`image/${format.toLowerCase()}`);
      const link = document.createElement('a');
      link.href = image;
      link.download = `${fileName}.${format.toLowerCase()}`;
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  },
  
  // Export component as PDF
  exportAsPDF: async (elementRef: React.RefObject<HTMLElement>, fileName: string) => {
    if (!elementRef.current) return;
    
    try {
      const canvas = await html2canvas(elementRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 280; // mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  },
  
  // Export table data as Excel/CSV
  exportTableData: (data: any[], fileName: string, format = 'xlsx') => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
      if (format.toLowerCase() === 'xlsx') {
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
      } else {
        XLSX.writeFile(workbook, `${fileName}.csv`);
      }
    } catch (error) {
      console.error('Error exporting table data:', error);
    }
  },
};
