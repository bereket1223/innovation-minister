"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/app/admin/components/Sidebar"
import { Loader2, Database, FileText, Users } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface DashboardStats {
  innovation: number
  research: number
  technology: number
  total: number
  pending: number
  approved: number
  rejected: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
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

        // Calculate statistics
        const allData = [...innovationData, ...researchData, ...technologyData]
        const pending = allData.filter((item) => item.status === "pending").length
        const approved = allData.filter((item) => item.status === "approved").length
        const rejected = allData.filter((item) => item.status === "rejected").length

        setStats({
          innovation: innovationData.length,
          research: researchData.length,
          technology: technologyData.length,
          total: allData.length,
          pending,
          approved,
          rejected,
        })

        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
        toast({
          title: "Error loading statistics",
          description: err.message,
          variant: "destructive",
        })
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading statistics...</span>
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
                <p className="text-red-700">Error loading statistics</p>
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
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Total Entries</CardTitle>
                  <CardDescription>All indigenous knowledge entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">{stats?.total || 0}</div>
                    <Database className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Innovation</CardTitle>
                  <CardDescription>Indigenous innovation entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">{stats?.innovation || 0}</div>
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Research</CardTitle>
                  <CardDescription>Indigenous research entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">{stats?.research || 0}</div>
                    <FileText className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Technology</CardTitle>
                  <CardDescription>Indigenous technology entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">{stats?.technology || 0}</div>
                    <FileText className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <Card className="bg-yellow-50">
                <CardHeader className="pb-2">
                  <CardTitle>Pending Approval</CardTitle>
                  <CardDescription>Entries awaiting review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{stats?.pending || 0}</div>
                    <div className="h-8 w-8 rounded-full bg-yellow-200 flex items-center justify-center">
                      <Users className="h-5 w-5 text-yellow-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardHeader className="pb-2">
                  <CardTitle>Approved</CardTitle>
                  <CardDescription>Entries that have been approved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{stats?.approved || 0}</div>
                    <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle>Rejected</CardTitle>
                  <CardDescription>Entries that have been rejected</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{stats?.rejected || 0}</div>
                    <div className="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center">
                      <Users className="h-5 w-5 text-red-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

