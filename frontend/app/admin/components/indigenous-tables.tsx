"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Eye, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { Sidebar } from "./Sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface IndigenousData {
  _id: string
  fullName: string
  knowledgeTitle: string
  knowledgeDepartment: string
  subCategory: string
  fileUrl: string | null
  status: string
  createdAt: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Helper function to filter data by time period
const filterDataByTimePeriod = (data: IndigenousData[], period: string): IndigenousData[] => {
  const now = new Date()
  const startDate = new Date()

  switch (period) {
    case "day":
      startDate.setHours(0, 0, 0, 0)
      break
    case "week":
      startDate.setDate(now.getDate() - now.getDay()) // Start of week (Sunday)
      startDate.setHours(0, 0, 0, 0)
      break
    case "month":
      startDate.setDate(1) // Start of month
      startDate.setHours(0, 0, 0, 0)
      break
    case "year":
      startDate.setMonth(0, 1) // Start of year (Jan 1)
      startDate.setHours(0, 0, 0, 0)
      break
    default:
      return data // Return all data if no valid period
  }

  return data.filter((item) => new Date(item.createdAt) >= startDate)
}

function IndigenousTable({
  data,
  caption,
}: {
  data: IndigenousData[]
  caption: string
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [timePeriod, setTimePeriod] = useState("all")
  const rowsPerPage = 10
  const [searchTerm, setSearchTerm] = useState("")

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  // Sort data by createdAt (most recent first)
  const sortedData = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Filter data by time period and search term
  const filteredData = sortedData
    .filter((item) => (timePeriod === "all" ? true : filterDataByTimePeriod([item], timePeriod).length > 0))
    .filter(
      (item) =>
        searchTerm === "" ||
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.knowledgeTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage)

  // Handle page changes
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Reset to page 1 when time period changes
  useEffect(() => {
    setCurrentPage(1)
  }, [timePeriod])

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-3 pr-10 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Filter by:</span>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="day">Today ({filterDataByTimePeriod(sortedData, "day").length})</SelectItem>
                <SelectItem value="week">This week ({filterDataByTimePeriod(sortedData, "week").length})</SelectItem>
                <SelectItem value="month">This month ({filterDataByTimePeriod(sortedData, "month").length})</SelectItem>
                <SelectItem value="year">This year ({filterDataByTimePeriod(sortedData, "year").length})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>{caption}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Knowledge Title</TableHead>
              <TableHead>Sub Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.knowledgeTitle}</TableCell>
                  <TableCell>{item.subCategory}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : item.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/indigenous-detail/${item._id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export function IndigenousTables() {
  const [data, setData] = useState<{ [key: string]: IndigenousData[] }>({
    innovation: [],
    research: [],
    technology: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = ["indigenous-innovation", "indigenous-research", "indigenous-technology"]

        const requests = departments.map(async (dept) => {
          const response = await fetch(`${API_BASE_URL}/department/type/${dept}`)

          if (!response.ok) {
            throw new Error(`Failed to fetch ${dept}: ${response.status} ${response.statusText}`)
          }

          const result = await response.json()
          return result.data || []
        })

        const [innovationData, researchData, technologyData] = await Promise.all(requests)

        setData({
          innovation: innovationData,
          research: researchData,
          technology: technologyData,
        })
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
        toast({
          title: "Error loading data",
          description: err.message,
          variant: "destructive",
        })
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading data...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="ml-3">
                <p className="text-red-700">Error loading data</p>
                <p className="text-sm text-red-500">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Indigenous Knowledge Database</h1>

            <Tabs defaultValue="innovation">
              <TabsList className="mb-4">
                <TabsTrigger value="innovation">Indigenous Innovation</TabsTrigger>
                <TabsTrigger value="research">Indigenous Research</TabsTrigger>
                <TabsTrigger value="technology">Indigenous Technology</TabsTrigger>
              </TabsList>

              <TabsContent value="innovation">
                <IndigenousTable data={data.innovation} caption="A list of indigenous innovations." />
              </TabsContent>

              <TabsContent value="research">
                <IndigenousTable data={data.research} caption="A list of indigenous research." />
              </TabsContent>

              <TabsContent value="technology">
                <IndigenousTable data={data.technology} caption="A list of indigenous technologies." />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

