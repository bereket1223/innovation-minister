import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4">About Us</h5>
            <p className="text-gray-400 mb-4">
              We are a company dedicated to providing excellent services and valuable content to our customers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue transition duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-blue transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-blue transition duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-400 hover:text-blue transition duration-300">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Contact Us</h5>
            <address className="not-italic text-gray-400">
              <p>123 Main St</p>
              <p>City, Country</p>
              <p>Postal Code</p>
            </address>
            <p className="text-gray-400 mt-2">Phone: (123) 456-7890</p>
            <p className="text-gray-400">Email: info@mywebsite.com</p>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Newsletter</h5>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and offers.</p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue"
              />
              <button
                type="submit"
                className="bg-black text-white px-1 py-2 rounded-r-md hover:blue bg-transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

