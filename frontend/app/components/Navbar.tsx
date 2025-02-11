import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Blog
            </Link>
            <Link
              href="/signup"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

