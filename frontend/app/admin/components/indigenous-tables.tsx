"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { Sidebar } from "../components/Sidebar"

interface IndigenousData {
  _id: string
  fullName: string
  knowledgeTitle: string
  knowledgeDepartment: string
  subCategory: string
  fileUrl: string | null
  status: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

function IndigenousTable({
  data,
  caption,
}: {
  data: IndigenousData[]
  caption: string
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Knowledge Title</TableHead>
            <TableHead>Sub Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
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
              <TableCell colSpan={5} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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

