"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface FormData {
  fullName: string
  gender: string
  age: string
  country: string
  nationality: string
  region: string
  zone: string
  woreda: string
  kebele: string
  emailOrPhone: string
  department: string
  categories: string
  title: string
  patent: string
  description: string
  agreement: boolean
}

export default function DepartmentForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    gender: "",
    age: "",
    country: "",
    nationality: "",
    region: "",
    zone: "",
    woreda: "",
    kebele: "",
    emailOrPhone: "",
    department: "",
    categories: "",
    title: "",
    patent: "",
    description: "",
    agreement: false,
  })
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString())
    })
    if (file) {
      submitData.append("file", file)
    }

    try {
      const response = await fetch("http://localhost:5000/api/department/createDepartment", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Department created:", data)
        setSuccess("Successfully submitted! Redirecting...")
        setTimeout(() => router.push("/departments"), 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || "An error occurred during submission.")
      }
    } catch (error) {
      console.error("Network error:", error)
      setError("A network error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">Department Form</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card shadow-md rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              name="gender"
              value={formData.gender}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select
              name="region"
              value={formData.region}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {/* Add 12 options here */}
                <SelectItem value="region1">Region 1</SelectItem>
                <SelectItem value="region2">Region 2</SelectItem>
                {/* ... */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="zone">Zone</Label>
            <Input id="zone" name="zone" value={formData.zone} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="woreda">Woreda</Label>
            <Input id="woreda" name="woreda" value={formData.woreda} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kebele">Kebele</Label>
            <Input id="kebele" name="kebele" value={formData.kebele} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailOrPhone">Email or Phone</Label>
            <Input
              id="emailOrPhone"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              placeholder="Enter email or phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Department</Label>
            <RadioGroup
              name="department"
              value={formData.department}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Indigenous research" id="indigenous-research" />
                <Label htmlFor="indigenous-research">Indigenous research</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Indigenous technology" id="indigenous-technology" />
                <Label htmlFor="indigenous-technology">Indigenous technology</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Indigenous innovations" id="indigenous-innovations" />
                <Label htmlFor="indigenous-innovations">Indigenous innovations</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <Select
              name="categories"
              value={formData.categories}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, categories: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {/* Add 13 options here */}
                <SelectItem value="category1">Category 1</SelectItem>
                <SelectItem value="category2">Category 2</SelectItem>
                {/* ... */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="patent">Patent</Label>
            <Select
              name="patent"
              value={formData.patent}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, patent: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" onChange={handleFileChange} />
        </div>

        <div className="mt-6 items-top flex space-x-2">
          <Checkbox
            id="agreement"
            name="agreement"
            checked={formData.agreement}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreement: checked as boolean }))}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="agreement"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions
            </label>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center">
            <X className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        {success && <div className="mt-4 bg-green-100 text-green-800 text-sm p-3 rounded-md">{success}</div>}

        <div className="mt-8">
          <Button type="submit" className="w-full" disabled={!formData.agreement || isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}

