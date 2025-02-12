'use client'

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
import { FaUserCircle } from "react-icons/fa"  // Import the icon from react-icons"
import { useState } from "react"  // Import useState for state management

export default function ProfileDropdown() {
  const router = useRouter()

  // State to manage whether the menu is open or not
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, you would handle the logout process here
    console.log("Logging out...")
    router.push("/login")
  }

  const toggleMenu = () => {
    // Toggle the menu open or close
    setIsOpen(!isOpen)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-0" onClick={toggleMenu}>
          {/* Replace Avatar with the icon */}
          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200">
            <FaUserCircle className="text-gray-500" size={32} />  {/* Profile icon */}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-56 ${isOpen ? 'bg-white' : ''} transition-all duration-300`} // Adds white background when open
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
