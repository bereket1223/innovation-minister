"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

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
}

function IndigenousTable({
  data,
  caption,
  onViewFile,
}: { data: IndigenousData[]; caption: string; onViewFile: (url: string) => void }) {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Nationality</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Zone</TableHead>
          <TableHead>Woreda</TableHead>
          <TableHead>Kebele</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Institution</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Institution Address</TableHead>
          <TableHead>Highest Degree</TableHead>
          <TableHead>University</TableHead>
          <TableHead>Completion Year</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Knowledge Title</TableHead>
          <TableHead>Knowledge Department</TableHead>
          <TableHead>Sub Category</TableHead>
          <TableHead>Other Sub Category</TableHead>
          <TableHead>Interest Areas</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Agreement</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.fullName}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.nationality}</TableCell>
              <TableCell>{item.region}</TableCell>
              <TableCell>{item.zone}</TableCell>
              <TableCell>{item.woreda}</TableCell>
              <TableCell>{item.kebele}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.institution}</TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>{item.designation}</TableCell>
              <TableCell>{item.institutionAddress}</TableCell>
              <TableCell>{item.highestDegree}</TableCell>
              <TableCell>{item.university}</TableCell>
              <TableCell>{item.completionYear}</TableCell>
              <TableCell>{item.specialization}</TableCell>
              <TableCell>{item.knowledgeTitle}</TableCell>
              <TableCell>{item.knowledgeDepartment}</TableCell>
              <TableCell>{item.subCategory}</TableCell>
              <TableCell>{item.otherSubCategory}</TableCell>
              <TableCell>{item.interestAreas}</TableCell>
              <TableCell>
                {item.fileUrl ? (
                  <button onClick={() => onViewFile(item.fileUrl)} className="text-blue-500 underline">
                    View File
                  </button>
                ) : (
                  <span className="text-gray-400">No File</span>
                )}
              </TableCell>
              <TableCell>{item.agreement ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={25} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
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
  const [fileError, setFileError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = "http://localhost:5000/api/department"
        const departments = ["indigenous-innovation", "indigenous-research", "indigenous-technology"]

        const requests = departments.map(async (dept) => {
          const response = await fetch(`${baseUrl}/${dept}`)

          if (!response.ok) {
            throw new Error(`Failed to fetch ${dept}: ${response.status} ${response.statusText}`)
          }

          return response.json()
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

  const handleViewFile = async (url: string) => {
    setSelectedFile(url)
    setFileError(null)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`)
      }
      // If the fetch is successful, the file exists and is accessible
      // However, we can't guarantee it's a valid PDF
      const contentType = response.headers.get("content-type")
      if (contentType && !contentType.includes("application/pdf")) {
        throw new Error("The file is not a PDF")
      }
    } catch (err: any) {
      console.error("Error fetching file:", err)
      setFileError(`Error loading file: ${err.message}`)
    }
  }

  if (loading) return <p>Loading data...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div>
      <Tabs defaultValue="innovation">
        <TabsList>
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
          <IndigenousTable data={data.research} caption="A list of indigenous research." onViewFile={handleViewFile} />
        </TabsContent>
        <TabsContent value="technology">
          <IndigenousTable
            data={data.technology}
            caption="A list of indigenous technologies."
            onViewFile={handleViewFile}
          />
        </TabsContent>
      </Tabs>

      {selectedFile && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">PDF Preview</h2>
          <div className="flex flex-col gap-2">
            {fileError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{fileError}</AlertDescription>
              </Alert>
            ) : (
              <iframe src={selectedFile} className="w-full h-[600px] border rounded-lg shadow-md" title="PDF Preview" />
            )}
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">If the PDF doesn't load, it might be due to CORS restrictions</p>
              <a href={selectedFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

