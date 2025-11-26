import React from 'react';
import { ArrowLeft, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useUser } from '@/context/UserContext';

export default function Bills() {
    const { getBills } = useUser();
    const bills = getBills();

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 z-40">
                <div className="px-4 py-4 flex items-center gap-3">
                    <Link to={createPageUrl('Upload')}>
                        <Button variant="ghost" size="sm" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="font-semibold text-slate-900 text-lg">My Bills</h1>
                        <p className="text-xs text-slate-500">{bills.length} bills uploaded</p>
                    </div>
                </div>
            </div>

            {/* Bills List */}
            <div className="px-4 py-6">
                {bills.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600">No bills uploaded yet</p>
                        <p className="text-sm text-slate-500">Start uploading bills to track prices</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {bills.map((bill, idx) => (
                            <div
                                key={bill.id || idx}
                                className="bg-white rounded-xl p-4 border border-slate-100 hover:border-emerald-200 transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-900">{bill.shopName}</h3>
                                        <p className="text-sm text-slate-500">{bill.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-emerald-600">₹{bill.totalAmount.toLocaleString()}</p>
                                        <p className="text-xs text-slate-500">Bill total</p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="bg-slate-50 rounded-lg p-3 mb-3">
                                    {bill.items.slice(0, 2).map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm text-slate-600 mb-1">
                                            <span>{item.name}</span>
                                            <span>₹{item.price}</span>
                                        </div>
                                    ))}
                                    {bill.items.length > 2 && (
                                        <p className="text-xs text-slate-500 mt-2">+{bill.items.length - 2} more items</p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-sm">
                                        View Details
                                    </Button>
                                    <Button className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 text-sm">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Summary */}
                {bills.length > 0 && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                        <p className="text-sm text-slate-600 mb-2">Total Bill Amount</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            ₹{bills.reduce((sum, bill) => sum + bill.totalAmount, 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                            Estimated 10% cashback: ₹{Math.floor(bills.reduce((sum, bill) => sum + bill.totalAmount, 0) * 0.1).toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
