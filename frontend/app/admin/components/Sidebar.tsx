"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Database, FileText, Users, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboards",
      icon: Home,
    },
    {
      name: "Indigenous Knowledge",
      href: "/indigenous-tables",
      icon: Database,
    },
    {
      name: "Documents",
      href: "/documents",
      icon: FileText,
    },
    {
      name: "Users",
      href: "/users",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu} className="rounded-full">
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="bg-primary/10 h-full w-64 shadow-lg pt-16">
          <div className="px-4 py-6">
            <h2 className="text-xl font-bold mb-6 text-center text-primary">Indigenous Knowledge</h2>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <div
                    className={cn(
                      "flex items-center px-4 py-3 text-sm rounded-md hover:bg-primary/10",
                      pathname === item.href ? "bg-primary/20 font-medium text-primary" : "",
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-20 left-0 right-0 px-4">
              <Button variant="destructive" className="w-full flex items-center justify-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className={cn("hidden md:block h-screen w-64 border-r bg-primary/5", className)}>
        <div className="px-4 py-6 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-center text-primary">Indigenous Knowledge</h2>
          <nav className="space-y-2 flex-grow">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-md hover:bg-primary/10 transition-colors",
                    pathname === item.href ? "bg-primary/20 font-medium text-primary" : "",
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </div>
              </Link>
            ))}
          </nav>
          <div className="mt-auto mb-6">
            <Button variant="destructive" className="w-full flex items-center justify-center">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

