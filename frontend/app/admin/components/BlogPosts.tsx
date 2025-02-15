import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BlogPosts() {
  const posts = [
    { id: 1, title: "Getting Started with React", excerpt: "Learn the basics of React..." },
    { id: 2, title: "Advanced TypeScript Techniques", excerpt: "Explore advanced TypeScript..." },
    { id: 3, title: "Building Scalable APIs", excerpt: "Best practices for API development..." },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{post.excerpt}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

