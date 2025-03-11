"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Briefcase, BarChart2, Cpu, FileIcon, ExternalLink } from "lucide-react"
import Sidebar from "../components/Sidebar"
import ProfileDropdown from "../components/ProfileDropdown"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ServiceCardProps {
  name: string
  description: string
  icon: React.ElementType
  options: { title: string; description: string; image: string }[]
}

function ServiceCard({ name, description, icon: Icon, options }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const router = useRouter()

  const handleApply = (option: string) => {
    router.push(`/form?service=${name}&option=${option}`)
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer space-y-1 transition-colors duration-200 hover:bg-slate-50">
            <div className="flex items-center space-x-2">
              <Icon className="h-6 w-6 text-indigo-500" />
              <CardTitle className="text-xl">{name}</CardTitle>
            </div>
            <CardDescription className="text-sm text-gray-600">{description}</CardDescription>
            <div className="flex justify-end">
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-4 mt-2">
              {options.map((option, index) => (
                <div key={index} className="rounded-lg border border-gray-200 overflow-hidden">
                  <div
                    className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setSelectedOption(selectedOption === option.title ? null : option.title)}
                  >
                    <span className="font-medium">{option.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${selectedOption === option.title ? "rotate-180" : ""}`}
                    />
                  </div>

                  {selectedOption === option.title && (
                    <div className="p-4 bg-white">
                      <img
                        src={option.image || "/placeholder.svg"}
                        alt={option.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                      <Button className="w-full" onClick={() => handleApply(option.title)}>
                        Apply
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

interface KnowledgeEntry {
  fullName: string
  knowledgeTitle: string
  knowledgeDepartment: string
  subCategory: string
  fileUrl: string | null
  status: string
  createdAt: string
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [knowledgeData, setKnowledgeData] = useState<KnowledgeEntry[]>([])

  const handleProfileClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/knowledge", {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setKnowledgeData(data)
        setShowProfile(true)
      } else {
        console.error("Failed to fetch knowledge data")
      }
    } catch (error) {
      console.error("Error fetching knowledge data:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const services = [
    {
      name: "Consulting Services",
      description: "Expert guidance and personalized solutions to help your business grow.",
      icon: Briefcase,
      options: [
        { title: "Strategy Consulting", description: "Develop a winning business strategy", image: "/strategy.jpg" },
        { title: "Financial Advisory", description: "Optimize your financial performance", image: "/finance.jpg" },
        {
          title: "Operations Consulting",
          description: "Streamline your business operations",
          image: "/operations.jpg",
        },
      ],
    },
    {
      name: "Management Solutions",
      description: "Comprehensive services to optimize workflows and improve efficiency.",
      icon: BarChart2,
      options: [
        {
          title: "Project Management",
          description: "Ensure project success with our expert management",
          image: "/project.jpg",
        },
        {
          title: "Change Management",
          description: "Navigate organizational changes effectively",
          image: "/change.jpg",
        },
        { title: "Risk Management", description: "Identify and mitigate potential risks", image: "/risk.jpg" },
      ],
    },
    {
      name: "Technology Services",
      description: "Cutting-edge solutions to enhance your technical capabilities.",
      icon: Cpu,
      options: [
        { title: "Web Development", description: "Create stunning and functional websites", image: "/web.jpg" },
        { title: "Cloud Solutions", description: "Harness the power of cloud computing", image: "/cloud.jpg" },
        { title: "Cybersecurity", description: "Protect your digital assets from threats", image: "/security.jpg" },
      ],
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-4">
            <ProfileDropdown onProfileClick={handleProfileClick} />
          </div>

          {showProfile ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Knowledge Entries</CardTitle>
                <CardDescription>Your submitted knowledge entries and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Knowledge Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Sub-Category</TableHead>
                      <TableHead>File</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {knowledgeData.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.fullName}</TableCell>
                        <TableCell>{entry.knowledgeTitle}</TableCell>
                        <TableCell>{entry.knowledgeDepartment}</TableCell>
                        <TableCell>{entry.subCategory}</TableCell>
                        <TableCell>
                          {entry.fileUrl ? (
                            <a
                              href={entry.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-500 hover:text-blue-700"
                            >
                              <FileIcon className="w-4 h-4 mr-1" />
                              View File
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          ) : (
                            "No file"
                          )}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              entry.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : entry.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {entry.status}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(entry.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <>
              <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl text-white p-8 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Service Portal</h1>
                <p className="text-xl md:text-2xl opacity-90">
                  Explore our range of services designed to elevate your business. Select a service, choose an option,
                  and embark on your journey to success!
                </p>
              </section>

              <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    name={service.name}
                    description={service.description}
                    icon={service.icon}
                    options={service.options}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

