import React, { useState } from 'react';
import { ArrowLeft, Plus, Package, TrendingUp, Users, Edit2, Trash2, Loader2, BadgeCheck, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const categories = ['vegetables', 'fruits', 'dairy', 'grains', 'spices', 'oils', 'beverages', 'snacks', 'household', 'personal_care', 'other'];
const units = ['kg', 'g', 'l', 'ml', 'piece', 'dozen', 'pack'];

export default function ShopDashboard() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    unit: 'kg',
    stock_status: 'in_stock',
    is_offer: false,
    offer_text: ''
  });

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: shop } = useQuery({
    queryKey: ['userShop', user?.shop_id],
    queryFn: () => base44.entities.Shop.filter({ id: user.shop_id }),
    enabled: !!user?.shop_id,
    select: (data) => data[0]
  });

  const { data: prices = [], isLoading: pricesLoading } = useQuery({
    queryKey: ['shopPrices', user?.shop_id],
    queryFn: () => base44.entities.Price.filter({ shop_id: user.shop_id }),
    enabled: !!user?.shop_id
  });

  const createPriceMutation = useMutation({
    mutationFn: (data) => base44.entities.Price.create({
      ...data,
      shop_id: user.shop_id,
      shop_name: shop?.name,
      source: 'shopkeeper',
      is_verified: true
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['shopPrices']);
      setIsDialogOpen(false);
      resetForm();
    }
  });

  const updatePriceMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Price.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['shopPrices']);
      setIsDialogOpen(false);
      resetForm();
    }
  });

  const deletePriceMutation = useMutation({
    mutationFn: (id) => base44.entities.Price.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['shopPrices']);
    }
  });

  const resetForm = () => {
    setFormData({
      product_name: '',
      price: '',
      unit: 'kg',
      stock_status: 'in_stock',
      is_offer: false,
      offer_text: ''
    });
    setEditingPrice(null);
  };

  const handleEdit = (price) => {
    setEditingPrice(price);
    setFormData({
      product_name: price.product_name,
      price: price.price,
      unit: price.unit,
      stock_status: price.stock_status,
      is_offer: price.is_offer,
      offer_text: price.offer_text || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price)
    };
    
    if (editingPrice) {
      updatePriceMutation.mutate({ id: editingPrice.id, data });
    } else {
      createPriceMutation.mutate(data);
    }
  };

  if (!user?.is_shopkeeper) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Not a Shopkeeper</h2>
            <p className="text-slate-500 mb-4">You need to register as a shopkeeper to access this dashboard.</p>
            <Link to={createPageUrl('Home')}>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Profile')}>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">{shop?.name || 'My Shop'}</h1>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                {shop?.is_verified && <BadgeCheck className="w-4 h-4 text-emerald-500" />}
                <span>Shop Dashboard</span>
              </div>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Price
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingPrice ? 'Edit Price' : 'Add New Price'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={formData.product_name}
                    onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                    placeholder="e.g., Onion"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price (₹)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <Label>Unit</Label>
                    <Select value={formData.unit} onValueChange={(v) => setFormData({...formData, unit: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map(u => (
                          <SelectItem key={u} value={u}>{u}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Stock Status</Label>
                  <Select value={formData.stock_status} onValueChange={(v) => setFormData({...formData, stock_status: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_stock">In Stock</SelectItem>
                      <SelectItem value="low_stock">Low Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_offer"
                    checked={formData.is_offer}
                    onChange={(e) => setFormData({...formData, is_offer: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="is_offer">Special Offer</Label>
                </div>
                
                {formData.is_offer && (
                  <div>
                    <Label>Offer Text</Label>
                    <Input
                      value={formData.offer_text}
                      onChange={(e) => setFormData({...formData, offer_text: e.target.value})}
                      placeholder="e.g., Buy 2 Get 1 Free"
                    />
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  disabled={createPriceMutation.isPending || updatePriceMutation.isPending}
                >
                  {(createPriceMutation.isPending || updatePriceMutation.isPending) ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingPrice ? 'Update Price' : 'Add Price'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{prices.length}</p>
              <p className="text-xs text-slate-500">Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">152</p>
              <p className="text-xs text-slate-500">Views Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-slate-500">Visitors</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Price List */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Prices</CardTitle>
          </CardHeader>
          <CardContent>
            {pricesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              </div>
            ) : prices.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No prices added yet</p>
                <p className="text-sm text-slate-400">Click "Add Price" to get started</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prices.map((price) => (
                    <TableRow key={price.id}>
                      <TableCell className="font-medium">
                        {price.product_name}
                        {price.is_offer && (
                          <Badge className="ml-2 bg-orange-100 text-orange-700">Offer</Badge>
                        )}
                      </TableCell>
                      <TableCell>₹{price.price}/{price.unit}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            price.stock_status === 'in_stock' ? 'border-emerald-200 text-emerald-700' :
                            price.stock_status === 'low_stock' ? 'border-amber-200 text-amber-700' :
                            'border-red-200 text-red-700'
                          }
                        >
                          {price.stock_status?.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(price)}
                          >
                            <Edit2 className="w-4 h-4 text-slate-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deletePriceMutation.mutate(price.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}