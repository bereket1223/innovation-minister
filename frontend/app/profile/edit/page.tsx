"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Upload, User } from "lucide-react"
import { toast } from "react-hot-toast"

interface UserData {
  id: string
  fullName: string
  email: string
  phone: string
  profilePictureUrl: string
}

export default function EditProfile() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Get user data from localStorage on component mount
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData)
      setUserData(parsedData)
      setFullName(parsedData.fullName || "")
      setEmail(parsedData.email || "")
      setPhone(parsedData.phone || "")
      if (parsedData.profilePictureUrl) {
        setPreviewUrl(`http://localhost:5000${parsedData.profilePictureUrl}`)
      }
    } else {
      // If no data in localStorage, redirect to login
      router.push("/login")
    }
  }, [router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const formData = new FormData()
      formData.append("fullName", fullName)
      formData.append("email", email)
      formData.append("phone", phone)

      if (profileImage) {
        formData.append("profilePicture", profileImage)
      }

      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        credentials: "include", // Include cookies for authentication
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        // Update localStorage with new user data
        localStorage.setItem("userData", JSON.stringify(data.user))
        toast.success("Profile updated successfully")
        router.push("/dashboard")
      } else {
        setErrorMessage(data.message || "Failed to update profile")
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
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

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6 text-blue-700" onClick={() => router.push("/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card className="shadow-md border-0">
        <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
          <CardTitle>Account Details</CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          {errorMessage && (
            <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-md">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24 border-4 border-blue-100">
                  {previewUrl ? (
                    <AvatarImage src={previewUrl} alt={fullName} />
                  ) : (
                    <AvatarFallback className="bg-blue-700 text-white text-xl">
                      {fullName ? getInitials(fullName) : <User />}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <Label
                    htmlFor="profile-picture"
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                  >
                    <Upload className="h-4 w-4" />
                  </Label>
                  <Input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500">Click the icon to upload a new profile picture</p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-blue-700 hover:bg-blue-800">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

