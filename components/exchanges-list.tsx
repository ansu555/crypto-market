"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search } from "lucide-react"

// Mock data - would come from your Redux store in a real app
const allExchanges = [
  {
    id: "binance",
    name: "Binance",
    url: "https://binance.com",
    trustScore: 10,
    volume24h: 12500000000,
    markets: 1289,
    country: "Global",
    yearEstablished: 2017,
  },
  {
    id: "coinbase",
    name: "Coinbase",
    url: "https://coinbase.com",
    trustScore: 10,
    volume24h: 8700000000,
    markets: 562,
    country: "USA",
    yearEstablished: 2012,
  },
  {
    id: "kraken",
    name: "Kraken",
    url: "https://kraken.com",
    trustScore: 10,
    volume24h: 4200000000,
    markets: 645,
    country: "USA",
    yearEstablished: 2011,
  },
  {
    id: "kucoin",
    name: "KuCoin",
    url: "https://kucoin.com",
    trustScore: 9,
    volume24h: 3100000000,
    markets: 789,
    country: "Seychelles",
    yearEstablished: 2017,
  },
  {
    id: "ftx",
    name: "FTX",
    url: "https://ftx.com",
    trustScore: 9,
    volume24h: 2800000000,
    markets: 456,
    country: "Bahamas",
    yearEstablished: 2019,
  },
  {
    id: "huobi",
    name: "Huobi Global",
    url: "https://huobi.com",
    trustScore: 8,
    volume24h: 2500000000,
    markets: 678,
    country: "Seychelles",
    yearEstablished: 2013,
  },
  {
    id: "bitfinex",
    name: "Bitfinex",
    url: "https://bitfinex.com",
    trustScore: 8,
    volume24h: 1900000000,
    markets: 345,
    country: "British Virgin Islands",
    yearEstablished: 2012,
  },
  {
    id: "gate",
    name: "Gate.io",
    url: "https://gate.io",
    trustScore: 8,
    volume24h: 1700000000,
    markets: 1023,
    country: "Cayman Islands",
    yearEstablished: 2013,
  },
  {
    id: "gemini",
    name: "Gemini",
    url: "https://gemini.com",
    trustScore: 9,
    volume24h: 1200000000,
    markets: 123,
    country: "USA",
    yearEstablished: 2014,
  },
  {
    id: "bitstamp",
    name: "Bitstamp",
    url: "https://bitstamp.net",
    trustScore: 9,
    volume24h: 950000000,
    markets: 78,
    country: "Luxembourg",
    yearEstablished: 2011,
  },
]

export function ExchangesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter exchanges
  const filteredExchanges = allExchanges.filter(
    (exchange) =>
      exchange.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exchange.country.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination
  const totalPages = Math.ceil(filteredExchanges.length / itemsPerPage)
  const paginatedExchanges = filteredExchanges.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search exchanges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead>Exchange</TableHead>
              <TableHead className="text-center">Trust Score</TableHead>
              <TableHead className="text-right">24h Volume</TableHead>
              <TableHead className="text-right hidden md:table-cell">Markets</TableHead>
              <TableHead className="hidden lg:table-cell">Country</TableHead>
              <TableHead className="hidden lg:table-cell">Established</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExchanges.map((exchange, index) => (
              <TableRow key={exchange.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Link
                    href={`/exchanges/${exchange.id}`}
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full mr-3 flex items-center justify-center text-xs">
                      {exchange.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="font-medium">{exchange.name}</div>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                    {exchange.trustScore}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">${(exchange.volume24h / 1000000000).toFixed(1)}B</TableCell>
                <TableCell className="text-right hidden md:table-cell">{exchange.markets}</TableCell>
                <TableCell className="hidden lg:table-cell">{exchange.country}</TableCell>
                <TableCell className="hidden lg:table-cell">{exchange.yearEstablished}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) setCurrentPage(currentPage - 1)
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber =
              currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i

            if (pageNumber <= 0 || pageNumber > totalPages) return null

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(pageNumber)
                  }}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) setCurrentPage(currentPage + 1)
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
