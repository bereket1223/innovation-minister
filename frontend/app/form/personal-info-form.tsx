"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Upload, CheckCircle, ArrowLeft, FileText, X, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

interface UserData {
  name?: string
  email?: string
  phone?: string
  gender?: string
  age?: string
  nationality?: string
  region?: string
  zone?: string
  woreda?: string
  kebele?: string
  institution?: string
  department?: string
  designation?: string
  institutionAddress?: string
  highestDegree?: string
  university?: string
  completionYear?: string
  specialization?: string
  [key: string]: any
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
    knowledgeDepartment: "research",
    subCategory: "",
    otherSubCategory: "",
    interestAreas: "",
    agreement: false,
  })

  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showOtherSubCategory, setShowOtherSubCategory] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [fieldsAutoFilled, setFieldsAutoFilled] = useState<boolean>(false)
  const [showStatusDialog, setShowStatusDialog] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load user data from localStorage when component mounts
  useEffect(() => {
    try {
      const userDataString = localStorage.getItem("userData")
      if (userDataString) {
        const userData: UserData = JSON.parse(userDataString)

        // Check if we have email or phone data
        const hasContactInfo = userData.email || userData.phone

        // Map user data to form fields
        setFormData((prevData) => ({
          ...prevData,
          fullName: userData.name || "",
          email: userData.email || "",
          phoneNumber: userData.phone || "",
          gender: userData.gender || "",
          age: userData.age || "",
          nationality: userData.nationality || "",
          region: userData.region || "",
          zone: userData.zone || "",
          woreda: userData.woreda || "",
          kebele: userData.kebele || "",
          institution: userData.institution || "",
          department: userData.department || "",
          designation: userData.designation || "",
          institutionAddress: userData.institutionAddress || "",
          highestDegree: userData.highestDegree || "",
          university: userData.university || "",
          completionYear: userData.completionYear || "",
          specialization: userData.specialization || "",
        }))

        // Set auto-filled state if we have contact info
        if (hasContactInfo) {
          setFieldsAutoFilled(true)
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }, [])

  const regions = [
    "Tigray",
    "Afar",
    "Amhara",
    "Oromia",
    "Somali",
    "Benishangul-Gumuz",
    "SNNPR",
    "Gambella",
    "Harari",
    "Addis Ababa",
    "Dire Dawa",
    "Others",
  ]

  const subCategories = [
    "Agriculture",
    "Food and Beverages",
    "Handicraft",
    "Scriptures",
    "Astronomy",
    "Construction",
    "Conflict Resolution",
    "Entertainment",
    "Traditional House Building",
    "Education System",
    "Clothing Industry",
    "Philosophy",
    "Traditional Medicine",
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

  const validateFile = (file: File): boolean => {
    setFileError(null)

    if (!file) {
      setFileError("Please upload a PDF file.")
      return false
    }

    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are allowed.")
      return false
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setFileError("File size should not exceed 10MB.")
      return false
    }

    return true
  }

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
      } else {
        e.target.value = ""
      }
    }
  }, [])

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        setFile(droppedFile)
      }
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeFile = useCallback(() => {
    setFile(null)
    setFileError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    if (!file) {
      setFileError("Please upload a PDF file.")
      setIsLoading(false)
      return
    }

    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString())
    })
    submitData.append("file", file)

    try {
      const response = await fetch("http://localhost:5000/api/department/createDepartmentController", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Department created:", data)
        setSuccess("Successfully registered! Your submission is now under review.")
        setShowStatusDialog(true)
        // We'll redirect after the dialog is closed
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
    <>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:p-8 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Indigenous Knowledge Registration</h1>
            <Button
              type="button"
              variant="outline"
              className="bg-white/20 text-white hover:bg-white/30 border-white/40"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <p className="text-lg mt-2">Share your wisdom and contribute to our collective knowledge.</p>
        </div>

        <Card className="border-t-4 border-t-blue-500 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">Personal Information</CardTitle>
            <CardDescription>Please provide your personal details</CardDescription>
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
                  <SelectTrigger className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white">
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
                  <SelectTrigger className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white">
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
                  readOnly={fieldsAutoFilled && formData.email !== ""}
                  className={`border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${
                    fieldsAutoFilled && formData.email !== "" ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                {fieldsAutoFilled && formData.email !== "" && (
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed on this form</p>
                )}
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
                  readOnly={fieldsAutoFilled && formData.phoneNumber !== ""}
                  className={`border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${
                    fieldsAutoFilled && formData.phoneNumber !== "" ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                {fieldsAutoFilled && formData.phoneNumber !== "" && (
                  <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed on this form</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rest of the form remains unchanged */}
        <Card className="border-t-4 border-t-green-500 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">Affiliation Details</CardTitle>
            <CardDescription>Optional information about your organization</CardDescription>
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

        <Card className="border-t-4 border-t-yellow-500 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-700">Education & Qualifications</CardTitle>
            <CardDescription>Optional information about your educational background</CardDescription>
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

        <Card className="border-t-4 border-t-red-500 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-red-700">Indigenous Knowledge Information</CardTitle>
            <CardDescription>Details about the knowledge you're registering</CardDescription>
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
                className="flex flex-col sm:flex-row gap-4"
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
                <SelectTrigger className="border-gray-300 focus:ring-red-500 focus:border-red-500 bg-white">
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
                Upload PDF Document
              </Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : file
                      ? "border-green-500 bg-green-50"
                      : fileError
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleFileDrop}
              >
                <Input
                  id="pdfUpload"
                  name="pdfUpload"
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={handleFileChange}
                  required={!file}
                  className="hidden"
                />

                {!file ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <FileText className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drag and drop your PDF file here, or</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Browse Files
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Only PDF files are accepted (Max: 10MB)</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white p-3 rounded-md border border-green-200">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-md mr-3">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {fileError && (
                  <div className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {fileError}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-purple-500 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-700">Compliance & Declarations</CardTitle>
            <CardDescription>Please review and agree to the terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 mb-4">
              <p className="text-sm text-gray-700">
                By submitting this form, you confirm that all information provided is accurate and complete. You grant
                permission for this knowledge to be documented and preserved in accordance with our terms and
                conditions.
              </p>
            </div>
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
          <CardFooter className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-1/3 border-purple-300 text-purple-700 hover:bg-purple-50"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.agreement}
              className="w-full sm:w-2/3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Progress value={33} className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Register
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
      </form>

      {/* Status Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-amber-700">
              <Clock className="h-5 w-5 mr-2 text-amber-500" />
              Registration Status: Pending
            </DialogTitle>
            <DialogDescription>
              Your indigenous knowledge submission has been successfully registered and is now pending review.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200 my-4">
            <p className="text-sm text-amber-800">
              Our team will review your submission shortly. The current status is <strong>pending</strong>. You can
              check the status of your submission in your dashboard.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowStatusDialog(false)
                router.push("/dashboard")
              }}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

