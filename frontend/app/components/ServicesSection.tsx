"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Cog,
  Wheat,
  Coffee,
  Scissors,
  BookText,
  Star,
  Building,
  Shield,
  Music,
  Home,
  GraduationCap,
  Shirt,
  Brain,
  Stethoscope,
  Plus,
  X,
} from "lucide-react"

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null)
  const [activeOption, setActiveOption] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Reset active option when service changes
  useEffect(() => {
    setActiveOption(null)
  }, [activeService])

  const handleServiceClick = (index) => {
    setIsAnimating(true)
    setTimeout(() => {
      setActiveService(activeService === index ? null : index)
      setIsAnimating(false)
    }, 300)
  }

  const handleOptionClick = (index) => {
    setActiveOption(activeOption === index ? null : index)
  }

  const subcategories = [
    {
      name: "Agriculture",
      icon: <Wheat className="h-5 w-5" />,
      description: "Traditional farming techniques, crop rotation methods, and sustainable agricultural practices.",
    },
    {
      name: "Food and Beverages",
      icon: <Coffee className="h-5 w-5" />,
      description: "Indigenous food preparation, preservation techniques, and traditional beverages.",
    },
    {
      name: "Handicraft",
      icon: <Scissors className="h-5 w-5" />,
      description: "Traditional craftsmanship, artisanal techniques, and handmade products.",
    },
    {
      name: "Scriptures",
      icon: <BookText className="h-5 w-5" />,
      description: "Ancient texts, manuscripts, and written knowledge systems.",
    },
    {
      name: "Astronomy",
      icon: <Star className="h-5 w-5" />,
      description: "Traditional celestial navigation, star mapping, and astronomical knowledge.",
    },
    {
      name: "Construction",
      icon: <Building className="h-5 w-5" />,
      description: "Indigenous building techniques, materials, and architectural knowledge.",
    },
    {
      name: "Conflict Resolution",
      icon: <Shield className="h-5 w-5" />,
      description: "Traditional methods of mediation, reconciliation, and community justice.",
    },
    {
      name: "Entertainment",
      icon: <Music className="h-5 w-5" />,
      description: "Indigenous music, dance, storytelling, and recreational activities.",
    },
    {
      name: "Traditional House Building",
      icon: <Home className="h-5 w-5" />,
      description: "Vernacular architecture, traditional housing designs, and construction methods.",
    },
    {
      name: "Education System",
      icon: <GraduationCap className="h-5 w-5" />,
      description: "Indigenous teaching methods, knowledge transmission, and learning systems.",
    },
    {
      name: "Clothing Industry",
      icon: <Shirt className="h-5 w-5" />,
      description: "Traditional textile production, weaving techniques, and clothing designs.",
    },
    {
      name: "Philosophy",
      icon: <Brain className="h-5 w-5" />,
      description: "Indigenous worldviews, ethical systems, and philosophical traditions.",
    },
    {
      name: "Traditional Medicine",
      icon: <Stethoscope className="h-5 w-5" />,
      description: "Herbal remedies, healing practices, and medicinal knowledge.",
    },
  ]

  const services = [
    {
      title: "Indigenous Innovation",
      description:
        "Novel solutions and creative adaptations developed by Ethiopian communities to address local challenges using traditional knowledge and practices.",
      image: "/innovation.jpg",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "blue",
      options: subcategories.map((subcat) => ({
        ...subcat,
        moreInfo: `Register your Indigenous Innovation in ${subcat.name.toLowerCase()} that demonstrates unique Ethiopian approaches to problem-solving. These innovations represent creative solutions developed over generations to address specific challenges in the ${subcat.name.toLowerCase()} sector using locally available resources and traditional knowledge.`,
      })),
    },
    {
      title: "Indigenous Research",
      description:
        "Systematic inquiry and knowledge generation methods developed by Ethiopian communities to understand their environment, society, and cultural practices.",
      image: "/research.jpg",
      icon: <BookOpen className="w-8 h-8" />,
      color: "emerald",
      options: subcategories.map((subcat) => ({
        ...subcat,
        moreInfo: `Document your Indigenous Research in ${subcat.name.toLowerCase()} that represents Ethiopian methodologies for investigating and understanding the world. This includes traditional ways of observing, testing, and validating knowledge in the ${subcat.name.toLowerCase()} domain that have been developed and refined over generations.`,
      })),
    },
    {
      title: "Indigenous Technology",
      description:
        "Tools, techniques, and processes developed by Ethiopian communities to manipulate their environment and improve their quality of life using traditional knowledge.",
      image: "/technology.jpg",
      icon: <Cog className="w-8 h-8" />,
      color: "amber",
      options: subcategories.map((subcat) => ({
        ...subcat,
        moreInfo: `Register your Indigenous Technology in ${subcat.name.toLowerCase()} that showcases Ethiopian technical knowledge and practical applications. These technologies represent the tools, techniques, and processes that have been developed to solve practical problems in the ${subcat.name.toLowerCase()} sector using locally available materials and traditional expertise.`,
      })),
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => {
          const colorClass = {
            blue: {
              bg: "bg-blue-500",
              light: "bg-blue-50",
              medium: "bg-blue-100",
              text: "text-blue-500",
              border: "border-blue-200",
              hover: "hover:bg-blue-600",
              ring: "ring-blue-500",
              gradient: "from-blue-500 to-blue-600",
            },
            emerald: {
              bg: "bg-emerald-500",
              light: "bg-emerald-50",
              medium: "bg-emerald-100",
              text: "text-emerald-500",
              border: "border-emerald-200",
              hover: "hover:bg-emerald-600",
              ring: "ring-emerald-500",
              gradient: "from-emerald-500 to-emerald-600",
            },
            amber: {
              bg: "bg-amber-500",
              light: "bg-amber-50",
              medium: "bg-amber-100",
              text: "text-amber-500",
              border: "border-amber-200",
              hover: "hover:bg-amber-600",
              ring: "ring-amber-500",
              gradient: "from-amber-500 to-amber-600",
            },
          }[service.color]

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border ${
                activeService === index
                  ? `border-${service.color}-300 ring-1 ${colorClass.ring}`
                  : "border-gray-100 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${colorClass.gradient} opacity-80`}></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-center mb-2">{service.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <button
                  className={`flex items-center justify-center w-full px-6 py-3 rounded-xl transition-colors ${
                    activeService === index
                      ? `${colorClass.bg} text-white`
                      : `${colorClass.light} ${colorClass.text} hover:${colorClass.medium}`
                  }`}
                  onClick={() => handleServiceClick(index)}
                  disabled={isAnimating}
                >
                  <span className="mr-2">{activeService === index ? "Hide Subcategories" : "View Subcategories"}</span>
                  {activeService === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Subcategories Section - Only visible when a service is active */}
      {activeService !== null && (
        <div className={`mb-16 transition-all duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div
              className={`p-6 ${
                activeService === 0 ? "bg-blue-500" : activeService === 1 ? "bg-emerald-500" : "bg-amber-500"
              } text-white`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-lg mr-3">{services[activeService].icon}</div>
                  <h3 className="text-2xl font-bold">{services[activeService].title} Subcategories</h3>
                </div>
                <button
                  onClick={() => setActiveService(null)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services[activeService].options.map((option, optionIndex) => {
                  const colorClass = {
                    0: {
                      bg: "bg-blue-500",
                      light: "bg-blue-50",
                      medium: "bg-blue-100",
                      text: "text-blue-500",
                      border: "border-blue-200",
                      hover: "hover:bg-blue-600",
                    },
                    1: {
                      bg: "bg-emerald-500",
                      light: "bg-emerald-50",
                      medium: "bg-emerald-100",
                      text: "text-emerald-500",
                      border: "border-emerald-200",
                      hover: "hover:bg-emerald-600",
                    },
                    2: {
                      bg: "bg-amber-500",
                      light: "bg-amber-50",
                      medium: "bg-amber-100",
                      text: "text-amber-500",
                      border: "border-amber-200",
                      hover: "hover:bg-amber-600",
                    },
                  }[activeService]

                  return (
                    <div
                      key={optionIndex}
                      className={`rounded-xl overflow-hidden transition-all duration-300 border ${
                        activeOption === optionIndex ? colorClass.border : "border-gray-100"
                      } ${
                        activeOption === optionIndex ? "shadow-md" : "shadow-sm hover:shadow-md"
                      } ${colorClass.light}`}
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className={`p-3 rounded-lg ${colorClass.medium} mr-4`}>{option.icon}</div>
                          <h4 className="text-lg font-semibold text-gray-900">{option.name}</h4>
                        </div>

                        <p className="text-gray-600 mb-5 leading-relaxed">{option.description}</p>

                        <div className="flex justify-between items-center">
                          <button
                            className={`flex items-center ${colorClass.text} hover:underline transition-colors text-sm font-medium`}
                            onClick={() => handleOptionClick(optionIndex)}
                          >
                            {activeOption === optionIndex ? "Show Less" : "Read More"}
                            {activeOption === optionIndex ? (
                              <ChevronUp size={16} className="ml-1" />
                            ) : (
                              <ChevronDown size={16} className="ml-1" />
                            )}
                          </button>

                          <button
                            className={`flex items-center p-2 rounded-full ${colorClass.medium} ${colorClass.text}`}
                            onClick={() => handleOptionClick(optionIndex)}
                          >
                            {activeOption === optionIndex ? <ChevronUp size={16} /> : <Plus size={16} />}
                          </button>
                        </div>

                        {activeOption === optionIndex && (
                          <div className="mt-5 pt-5 border-t border-gray-200">
                            <p className="text-gray-600 mb-6 leading-relaxed">{option.moreInfo}</p>
                            <button
                              className={`flex items-center px-5 py-3 ${colorClass.bg} text-white font-medium rounded-lg ${colorClass.hover} transition-colors w-full justify-center`}
                              onClick={() => (window.location.href = "/login")}
                            >
                              Register Your Knowledge
                              <ArrowRight size={16} className="ml-2" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold mb-8 text-gray-800 text-center">
          Understanding Indigenous Knowledge Categories
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-5">
            <div className="flex items-center">
              <div className="bg-blue-50 p-4 rounded-lg mr-4">
                <Lightbulb className="h-7 w-7 text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold text-blue-500">Indigenous Innovation</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Ethiopian communities have developed unique innovations to address local challenges using traditional
              knowledge. These innovations represent creative adaptations to environmental, social, and economic
              conditions that have evolved over generations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From water harvesting techniques in arid regions to natural pest control methods in agriculture, these
              innovations demonstrate the ingenuity and problem-solving capabilities embedded in Ethiopia's indigenous
              knowledge systems.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center">
              <div className="bg-emerald-50 p-4 rounded-lg mr-4">
                <BookOpen className="h-7 w-7 text-emerald-500" />
              </div>
              <h4 className="text-xl font-semibold text-emerald-500">Indigenous Research</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Traditional Ethiopian communities have developed sophisticated methods for investigating and understanding
              their world. These research methodologies include systematic observation, experimentation, and knowledge
              validation techniques.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From traditional weather prediction systems to medicinal plant efficacy testing, these research approaches
              have enabled communities to generate reliable knowledge that has sustained them for centuries.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center">
              <div className="bg-amber-50 p-4 rounded-lg mr-4">
                <Cog className="h-7 w-7 text-amber-500" />
              </div>
              <h4 className="text-xl font-semibold text-amber-500">Indigenous Technology</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Ethiopian communities have developed a wide range of technologies using locally available materials and
              traditional expertise. These technologies represent practical applications of indigenous knowledge to
              solve everyday challenges.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From traditional irrigation systems and food preservation techniques to architectural designs adapted to
              local climates, these technologies demonstrate the technical sophistication embedded in Ethiopia's
              cultural heritage.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

