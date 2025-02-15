import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Lightbulb, Cpu } from "lucide-react"

export function StatisticsCards() {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users },
    { title: "Research Projects", value: "42", icon: FileText },
    { title: "Innovations", value: "18", icon: Lightbulb },
    { title: "Technologies", value: "31", icon: Cpu },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

