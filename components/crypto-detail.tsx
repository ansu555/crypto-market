"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowDown, ArrowUp, ChevronRight, Globe, FileText, ExternalLink, Star, StarOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"

// Mock data - would come from your Redux store in a real app
const cryptoData = {
  id: "bitcoin",
  rank: 1,
  name: "Bitcoin",
  symbol: "BTC",
  price: 57832.41,
  change24h: 2.34,
  marketCap: 1120000000000,
  volume24h: 32500000000,
  circulatingSupply: 19400000,
  totalSupply: 21000000,
  allTimeHigh: 69000,
  allTimeHighDate: "2021-11-10",
  description:
    "Bitcoin is the first decentralized cryptocurrency, released as open-source software in 2009. It operates on a peer-to-peer network without the need for intermediaries and without a central repository or single administrator. Bitcoin transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain.",
  website: "https://bitcoin.org",
  whitepaper: "https://bitcoin.org/bitcoin.pdf",
  explorers: ["https://blockchain.info", "https://blockchair.com/bitcoin"],
  socials: {
    twitter: "https://twitter.com/bitcoin",
    reddit: "https://reddit.com/r/bitcoin",
    github: "https://github.com/bitcoin",
  },
  inWatchlist: false,
}

// Mock price history data
const generatePriceHistory = (days: number, startPrice: number, volatility: number) => {
  const data = []
  let price = startPrice

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Random price movement
    const change = (Math.random() - 0.5) * volatility
    price = price * (1 + change)

    data.push({
      date: date.toISOString().split("T")[0],
      price: price,
      volume: Math.random() * 50000000000,
    })
  }

  return data
}

const priceHistory = {
  "1D": generatePriceHistory(1, 57000, 0.01),
  "7D": generatePriceHistory(7, 55000, 0.02),
  "1M": generatePriceHistory(30, 52000, 0.03),
  "3M": generatePriceHistory(90, 48000, 0.05),
  "1Y": generatePriceHistory(365, 40000, 0.08),
  ALL: generatePriceHistory(1500, 5000, 0.1),
}

// Mock markets data
const markets = [
  { exchange: "Binance", pair: "BTC/USDT", price: 57845.23, volume24h: 5200000000, volumePercentage: 16.0 },
  { exchange: "Coinbase", pair: "BTC/USD", price: 57832.41, volume24h: 3100000000, volumePercentage: 9.5 },
  { exchange: "Kraken", pair: "BTC/USD", price: 57840.12, volume24h: 1800000000, volumePercentage: 5.5 },
  { exchange: "Bitfinex", pair: "BTC/USD", price: 57835.67, volume24h: 1200000000, volumePercentage: 3.7 },
  { exchange: "Huobi", pair: "BTC/USDT", price: 57838.89, volume24h: 2800000000, volumePercentage: 8.6 },
]

// Mock news data
const news = [
  {
    id: "1",
    title: "Bitcoin Surges Past $58,000 as Institutional Adoption Continues",
    snippet: "Major financial institutions announce new Bitcoin investment products, driving the price to new heights.",
    source: "CryptoNews",
    date: "2 hours ago",
    url: "#",
  },
  {
    id: "2",
    title: "Bitcoin Mining Difficulty Reaches All-Time High",
    snippet:
      "The Bitcoin network's mining difficulty has adjusted upward by 5%, reflecting increased competition among miners.",
    source: "BlockchainInsider",
    date: "1 day ago",
    url: "#",
  },
  {
    id: "3",
    title: "El Salvador Adds 100 More Bitcoin to National Reserves",
    snippet:
      "The Central American nation continues its Bitcoin strategy with another purchase during the recent price dip.",
    source: "CryptoDaily",
    date: "2 days ago",
    url: "#",
  },
]

export function CryptoDetail({ id }: { id: string }) {
  const [timeRange, setTimeRange] = useState<"1D" | "7D" | "1M" | "3M" | "1Y" | "ALL">("7D")
  const [inWatchlist, setInWatchlist] = useState(cryptoData.inWatchlist)

  // This would fetch data based on the ID in a real app
  const crypto = cryptoData
  const chartData = priceHistory[timeRange]

  // Calculate price change for selected time range
  const priceChange = chartData[chartData.length - 1].price - chartData[0].price
  const priceChangePercentage = (priceChange / chartData[0].price) * 100

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/cryptocurrencies" className="hover:text-primary">
          Cryptocurrencies
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{crypto.name}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-lg font-mono">
            {crypto.symbol.substring(0, 3)}
          </div>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {crypto.name}
              <span className="text-xl text-muted-foreground">#{crypto.rank}</span>
            </h1>
            <div className="text-muted-foreground">{crypto.symbol}</div>
          </div>
        </div>

        <Button variant="outline" size="sm" className="gap-2" onClick={() => setInWatchlist(!inWatchlist)}>
          {inWatchlist ? (
            <>
              <StarOff className="h-4 w-4" />
              Remove from Watchlist
            </>
          ) : (
            <>
              <Star className="h-4 w-4" />
              Add to Watchlist
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">
              ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={cn("flex items-center text-sm", crypto.change24h >= 0 ? "text-green-500" : "text-red-500")}>
              {crypto.change24h >= 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {Math.abs(crypto.change24h)}% (24h)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">${(crypto.marketCap / 1000000000).toFixed(1)}B</div>
            <div className="text-sm text-muted-foreground">Rank #{crypto.rank}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Volume (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">${(crypto.volume24h / 1000000000).toFixed(1)}B</div>
            <div className="text-sm text-muted-foreground">
              {((crypto.volume24h / crypto.marketCap) * 100).toFixed(2)}% of market cap
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Price Chart</CardTitle>
                <div className="flex gap-2">
                  {(["1D", "7D", "1M", "3M", "1Y", "ALL"] as const).map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
              <CardDescription className="flex items-center">
                <span className={cn(priceChangePercentage >= 0 ? "text-green-500" : "text-red-500")}>
                  {priceChangePercentage >= 0 ? "+" : ""}
                  {priceChangePercentage.toFixed(2)}%
                </span>
                <span className="mx-2">in the last {timeRange}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    price: {
                      label: "Price",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                          if (timeRange === "1D") {
                            return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                          }
                          return value
                        }}
                        minTickGap={30}
                      />
                      <YAxis domain={["auto", "auto"]} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--chart-1))"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Supply Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Circulating Supply</span>
                    <span className="font-medium">
                      {crypto.circulatingSupply.toLocaleString()} {crypto.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Supply</span>
                    <span className="font-medium">
                      {crypto.totalSupply.toLocaleString()} {crypto.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Supply</span>
                    <span className="font-medium">
                      {crypto.totalSupply.toLocaleString()} {crypto.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">% of Max Supply Issued</span>
                    <span className="font-medium">
                      {((crypto.circulatingSupply / crypto.totalSupply) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">All Time High</span>
                    <div className="text-right">
                      <div className="font-medium">${crypto.allTimeHigh.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{crypto.allTimeHighDate}</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price Change (24h)</span>
                    <span className={cn("font-medium", crypto.change24h >= 0 ? "text-green-500" : "text-red-500")}>
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trading Volume (24h)</span>
                    <span className="font-medium">${(crypto.volume24h / 1000000000).toFixed(1)}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Cap Rank</span>
                    <span className="font-medium">#{crypto.rank}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="markets">
          <Card>
            <CardHeader>
              <CardTitle>Markets</CardTitle>
              <CardDescription>
                {crypto.name} is traded on {markets.length} exchanges with a total 24h volume of $
                {(crypto.volume24h / 1000000000).toFixed(1)}B
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exchange</TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Volume (24h)</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Volume %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {markets.map((market, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{market.exchange}</TableCell>
                      <TableCell>{market.pair}</TableCell>
                      <TableCell className="text-right font-mono">
                        $
                        {market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        ${(market.volume24h / 1000000000).toFixed(1)}B
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        {market.volumePercentage.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historical">
          <Card>
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
              <CardDescription>Price and volume history for {crypto.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Open</TableHead>
                    <TableHead className="text-right">High</TableHead>
                    <TableHead className="text-right">Low</TableHead>
                    <TableHead className="text-right">Close</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceHistory["1M"].slice(0, 10).map((day, index) => {
                    // Generate some fake OHLC data based on the day's price
                    const open = day.price * 0.99
                    const high = day.price * 1.02
                    const low = day.price * 0.98
                    const close = day.price

                    return (
                      <TableRow key={index}>
                        <TableCell>{day.date}</TableCell>
                        <TableCell className="text-right font-mono">
                          ${open.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ${high.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ${low.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          ${close.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-right">${(day.volume / 1000000000).toFixed(1)}B</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <div className="grid gap-6">
            {news.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="flex items-center text-xs">
                    <span className="font-medium">{article.source}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{article.snippet}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={article.url} className="flex items-center gap-2">
                      Read full article
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About {crypto.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{crypto.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Links</h3>
                <div className="grid gap-2">
                  <Link
                    href={crypto.website}
                    className="flex items-center gap-2 text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </Link>
                  <Link
                    href={crypto.whitepaper}
                    className="flex items-center gap-2 text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="h-4 w-4" />
                    Whitepaper
                  </Link>
                  {crypto.explorers.map((explorer, index) => (
                    <Link
                      key={index}
                      href={explorer}
                      className="flex items-center gap-2 text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Block Explorer {index + 1}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Social Media</h3>
                <div className="grid gap-2">
                  {Object.entries(crypto.socials).map(([platform, url]) => (
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
