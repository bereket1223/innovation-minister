"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { FaUserCircle } from "react-icons/fa"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ProfileDropdown() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        toast.success("Logged out successfully")
        router.push("/login")
      } else {
        const data = await response.json()
        toast.error(data.message || "Logout failed. Please try again.")
      }
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("An error occurred during logout. Please try again.")
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-0" onClick={toggleMenu}>
          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200">
            <FaUserCircle className="text-gray-500" size={32} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-56 ${isOpen ? "bg-white" : ""} transition-all duration-300`}
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Username</p>
            <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Notifications</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

