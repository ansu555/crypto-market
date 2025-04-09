"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, BarChart3, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function MarketOverview() {
  // This would come from your Redux store in a real app
  const marketStats = {
    totalMarketCap: "2.45T",
    marketCapChange: 2.34,
    totalVolume: "98.7B",
    volumeChange: -1.23,
    btcDominance: 42.5,
    btcDominanceChange: 0.34,
  }

  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Market Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total Market Cap"
          value={`$${marketStats.totalMarketCap}`}
          change={marketStats.marketCapChange}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatsCard
          title="24h Volume"
          value={`$${marketStats.totalVolume}`}
          change={marketStats.volumeChange}
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <StatsCard
          title="BTC Dominance"
          value={`${marketStats.btcDominance}%`}
          change={marketStats.btcDominanceChange}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>
    </section>
  )
}

interface StatsCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositive = change >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 p-1 text-primary flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <div className={cn("flex items-center text-xs", isPositive ? "text-green-500" : "text-red-500")}>
            {isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
            {Math.abs(change)}%
          </div>
          <CardDescription className="ml-2 text-xs">from last 24h</CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
