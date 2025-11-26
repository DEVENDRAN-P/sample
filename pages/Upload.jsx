import React, { useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle, Gift, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BillUploader from '@/components/upload/BillUploader';
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from '@tanstack/react-query';

export default function Upload() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState('upload'); // upload, processing, review, success
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [selectedShopId, setSelectedShopId] = useState('');

  const { data: shops = [] } = useQuery({
    queryKey: ['shops'],
    queryFn: () => base44.entities.Shop.list()
  });

  const extractMutation = useMutation({
    mutationFn: async (fileUrl) => {
      const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url: fileUrl,
        json_schema: {
          type: "object",
          properties: {
            shop_name: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  product_name: { type: "string" },
                  price: { type: "number" },
                  quantity: { type: "number" },
                  unit: { type: "string" }
                }
              }
            },
            total_amount: { type: "number" }
          }
        }
      });
      return result;
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        setExtractedData(data.output);
        setStep('review');
      }
    }
  });

  const saveBillMutation = useMutation({
    mutationFn: async (billData) => {
      // Save the bill
      const bill = await base44.entities.Bill.create({
        image_url: uploadedUrl,
        shop_id: selectedShopId,
        shop_name: extractedData?.shop_name || 'Unknown Shop',
        items: extractedData?.items || [],
        total_amount: extractedData?.total_amount || 0,
        status: 'processed',
        points_earned: 25
      });

      // Update prices from bill items
      if (extractedData?.items?.length > 0 && selectedShopId) {
        for (const item of extractedData.items) {
          // Check if price exists for this shop and product
          const existingPrices = await base44.entities.Price.filter({
            shop_id: selectedShopId,
            product_name: item.product_name
          });

          if (existingPrices.length > 0) {
            // Update verification count
            await base44.entities.Price.update(existingPrices[0].id, {
              price: item.price,
              verification_count: (existingPrices[0].verification_count || 0) + 1,
              is_verified: (existingPrices[0].verification_count || 0) >= 2,
              source: 'crowdsourced'
            });
          } else {
            // Create new price entry
            const shop = shops.find(s => s.id === selectedShopId);
            await base44.entities.Price.create({
              shop_id: selectedShopId,
              product_name: item.product_name,
              shop_name: shop?.name || extractedData?.shop_name,
              price: item.price,
              unit: item.unit || 'kg',
              source: 'crowdsourced',
              verification_count: 1
            });
          }
        }
      }

      return bill;
    },
    onSuccess: () => {
      setStep('success');
      queryClient.invalidateQueries(['prices']);
    }
  });

  const handleUploadComplete = async (fileUrl) => {
    setUploadedUrl(fileUrl);
    setStep('processing');
    extractMutation.mutate(fileUrl);
  };

  const handleSave = () => {
    saveBillMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Upload Bill</h1>
            <p className="text-sm text-slate-500">Earn points by sharing prices</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Points Banner */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="text-white">
            <p className="font-semibold">Earn 25 points per bill!</p>
            <p className="text-sm text-white/80">Plus bonus for verified prices</p>
          </div>
        </div>

        {step === 'upload' && (
          <BillUploader onUploadComplete={handleUploadComplete} />
        )}

        {step === 'processing' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Processing your bill...</h3>
            <p className="text-slate-500">Extracting product prices automatically</p>
          </div>
        )}

        {step === 'review' && extractedData && (
          <div className="space-y-6">
            {/* Bill Preview */}
            {uploadedUrl && (
              <img 
                src={uploadedUrl} 
                alt="Uploaded bill" 
                className="w-full max-h-48 object-cover rounded-2xl border-2 border-slate-100"
              />
            )}

            {/* Shop Selection */}
            <Card>
              <CardContent className="pt-6">
                <Label>Select Shop</Label>
                <Select value={selectedShopId} onValueChange={setSelectedShopId}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose the shop" />
                  </SelectTrigger>
                  <SelectContent>
                    {shops.map(shop => (
                      <SelectItem key={shop.id} value={shop.id}>
                        {shop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {extractedData.shop_name && (
                  <p className="text-sm text-slate-500 mt-2">
                    Detected shop: {extractedData.shop_name}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Extracted Items */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800">Extracted Items</h3>
                  <span className="text-sm text-slate-500">
                    {extractedData.items?.length || 0} items
                  </span>
                </div>
                <div className="space-y-3">
                  {extractedData.items?.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-slate-800">{item.product_name}</p>
                        <p className="text-sm text-slate-500">
                          {item.quantity} {item.unit || 'units'}
                        </p>
                      </div>
                      <p className="font-semibold text-emerald-600">₹{item.price}</p>
                    </div>
                  ))}
                </div>
                {extractedData.total_amount && (
                  <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-slate-200">
                    <span className="font-semibold text-slate-800">Total</span>
                    <span className="text-xl font-bold text-slate-800">
                      ₹{extractedData.total_amount}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button 
              onClick={handleSave}
              disabled={saveBillMutation.isPending}
              className="w-full py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl"
            >
              {saveBillMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Confirm & Earn 25 Points
                </>
              )}
            </Button>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Bill Uploaded Successfully!</h3>
            <p className="text-slate-500 mb-2">You earned 25 points</p>
            <div className="bg-emerald-50 rounded-xl p-4 mb-6 inline-block">
              <p className="text-emerald-700 font-medium">
                +25 <span className="text-emerald-500">points</span>
              </p>
            </div>
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setStep('upload');
                  setUploadedUrl(null);
                  setExtractedData(null);
                }}
                variant="outline"
                className="w-full py-6 rounded-xl"
              >
                Upload Another Bill
              </Button>
              <Button 
                onClick={() => navigate(createPageUrl('Home'))}
                className="w-full py-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl"
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}