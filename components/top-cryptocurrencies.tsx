"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data - would come from your Redux store in a real app
const topCryptos = [
  {
    id: "bitcoin",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 57832.41,
    change24h: 2.34,
    marketCap: 1120000000000,
    volume24h: 32500000000,
    sparkline: [56000, 57000, 56800, 57200, 57800],
  },
  {
    id: "ethereum",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3521.67,
    change24h: 1.56,
    marketCap: 420000000000,
    volume24h: 18700000000,
    sparkline: [3450, 3480, 3500, 3490, 3520],
  },
  {
    id: "binancecoin",
    rank: 3,
    name: "Binance Coin",
    symbol: "BNB",
    price: 452.32,
    change24h: -0.78,
    marketCap: 75000000000,
    volume24h: 2100000000,
    sparkline: [455, 453, 450, 451, 452],
  },
  {
    id: "solana",
    rank: 4,
    name: "Solana",
    symbol: "SOL",
    price: 102.45,
    change24h: 5.67,
    marketCap: 42000000000,
    volume24h: 3400000000,
    sparkline: [97, 98, 100, 101, 102],
  },
  {
    id: "cardano",
    rank: 5,
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    change24h: -1.23,
    marketCap: 20500000000,
    volume24h: 980000000,
    sparkline: [0.59, 0.58, 0.57, 0.58, 0.58],
  },
]

export function TopCryptocurrencies() {
  const [view, setView] = useState<"table" | "cards">("table")

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Top Cryptocurrencies</h2>
        <div className="flex items-center gap-2">
          <Button variant={view === "table" ? "default" : "outline"} size="sm" onClick={() => setView("table")}>
            Table
          </Button>
          <Button variant={view === "cards" ? "default" : "outline"} size="sm" onClick={() => setView("cards")}>
            Cards
          </Button>
        </div>
      </div>

      {view === "table" ? <CryptoTable cryptos={topCryptos} /> : <CryptoCards cryptos={topCryptos} />}

      <div className="mt-6 text-center">
        <Button asChild variant="outline">
          <Link href="/cryptocurrencies">
            View All Cryptocurrencies
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

function CryptoTable({ cryptos }: { cryptos: typeof topCryptos }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h %</TableHead>
            <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
            <TableHead className="text-right hidden md:table-cell">Volume (24h)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptos.map((crypto) => (
            <TableRow key={crypto.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{crypto.rank}</TableCell>
              <TableCell>
                <Link
                  href={`/cryptocurrencies/${crypto.id}`}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full mr-3 flex items-center justify-center text-xs font-mono">
                    {crypto.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <div className="font-medium">{crypto.name}</div>
                    <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-right font-mono">
                ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell className={cn("text-right", crypto.change24h >= 0 ? "text-green-500" : "text-red-500")}>
                <div className="flex items-center justify-end">
                  {crypto.change24h >= 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  )}
                  {Math.abs(crypto.change24h)}%
                </div>
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                ${(crypto.marketCap / 1000000000).toFixed(1)}B
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                ${(crypto.volume24h / 1000000000).toFixed(1)}B
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function CryptoCards({ cryptos }: { cryptos: typeof topCryptos }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cryptos.map((crypto) => (
        <Link key={crypto.id} href={`/cryptocurrencies/${crypto.id}`}>
          <Card className="overflow-hidden hover:border-primary transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/10 rounded-full mr-3 flex items-center justify-center text-xs font-mono">
                    {crypto.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <CardTitle>{crypto.name}</CardTitle>
                    <CardDescription>{crypto.symbol}</CardDescription>
                  </div>
                </div>
                <div className="text-sm font-medium">#{crypto.rank}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold font-mono">
                    ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div
                    className={cn(
                      "flex items-center text-sm",
                      crypto.change24h >= 0 ? "text-green-500" : "text-red-500",
                    )}
                  >
                    {crypto.change24h >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(crypto.change24h)}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Market Cap</div>
                  <div className="text-sm text-muted-foreground">${(crypto.marketCap / 1000000000).toFixed(1)}B</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
