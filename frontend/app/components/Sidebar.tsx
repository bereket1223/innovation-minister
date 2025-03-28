"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, FileText, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
  onNavigate: (path: string) => void
}

export default function Sidebar({ isOpen, toggleSidebar, onNavigate }: SidebarProps) {
  // Always keep sidebar open on desktop
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && isMobile && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 overflow-hidden">
              <h2 className="text-lg font-bold truncate">Ethiopian Knowledge</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Main Menu - Just 4 buttons */}
          <button
            onClick={() => onNavigate("/dashboard")}
            className="flex items-center w-full space-x-3 px-3 py-3 rounded-md hover:bg-white/10 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          
          <button
            onClick={() => onNavigate("/profile")}
            className="flex items-center w-full space-x-3 px-3 py-3 rounded-md hover:bg-white/10 transition-colors"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <Button
          onClick={toggleSidebar}
          size="icon"
          className="rounded-full shadow-lg bg-blue-700 hover:bg-blue-800 text-white"
        >
          <Home className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
}

