"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Users, FileText, Lightbulb, Cpu, LayoutDashboard } from "lucide-react"

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Users", icon: Users, href: "/admin?tab=users" },
    { name: "Research", icon: FileText, href: "/admin?tab=research" },
    { name: "Innovation", icon: Lightbulb, href: "/admin?tab=innovation" },
    { name: "Technology", icon: Cpu, href: "/admin?tab=technology" },
  ]

  useEffect(() => {
    const tabParam = searchParams.get("tab")
    setActiveItem(tabParam || "dashboard")
  }, [searchParams])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              activeItem === item.name.toLowerCase() ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <item.icon className="inline-block mr-2 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

