"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/app/admin/components/Sidebar"
import { PlusCircle, Search } from "lucide-react"
import SheetOneForm from "./sheet-one-form"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calendar, TrendingUp, Users, Activity } from "lucide-react"

export default function SheetOnePage() {
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // State for managing selected entry and modals
  const [selectedEntry, setSelectedEntry] = useState<any>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const [statsTimeframe, setStatsTimeframe] = useState("week")

  const fetchEntries = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sheet-one", {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await response.json()

      // If entries don't have createdAt, add a fallback date for statistics
      const processedData = (data.data || []).map((entry) => {
        if (!entry.createdAt) {
          return { ...entry, createdAt: entry.updatedAt || new Date().toISOString() }
        }
        return entry
      })

      setEntries(processedData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching entries:", error)
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  // Fetch data on component mount using useEffect instead of useState
  useEffect(() => {
    fetchEntries()
  }, []) // Empty dependency array means this runs once on mount

  const handleAddNew = () => {
    setSelectedEntry(null)
    setShowForm(true)
    setEditMode(false)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditMode(false)
    fetchEntries() // Refresh the list after form submission
  }

  // View entry details
  const handleView = (entry: any) => {
    setSelectedEntry(entry)
    setViewDialogOpen(true)
  }

  // Edit an entry
  const handleEdit = (entry: any) => {
    setSelectedEntry(entry)
    setEditMode(true)
    setShowForm(true)
  }

  // Delete an entry
  const handleDelete = (entry: any) => {
    setSelectedEntry(entry)
    setDeleteDialogOpen(true)
  }

  // Confirm deletion
  const confirmDelete = async () => {
    if (!selectedEntry) return

    try {
      const response = await fetch(`http://localhost:5000/api/sheet-one/${selectedEntry._id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete entry")
      }

      toast({
        title: "Success",
        description: "Entry deleted successfully",
      })

      fetchEntries() // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting entry:", error)
      toast({
        title: "Error",
        description: "Failed to delete entry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
    }
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.hostOrganization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.founderName?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Format data for display in the view dialog
  const formatFieldLabel = (key: string) => {
    // Convert camelCase to Title Case with spaces
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
  }

  const calculateStatistics = () => {
    if (entries.length === 0) return { daily: [], weekly: [], monthly: [], yearly: [] }

    // Get current date and create date objects for different timeframes
    const now = new Date()
    const dayStart = new Date(now)
    dayStart.setHours(0, 0, 0, 0)

    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay())
    weekStart.setHours(0, 0, 0, 0)

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const yearStart = new Date(now.getFullYear(), 0, 1)

    // Count entries by timeframe
    const todayEntries = entries.filter((entry) => new Date(entry.createdAt) >= dayStart).length
    const weekEntries = entries.filter((entry) => new Date(entry.createdAt) >= weekStart).length
    const monthEntries = entries.filter((entry) => new Date(entry.createdAt) >= monthStart).length
    const yearEntries = entries.filter((entry) => new Date(entry.createdAt) >= yearStart).length

    // Group by day (last 7 days)
    const dailyData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      const nextDay = new Date(date)
      nextDay.setDate(date.getDate() + 1)

      const count = entries.filter((entry) => {
        const entryDate = new Date(entry.createdAt)
        return entryDate >= date && entryDate < nextDay
      }).length

      return {
        name: date.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      }
    }).reverse()

    // Group by week (last 4 weeks)
    const weeklyData = Array.from({ length: 4 }, (_, i) => {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 7 * i))
      weekStart.setHours(0, 0, 0, 0)

      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 7)

      const count = entries.filter((entry) => {
        const entryDate = new Date(entry.createdAt)
        return entryDate >= weekStart && entryDate < weekEnd
      }).length

      return {
        name: `Week ${4 - i}`,
        count,
      }
    }).reverse()

    // Group by month (last 6 months)
    const monthlyData = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      const count = entries.filter((entry) => {
        const entryDate = new Date(entry.createdAt)
        return entryDate >= monthStart && entryDate <= monthEnd
      }).length

      return {
        name: monthStart.toLocaleDateString("en-US", { month: "short" }),
        count,
      }
    }).reverse()

    // Group by year (last 3 years)
    const yearlyData = Array.from({ length: 3 }, (_, i) => {
      const year = now.getFullYear() - i
      const yearStart = new Date(year, 0, 1)
      const yearEnd = new Date(year, 11, 31)

      const count = entries.filter((entry) => {
        const entryDate = new Date(entry.createdAt)
        return entryDate >= yearStart && entryDate <= yearEnd
      }).length

      return {
        name: year.toString(),
        count,
      }
    }).reverse()

    return {
      summary: {
        today: todayEntries,
        week: weekEntries,
        month: monthEntries,
        year: yearEntries,
      },
      daily: dailyData,
      weekly: weeklyData,
      monthly: monthlyData,
      yearly: yearlyData,
    }
  }

  const statistics = useMemo(() => calculateStatistics(), [entries])

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sheet One - Host Organizations</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search entries..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.summary?.today || 0}</div>
                <p className="text-xs text-muted-foreground">Entries added today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.summary?.week || 0}</div>
                <p className="text-xs text-muted-foreground">Entries added this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.summary?.month || 0}</div>
                <p className="text-xs text-muted-foreground">Entries added this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Year</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.summary?.year || 0}</div>
                <p className="text-xs text-muted-foreground">Entries added this year</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="week" value={statsTimeframe} onValueChange={setStatsTimeframe} className="mb-6">
            <TabsList>
              <TabsTrigger value="day">Daily</TabsTrigger>
              <TabsTrigger value="week">Weekly</TabsTrigger>
              <TabsTrigger value="month">Monthly</TabsTrigger>
              <TabsTrigger value="year">Yearly</TabsTrigger>
            </TabsList>
            <TabsContent value="day" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Entries</CardTitle>
                  <CardDescription>Number of entries added in the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statistics.daily}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="week" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Entries</CardTitle>
                  <CardDescription>Number of entries added in the last 4 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statistics.weekly}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="month" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Entries</CardTitle>
                  <CardDescription>Number of entries added in the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statistics.monthly}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="year" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Yearly Entries</CardTitle>
                  <CardDescription>Number of entries added in the last 3 years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statistics.yearly}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {showForm ? (
          <SheetOneForm onClose={handleFormClose} initialData={editMode ? selectedEntry : undefined} />
        ) : (
          <div className="bg-white rounded-lg shadow">
            {loading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : filteredEntries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/10">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Host Organization</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Project Title</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Founder</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Region & City</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Sector</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredEntries.map((entry) => (
                      <tr key={entry._id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">{entry.hostOrganization}</td>
                        <td className="px-4 py-3 text-sm">{entry.projectTitle}</td>
                        <td className="px-4 py-3 text-sm">{entry.founderName}</td>
                        <td className="px-4 py-3 text-sm">{entry.regionCity}</td>
                        <td className="px-4 py-3 text-sm">{entry.sector}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleView(entry)}>
                              View
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(entry)}>
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(entry)}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No entries found. Add a new entry to get started.
              </div>
            )}
          </div>
        )}

        {/* View Entry Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle>Entry Details</DialogTitle>
              <DialogDescription>Viewing details for {selectedEntry?.projectTitle}</DialogDescription>
            </DialogHeader>

            {selectedEntry && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {Object.entries(selectedEntry)
                  .filter(([key]) => key !== "_id" && key !== "__v")
                  .map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{formatFieldLabel(key)}</p>
                      <p className="text-sm">{(value as string) || "N/A"}</p>
                    </div>
                  ))}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setViewDialogOpen(false)
                  handleEdit(selectedEntry)
                }}
              >
                Edit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the entry "{selectedEntry?.projectTitle}" and
                remove it from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

