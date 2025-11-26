import React, { useState, useRef } from 'react';
import { Upload, Camera, FileImage, X, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { base44 } from '@/api/base44Client';

export default function BillUploader({ onUploadComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview({ file, url: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview) return;
    
    setIsUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file: preview.file });
    onUploadComplete(file_url);
    setIsUploading(false);
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
            isDragging 
              ? 'border-emerald-500 bg-emerald-50' 
              : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
              <Upload className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-lg">Upload your shopping bill</p>
              <p className="text-slate-500 text-sm mt-1">Drag & drop or click to browse</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="rounded-xl"
              >
                <FileImage className="w-4 h-4 mr-2" />
                Browse Files
              </Button>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="rounded-xl"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={preview.url} 
            alt="Bill preview" 
            className="w-full max-h-96 object-contain rounded-2xl border-2 border-slate-100"
          />
          <button
            onClick={clearPreview}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
          
          <div className="mt-4 flex gap-3">
            <Button 
              onClick={clearPreview}
              variant="outline"
              className="flex-1 rounded-xl py-6"
            >
              Choose Another
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={isUploading}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl py-6"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload & Earn Points
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}