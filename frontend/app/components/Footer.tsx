import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin,Clock, Phone, Mail, ExternalLink } from "lucide-react"
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h5 className="text-lg font-bold mb-3">About The Portal</h5>
            <p className="text-gray-300 text-sm mb-3">
              The Ethiopian Indigenous Knowledge Registration Portal documents Ethiopia's valuable indigenous knowledge
              across innovation, research, and technology domains.
            </p>
            <div className="flex space-x-2">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-bold mb-3">Quick Links</h5>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-bold mb-3">Contact Us</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                <div className="text-gray-300">+251 111 55 38 00</div>
              </div>

              <div className="flex items-center">
                <Mail className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                <div className="text-gray-300">info@mint.gov.et</div>
              </div>
               {/* Office Hours */}
               <div className="flex items-start">
                      <Clock className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-1">Office Hours</h4>
                      <p className="text-gray-300">
                        Monday - Friday: 8:30 AM - 5:30 PM
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-bold mb-3">Subscribe</h5>
            <form className="flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-1 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                Go
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-gray-400 mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Ethiopian Indigenous Knowledge Portal
          </p>
          <div className="text-gray-400">
            Developed by{" "}
            <Link
              href="https://www.linkedin.com/in/bereket-kindie-948b40293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline inline-flex items-center"
            >
              Bereket_K
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

