"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

interface SlideImage {
  src: string
  alt: string
}

export default function AboutSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const images: SlideImage[] = [
    { src: "/about.png", alt: "Indigenous Knowledge" },
    { src: "/h1.jpg", alt: "Ethiopian Heritage" },
    { src: "/h2.jpg", alt: "Traditional Practices" },
    { src: "/h3.jpg", alt: "Cultural Wisdom" },
  ]

  const startSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % images.length)
      }
    }, 5000)
  }

  useEffect(() => {
    startSlideshow()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    startSlideshow()
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
    startSlideshow()
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
    startSlideshow()
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Decorative Background Elements */}
      <div className="absolute -top-6 -left-6 w-full h-full bg-blue-500/20 rounded-2xl transition-all duration-500"></div>
      <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-500/10 rounded-2xl transition-all duration-500"></div>

      {/* Main Slideshow Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl z-10">
        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 bg-gradient-to-t from-black/70 to-transparent">
          <p className="font-medium">{images[currentSlide].alt}</p>
        </div>

        {/* Controls - Only visible on hover or mobile */}
        <div
          className={`absolute inset-0 flex items-center justify-between p-4 z-30 transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-0 md:opacity-0"
          }`}
        >
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pause/Play Button */}
        <button
          onClick={togglePause}
          className={`absolute bottom-4 right-4 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-opacity duration-300 z-30 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

