"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    text: "The Indigenous Knowledge Portal has been instrumental in preserving our community's traditional farming techniques. Future generations will now have access to this valuable knowledge.",
    name: "Abebe Kebede",
    role: "Community Elder, Amhara Region",
    avatar: "/team-1.jpg",
  },
  {
    id: 2,
    text: "As a researcher, I've found the portal to be an invaluable resource. The structured categorization of indigenous knowledge makes it easy to access information that was previously scattered.",
    name: "Dr. Tigist Haile",
    role: "Ethnobotanist, Addis Ababa University",
    avatar: "/team-1.jpg",
  },
  {
    id: 3,
    text: "The registration process was straightforward, allowing our community to document traditional medicinal practices that have been passed down for generations.",
    name: "Bekele Tadesse",
    role: "Traditional Healer, Oromia Region",
    avatar: "/team-1.jpg",
  },
  {
    id: 4,
    text: "This platform bridges the gap between traditional wisdom and modern applications. It's helping us integrate indigenous knowledge into contemporary development initiatives.",
    name: "Hiwot Mengistu",
    role: "Development Consultant, NGO Sector",
    avatar: "/team-1.jpg",
  },
  {
    id: 5,
    text: "The portal has become a vital tool for our educational curriculum, helping students appreciate and learn from Ethiopia's rich cultural heritage and traditional knowledge systems.",
    name: "Professor Dawit Alemu",
    role: "Education Ministry Advisor",
    avatar: "/team-1.jpg",
  },
  {
    id: 6,
    text: "As an artisan, I've been able to document our traditional weaving techniques. The platform ensures these skills won't be lost and might even inspire innovation in the textile industry.",
    name: "Yeshi Demeke",
    role: "Master Weaver, SNNPR Region",
    avatar: "/team-1.jpg",
  },
]

export default function TestimonialCart() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [testimonialsPerSlide, setTestimonialsPerSlide] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTestimonialsPerSlide(1)
      } else if (window.innerWidth < 1024) {
        setTestimonialsPerSlide(2)
      } else {
        setTestimonialsPerSlide(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide)

  const nextSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % totalSlides)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const prevSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className={`flex transition-transform duration-500 ease-in-out ${isAnimating ? "opacity-50" : "opacity-100"}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="flex flex-nowrap min-w-full gap-4">
              {testimonials
                .slice(slideIndex * testimonialsPerSlide, (slideIndex + 1) * testimonialsPerSlide)
                .map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-2"
                    style={{ flex: `0 0 calc(100% / ${testimonialsPerSlide})` }}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="mb-4 text-blue-500">
                        <Quote size={24} className="opacity-50" />
                      </div>
                      <p className="text-gray-700 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous testimonials"
          disabled={isAnimating}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2 items-center">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && currentSlide !== index) {
                  setIsAnimating(true)
                  setCurrentSlide(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSlide === index ? "bg-blue-500 w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next testimonials"
          disabled={isAnimating}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

