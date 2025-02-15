import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const categories = [
  {
    title: "Category 1",
    description: "Description for Category 1",
    subcategories: ["Subcategory 1A", "Subcategory 1B", "Subcategory 1C"],
  },
  {
    title: "Category 2",
    description: "Description for Category 2",
    subcategories: ["Subcategory 2A", "Subcategory 2B", "Subcategory 2C"],
  },
  {
    title: "Category 3",
    description: "Description for Category 3",
    subcategories: ["Subcategory 3A", "Subcategory 3B", "Subcategory 3C"],
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
                  <span>Select Subcategory</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {category.subcategories.map((subcategory, subIndex) => (
                  <DropdownMenuItem key={subIndex}>{subcategory}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

