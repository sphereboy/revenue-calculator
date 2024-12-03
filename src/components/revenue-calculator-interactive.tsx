"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type ProcessorKey = keyof typeof processors;

// Move processors outside component to prevent recreation
const processors = {
  stripe: { name: "Stripe", percentage: 0.029, fixed: 0.3 },
  paypal: { name: "PayPal", percentage: 0.034, fixed: 0.3 },
  square: { name: "Square", percentage: 0.029, fixed: 0.3 },
  shopify: { name: "Shopify Payments", percentage: 0.026, fixed: 0.3 },
} as const;

// Memoized formatters to prevent recreation
const formatCurrency = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const formatPercentage = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num / 100);
};

const RevenueCalculator = () => {
  const [salePrice, setSalePrice] = useState<number>(30);
  const [productionCost, setProductionCost] = useState<number>(15);
  const [artistShare, setArtistShare] = useState<number>(70);
  const [agencyFeePercentage, setAgencyFeePercentage] = useState<number>(10);
  const [processor, setProcessor] = useState<ProcessorKey>("stripe");

  // Memoize all calculations
  const calculations = useMemo(() => {
    const currentProcessor = processors[processor];
    const processingFee =
      salePrice * currentProcessor.percentage + currentProcessor.fixed;
    const agencyFee = (salePrice * agencyFeePercentage) / 100;
    const totalCosts = processingFee + productionCost + agencyFee;
    const netProfit = salePrice - totalCosts;
    const artistAmount = netProfit * (artistShare / 100);
    const platformAmount = netProfit - artistAmount;

    return {
      processingFee,
      agencyFee,
      totalCosts,
      netProfit,
      artistAmount,
      platformAmount,
    };
  }, [salePrice, productionCost, artistShare, agencyFeePercentage, processor]);

  // Optimized handlers with useCallback
  const handleSalePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!isNaN(value) && value >= 0) {
        setSalePrice(value);
      }
    },
    []
  );

  const handleProductionCostChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!isNaN(value) && value >= 0) {
        setProductionCost(value);
      }
    },
    []
  );

  const handleArtistShareChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!isNaN(value) && value >= 0 && value <= 100) {
        setArtistShare(value);
      }
    },
    []
  );

  const handleAgencyFeeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!isNaN(value) && value >= 0 && value <= 100) {
        setAgencyFeePercentage(value);
      }
    },
    []
  );

  return (
    <Card className="w-full max-w-2xl shadow-lg border-0 bg-white/90 backdrop-blur-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Revenue Share Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Sale Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  type="number"
                  value={salePrice}
                  onChange={handleSalePriceChange}
                  className="pl-6 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  step="1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Production Cost
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  type="number"
                  value={productionCost}
                  onChange={handleProductionCostChange}
                  className="pl-6 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  step="1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Artist Share
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={artistShare}
                  onChange={handleArtistShareChange}
                  className="pr-8 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  max="100"
                  step="1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Agency Fee
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={agencyFeePercentage}
                  onChange={handleAgencyFeeChange}
                  className="pr-8 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  max="100"
                  step="1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Payment Processor
            </label>
            <Select
              value={processor}
              onValueChange={(value: ProcessorKey) => setProcessor(value)}
            >
              <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(processors) as ProcessorKey[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {processors[key].name} (
                    {(processors[key].percentage * 100).toFixed(1)}% + $
                    {processors[key].fixed.toFixed(2)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Breakdown</h3>
            <div className="grid gap-3 p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between text-gray-600">
                <span>Processing Fee:</span>
                <span className="font-medium">
                  {formatCurrency(calculations.processingFee)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Production Cost:</span>
                <span className="font-medium">
                  {formatCurrency(productionCost)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Agency Fee:</span>
                <span className="font-medium">
                  {formatCurrency(calculations.agencyFee)}
                </span>
              </div>
              <div className="flex justify-between text-gray-800 font-medium border-t border-gray-200 pt-3">
                <span>Total Costs:</span>
                <span>{formatCurrency(calculations.totalCosts)}</span>
              </div>
              <div className="flex justify-between text-gray-800 font-medium border-t border-gray-200 pt-3">
                <span>Net Profit:</span>
                <span>{formatCurrency(calculations.netProfit)}</span>
              </div>
              <div className="flex justify-between font-medium bg-gradient-to-r from-green-50 to-green-100 p-2 rounded">
                <span className="text-green-700">
                  Artist Amount ({formatPercentage(artistShare)}):
                </span>
                <span className="text-green-700">
                  {formatCurrency(calculations.artistAmount)}
                </span>
              </div>
              <div className="flex justify-between font-medium bg-gradient-to-r from-blue-50 to-blue-100 p-2 rounded">
                <span className="text-blue-700">
                  Platform Amount ({formatPercentage(100 - artistShare)}):
                </span>
                <span className="text-blue-700">
                  {formatCurrency(calculations.platformAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueCalculator;
