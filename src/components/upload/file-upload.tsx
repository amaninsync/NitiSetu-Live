
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, FileCheck, AlertCircle, File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  allowedTypes?: string[];
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  allowedTypes = ['.xlsx', '.csv', '.pdf'],
  maxSizeMB = 10,
  multiple = false,
  onFilesSelected,
  className,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadStatus, setUploadStatus] = useState<Record<string, 'pending' | 'uploading' | 'success' | 'error'>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const validateFile = (file: File): { valid: boolean; message?: string } => {
    // Check file size
    if (file.size > maxSizeBytes) {
      return { 
        valid: false, 
        message: `File size exceeds the ${maxSizeMB}MB limit.` 
      };
    }
    
    // Check file type
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExt)) {
      return { 
        valid: false, 
        message: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` 
      };
    }
    
    return { valid: true };
  };
  
  const processFiles = (fileList: FileList) => {
    const newFiles: File[] = [];
    const newUploadStatus: Record<string, 'pending' | 'uploading' | 'success' | 'error'> = {...uploadStatus};
    let errorMessages: string[] = [];
    
    Array.from(fileList).forEach(file => {
      const validation = validateFile(file);
      
      if (validation.valid) {
        newFiles.push(file);
        newUploadStatus[file.name] = 'pending';
      } else if (validation.message) {
        errorMessages.push(`${file.name}: ${validation.message}`);
      }
    });
    
    if (errorMessages.length > 0) {
      toast({
        variant: "destructive",
        title: "File validation error",
        description: errorMessages.join('\n'),
      });
    }
    
    if (newFiles.length > 0) {
      const finalFiles = multiple ? [...files, ...newFiles] : newFiles;
      setFiles(finalFiles);
      setUploadStatus({...newUploadStatus});
      
      if (onFilesSelected) {
        onFilesSelected(finalFiles);
      }
      
      // Simulate upload progress for demo purposes
      newFiles.forEach(file => {
        simulateUpload(file.name);
      });
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };
  
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
    const newUploadProgress = {...uploadProgress};
    const newUploadStatus = {...uploadStatus};
    delete newUploadProgress[fileName];
    delete newUploadStatus[fileName];
    setUploadProgress(newUploadProgress);
    setUploadStatus(newUploadStatus);
  };
  
  // Simulate file upload progress
  const simulateUpload = (fileName: string) => {
    let progress = 0;
    setUploadStatus(prev => ({ ...prev, [fileName]: 'uploading' }));
    
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadStatus(prev => ({ ...prev, [fileName]: 'success' }));
      }
      
      setUploadProgress(prev => ({ ...prev, [fileName]: progress }));
    }, 300);
  };
  
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    if (ext === 'pdf') {
      return <File className="h-5 w-5 text-red-500" />;
    } else if (['xlsx', 'xls', 'csv'].includes(ext || '')) {
      return <File className="h-5 w-5 text-green-600" />;
    } else {
      return <File className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
          dragActive ? "border-primary bg-primary/10" : "border-muted hover:border-muted-foreground/50",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input 
          ref={inputRef}
          type="file" 
          className="hidden"
          onChange={handleChange}
          accept={allowedTypes.join(',')}
          multiple={multiple}
        />
        
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-sm">
              Drag & drop files here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports {allowedTypes.join(', ')} files up to {maxSizeMB}MB
            </p>
          </div>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="border rounded-lg divide-y">
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 text-sm"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(file.name)}
                <div className="space-y-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {uploadStatus[file.name] === 'uploading' ? (
                  <div className="w-24">
                    <Progress value={uploadProgress[file.name]} className="h-1.5" />
                  </div>
                ) : uploadStatus[file.name] === 'success' ? (
                  <FileCheck className="h-5 w-5 text-green-600" />
                ) : uploadStatus[file.name] === 'error' ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : null}
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
