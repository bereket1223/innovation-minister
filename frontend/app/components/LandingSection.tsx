"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import TestimonialCart from "../components/TestimonialCart"
import ServicesSection from "./ServicesSection"
import AboutSlideshow from "./about-slideshow"
import {
  ArrowRight,
  ChevronDown,
  CheckCircle,
  ExternalLink,
  Target,
  Compass,
  Flag,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Handle scroll effect for parallax and animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    setIsVisible(true) // Trigger initial animation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Two Motion Images */}
      <section className="relative h-screen flex items-center justify-center text-background overflow-hidden">
        {/* Background Image with Motion */}
        <div
          className="absolute inset-0 w-full h-full transform transition-transform duration-1000 ease-out"
          style={{
            transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.2}px)`,
          }}
        >
          <Image src="/carousel-1.jpg" alt="Hero Background" fill priority quality={90} className="object-cover" />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        {/* Second Floating Image with Animation */}
        <div
          className={`absolute right-[10%] bottom-[15%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-8 border-white/20 shadow-2xl transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
          style={{
            transform: `translateY(${Math.sin(scrollY * 0.01) * 20}px) rotate(${scrollY * 0.02}deg)`,
            transitionDelay: "0.5s",
          }}
        >
          <Image src="/about.png" alt="Secondary Image" fill className="object-cover scale-110" />
        </div>

        {/* Content */}
        <div className="z-10 text-left px-4 sm:px-8 max-w-4xl mx-auto md:ml-[10%] md:mr-auto">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
              <span className="text-blue-400 block">Discover</span>
              Ethiopia's Indigenous
              <span className="text-blue-400"> Knowledge</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-10 text-white/90 leading-relaxed max-w-2xl">
              Explore our digital platform designed to preserve and celebrate Ethiopia's valuable indigenous wisdom and
              innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#about"
                className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center"
              >
                Explore Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#services"
                className="bg-transparent text-white border-2 border-white/50 font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link href="#about" className="text-white/80 hover:text-white">
            <ChevronDown className="w-10 h-10" />
          </Link>
        </div>
      </section>

      {/* About Section - Enhanced with Slideshow */}
      <section id="about" className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-5/12 mb-8 md:mb-0 order-2 md:order-1">
                {/* Replaced static images with slideshow component */}
                <AboutSlideshow />
              </div>

              <div className="w-full md:w-7/12 order-1 md:order-2">
                <div className="inline-block px-6 py-2 bg-blue-500/10 rounded-full text-blue-600 font-semibold mb-4">
                  About Our Platform
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 leading-tight">
                  Preserving Ethiopia's <span className="text-blue-500">Indigenous Knowledge</span>
                </h2>
                <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                  The Ethiopian Indigenous Knowledge Registration Portal is a digital platform designed to collect,
                  organize, and document Ethiopia's valuable indigenous knowledge. The portal classifies knowledge into
                  three major categories: Innovation, Technology, and Research, covering a total of 13 subcategories.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  This system enables structured registration and easy access to diverse forms of indigenous practices,
                  skills, and contributions across communities. It serves as a national repository that highlights
                  Ethiopia's traditional wisdom and its relevance in modern development contexts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Comprehensive Documentation",
                    "Accessible Repository",
                    "Cultural Preservation",
                    "Knowledge Sharing",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="#services"
                  className="inline-flex items-center bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Goal Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-6 py-2 bg-blue-500/10 rounded-full text-blue-600 font-semibold mb-4">
              Our Foundation
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Vision, Mission & <span className="text-blue-500">Goals</span>
            </h2>
            <p className="text-lg text-gray-600">
              The guiding principles behind the Ethiopian Indigenous Knowledge Registration Portal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Our Vision",
                description:
                  "To become the premier digital repository for Ethiopia's indigenous knowledge, ensuring its preservation for future generations and recognition on the global stage.",
                icon: <Target className="w-8 h-8 text-blue-500" />,
              },
              {
                title: "Our Mission",
                description:
                  "To systematically document, preserve, and promote Ethiopia's rich indigenous knowledge through a comprehensive digital platform that is accessible to researchers, communities, and the public.",
                icon: <Compass className="w-8 h-8 text-blue-500" />,
              },
              {
                title: "Our Goals",
                description:
                  "To create a structured classification system for indigenous knowledge, facilitate knowledge sharing across communities, and integrate traditional wisdom with modern development initiatives.",
                icon: <Flag className="w-8 h-8 text-blue-500" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group border border-gray-100 h-full flex flex-col"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-lg mb-6 text-gray-600 flex-grow">{item.description}</p>
                <div className="w-12 h-1 bg-blue-500 group-hover:w-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section Component */}
      <div id="services" className="bg-gray-50 py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-6 py-2 bg-blue-500/10 rounded-full text-blue-600 font-semibold mb-4">
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Comprehensive <span className="text-blue-500">Solutions</span>
            </h2>
            <p className="text-lg text-gray-600">Explore our full range of services designed to meet your needs</p>
          </div>
          <ServicesSection />
        </div>
      </div>
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore Ethiopia's Indigenous Knowledge?</h2>
            <p className="text-xl mb-10 text-white/80 max-w-3xl mx-auto">
              Join us in preserving and celebrating the rich cultural heritage and wisdom of Ethiopia.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonial Cart Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-6 py-2 bg-blue-500/10 rounded-full text-blue-600 font-semibold mb-4">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              What Our <span className="text-blue-500">Clients Say</span>
            </h2>
            <p className="text-lg text-gray-600">Hear from those who have experienced our services firsthand</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <TestimonialCart />
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-gray-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-6 py-2 bg-blue-500/10 rounded-full text-blue-600 font-semibold mb-4">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Contact <span className="text-blue-500">Us</span>
            </h2>
            <p className="text-lg text-gray-600">Visit our head office at the Ministry of Innovation and Technology</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                {/* Map Image */}
                <div className="absolute inset-0 bg-gray-200">
                  <Image
                    src="/location.png"
                    alt="Map of Ministry of Innovation and Technology, Ethiopia"
                    fill
                    className="object-cover"
                  />

                  {/* Map Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <MapPin className="h-10 w-10 text-blue-600" />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>

                {/* Map Attribution */}
                <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  Map data © 2023
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <a
                  href="https://maps.google.com/?q=Ministry+of+Innovation+and+Technology+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Ministry of Innovation and Technology</h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start">
                    <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                      <p className="text-gray-600">
                        Kazanchis, Africa Avenue
                        <br />
                        Addis Ababa, Ethiopia
                        <br />
                        P.O. Box 2490
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                      <p className="text-gray-600">
                        +251 111 55 38 00
                        <br />
                        +251 111 55 38 01
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600">
                        info@mint.gov.et
                        <br />
                        support@indigenousknowledge.et
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

