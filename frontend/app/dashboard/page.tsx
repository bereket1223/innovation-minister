"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ServiceCardProps {
  name: string
  options: { title: string; description: string; image: string }[]
}

function ServiceCard({ name, options }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const router = useRouter()

  const handleApply = (option: string) => {
    router.push(`/form?service=${name}&option=${option}`)
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
                <div key={index}>
                  <div
                    className="flex justify-between items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      setSelectedOption(selectedOption === option.title ? null : option.title)
                    }
                  >
                    <span className="text-sm">{option.title}</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>

                  {/* Details Card appears directly below the clicked option */}
                  {selectedOption === option.title && (
                    <div className="mt-2 p-4 border rounded-lg shadow-md">
                      <img
                        src={option.image}
                        alt={option.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <h3 className="text-lg font-bold mt-2">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                      <Button className="mt-3 w-full" onClick={() => handleApply(option.title)}>
                        Apply
                      </Button>
                    </div>
                  )}
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
    {
      name: "Service One",
      options: [
        { title: "Option 1", description: "This is option 1", image: "/option1.jpg" },
        { title: "Option 2", description: "This is option 2", image: "/option2.jpg" },
        { title: "Option 3", description: "This is option 3", image: "/option3.jpg" },
      ],
    },
    {
      name: "Service Two",
      options: [
        { title: "Option A", description: "This is option A", image: "/optionA.jpg" },
        { title: "Option B", description: "This is option B", image: "/optionB.jpg" },
        { title: "Option C", description: "This is option C", image: "/optionC.jpg" },
      ],
    },
    {
      name: "Service Three",
      options: [
        { title: "Choice X", description: "This is choice X", image: "/choiceX.jpg" },
        { title: "Choice Y", description: "This is choice Y", image: "/choiceY.jpg" },
        { title: "Choice Z", description: "This is choice Z", image: "/choiceZ.jpg" },
      ],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Welcome Section */}
      <section className="bg-blue-100 p-6 rounded-lg shadow-md text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Welcome to Our Service Portal</h1>
        <p className="text-gray-700 mt-2">
          Our platform allows you to explore various services and apply with ease. Select a service,
          choose an option, and get started today!
        </p>
      </section>

      {/* Services Section */}
      <h2 className="text-2xl font-bold mb-4">Available Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} name={service.name} options={service.options} />
        ))}
      </div>
    </div>
  )
}
