"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Cryptocurrencies", href: "/cryptocurrencies" },
    { name: "Exchanges", href: "/exchanges" },
    { name: "News", href: "/news" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-bold text-xl">
              <span className="text-primary">Crypto</span>
              <span>Market</span>
            </div>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <ModeToggle />
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="hidden md:inline-flex">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}
