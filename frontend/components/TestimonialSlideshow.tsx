"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import team from "../public/team-1.png"

const testimonials = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
    name: "John Doe",
    role: "CEO, Company 1",
  },
  {
    id: 2,
    text: "Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor.",
    name: "Jane Smith",
    role: "CTO, Company 2",
  },
  {
    id: 3,
    text: "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed.",
    name: "Mike Johnson",
    role: "Founder, Company 3",
  },
  {
    id: 4,
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    name: "Emily Brown",
    role: "Marketing Director, Company 4",
  },
  {
    id: 5,
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    name: "David Wilson",
    role: "Product Manager, Company 5",
  },
  {
    id: 6,
    text: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est.",
    name: "Sarah Lee",
    role: "UX Designer, Company 6",
  },
]

export default function TestimonialSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / getTestimonialsPerSlide()))
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(testimonials.length / getTestimonialsPerSlide())) %
        Math.ceil(testimonials.length / getTestimonialsPerSlide()),
    )
  }

  const getTestimonialsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
    }
    return 3
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap -mx-2">
        {testimonials
          .slice(currentSlide * getTestimonialsPerSlide(), (currentSlide + 1) * getTestimonialsPerSlide())
          .map((testimonial) => (
            <div key={testimonial.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <p className="text-sm mb-4 text-black">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center">
                  <Image
                    src={team}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-bold text-blue text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-black">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue text-white p-2 rounded-full shadow-md hover:bg-black transition duration-300"
        aria-label="Previous testimonials"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue text-white p-2 rounded-full shadow-md hover:bg-black transition duration-300"
        aria-label="Next testimonials"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

