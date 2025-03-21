"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

interface SheetTwoFormProps {
  onClose: () => void
  initialData?: any
}

export default function SheetTwoForm({ onClose, initialData }: SheetTwoFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(
    initialData || {
      hostOrganization: "",
      companyName: "",
      yearEstablished: "",
      contactPersonName: "",
      gender: "",
      regionCity: "",
      sector: "",
      associationMemberFemale: 0,
      associationMemberMale: 0,
      associationMemberTotal: 0,
      isPrivate: "no",
      productionPerWeek: "",
      prototype: "",
      ipr: "",
      challenges: "",
      recommendations: "",
      phoneNumber: "",
      email: "",
    },
  )

  useEffect(() => {
    // Calculate total whenever male or female values change
    const male = Number.parseInt(formData.associationMemberMale) || 0
    const female = Number.parseInt(formData.associationMemberFemale) || 0
    setFormData((prev) => ({ ...prev, associationMemberTotal: male + female }))
  }, [formData.associationMemberMale, formData.associationMemberFemale])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = initialData
        ? `http://localhost:5000/api/sheet-two/${initialData._id}`
        : `http://localhost:5000/api/sheet-two`

      const method = initialData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save data")
      }

      toast({
        title: "Success",
        description: initialData ? "Entry updated successfully" : "New entry added successfully",
      })

      onClose()
    } catch (error) {
      console.error("Error saving form:", error)
      toast({
        title: "Error",
        description: "Failed to save data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{initialData ? "Edit Entry" : "Add New Entry"}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hostOrganization">Host Organization</Label>
            <Input
              id="hostOrganization"
              name="hostOrganization"
              value={formData.hostOrganization}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearEstablished">Year of Establishment</Label>
            <Input
              id="yearEstablished"
              name="yearEstablished"
              type="number"
              value={formData.yearEstablished}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPersonName">Contact Person Name</Label>
            <Input
              id="contactPersonName"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              name="gender"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.gender}
              onChange={(e) => handleChange(e as any)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regionCity">Region & City</Label>
            <Input id="regionCity" name="regionCity" value={formData.regionCity} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector">Sector</Label>
            <Input id="sector" name="sector" value={formData.sector} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Association Member</Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="associationMemberFemale" className="text-xs">
                  Female
                </Label>
                <Input
                  id="associationMemberFemale"
                  name="associationMemberFemale"
                  type="number"
                  value={formData.associationMemberFemale}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="associationMemberMale" className="text-xs">
                  Male
                </Label>
                <Input
                  id="associationMemberMale"
                  name="associationMemberMale"
                  type="number"
                  value={formData.associationMemberMale}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="associationMemberTotal" className="text-xs">
                  Total
                </Label>
                <Input
                  id="associationMemberTotal"
                  name="associationMemberTotal"
                  type="number"
                  value={formData.associationMemberTotal}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Private</Label>
            <RadioGroup
              value={formData.isPrivate}
              onValueChange={(value) => handleRadioChange("isPrivate", value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="private-yes" />
                <Label htmlFor="private-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="private-no" />
                <Label htmlFor="private-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productionPerWeek">Production Per Week</Label>
            <Input
              id="productionPerWeek"
              name="productionPerWeek"
              value={formData.productionPerWeek}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prototype">Prototype</Label>
            <Input id="prototype" name="prototype" value={formData.prototype} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipr">IPR (Intellectual Property Rights)</Label>
            <Input id="ipr" name="ipr" value={formData.ipr} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="challenges">Challenges</Label>
          <Textarea id="challenges" name="challenges" value={formData.challenges} onChange={handleChange} rows={3} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recommendations">Recommendations</Label>
          <Textarea
            id="recommendations"
            name="recommendations"
            value={formData.recommendations}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : initialData ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}

