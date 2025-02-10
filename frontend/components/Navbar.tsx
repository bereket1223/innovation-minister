"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import logo from "../public/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState("EN")

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleLanguage = () => setLanguage(language === "EN" ? "ES" : "EN")

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <Image src={logo} alt="Logo" width={50} height={50} className="h-8 w-8 mr-2" />
                <span className="font-semibold text-blue text-lg">EIKRP</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="py-4 px-2 text-blue font-semibold hover:text-black transition duration-300">
              Home
            </Link>
            <Link
              href="/#services"
              className="py-4 px-2 text-blue font-semibold hover:text-black transition duration-300"
            >
              Services
            </Link>
            <Link href="/blog" className="py-4 px-2 text-blue font-semibold hover:text-black transition duration-300">
              Blog
            </Link>
            <Link
              href="/signup"
              className="py-2 px-2 font-medium text-white bg-blue rounded hover:bg-black transition duration-300"
            >
              Sign Up
            </Link>
            <button
              onClick={toggleLanguage}
              className="py-2 px-2 font-medium text-blue rounded hover:bg-gray-200 transition duration-300"
            >
              {language}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
              <svg
                className="w-6 h-6 text-blue hover:text-black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <Link href="/" className="block py-2 px-4 text-sm hover:bg-blue hover:text-white transition duration-300">
          Home
        </Link>
        <Link
          href="/#services"
          className="block py-2 px-4 text-sm hover:bg-blue hover:text-white transition duration-300"
        >
          Services
        </Link>
        <Link href="/blog" className="block py-2 px-4 text-sm hover:bg-blue hover:text-white transition duration-300">
          Blog
        </Link>
        <Link href="/signup" className="block py-2 px-4 text-sm hover:bg-blue hover:text-white transition duration-300">
          Sign Up
        </Link>
        <button
          onClick={toggleLanguage}
          className="block w-full text-left py-2 px-4 text-sm hover:bg-blue hover:text-white transition duration-300"
        >
          {language}
        </button>
      </div>
    </nav>
  )
}

export default Navbar

