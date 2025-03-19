"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { Sidebar } from "@/app/admin/components/Sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  Eye,
  Trash2,
  Search,
  Loader2,
  Download,
  Calendar,
  Mail,
  Phone,
  UserIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  MoreHorizontal,
  Lock,
  EyeOff,
  Check,
  AlertTriangle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface User {
  id: string
  fullName: string
  email: string
  phone: string
  profilePictureUrl: string
  createdAt: string
  // For demonstration only - never store actual passwords like this
  demoPassword?: string
}

type TimeFilter = "all" | "today" | "week" | "month" | "year"

// Function to generate a random password for demonstration
const generateDemoPassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export default function UsersPage() {
  // User data state
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // UI state
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all")
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [searchField, setSearchField] = useState<"all" | "name" | "email" | "phone">("all")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Password reset state
  const [isResetPasswordMode, setIsResetPasswordMode] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [securityWarningShown, setSecurityWarningShown] = useState(false)

  // Refs
  const passwordInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, searchField, timeFilter])

  // Focus password input when reset mode is activated
  useEffect(() => {
    if (isResetPasswordMode && passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }, [isResetPasswordMode])

  // Show security warning when trying to view passwords
  useEffect(() => {
    const hasVisiblePasswords = Object.values(showPasswords).some((value) => value)
    if (hasVisiblePasswords && !securityWarningShown) {
      toast({
        title: "Security Warning",
        description: "Displaying passwords is a security risk. This is for demonstration purposes only.",
        variant: "destructive",
        duration: 5000,
      })
      setSecurityWarningShown(true)
    }
  }, [showPasswords, securityWarningShown])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/user`, {
        credentials: "include", // Include cookies for authentication
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`)
      }

      const data = await response.json()

      // Add demo passwords for demonstration purposes only
      const usersWithDemoPasswords = (data.users || []).map((user: User) => ({
        ...user,
        demoPassword: generateDemoPassword(),
      }))

      setUsers(usersWithDemoPasswords)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`${API_BASE_URL}/user/${userToDelete.id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`)
      }

      // Remove user from state
      setUsers(users.filter((user) => user.id !== userToDelete.id))

      // Also remove from selected users if present
      if (selectedUsers.includes(userToDelete.id)) {
        setSelectedUsers(selectedUsers.filter((id) => id !== userToDelete.id))
      }

      toast({
        title: "Success",
        description: "User deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleResetPassword = async () => {
    if (!selectedUser) return

    // Validate passwords
    if (!newPassword) {
      setPasswordError("Password is required")
      return
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    try {
      setIsResettingPassword(true)
      setPasswordError("")

      const response = await fetch(`${API_BASE_URL}/user/${selectedUser.id}/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password: newPassword }),
      })

      if (!response.ok) {
        throw new Error(`Failed to reset password: ${response.status}`)
      }

      // Update the demo password in our local state (for demonstration only)
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, demoPassword: newPassword } : user)))

      toast({
        title: "Success",
        description: "Password has been reset successfully",
      })

      // Reset form and exit reset mode
      setNewPassword("")
      setConfirmPassword("")
      setIsResetPasswordMode(false)
    } catch (error) {
      console.error("Error resetting password:", error)
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResettingPassword(false)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return

    try {
      setLoading(true)

      // Sequential deletion to handle errors better
      let successCount = 0
      let errorCount = 0

      for (const userId of selectedUsers) {
        try {
          const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
            method: "DELETE",
            credentials: "include",
          })

          if (response.ok) {
            successCount++
          } else {
            errorCount++
          }
        } catch (error) {
          errorCount++
        }
      }

      // Update UI
      if (successCount > 0) {
        // Refresh the user list
        await fetchUsers()

        toast({
          title: "Success",
          description: `Successfully deleted ${successCount} user${successCount !== 1 ? "s" : ""}.`,
        })
      }

      if (errorCount > 0) {
        toast({
          title: "Warning",
          description: `Failed to delete ${errorCount} user${errorCount !== 1 ? "s" : ""}.`,
          variant: "destructive",
        })
      }

      // Clear selection
      setSelectedUsers([])
    } catch (error) {
      console.error("Error in bulk delete:", error)
      toast({
        title: "Error",
        description: "An error occurred during bulk delete.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const exportUsers = () => {
    try {
      // Filter users based on current filters
      const dataToExport = filteredUsers.map((user) => ({
        Name: user.fullName,
        Email: user.email,
        Phone: user.phone,
        "Registration Date": formatDate(user.createdAt),
      }))

      // Convert to CSV
      const headers = Object.keys(dataToExport[0]).join(",")
      const rows = dataToExport.map((obj) =>
        Object.values(obj)
          .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
          .join(","),
      )
      const csv = [headers, ...rows].join("\n")

      // Create download link
      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `users-export-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: `Exported ${dataToExport.length} users to CSV.`,
      })
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title: "Export Failed",
        description: "Failed to export users data.",
        variant: "destructive",
      })
    }
  }

  // Toggle password visibility for a specific user
  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  // Filter users based on search and time filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Apply time filter
      if (timeFilter !== "all") {
        const userDate = new Date(user.createdAt)
        const now = new Date()

        if (timeFilter === "today") {
          // Today's users
          return userDate.toDateString() === now.toDateString()
        } else if (timeFilter === "week") {
          // This week's users
          const weekAgo = new Date(now)
          weekAgo.setDate(now.getDate() - 7)
          return userDate >= weekAgo
        } else if (timeFilter === "month") {
          // This month's users
          const monthAgo = new Date(now)
          monthAgo.setMonth(now.getMonth() - 1)
          return userDate >= monthAgo
        } else if (timeFilter === "year") {
          // This year's users
          const yearAgo = new Date(now)
          yearAgo.setFullYear(now.getFullYear() - 1)
          return userDate >= yearAgo
        }
      }

      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase()

        if (searchField === "all") {
          return (
            user.fullName.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.phone.includes(term)
          )
        } else if (searchField === "name") {
          return user.fullName.toLowerCase().includes(term)
        } else if (searchField === "email") {
          return user.email.toLowerCase().includes(term)
        } else if (searchField === "phone") {
          return user.phone.includes(term)
        }
      }

      return true
    })
  }, [users, searchTerm, searchField, timeFilter])

  // Calculate statistics
  const stats = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(now)
    weekAgo.setDate(now.getDate() - 7)
    const monthAgo = new Date(now)
    monthAgo.setMonth(now.getMonth() - 1)
    const yearAgo = new Date(now)
    yearAgo.setFullYear(now.getFullYear() - 1)

    return {
      total: users.length,
      today: users.filter((user) => new Date(user.createdAt) >= today).length,
      week: users.filter((user) => new Date(user.createdAt) >= weekAgo).length,
      month: users.filter((user) => new Date(user.createdAt) >= monthAgo).length,
      year: users.filter((user) => new Date(user.createdAt) >= yearAgo).length,
    }
  }, [users])

  // Pagination
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredUsers, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id))
    }
  }

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSearchField("all")
    setTimeFilter("all")
  }

  const resetPasswordForm = () => {
    setIsResetPasswordMode(true)
    setNewPassword("")
    setConfirmPassword("")
    setPasswordError("")
  }

  const cancelPasswordReset = () => {
    setIsResetPasswordMode(false)
    setNewPassword("")
    setConfirmPassword("")
    setPasswordError("")
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="space-y-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Users Management</h1>
              <p className="text-muted-foreground mt-1">Manage and monitor user accounts</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {selectedUsers.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${selectedUsers.length} selected users?`)) {
                      handleBulkDelete()
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedUsers.length})
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={exportUsers} disabled={filteredUsers.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
            </div>
          </div>

          {/* Security Warning Banner */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong className="font-medium">Security Warning:</strong> Displaying passwords is a serious security
                  risk. This implementation is for demonstration purposes only and should never be used in a production
                  environment.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className={`${timeFilter === "all" ? "border-primary bg-primary/5" : ""}`}>
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>All Users</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setTimeFilter("all")}>
                    {timeFilter === "all" ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card className={`${timeFilter === "today" ? "border-primary bg-primary/5" : ""}`}>
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>Today</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setTimeFilter("today")}>
                    {timeFilter === "today" ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.today}</div>
              </CardContent>
            </Card>

            <Card className={`${timeFilter === "week" ? "border-primary bg-primary/5" : ""}`}>
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>This Week</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setTimeFilter("week")}>
                    {timeFilter === "week" ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.week}</div>
              </CardContent>
            </Card>

            <Card className={`${timeFilter === "month" ? "border-primary bg-primary/5" : ""}`}>
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>This Month</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setTimeFilter("month")}>
                    {timeFilter === "month" ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.month}</div>
              </CardContent>
            </Card>

            <Card className={`${timeFilter === "year" ? "border-primary bg-primary/5" : ""}`}>
              <CardHeader className="py-3">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>This Year</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setTimeFilter("year")}>
                    {timeFilter === "year" ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.year}</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 space-y-1">
                  <label htmlFor="search" className="text-sm font-medium">
                    Search Users
                  </label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full md:w-48 space-y-1">
                  <label htmlFor="searchField" className="text-sm font-medium">
                    Search In
                  </label>
                  <Select value={searchField} onValueChange={(value) => setSearchField(value as any)}>
                    <SelectTrigger id="searchField">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fields</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full md:w-48 space-y-1">
                  <label htmlFor="perPage" className="text-sm font-medium">
                    Show
                  </label>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(Number.parseInt(value))
                      setCurrentPage(1) // Reset to first page
                    }}
                  >
                    <SelectTrigger id="perPage">
                      <SelectValue placeholder="Per page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 per page</SelectItem>
                      <SelectItem value="10">10 per page</SelectItem>
                      <SelectItem value="25">25 per page</SelectItem>
                      <SelectItem value="50">50 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(searchTerm || searchField !== "all" || timeFilter !== "all") && (
                  <Button variant="ghost" onClick={clearFilters} className="h-10">
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-xl">
                {timeFilter !== "all" ? (
                  <span>
                    Users{" "}
                    {timeFilter === "today"
                      ? "Registered Today"
                      : timeFilter === "week"
                        ? "Registered This Week"
                        : timeFilter === "month"
                          ? "Registered This Month"
                          : "Registered This Year"}
                  </span>
                ) : (
                  "All Users"
                )}
              </CardTitle>
              <CardDescription>
                {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading users...</span>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                            onCheckedChange={toggleSelectAll}
                            aria-label="Select all"
                          />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead className="hidden md:table-cell">Joined</TableHead>
                        <TableHead className="hidden md:table-cell">Password</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            {searchTerm || timeFilter !== "all"
                              ? "No users match your search criteria"
                              : "No users found"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedUsers.includes(user.id)}
                                onCheckedChange={() => toggleSelectUser(user.id)}
                                aria-label={`Select ${user.fullName}`}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                                  {user.profilePictureUrl ? (
                                    <img
                                      src={
                                        user.profilePictureUrl.startsWith("http")
                                          ? user.profilePictureUrl
                                          : `${API_BASE_URL.replace("/api", "")}${user.profilePictureUrl}`
                                      }
                                      alt={user.fullName}
                                      className="h-full w-full object-cover"
                                      onError={(e) => {
                                        e.currentTarget.src = `/placeholder.svg?height=40&width=40`
                                      }}
                                    />
                                  ) : (
                                    <div className="text-lg font-bold text-primary">
                                      {user.fullName.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{user.fullName}</div>
                                  <div className="text-sm text-muted-foreground md:hidden">{user.email}</div>
                                  <div className="text-sm text-muted-foreground md:hidden">{user.phone}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex flex-col">
                                <span>{formatDate(user.createdAt)}</span>
                                {new Date(user.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                                  <Badge
                                    variant="outline"
                                    className="w-fit mt-1 bg-green-50 text-green-700 border-green-200"
                                  >
                                    New
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center space-x-2">
                                <div className="font-mono text-sm">
                                  {showPasswords[user.id] ? (
                                    <span className="text-red-500">{user.demoPassword}</span>
                                  ) : (
                                    <span>••••••••</span>
                                  )}
                                </div>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => togglePasswordVisibility(user.id)}
                                      >
                                        {showPasswords[user.id] ? (
                                          <EyeOff className="h-3.5 w-3.5" />
                                        ) : (
                                          <Eye className="h-3.5 w-3.5" />
                                        )}
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{showPasswords[user.id] ? "Hide password" : "Show password"}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setIsViewDialogOpen(true)
                                      setIsResetPasswordMode(false)
                                    }}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedUser(user)
                                      setIsViewDialogOpen(true)
                                      resetPasswordForm()
                                    }}
                                  >
                                    <Lock className="h-4 w-4 mr-2" />
                                    Reset Password
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => {
                                      setUserToDelete(user)
                                      setIsDeleteDialogOpen(true)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Pagination */}
              {filteredUsers.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {Math.min(filteredUsers.length, (currentPage - 1) * itemsPerPage + 1)} to{" "}
                    {Math.min(filteredUsers.length, currentPage * itemsPerPage)} of {filteredUsers.length} users
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm">
                      Page {currentPage} of {totalPages || 1}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* View User Dialog */}
        <Dialog
          open={isViewDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsResetPasswordMode(false)
            }
            setIsViewDialogOpen(open)
          }}
        >
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>{isResetPasswordMode ? "Reset Password" : "User Details"}</DialogTitle>
              <DialogDescription>
                {isResetPasswordMode
                  ? "Set a new password for this user account."
                  : "Complete information about this user."}
              </DialogDescription>
            </DialogHeader>
            {selectedUser && !isResetPasswordMode && (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center mb-4">
                    {selectedUser.profilePictureUrl ? (
                      <img
                        src={
                          selectedUser.profilePictureUrl.startsWith("http")
                            ? selectedUser.profilePictureUrl
                            : `${API_BASE_URL.replace("/api", "")}${selectedUser.profilePictureUrl}`
                        }
                        alt={selectedUser.fullName}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `/placeholder.svg?height=128&width=128`
                        }}
                      />
                    ) : (
                      <div className="text-4xl font-bold text-primary">
                        {selectedUser.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{selectedUser.fullName}</h3>
                  <div className="text-sm text-muted-foreground">Member since {formatDate(selectedUser.createdAt)}</div>
                </div>

                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Basic Info</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="info" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium text-muted-foreground">Email</div>
                              <div>{selectedUser.email}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium text-muted-foreground">Phone</div>
                              <div>{selectedUser.phone}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium text-muted-foreground">Registration Date</div>
                              <div>{formatDate(selectedUser.createdAt)}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(selectedUser.createdAt).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium text-muted-foreground">User ID</div>
                              <div className="text-xs font-mono bg-gray-100 p-1 rounded">{selectedUser.id}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Lock className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium text-muted-foreground">Password</div>
                              <div className="flex items-center gap-2">
                                <div className="font-mono text-sm">
                                  {showPasswords[selectedUser.id] ? (
                                    <span className="text-red-500">{selectedUser.demoPassword}</span>
                                  ) : (
                                    <span>••••••••</span>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs"
                                  onClick={() => togglePasswordVisibility(selectedUser.id)}
                                >
                                  {showPasswords[selectedUser.id] ? "Hide" : "Show"}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs"
                                  onClick={resetPasswordForm}
                                >
                                  Reset
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="security" className="space-y-4 pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Password Management</CardTitle>
                        <CardDescription>Reset the user's password</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="font-medium">Current Password:</div>
                            <div className="flex items-center gap-2">
                              <div className="font-mono text-sm">
                                {showPasswords[selectedUser.id] ? (
                                  <span className="text-red-500">{selectedUser.demoPassword}</span>
                                ) : (
                                  <span>••••••••</span>
                                )}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => togglePasswordVisibility(selectedUser.id)}
                              >
                                {showPasswords[selectedUser.id] ? (
                                  <>
                                    <EyeOff className="h-3 w-3 mr-1" /> Hide
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-3 w-3 mr-1" /> Show
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                          <Button onClick={resetPasswordForm} className="w-full">
                            <Lock className="h-4 w-4 mr-2" />
                            Reset Password
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="activity" className="space-y-4 pt-4">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="mb-4">
                          <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">Activity Tracking</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          User activity tracking will be available in a future update.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Password Reset Form */}
            {selectedUser && isResetPasswordMode && (
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      ref={passwordInputRef}
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {passwordError && <div className="text-sm font-medium text-red-500">{passwordError}</div>}

                <div className="text-sm text-muted-foreground">Password must be at least 6 characters long.</div>
              </div>
            )}

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {isResetPasswordMode ? (
                <>
                  <Button variant="outline" onClick={cancelPasswordReset}>
                    Cancel
                  </Button>
                  <Button onClick={handleResetPassword} disabled={isResettingPassword} className="gap-2">
                    {isResettingPassword ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Reset Password
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={resetPasswordForm} className="gap-2">
                    <Lock className="h-4 w-4" />
                    Reset Password
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsViewDialogOpen(false)
                      setUserToDelete(selectedUser)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete User
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the user account and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                className="bg-red-500 hover:bg-red-600"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

