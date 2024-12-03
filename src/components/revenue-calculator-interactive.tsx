"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type ProcessorType = {
  [key: string]: {
    name: string;
    percentage: number;
    fixed: number;
  };
};

const RevenueCalculator = () => {
  const [salePrice, setSalePrice] = useState(30);
  const [productionCost, setProductionCost] = useState(15);
  const [artistShare, setArtistShare] = useState(70);
  const [agencyFeePercentage, setAgencyFeePercentage] = useState(10);
  const [processor, setProcessor] = useState("stripe");

  // Payment processor options
  const processors: ProcessorType = {
    stripe: { name: "Stripe", percentage: 0.029, fixed: 0.3 },
    paypal: { name: "PayPal", percentage: 0.034, fixed: 0.3 },
    square: { name: "Square", percentage: 0.029, fixed: 0.3 },
    shopify: { name: "Shopify Payments", percentage: 0.026, fixed: 0.3 },
  };

  // Get current processor fees
  const currentProcessor = processors[processor];
  const processingFee =
    salePrice * currentProcessor.percentage + currentProcessor.fixed;
  const agencyFee = (salePrice * agencyFeePercentage) / 100;
  const totalCosts = processingFee + productionCost + agencyFee;
  const netProfit = salePrice - totalCosts;
  const artistAmount = netProfit * (artistShare / 100);
  const platformAmount = netProfit - artistAmount;

  // Format number as currency
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Format number as percentage
  const formatPercentage = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num / 100);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Revenue Share Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Input Controls */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sale Price</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="pl-6"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Production Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  value={productionCost}
                  onChange={(e) => setProductionCost(Number(e.target.value))}
                  className="pl-6"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Artist Share</label>
              <div className="relative">
                <Input
                  type="number"
                  value={artistShare}
                  onChange={(e) => setArtistShare(Number(e.target.value))}
                  className="pr-8"
                  min="0"
                  max="100"
                  step="1"
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Agency Fee</label>
              <div className="relative">
                <Input
                  type="number"
                  value={agencyFeePercentage}
                  onChange={(e) =>
                    setAgencyFeePercentage(Number(e.target.value))
                  }
                  className="pr-8"
                  min="0"
                  max="100"
                  step="1"
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Processor</label>
            <Select value={processor} onValueChange={setProcessor}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(processors).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name} ({(value.percentage * 100).toFixed(1)}% + $
                    {value.fixed.toFixed(2)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Breakdown</h3>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Processing Fee:</span>
                <span>{formatCurrency(processingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Production Cost:</span>
                <span>{formatCurrency(productionCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Agency Fee:</span>
                <span>{formatCurrency(agencyFee)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Costs:</span>
                <span>{formatCurrency(totalCosts)}</span>
              </div>
              <div className="my-2 border-t pt-2">
                <div className="flex justify-between font-medium">
                  <span>Net Profit:</span>
                  <span>{formatCurrency(netProfit)}</span>
                </div>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Artist Amount ({formatPercentage(artistShare)}):</span>
                <span>{formatCurrency(artistAmount)}</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>
                  Platform Amount ({formatPercentage(100 - artistShare)}):
                </span>
                <span>{formatCurrency(platformAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueCalculator;
