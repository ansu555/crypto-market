"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

// Mock data - would come from your Redux store in a real app
const latestNews = [
  {
    id: "1",
    title: "Bitcoin Surges Past $58,000 as Institutional Adoption Continues",
    snippet: "Major financial institutions announce new Bitcoin investment products, driving the price to new heights.",
    source: "CryptoNews",
    date: "2 hours ago",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "#",
  },
  {
    id: "2",
    title: "Ethereum 2.0 Upgrade: What You Need to Know About the Merge",
    snippet:
      "The long-awaited transition to proof-of-stake is approaching. Here's what it means for investors and the network.",
    source: "BlockchainInsider",
    date: "5 hours ago",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "#",
  },
  {
    id: "3",
    title: "Regulatory Clarity: New Framework for Cryptocurrency Proposed",
    snippet:
      "Lawmakers introduce a bipartisan bill aimed at providing clear guidelines for crypto businesses and investors.",
    source: "CryptoDaily",
    date: "1 day ago",
    imageUrl: "/placeholder.svg?height=200&width=400",
    url: "#",
  },
]

export function LatestNews() {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Latest News</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestNews.map((article) => (
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
              <p className="text-sm text-muted-foreground line-clamp-3">{article.snippet}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="px-0 hover:bg-transparent hover:text-primary">
                <Link href={article.url}>
                  Read more
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button asChild variant="outline">
          <Link href="/news">
            View All News
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
