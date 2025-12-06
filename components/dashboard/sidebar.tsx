"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Shield,
  LayoutDashboard,
  FolderOpen,
  Upload,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
  HelpCircle,
  FileText,
  Gavel,
} from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/cases", icon: FolderOpen, label: "Cases" },
  { href: "/dashboard/evidence", icon: FileText, label: "Evidence" },
  { href: "/dashboard/affidavits", icon: Gavel, label: "Affidavits" },
  { href: "/dashboard/upload", icon: Upload, label: "Upload Evidence" },
  { href: "/dashboard/search", icon: Search, label: "Search" },
]

const bottomNavItems = [
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/help", icon: HelpCircle, label: "Help Center" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const resolveIsActive = (href: string) => {
    if (href === "/dashboard/search") {
      return pathname === href || pathname.startsWith(href + "/")
    } else {
      return pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
    }
  }

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40 flex flex-col transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">
              GBV <span className="text-primary">Vault</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = resolveIsActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-sidebar-primary/10 text-sidebar-primary neon-border"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all w-full">
            <SignOutButton>
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                Sign Out
              </div>
            </SignOutButton>
          </button>
        </div>
      </aside>
    </>
  )
}
