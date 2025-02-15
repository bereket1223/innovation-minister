import { Button } from "@/components/ui/button"

interface ServicesProps {
  setActiveService: (service: string) => void
}

export function Services({ setActiveService }: ServicesProps) {
  const services = [
    { id: "research", name: "Research" },
    { id: "innovation", name: "Innovation" },
    { id: "technology", name: "Technology" },
  ]

  return (
    <div className="space-y-4 mb-6">
      {services.map((service) => (
        <Button
          key={service.id}
          variant="outline"
          className="w-full justify-start"
          onClick={() => setActiveService(service.id)}
        >
          {service.name}
        </Button>
      ))}
    </div>
  )
}

