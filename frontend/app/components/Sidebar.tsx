"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="p-2 bg-gray-800 text-white rounded-md fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-xl font-bold px-4">Dashboard</h2>
        <nav>
          <Link
            href="/dashboard"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/services"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Services
          </Link>
          <Link
            href="/dashboard/settings"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Settings
          </Link>
        </nav>
      </div>
    </>
  )
}
