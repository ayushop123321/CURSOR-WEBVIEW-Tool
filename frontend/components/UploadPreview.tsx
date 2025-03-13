import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface UploadPreviewProps {
  onFileUpload: (file: File) => void;
  onCodeUpload: (code: string) => void;
}

const UploadPreview: React.FC<UploadPreviewProps> = ({ onFileUpload, onCodeUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onFileUpload(file);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'text/html' || file.type === 'text/css' || file.type === 'text/javascript') {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCodeUpload(reader.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="image/*,.html,.css,.js"
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="text-gray-600">
            <p className="text-lg">Drag and drop your files here</p>
            <p className="text-sm">or</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Browse Files
            </button>
            <p className="mt-2 text-sm text-gray-500">
              Supported formats: Images, HTML, CSS, JavaScript
            </p>
          </div>
        </div>
      </div>

      {preview && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Preview</h3>
          <div className="relative w-full h-64 border rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPreview; 