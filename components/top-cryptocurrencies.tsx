"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGetCryptosQuery } from "@/app/services/cryptoApi"
import { Skeleton } from "@/components/ui/skeleton"

export function TopCryptocurrencies() {
  const [view, setView] = useState<"table" | "cards">("table")
  const { data: cryptosList, isFetching, error } = useGetCryptosQuery(5); // Fetch top 5 cryptocurrencies
  
  // Add these debug logs
  console.log('API Response:', cryptosList);
  console.log('Loading state:', isFetching);
  console.log('Error:', error);
  
  const isLoading = isFetching || !cryptosList;

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

      {error ? (
        <div className="text-center p-6 text-red-500">
          Error loading cryptocurrency data. Please try again later.
        </div>
      ) : isLoading ? (
        <LoadingSkeleton view={view} />
      ) : (
        <>
          {view === "table" ? (
            <CryptoTable cryptos={mapApiDataToCryptos(cryptosList.coins)} />
          ) : (
            <CryptoCards cryptos={mapApiDataToCryptos(cryptosList.coins)} />
          )}
        </>
      )}

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

// Define types for our cryptocurrency data
interface Cryptocurrency {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  sparkline: number[];
}

interface ApiCoin {
  uuid?: string;
  id?: string;
  rank: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  marketCap: string;
  '24hVolume'?: string;
  sparkline?: string[];
}

// Helper function to map API data to our component's expected format
function mapApiDataToCryptos(apiCoins: ApiCoin[]): Cryptocurrency[] {
  return apiCoins?.map(coin => ({
    id: coin.uuid || coin.id || '',
    rank: parseInt(coin.rank),
    name: coin.name,
    symbol: coin.symbol,
    price: parseFloat(coin.price),
    change24h: parseFloat(coin.change),
    marketCap: parseInt(coin.marketCap),
    volume24h: parseInt(coin['24hVolume'] || '0'),
    sparkline: coin.sparkline?.map((price: string) => parseFloat(price)) || [],
  })) || [];
}

function LoadingSkeleton({ view }: { view: "table" | "cards" }) {
  return view === "table" ? (
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
          {[1, 2, 3, 4, 5].map((i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-4" /></TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
              <TableCell className="text-right hidden md:table-cell"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
              <TableCell className="text-right hidden md:table-cell"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
  <Skeleton className="h-8 w-8 rounded-full mr-3" />
  <div>
    <Skeleton className="h-4 w-20 mb-1" />
    <Skeleton className="h-3 w-10" />
  </div>
</div>
              <Skeleton className="h-4 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <Skeleton className="h-6 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
          <div>
            <Skeleton className="h-4 w-16" />
          </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CryptoTable({ cryptos }: { cryptos: Cryptocurrency[] }) {
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

function CryptoCards({ cryptos }: { cryptos: Cryptocurrency[] }) {
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
