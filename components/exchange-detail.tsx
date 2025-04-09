"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronRight, Globe, ExternalLink } from "lucide-react"

// Mock data - would come from your Redux store in a real app
const exchangeData = {
  id: "binance",
  name: "Binance",
  url: "https://binance.com",
  trustScore: 10,
  volume24h: 12500000000,
  markets: 1289,
  country: "Global",
  yearEstablished: 2017,
  description:
    "Binance is a global cryptocurrency exchange that provides a platform for trading more than 100 cryptocurrencies. Since early 2018, Binance has been considered the largest cryptocurrency exchange in the world in terms of trading volume.",
  socials: {
    twitter: "https://twitter.com/binance",
    telegram: "https://t.me/binanceexchange",
    facebook: "https://facebook.com/binance",
  },
}

// Mock top markets data
const topMarkets = [
  { pair: "BTC/USDT", price: 57845.23, volume24h: 2100000000, volumePercentage: 16.8 },
  { pair: "ETH/USDT", price: 3521.67, volume24h: 1500000000, volumePercentage: 12.0 },
  { pair: "BNB/USDT", price: 452.32, volume24h: 980000000, volumePercentage: 7.8 },
  { pair: "SOL/USDT", price: 102.45, volume24h: 750000000, volumePercentage: 6.0 },
  { pair: "ADA/USDT", price: 0.58, volume24h: 420000000, volumePercentage: 3.4 },
]

// Mock fee structure
const feeStructure = {
  maker: 0.1,
  taker: 0.1,
  withdrawal: {
    BTC: 0.0005,
    ETH: 0.005,
    USDT: 1,
  },
  discounts: "25% discount when paying with BNB",
}

export function ExchangeDetail({ id }: { id: string }) {
  // This would fetch data based on the ID in a real app
  const exchange = exchangeData

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/exchanges" className="hover:text-primary">
          Exchanges
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{exchange.name}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-lg">
            {exchange.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{exchange.name}</h1>
            <div className="text-muted-foreground">Established {exchange.yearEstablished}</div>
          </div>
        </div>

        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link href={exchange.url} target="_blank" rel="noopener noreferrer">
            <Globe className="h-4 w-4" />
            Visit Exchange
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Trust Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{exchange.trustScore}/10</div>
            <div className="text-sm text-muted-foreground">Highly trusted</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">${(exchange.volume24h / 1000000000).toFixed(1)}B</div>
            <div className="text-sm text-muted-foreground">Across {exchange.markets} markets</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{exchange.country}</div>
            <div className="text-sm text-muted-foreground">Operating since {exchange.yearEstablished}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="markets">Top Markets</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Exchange Overview</CardTitle>
              <CardDescription>Key information about {exchange.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{exchange.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">24h Trading Volume</span>
                      <span className="font-medium">${(exchange.volume24h / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Markets</span>
                      <span className="font-medium">{exchange.markets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year Established</span>
                      <span className="font-medium">{exchange.yearEstablished}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Country</span>
                      <span className="font-medium">{exchange.country}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Top Trading Pairs</h3>
                  <div className="space-y-2">
                    {topMarkets.slice(0, 5).map((market, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{market.pair}</span>
                        <span className="font-medium">${(market.volume24h / 1000000000).toFixed(2)}B</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="markets">
          <Card>
            <CardHeader>
              <CardTitle>Top Markets</CardTitle>
              <CardDescription>Most active trading pairs on {exchange.name} by 24h volume</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trading Pair</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Volume (24h)</TableHead>
                    <TableHead className="text-right">Volume %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topMarkets.map((market, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{market.pair}</TableCell>
                      <TableCell className="text-right font-mono">
                        $
                        {market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">${(market.volume24h / 1000000000).toFixed(2)}B</TableCell>
                      <TableCell className="text-right">{market.volumePercentage.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
              <CardDescription>Trading and withdrawal fees on {exchange.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Trading Fees</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Maker Fee</span>
                      <span className="font-medium">{feeStructure.maker}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taker Fee</span>
                      <span className="font-medium">{feeStructure.taker}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discounts</span>
                      <span className="font-medium">{feeStructure.discounts}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Withdrawal Fees</h3>
                  <div className="space-y-2">
                    {Object.entries(feeStructure.withdrawal).map(([currency, fee]) => (
                      <div key={currency} className="flex justify-between">
                        <span className="text-muted-foreground">{currency}</span>
                        <span className="font-medium">
                          {fee} {currency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About {exchange.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{exchange.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Links</h3>
                <div className="grid gap-2">
                  <Link
                    href={exchange.url}
                    className="flex items-center gap-2 text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4" />
                    Official Website
                  </Link>
                  {Object.entries(exchange.socials).map(([platform, url]) => (
                    <Link
                      key={platform}
                      href={url}
                      className="flex items-center gap-2 text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
