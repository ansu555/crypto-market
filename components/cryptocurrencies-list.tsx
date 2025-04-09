"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data - would come from your Redux store in a real app
const allCryptos = Array(100)
  .fill(null)
  .map((_, i) => ({
    id: `crypto-${i + 1}`,
    rank: i + 1,
    name: `Cryptocurrency ${i + 1}`,
    symbol: `CRY${i + 1}`,
    price: Math.random() * 10000,
    change1h: Math.random() * 10 - 5,
    change24h: Math.random() * 20 - 10,
    change7d: Math.random() * 30 - 15,
    marketCap: Math.random() * 1000000000000,
    volume24h: Math.random() * 50000000000,
    circulatingSupply: Math.random() * 100000000,
  }))

export function CryptocurrenciesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rank")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter and sort cryptos
  const filteredCryptos = allCryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedCryptos = [...filteredCryptos].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedCryptos.length / itemsPerPage)
  const paginatedCryptos = sortedCryptos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle sort
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value)
              setSortOrder("asc")
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">Rank</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="change24h">24h Change</SelectItem>
              <SelectItem value="marketCap">Market Cap</SelectItem>
              <SelectItem value="volume24h">Volume (24h)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("rank")}>
                  Rank
                  {sortBy === "rank" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="ml-1 h-3 w-3 inline" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 inline" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                  Name
                  {sortBy === "name" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="ml-1 h-3 w-3 inline" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 inline" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("price")}>
                  Price
                  {sortBy === "price" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="ml-1 h-3 w-3 inline" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 inline" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("change1h")}>
                  1h %
                  {sortBy === "change1h" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="ml-1 h-3 w-3 inline" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 inline" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("change24h")}>
                  24h %
                  {sortBy === "change24h" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="ml-1 h-3 w-3 inline" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 inline" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="text-right hidden md:table-cell">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("change7d")}>
                  7d %
                  {sortBy === "change7d" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="ml-1 h-3 w-3 inline" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 inline" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="text-right hidden md:table-cell">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("marketCap")}>
                  Market Cap
                  {sortBy === "marketCap" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="ml-1 h-3 w-3 inline" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 inline" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="text-right hidden lg:table-cell">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("volume24h")}>
                  Volume (24h)
                  {sortBy === "volume24h" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="ml-1 h-3 w-3 inline" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 inline" />
                    ))}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCryptos.map((crypto) => (
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
                <TableCell className={cn("text-right", crypto.change1h >= 0 ? "text-green-500" : "text-red-500")}>
                  <div className="flex items-center justify-end">
                    {crypto.change1h >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(crypto.change1h).toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell className={cn("text-right", crypto.change24h >= 0 ? "text-green-500" : "text-red-500")}>
                  <div className="flex items-center justify-end">
                    {crypto.change24h >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(crypto.change24h).toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right hidden md:table-cell",
                    crypto.change7d >= 0 ? "text-green-500" : "text-red-500",
                  )}
                >
                  <div className="flex items-center justify-end">
                    {crypto.change7d >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(crypto.change7d).toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  ${(crypto.marketCap / 1000000000).toFixed(1)}B
                </TableCell>
                <TableCell className="text-right hidden lg:table-cell">
                  ${(crypto.volume24h / 1000000000).toFixed(1)}B
                </TableCell>
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
