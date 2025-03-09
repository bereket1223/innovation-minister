"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Loader2, CheckCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
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
import { toast } from "@/components/ui/use-toast"

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

export function IndigenousDetail({ id }: { id: string }) {
  const router = useRouter()
  const [data, setData] = useState<IndigenousData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [approving, setApproving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
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

    fetchData()
  }, [id])

  const handleApprove = async () => {
    if (!data) return

    setApproving(true)
    try {
      const response = await fetch(`http://localhost:5000/api/department/${id}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      })

      if (!response.ok) {
        throw new Error(`Failed to approve: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      setData({ ...data, status: "approved" })
      toast({
        title: "Success",
        description: "Entry has been approved",
        variant: "default",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setApproving(false)
    }
  }

  const handleDelete = async () => {
    if (!data) return

    setDeleting(true)
    try {
      const response = await fetch(`http://localhost:5000/api/department/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status} ${response.statusText}`)
      }

      toast({
        title: "Success",
        description: "Entry has been deleted",
        variant: "default",
      })

      // Navigate back to the main page after successful deletion
      router.push("/")
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading data...</span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container mx-auto p-6">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="ml-3">
              <p className="text-red-700">Error loading data</p>
              <p className="text-sm text-red-500">{error || "Data not found"}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex space-x-2">
          {data.status !== "approved" && (
            <Button
              variant="outline"
              className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200"
              onClick={handleApprove}
              disabled={approving}
            >
              {approving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
              Approve
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this indigenous knowledge entry.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 text-white hover:bg-red-700"
                  disabled={deleting}
                >
                  {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold">{data.knowledgeTitle}</CardTitle>
              <CardDescription>{data.knowledgeDepartment}</CardDescription>
            </div>
            <Badge
              className={`px-3 py-1 text-sm ${
                data.status === "approved"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : data.status === "rejected"
                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
              }`}
            >
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span>{data.fullName}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Gender:</span>
                    <span>{data.gender}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{data.age}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Nationality:</span>
                    <span>{data.nationality}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{data.email}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{data.phoneNumber}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">Location</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Region:</span>
                    <span>{data.region}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Zone:</span>
                    <span>{data.zone}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Woreda:</span>
                    <span>{data.woreda}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Kebele:</span>
                    <span>{data.kebele}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Affiliation Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Institution:</span>
                    <span>{data.institution || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{data.department || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Designation:</span>
                    <span>{data.designation || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Institution Address:</span>
                    <span>{data.institutionAddress || "N/A"}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">Education & Qualifications</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Highest Degree:</span>
                    <span>{data.highestDegree || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">University:</span>
                    <span>{data.university || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Completion Year:</span>
                    <span>{data.completionYear || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Specialization:</span>
                    <span>{data.specialization || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold mb-4">Indigenous Knowledge Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <span className="text-muted-foreground">Knowledge Title:</span>
                  <span>{data.knowledgeTitle}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <span className="text-muted-foreground">Knowledge Department:</span>
                  <span>{data.knowledgeDepartment}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <span className="text-muted-foreground">Sub Category:</span>
                  <span>{data.subCategory}</span>
                </div>
                {data.otherSubCategory && (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <span className="text-muted-foreground">Other Sub Category:</span>
                    <span>{data.otherSubCategory}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <span className="text-muted-foreground">Interest Areas:</span>
                  <span>{data.interestAreas}</span>
                </div>
              </div>
            </div>

            {data.fileUrl && (
              <>
                <Separator className="my-6" />
                <div>
                  <h3 className="text-lg font-semibold mb-4">Attached Document</h3>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Document File</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        onClick={() => window.open(data.fileUrl, "_blank")}
                      >
                        View Document
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <iframe src={data.fileUrl} className="w-full h-[400px]" title="PDF Viewer" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

