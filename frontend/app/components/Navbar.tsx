'use client' // Mark this as a client component

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLinkClick = () => {
    // Close the mobile menu when a link is clicked
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              href="/#services"
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Services
            </Link>
            <Link
              href="/blog"
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Blog
            </Link>

            {/* Sign Up Button */}
            <Link
              href="/signup"
              onClick={handleLinkClick}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Link>

            {/* Language Button */}
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Language
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              href="/#services"
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Services
            </Link>
            <Link
              href="/blog"
              onClick={handleLinkClick}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Blog
            </Link>

            {/* Sign Up Button */}
            <Link
              href="/signup"
              onClick={handleLinkClick}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Link>

            {/* Language Button */}
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Language
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
