"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, LogOut, Settings, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"

interface UserData {
  id: string
  fullName: string
  email: string
  phone: string
  profilePictureUrl: string
}

interface ProfileDropdownProps {
  onProfileClick: () => void
}

export default function ProfileDropdown({ onProfileClick }: ProfileDropdownProps) {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get user data from localStorage on component mount
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    } else {
      // If no data in localStorage, try to fetch from API
      fetchUserProfile()
    }
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        credentials: "include", // Include cookies for authentication
      })

      if (response.ok) {
        const data = await response.json()
        setUserData(data.user)
        localStorage.setItem("userData", JSON.stringify(data.user))
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        // Clear user data from localStorage
        localStorage.removeItem("userData")
        toast.success("Logged out successfully")
        router.push("/login")
      } else {
        toast.error("Failed to logout")
      }
    } catch (error) {
      toast.error("An error occurred during logout")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const handleKnowledgeClick = () => {
    // Pass the phone number to the parent component for fetching department data
    if (userData?.phone) {
      console.log("User phone from profile dropdown:", userData.phone)
      onProfileClick()
    } else {
      toast.error("User profile not loaded. Please try again.")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <div className="flex items-center space-x-2">
            <Avatar className="h-9 w-9 border-2 border-blue-100">
              {userData?.profilePictureUrl ? (
                <AvatarImage
                  src={`http://localhost:5000${userData.profilePictureUrl}`}
                  alt={userData.fullName || "User"}
                />
              ) : (
                <AvatarFallback className="bg-blue-700 text-white">
                  {userData?.fullName ? getInitials(userData.fullName) : "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <ChevronDown className="h-4 w-4 text-blue-800" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{userData?.fullName || "User"}</p>
          <p className="text-xs leading-none text-gray-500">{userData?.phone || "No phone number"}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleKnowledgeClick} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>My Knowledge</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEditProfile} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Details</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600" disabled={isLoading}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

