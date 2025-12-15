"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield } from "lucide-react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Stories" },
  { href: "#pricing", label: "Pricing" },
  { href: "/partners", label: "Partners" }, // Dedicated Partners page
  { href: "/onboarding", label: "Onboarding" }, // General onboarding link
  { href: "/contact", label: "Contact" }, // Re-added Contact link
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">
            GBV <span className="text-primary neon-text">Vault</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="neon-border bg-primary/10 hover:bg-primary/20 text-primary">
              <Link href="/signup">Get Started</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button asChild className="neon-border bg-primary/10 hover:bg-primary/20 text-primary">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="glass-card border-l-border">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-border" />
              <SignedOut>
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="neon-border bg-primary/10 hover:bg-primary/20 text-primary">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <Button asChild className="neon-border bg-primary/10 hover:bg-primary/20 text-primary w-full">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
