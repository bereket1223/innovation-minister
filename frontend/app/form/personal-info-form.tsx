"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FormData {
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
  agreement: boolean
}

export default function PersonalInfoForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    gender: "",
    age: "",
    nationality: "",
    region: "",
    zone: "",
    woreda: "",
    kebele: "",
    email: "",
    phoneNumber: "",
    institution: "",
    department: "",
    designation: "",
    institutionAddress: "",
    highestDegree: "",
    university: "",
    completionYear: "",
    specialization: "",
    knowledgeTitle: "",
    knowledgeDepartment: "Indigenous Research",
    subCategory: "",
    otherSubCategory: "",
    interestAreas: "",
    agreement: false,
  })

  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showOtherSubCategory, setShowOtherSubCategory] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const router = useRouter()

  const regions = [
    "Region 1",
    "Region 2",
    "Region 3",
    "Region 4",
    "Region 5",
    "Region 6",
    "Region 7",
    "Region 8",
    "Region 9",
    "Region 10",
  ]

  const subCategories = [
    "Sub-category 1",
    "Sub-category 2",
    "Sub-category 3",
    "Sub-category 4",
    "Sub-category 5",
    "Sub-category 6",
    "Sub-category 7",
    "Sub-category 8",
    "Sub-category 9",
    "Sub-category 10",
    "Sub-category 11",
    "Sub-category 12",
    "Others",
  ]

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "subCategory") {
      setShowOtherSubCategory(value === "others")
    }
  }, [])

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed.")
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)
    setUploadProgress(0)

    if (!file) {
      setError("Please upload a PDF file.")
      setIsLoading(false)
      return
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.")
      setIsLoading(false)
      return
    }

    try {
      // Create a new FormData instance
      const submitData = new FormData()

      // First append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          submitData.append(key, value ? "true" : "false")
        } else {
          submitData.append(key, String(value))
        }
      })

      // Append the file last with the correct field name
      submitData.append("file", file)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 5, 90))
      }, 200)

      const response = await fetch("http://localhost:5000/api/department/createDepartment", {
        method: "POST",
        body: submitData,
        // Important: Don't set Content-Type header manually
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (response.ok) {
        const data = await response.json()
        console.log("Department created:", data)
        setSuccess("Successfully submitted! Redirecting...")
        setTimeout(() => router.push("/dashboard"), 2000)
      } else {
        const errorData = await response.json().catch(() => ({ message: "An error occurred during submission." }))
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">Indigenous Knowledge Registration</h1>
        <p className="text-lg">Share your wisdom and contribute to our collective knowledge.</p>
      </div>

      <Card className="border-t-4 border-t-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                Gender
              </Label>
              <Select
                name="gender"
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
                required
              >
                <SelectTrigger className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-transparent">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                Age
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                max="120"
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">
                Nationality
              </Label>
              <Input
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region" className="text-sm font-medium text-gray-700">
                Region
              </Label>
              <Select
                name="region"
                value={formData.region}
                onValueChange={(value) => handleSelectChange("region", value)}
                required
              >
                <SelectTrigger className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-transparent">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region.toLowerCase()}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zone" className="text-sm font-medium text-gray-700">
                Zone
              </Label>
              <Input
                id="zone"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="woreda" className="text-sm font-medium text-gray-700">
                Woreda
              </Label>
              <Input
                id="woreda"
                name="woreda"
                value={formData.woreda}
                onChange={handleChange}
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kebele" className="text-sm font-medium text-gray-700">
                Kebele
              </Label>
              <Input
                id="kebele"
                name="kebele"
                value={formData.kebele}
                onChange={handleChange}
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-green-500">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700">Affiliation Details (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="institution" className="text-sm font-medium text-gray-700">
                Institution/Organization
              </Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="border-gray-300 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                Department
              </Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="border-gray-300 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation" className="text-sm font-medium text-gray-700">
                Designation/Position
              </Label>
              <Input
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="border-gray-300 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institutionAddress" className="text-sm font-medium text-gray-700">
                Institution Address
              </Label>
              <Input
                id="institutionAddress"
                name="institutionAddress"
                value={formData.institutionAddress}
                onChange={handleChange}
                className="border-gray-300 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-yellow-500">
        <CardHeader>
          <CardTitle className="text-2xl text-yellow-700">Education & Qualifications (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="highestDegree" className="text-sm font-medium text-gray-700">
                Highest Degree (if any)
              </Label>
              <Input
                id="highestDegree"
                name="highestDegree"
                value={formData.highestDegree}
                onChange={handleChange}
                className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university" className="text-sm font-medium text-gray-700">
                University/Institution (if any)
              </Label>
              <Input
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionYear" className="text-sm font-medium text-gray-700">
                Year of Completion (if any)
              </Label>
              <Input
                id="completionYear"
                name="completionYear"
                type="number"
                value={formData.completionYear}
                onChange={handleChange}
                className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-sm font-medium text-gray-700">
                Specialization
              </Label>
              <Input
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-red-500">
        <CardHeader>
          <CardTitle className="text-2xl text-red-700">Indigenous Knowledge Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="knowledgeTitle" className="text-sm font-medium text-gray-700">
              Indigenous Knowledge Title
            </Label>
            <Input
              id="knowledgeTitle"
              name="knowledgeTitle"
              value={formData.knowledgeTitle}
              onChange={handleChange}
              required
              className="border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Indigenous Knowledge Department</Label>
            <RadioGroup
              name="knowledgeDepartment"
              value={formData.knowledgeDepartment}
              onValueChange={(value) => handleSelectChange("knowledgeDepartment", value)}
              required
              className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Indigenous Research" id="research" />
                <Label htmlFor="research">Indigenous Research</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Indigenous Technology" id="technology" />
                <Label htmlFor="technology">Indigenous Technology</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Indigenous Innovation" id="innovations" />
                <Label htmlFor="innovations">Indigenous Innovations</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subCategory" className="text-sm font-medium text-gray-700">
              Indigenous Knowledge Sub-category
            </Label>
            <Select
              name="subCategory"
              value={formData.subCategory}
              onValueChange={(value) => handleSelectChange("subCategory", value)}
              required
            >
              <SelectTrigger className="border-gray-300 focus:ring-red-500 focus:border-red-500 bg-transparent">
                <SelectValue placeholder="Select sub-category" />
              </SelectTrigger>
              <SelectContent>
                {subCategories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {showOtherSubCategory && (
            <div className="space-y-2">
              <Label htmlFor="otherSubCategory" className="text-sm font-medium text-gray-700">
                Other Sub-category
              </Label>
              <Input
                id="otherSubCategory"
                name="otherSubCategory"
                value={formData.otherSubCategory}
                onChange={handleChange}
                placeholder="Enter your sub-category"
                required
                className="border-gray-300 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="interestAreas" className="text-sm font-medium text-gray-700">
              Indigenous Knowledge Interest Areas
            </Label>
            <Textarea
              id="interestAreas"
              name="interestAreas"
              value={formData.interestAreas}
              onChange={handleChange}
              required
              className="border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdfUpload" className="text-sm font-medium text-gray-700">
              Upload PDF File
            </Label>
            <div className="flex items-center space-x-2">
              <Input id="pdfUpload" type="file" accept=".pdf" onChange={handleFileChange} required className="hidden" />
              <Button
                type="button"
                onClick={() => document.getElementById("pdfUpload")?.click()}
                className="bg-red-500 hover:bg-red-600"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              {file && <span className="text-sm text-gray-600">{file.name}</span>}
            </div>
            {file && <p className="text-xs text-gray-500 mt-1">File size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-700">Compliance & Declarations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreement"
              name="agreement"
              checked={formData.agreement}
              onCheckedChange={(checked) =>
                handleCheckboxChange({
                  target: { name: "agreement", checked: checked === true },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              required
            />
            <Label htmlFor="agreement" className="text-sm text-gray-700">
              I agree to the Terms & Conditions
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isLoading || !formData.agreement}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Progress value={uploadProgress} className="w-24 h-4 mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Success</p>
          <p>{success}</p>
        </div>
      )}
    </form>
  )
}

