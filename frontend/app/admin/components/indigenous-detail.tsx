"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, Check, ArrowLeft, Trash2, ExternalLink, Download, Eye } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Sidebar } from "../components/Sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
  documentPath: string
  agreement: boolean
  status: string
  createdAt: string
  updatedAt: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export function IndigenousDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [data, setData] = useState<IndigenousData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [showPdf, setShowPdf] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  useEffect(() => {
    // Automatically show PDF when data is loaded
    if (data?.fileUrl) {
      setShowPdf(true)
      setPdfLoading(true)
    }
  }, [data])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/department/${id}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      setData(result.data)
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

  const handleDelete = async () => {
    try {
      setActionLoading(true)
      const response = await fetch(`${API_BASE_URL}/department/delete/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status} ${response.statusText}`)
      }

      toast({
        title: "Success",
        description: "Entry deleted successfully",
      })
      router.push("/indigenous-tables")
    } catch (err: any) {
      setError(err.message)
      setActionLoading(false)
      toast({
        title: "Error deleting entry",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const handleApprove = async () => {
    try {
      setActionLoading(true)
      const response = await fetch(`${API_BASE_URL}/department/approve/${id}`, {
        method: "PUT",
      })

      if (!response.ok) {
        throw new Error(`Failed to approve: ${response.status} ${response.statusText}`)
      }

      // Refresh the data after approval
      await fetchData()
      setActionLoading(false)
      toast({
        title: "Success",
        description: "Entry approved successfully",
      })
    } catch (err: any) {
      setError(err.message)
      setActionLoading(false)
      toast({
        title: "Error approving entry",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const handleDownloadPdf = () => {
    if (data?.fileUrl) {
      // Create a temporary anchor element
      const link = document.createElement("a")
      link.href = data.fileUrl
      link.download = `${data.knowledgeTitle.replace(/\s+/g, "_")}_document.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const togglePdfView = () => {
    setShowPdf(!showPdf)

    if (!showPdf) {
      setPdfLoading(true)
      // Scroll to PDF viewer after a short delay to ensure it's rendered
      setTimeout(() => {
        document.getElementById("pdf-viewer")?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

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
                <Button variant="outline" className="mt-4" onClick={() => router.push("/indigenous-tables")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Tables
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="text-center p-8">
            <p className="text-lg mb-4">No data found for this ID</p>
            <Button variant="outline" onClick={() => router.push("/indigenous-tables")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tables
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="outline" onClick={() => router.push("/indigenous-tables")} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">{data.knowledgeTitle}</h1>
            </div>
            <Badge
              className={
                data.status === "approved"
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : data.status === "rejected"
                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              }
            >
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </Badge>
          </div>

          {/* Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Left column - Personal Information */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-500">Full Name</h3>
                  <p>{data.fullName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Gender</h3>
                  <p>{data.gender}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Age</h3>
                  <p>{data.age}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Nationality</h3>
                  <p>{data.nationality}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Region</h3>
                  <p>{data.region}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Zone</h3>
                  <p>{data.zone}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Woreda</h3>
                  <p>{data.woreda}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Kebele</h3>
                  <p>{data.kebele}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Email</h3>
                  <p>{data.email}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Phone Number</h3>
                  <p>{data.phoneNumber}</p>
                </div>
              </CardContent>
            </Card>

            {/* Middle column - Knowledge Information */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Knowledge Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-500">Knowledge Title</h3>
                  <p>{data.knowledgeTitle}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Knowledge Department</h3>
                  <p>{data.knowledgeDepartment}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Sub Category</h3>
                  <p>{data.subCategory}</p>
                </div>
                {data.otherSubCategory && (
                  <div>
                    <h3 className="font-medium text-gray-500">Other Sub Category</h3>
                    <p>{data.otherSubCategory}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-500">Interest Areas</h3>
                  <p>{data.interestAreas}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Submission Date</h3>
                  <p>{formatDate(data.createdAt)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Last Updated</h3>
                  <p>{formatDate(data.updatedAt)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Right column - Additional Information */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-500">Institution</h3>
                  <p>{data.institution || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Department</h3>
                  <p>{data.department || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Designation</h3>
                  <p>{data.designation || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Institution Address</h3>
                  <p>{data.institutionAddress || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Highest Degree</h3>
                  <p>{data.highestDegree || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">University</h3>
                  <p>{data.university || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Completion Year</h3>
                  <p>{data.completionYear || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Specialization</h3>
                  <p>{data.specialization || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Agreement</h3>
                  <p>{data.agreement ? "Yes" : "No"}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* View File Button */}
          {data.fileUrl && (
            <div className="flex justify-center mb-6">
              <Button onClick={togglePdfView} className="bg-primary hover:bg-primary/90" size="lg">
                {showPdf ? (
                  <>
                    <Eye className="h-5 w-5 mr-2" />
                    Hide Document
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-2" />
                    View Document
                  </>
                )}
              </Button>
            </div>
          )}

          {/* PDF Viewer */}
          {showPdf && data.fileUrl && (
            <Card id="pdf-viewer" className="mb-6">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Document: {data.knowledgeTitle}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => window.open(data.fileUrl, "_blank")}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open in New Tab
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[70vh] overflow-hidden rounded-md border">
                  {pdfLoading && (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2">Loading document...</span>
                    </div>
                  )}
                  <iframe
                    src={data.fileUrl}
                    className="w-full h-full border-0"
                    title="PDF Viewer"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                    onLoad={() => setPdfLoading(false)}
                    onError={() => {
                      setPdfLoading(false)
                      toast({
                        title: "Error loading PDF",
                        description: "Could not load the PDF document. Please try opening it in a new tab.",
                        variant: "destructive",
                      })
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={actionLoading}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this indigenous knowledge entry.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    {actionLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="space-x-2">
              <Button variant="outline" onClick={() => router.push("/indigenous-tables")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tables
              </Button>

              {data.status !== "approved" && (
                <Button
                  variant="default"
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

