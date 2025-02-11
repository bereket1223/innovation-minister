"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ServiceCardProps {
  name: string
  options: string[]
}

function ServiceCard({ name, options }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [appliedOptions, setAppliedOptions] = useState<string[]>([])

  const handleApply = (option: string) => {
    if (appliedOptions.includes(option)) {
      setAppliedOptions(appliedOptions.filter((item) => item !== option))
    } else {
      setAppliedOptions([...appliedOptions, option])
    }
    // In a real application, you would handle the apply action here
    console.log(`Toggled ${option} for ${name}`)
  }

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer">
            <div className="flex justify-between items-center">
              <CardTitle>{name}</CardTitle>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            <CardDescription>Click to view options</CardDescription>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{option}</span>
                  <Button
                    size="sm"
                    variant={appliedOptions.includes(option) ? "secondary" : "default"}
                    onClick={() => handleApply(option)}
                  >
                    {appliedOptions.includes(option) ? "Applied" : "Apply"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default function Dashboard() {
  const services = [
    { name: "Service One", options: ["Option 1", "Option 2", "Option 3"] },
    { name: "Service Two", options: ["Option A", "Option B", "Option C"] },
    { name: "Service Three", options: ["Choice X", "Choice Y", "Choice Z"] },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} name={service.name} options={service.options} />
        ))}
      </div>
    </div>
  )
}

