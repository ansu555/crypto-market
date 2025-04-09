"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ExternalLink, Search } from "lucide-react"

// Mock data - would come from your Redux store in a real app
const allNews = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: `news-${i + 1}`,
    title: `Cryptocurrency News Article ${i + 1}`,
    snippet:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    source: ["CryptoNews", "BlockchainInsider", "CryptoDaily", "CoinDesk", "Cointelegraph"][
      Math.floor(Math.random() * 5)
    ],
    date: `${Math.floor(Math.random() * 24)} hours ago`,
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "#",
    tags: ["Bitcoin", "Ethereum", "DeFi", "NFT", "Regulation"]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1),
  }))

export function NewsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const itemsPerPage = 9

  // Get all unique tags
  const allTags = Array.from(new Set(allNews.flatMap((article) => article.tags)))

  // Filter news
  const filteredNews = allNews.filter(
    (article) =>
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.source.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTag === null || article.tags.includes(selectedTag)),
  )

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={selectedTag === null ? "default" : "outline"} size="sm" onClick={() => setSelectedTag(null)}>
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedNews.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
              <CardDescription className="flex items-center text-xs">
                <span className="font-medium">{article.source}</span>
                <span className="mx-2">•</span>
                <span>{article.date}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{article.snippet}</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="px-0 hover:bg-transparent hover:text-primary">
                <Link href={article.url} target="_blank" rel="noopener noreferrer">
                  Read full article
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination className="mt-8">
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
