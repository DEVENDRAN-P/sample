import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useUser } from '@/context/UserContext';
import BillUploader from '@/components/upload/BillUploader';

export default function Upload() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [step, setStep] = useState('upload'); // upload or success
    const { getBills } = useUser();
    const billCount = getBills().length;

    const handleFileUpload = (file) => {
        setUploadedFile(file);
        // Simulate processing
        setTimeout(() => {
            setStep('success');
        }, 2000);
    };

    const handleUploadAnother = () => {
        setStep('upload');
        setUploadedFile(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pb-24">
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-slate-100 z-40">
                <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to={createPageUrl('Home')}>
                            <Button variant="ghost" size="sm" className="rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="font-semibold text-slate-900 text-lg">Upload Bill</h1>
                    </div>
                    {billCount > 0 && (
                        <Link to="/bills">
                            <Button className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-sm">
                                <FileText className="w-4 h-4 mr-1" />
                                {billCount} bills
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {step === 'upload' ? (
                <div className="px-4 py-8">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Your Receipt</h2>
                            <p className="text-slate-600">
                                Help us track prices and get rewarded with cashback points
                            </p>
                        </div>

                        <BillUploader onUpload={handleFileUpload} />

                        <div className="mt-8 space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100">
                                    <span className="text-emerald-700 font-semibold">1</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Upload your bill</h3>
                                    <p className="text-sm text-slate-600">Take a photo or upload an image</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100">
                                    <span className="text-emerald-700 font-semibold">2</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">We extract the data</h3>
                                    <p className="text-sm text-slate-600">AI automatically reads the prices</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100">
                                    <span className="text-emerald-700 font-semibold">3</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Get rewards</h3>
                                    <p className="text-sm text-slate-600">Earn points for each bill shared</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-4 py-12">
                    <div className="max-w-md mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-emerald-100 rounded-full">
                                <CheckCircle className="w-12 h-12 text-emerald-600" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Bill Uploaded!</h2>
                        <p className="text-slate-600 mb-8">
                            Thank you for helping us track prices. You've earned 10 reward points!
                        </p>

                        <div className="bg-emerald-50 rounded-2xl p-4 mb-6">
                            <p className="text-sm text-slate-600 mb-1">Reward Points Earned</p>
                            <p className="text-3xl font-bold text-emerald-600">+10</p>
                        </div>

                        <div className="space-y-2">
                            <Link to="/bills">
                                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                                    View My Bills
                                </Button>
                            </Link>
                            <button
                                onClick={handleUploadAnother}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition-colors"
                            >
                                Upload Another Bill
                            </button>
                            <Link to={createPageUrl('Home')}>
                                <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
