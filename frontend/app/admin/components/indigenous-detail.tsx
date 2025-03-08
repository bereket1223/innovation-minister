"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, Check, ArrowLeft, Trash2 } from "lucide-react"

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
  createdAt: string
  updatedAt: string
}

export default function IndigenousDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id

  const [data, setData] = useState<IndigenousData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [showPdf, setShowPdf] = useState(false)

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  const fetchData = async () => {
    try {
      setLoading(true)
      // This route is now correct for fetching by ID
      const response = await fetch(`http://localhost:5000/api/department/${id}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      setData(result.data)
      setLoading(false)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this entry? This action cannot be undone.")) {
      try {
        setActionLoading(true)
        const response = await fetch(`http://localhost:5000/api/department/delete/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error(`Failed to delete: ${response.status} ${response.statusText}`)
        }

        router.push("/indigenous-tables")
      } catch (err: any) {
        setError(err.message)
        setActionLoading(false)
      }
    }
  }

  const handleApprove = async () => {
    try {
      setActionLoading(true)
      const response = await fetch(`http://localhost:5000/api/department/approve/${id}`, {
        method: "PUT",
      })

      if (!response.ok) {
        throw new Error(`Failed to approve: ${response.status} ${response.statusText}`)
      }

      // Refresh the data after approval
      await fetchData()
      setActionLoading(false)
    } catch (err: any) {
      setError(err.message)
      setActionLoading(false)
    }
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
            <Button variant="outline" className="mt-4" onClick={() => router.push("/indigenous-tables")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tables
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center p-8">
        <p className="text-lg mb-4">No data found for this ID</p>
        <Button variant="outline" onClick={() => router.push("/indigenous-tables")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tables
        </Button>
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
    <div className="container mx-auto p-4 max-w-5xl">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* PDF Viewer */}
      {data.fileUrl && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Attached Document</span>
              <Button variant="outline" onClick={() => setShowPdf(!showPdf)}>
                {showPdf ? "Hide Document" : "Show Document"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showPdf ? (
              <div className="flex justify-center items-center p-8 border rounded-md">
                <Button onClick={() => window.open(data.fileUrl, "_blank")} className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Open PDF in New Tab
                </Button>
              </div>
            ) : (
              <iframe src={data.fileUrl} className="w-full h-[600px] border rounded-lg shadow-md" title="PDF Viewer" />
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between">
        <Button variant="destructive" onClick={handleDelete} disabled={actionLoading}>
          {actionLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </>
          )}
        </Button>

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
  )
}

