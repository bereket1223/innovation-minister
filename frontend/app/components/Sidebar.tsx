"use client"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import ProfileDropdown from "./ProfileDropdown"

export default function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="p-2 bg-gray-800 text-white rounded-md fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col h-screen`}
      >
        {/* Profile Dropdown */}
        <div className="px-4 mb-6">
          <ProfileDropdown />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <Link href="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
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

        {/* Back to Home Button */}
        <div className="px-4 py-4">
          <Link
            href="/"
            className="block w-full py-2 text-center bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  )
}

