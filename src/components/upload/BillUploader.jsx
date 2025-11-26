import React, { useState } from 'react';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function BillUploader({ onUpload }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { addBillUpload } = useUser();

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const processFile = async (file) => {
        setIsProcessing(true);

        // Simulate OCR processing
        const reader = new FileReader();
        reader.onload = (e) => {
            // Simulate extracting price data from bill
            const mockExtractedData = {
                shopName: ['Metro Store', 'Fresh Market', 'Local Bazaar'][Math.floor(Math.random() * 3)],
                items: [
                    { name: 'Tomato (1kg)', price: Math.floor(Math.random() * 40) + 20, quantity: 1 },
                    { name: 'Onion (1kg)', price: Math.floor(Math.random() * 50) + 25, quantity: 1 },
                    { name: 'Milk (1L)', price: Math.floor(Math.random() * 30) + 40, quantity: 2 },
                ],
                totalAmount: 0,
                date: new Date().toLocaleDateString(),
                fileName: file.name,
            };

            // Calculate total
            mockExtractedData.totalAmount = mockExtractedData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Save bill to localStorage
            addBillUpload(mockExtractedData);

            // Simulate processing delay
            setTimeout(() => {
                setIsProcessing(false);
                onUpload(file);
            }, 2000);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${isDragging
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
        >
            <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-2xl ${isProcessing ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                    {isProcessing ? (
                        <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
                    ) : (
                        <Upload className="w-6 h-6 text-emerald-600" />
                    )}
                </div>
            </div>

            <h3 className="font-semibold text-slate-900 mb-2">
                {isProcessing ? 'Processing bill...' : 'Upload your bill'}
            </h3>
            <p className="text-sm text-slate-600 mb-4">
                {isProcessing
                    ? 'Extracting prices using AI...'
                    : 'Drag and drop your receipt or click to select'}
            </p>

            {!isProcessing && (
                <>
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                        disabled={isProcessing}
                    />
                    <label
                        htmlFor="file-upload"
                        className={`inline-block px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${isProcessing
                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                : 'bg-emerald-500 text-white hover:bg-emerald-600'
                            }`}
                    >
                        Choose File
                    </label>
                </>
            )}
        </div>
    );
}

