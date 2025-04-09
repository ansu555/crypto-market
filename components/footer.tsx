import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between py-10 md:py-6">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <div className="font-bold text-lg mb-2">
            <span className="text-primary">Crypto</span>
            <span>Market</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CryptoMarket. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
