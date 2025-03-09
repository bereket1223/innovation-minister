"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Eye, FileText, Loader2 } from "lucide-react"
import Link from "next/link"

interface IndigenousData {
  _id: string
  fullName: string
  gender: string
  age: string
  nationality: string
  region: string
  zone: string
  woreda: string
  kebele: string
  email: string
  phoneNumber: string
  institution: string
  department: string
  designation: string
  institutionAddress: string
  highestDegree: string
  university: string
  completionYear: string
  specialization: string
  knowledgeTitle: string
  knowledgeDepartment: string
  subCategory: string
  otherSubCategory: string
  interestAreas: string
  fileUrl: string
  agreement: boolean
  status: string
}

function IndigenousTable({
  data,
  caption,
  onViewFile,
}: {
  data: IndigenousData[]
  caption: string
  onViewFile: (url: string) => void
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Knowledge Title</TableHead>
            <TableHead>Knowledge Department</TableHead>
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
                <TableCell>{item.knowledgeDepartment}</TableCell>
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
                    {item.fileUrl && (
                      <Button variant="outline" size="sm" onClick={() => onViewFile(item.fileUrl)}>
                        <FileText className="h-4 w-4 mr-1" />
                        File
                      </Button>
                    )}
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
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = "http://localhost:5000/api/department"
        const departments = ["indigenous-innovation", "indigenous-research", "indigenous-technology"]

        const requests = departments.map(async (dept) => {
          const response = await fetch(`${baseUrl}/type/${dept}`)

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
      }
    }

    fetchData()
  }, [])

  const handleViewFile = (url: string) => {
    setSelectedFile(url)
    // Scroll to the PDF viewer
    setTimeout(() => {
      document.getElementById("pdf-viewer")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div className="ml-3">
            <p className="text-red-700">Error loading data</p>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
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
            <IndigenousTable
              data={data.innovation}
              caption="A list of indigenous innovations."
              onViewFile={handleViewFile}
            />
          </TabsContent>

          <TabsContent value="research">
            <IndigenousTable
              data={data.research}
              caption="A list of indigenous research."
              onViewFile={handleViewFile}
            />
          </TabsContent>

          <TabsContent value="technology">
            <IndigenousTable
              data={data.technology}
              caption="A list of indigenous technologies."
              onViewFile={handleViewFile}
            />
          </TabsContent>
        </Tabs>
      </div>

      {selectedFile && (
        <div id="pdf-viewer" className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">PDF Document</h2>
            <Button variant="outline" onClick={() => window.open(selectedFile, "_blank")}>
              Open in New Tab
            </Button>
          </div>
          <iframe src={selectedFile} className="w-full h-[600px] border rounded-lg shadow-md" title="PDF Viewer" />
        </div>
      )}
    </div>
  )
}

