"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lightbulb,
  BookOpen,
  Cpu,
  Utensils,
  Scissors,
  BookMarked,
  Star,
  Building,
  Swords,
  Music,
  Home,
  GraduationCap,
  Shirt,
  Stethoscope,
  PlusCircle,
} from "lucide-react"
import Sidebar from "../components/Sidebar"
import ProfileDropdown from "../components/ProfileDropdown"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "react-hot-toast"

interface KnowledgeEntry {
  id: string
  fullName: string
  phoneNumber: string
  knowledgeTitle: string
  knowledgeDepartment: string
  subCategory: string
  status: string
  rejectionReason?: string
  createdAt: string
}

// Define subcategories once and reuse
const subcategories = [
  { title: "Food and Beverages", icon: Utensils },
  { title: "Handicraft", icon: Scissors },
  { title: "Scriptures", icon: BookMarked },
  { title: "Astronomy", icon: Star },
  { title: "Construction", icon: Building },
  { title: "Conflict Resolution", icon: Swords },
  { title: "Entertainment", icon: Music },
  { title: "Traditional House Building", icon: Home },
  { title: "Education System", icon: GraduationCap },
  { title: "Clothing Industry", icon: Shirt },
  { title: "Philosophy", icon: BookOpen },
  { title: "Traditional Medicine", icon: Stethoscope },
  { title: "Agriculture", icon: Lightbulb },
]

export default function Dashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showProfile, setShowProfile] = useState(false)
  const [knowledgeData, setKnowledgeData] = useState<KnowledgeEntry[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Update the handleProfileClick function to use the existing endpoints
  const handleProfileClick = async () => {
    setIsLoading(true)
    setShowProfile(true)

    try {
      // Get user data from localStorage
      const storedUserData = localStorage.getItem("userData")
      if (!storedUserData) {
        toast.error("User profile not found. Please log in again.")
        setKnowledgeData([])
        setIsLoading(false)
        return
      }

      const userData = JSON.parse(storedUserData)
      const userPhone = userData.phone

      if (!userPhone) {
        toast.error("Phone number not found in user profile.")
        setKnowledgeData([])
        setIsLoading(false)
        return
      }

      console.log("Fetching knowledge data for phone:", userPhone)

      // Fetch all departments and filter on the client side
      // This is a workaround until a specific endpoint is created on the backend
      const response = await fetch(`http://localhost:5000/api/department`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`Error fetching knowledge data: ${response.status}`)
      }

      const data = await response.json()
      console.log("Received data:", data)

      // Check if data is an array, if not, handle accordingly
      let departmentsArray = []

      if (Array.isArray(data)) {
        departmentsArray = data
      } else if (data.departments && Array.isArray(data.departments)) {
        departmentsArray = data.departments
      } else if (data.data && Array.isArray(data.data)) {
        departmentsArray = data.data
      } else {
        // If it's a single object, wrap it in an array
        departmentsArray = [data]
      }

      // Filter departments to only include those matching the user's phone number
      const userDepartments = departmentsArray.filter((dept: any) => {
        // Check both phoneNumber and phone fields to be safe
        return (dept.phoneNumber && dept.phoneNumber === userPhone) || (dept.phone && dept.phone === userPhone)
      })

      console.log("Filtered departments for user:", userDepartments)

      // Transform the data to match the KnowledgeEntry interface
      const formattedData = userDepartments.map((item: any) => ({
        id: item._id || item.id || "",
        fullName: item.fullName || "",
        phoneNumber: item.phoneNumber || item.phone || "",
        knowledgeTitle: item.knowledgeTitle || "",
        knowledgeDepartment: item.knowledgeDepartment || item.department || "",
        subCategory: item.subCategory || "",
        status: item.status || "Pending",
        rejectionReason: item.rejectionReason || "",
        createdAt: item.createdAt || new Date().toISOString(),
      }))

      setKnowledgeData(formattedData)
    } catch (error) {
      console.error("Failed to fetch knowledge data:", error)
      toast.error("Failed to fetch your knowledge entries. Please try again.")
      setKnowledgeData([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = (category: string, subcategory: string) => {
    // Store the selected category and subcategory in localStorage
    localStorage.setItem("selectedCategory", category)
    localStorage.setItem("selectedSubcategory", subcategory)
    router.push("/form")
  }

  const handleNavigate = (path: string) => {
    if (path === "/profile") {
      handleProfileClick()
    } else {
      router.push(path)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // 3 main categories with the same 13 subcategories
  const categories = [
    {
      name: "Indigenous Innovation",
      description: "Traditional Ethiopian innovations",
      icon: Lightbulb,
      image: "/innovation.jpg",
      color: "from-blue-600 to-blue-800",
      subcategories: subcategories,
    },
    {
      name: "Indigenous Research",
      description: "Ethiopian knowledge systems",
      icon: BookOpen,
      image: "/research.jpg",
      color: "from-green-600 to-green-800",
      subcategories: subcategories,
    },
    {
      name: "Indigenous Technology",
      description: "Traditional tools and systems",
      icon: Cpu,
      image: "/technology.jpg",
      color: "from-purple-600 to-purple-800",
      subcategories: subcategories,
    },
  ]

  const handleSearch = () => {
    console.log("Searching for:", searchQuery)
    // You could add additional search logic here if needed
    // For example, if you want to only filter when the button is clicked:
    // setActiveSearchQuery(searchQuery);
  }

  // Filter knowledge data based on search query and active tab
  const filteredKnowledgeData = knowledgeData.filter((entry) => {
    const matchesSearch =
      searchQuery === "" ||
      entry.knowledgeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.knowledgeDepartment.toLowerCase().includes(searchQuery.toLowerCase()) // Added search by department

    const matchesTab = activeTab === "all" || entry.status.toLowerCase() === activeTab

    return matchesSearch && matchesTab
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />

      <div
        className={`flex-grow overflow-y-auto p-4 md:p-6 ${sidebarOpen ? "md:ml-64" : ""} transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-2 text-blue-800 hover:bg-blue-50"
              >
                <Lightbulb className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Indigenous Knowledge</h1>
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <ProfileDropdown onProfileClick={handleProfileClick} />
            </div>
          </div>

          {showProfile ? (
            <Card className="mb-6 bg-white border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-4">
                <CardTitle>My Knowledge Entries</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-0">
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Knowledge Title</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Sub-Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            {activeTab === "rejected" || activeTab === "all" ? (
                              <TableHead>Rejection Reason</TableHead>
                            ) : null}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredKnowledgeData.length > 0 ? (
                            filteredKnowledgeData.map((entry, index) => (
                              <TableRow key={index}>
                                <TableCell>{entry.fullName}</TableCell>
                                <TableCell>{entry.phoneNumber}</TableCell>
                                <TableCell>{entry.knowledgeTitle}</TableCell>
                                <TableCell>{entry.knowledgeDepartment}</TableCell>
                                <TableCell>{entry.subCategory}</TableCell>
                                <TableCell>
                                  <Badge
                                    className={`${
                                      entry.status.toLowerCase() === "approved"
                                        ? "bg-blue-100 text-blue-800"
                                        : entry.status.toLowerCase() === "rejected"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-amber-100 text-amber-800"
                                    }`}
                                  >
                                    {entry.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{formatDate(entry.createdAt)}</TableCell>
                                {(activeTab === "rejected" || activeTab === "all") && (
                                  <TableCell>
                                    {entry.status.toLowerCase() === "rejected" && entry.rejectionReason ? (
                                      <span className="text-red-600 text-sm">{entry.rejectionReason}</span>
                                    ) : entry.status.toLowerCase() === "rejected" ? (
                                      <span className="text-gray-400">No reason provided</span>
                                    ) : null}
                                  </TableCell>
                                )}
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-4">
                                No entries found. Start by registering your indigenous knowledge.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </TabsContent>

                  {/* Filter tabs by status */}
                  {["approved", "pending", "rejected"].map((status) => (
                    <TabsContent key={status} value={status} className="mt-0">
                      {isLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Full Name</TableHead>
                              <TableHead>Phone Number</TableHead>
                              <TableHead>Knowledge Title</TableHead>
                              <TableHead>Department</TableHead>
                              <TableHead>Sub-Category</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Date</TableHead>
                              {status === "rejected" && <TableHead>Rejection Reason</TableHead>}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredKnowledgeData
                              .filter((entry) => entry.status.toLowerCase() === status)
                              .map((entry, index) => (
                                <TableRow key={index}>
                                  <TableCell>{entry.fullName}</TableCell>
                                  <TableCell>{entry.phoneNumber}</TableCell>
                                  <TableCell>{entry.knowledgeTitle}</TableCell>
                                  <TableCell>{entry.knowledgeDepartment}</TableCell>
                                  <TableCell>{entry.subCategory}</TableCell>
                                  <TableCell>
                                    <Badge
                                      className={`${
                                        entry.status.toLowerCase() === "approved"
                                          ? "bg-blue-100 text-blue-800"
                                          : entry.status.toLowerCase() === "rejected"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-amber-100 text-amber-800"
                                      }`}
                                    >
                                      {entry.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{formatDate(entry.createdAt)}</TableCell>
                                  {status === "rejected" && (
                                    <TableCell>
                                      {entry.rejectionReason ? (
                                        <span className="text-red-600 text-sm">{entry.rejectionReason}</span>
                                      ) : (
                                        <span className="text-gray-400">No reason provided</span>
                                      )}
                                    </TableCell>
                                  )}
                                </TableRow>
                              ))}
                            {filteredKnowledgeData.filter((entry) => entry.status.toLowerCase() === status).length ===
                              0 && (
                              <TableRow>
                                <TableCell colSpan={7} className="text-center py-4">
                                  No {status} entries found.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="flex justify-end mt-4">
                  <Button onClick={() => setShowProfile(false)} className="bg-blue-700 hover:bg-blue-800 text-white">
                    Back to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {categories.map((category, index) => (
                  <Card
                    key={index}
                    className="bg-white shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border-0"
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  >
                    <div className={`relative h-32 w-full overflow-hidden bg-gradient-to-r ${category.color}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <category.icon className="h-16 w-16 text-white opacity-20" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-white">{category.name}</h3>
                          <p className="text-white/80 text-sm mt-1">{category.description}</p>
                        </div>
                      </div>
                    </div>
                    <CardFooter className="p-3 flex justify-between items-center bg-white">
                      <span className="text-sm text-gray-500">{category.subcategories.length} subcategories</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-700 hover:bg-blue-50 p-0 h-8 w-8 rounded-full"
                      >
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {selectedCategory ? (
                <div id="register" className="mb-6 animate-fadeIn">
                  <Card className="bg-white shadow-md overflow-hidden border-0">
                    <CardHeader
                      className={`bg-gradient-to-r ${categories.find((c) => c.name === selectedCategory)?.color} text-white py-4`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {categories.find((c) => c.name === selectedCategory)?.icon && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                              {React.createElement(
                                categories.find((c) => c.name === selectedCategory)?.icon as React.ElementType,
                                { className: "h-4 w-4 text-white" },
                              )}
                            </div>
                          )}
                          <CardTitle>{selectedCategory}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={() => setSelectedCategory(null)}
                        >
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {categories
                          .find((c) => c.name === selectedCategory)
                          ?.subcategories.map((subcategory, idx) => (
                            <Card
                              key={idx}
                              className="border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                              onClick={() => handleRegister(selectedCategory, subcategory.title)}
                            >
                              <CardContent className="p-3 flex flex-col items-center text-center">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 mb-2">
                                  <subcategory.icon className="h-6 w-6" />
                                </div>
                                <h5 className="font-medium text-sm text-gray-800">{subcategory.title}</h5>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {subcategories.map((subcategory, idx) => (
                    <Card
                      key={idx}
                      className="bg-white shadow-sm hover:shadow-md transition-all border border-gray-100"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700">
                            <subcategory.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-800">{subcategory.title}</h5>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {categories.map((category, catIdx) => (
                            <Badge
                              key={catIdx}
                              className={`cursor-pointer hover:opacity-80 ${
                                category.name === "Indigenous Innovation"
                                  ? "bg-blue-100 text-blue-800"
                                  : category.name === "Indigenous Research"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-purple-100 text-purple-800"
                              }`}
                              onClick={() => handleRegister(category.name, subcategory.title)}
                            >
                              {category.name.split(" ")[1]}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <Card className="bg-white shadow-md overflow-hidden border-0">
                <div className="grid md:grid-cols-3">
                  {categories.map((category, idx) => (
                    <div
                      key={idx}
                      className={`p-4 ${idx === 0 ? "bg-blue-50" : idx === 1 ? "bg-green-50" : "bg-purple-50"}`}
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <category.icon
                          className={`h-5 w-5 ${
                            idx === 0 ? "text-blue-700" : idx === 1 ? "text-green-700" : "text-purple-700"
                          }`}
                        />
                        <h3
                          className={`font-bold ${
                            idx === 0 ? "text-blue-900" : idx === 1 ? "text-green-900" : "text-purple-900"
                          }`}
                        >
                          {category.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`w-full ${
                          idx === 0
                            ? "border-blue-300 text-blue-700 hover:bg-blue-100"
                            : idx === 1
                              ? "border-green-300 text-green-700 hover:bg-green-100"
                              : "border-purple-300 text-purple-700 hover:bg-purple-100"
                        }`}
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        Explore
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

