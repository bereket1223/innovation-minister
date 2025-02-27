import Link from "next/link"
import Image from "next/image"

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and start building your first application.",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      excerpt: "Discover advanced techniques to create stunning designs with Tailwind CSS.",
    },
    {
      id: 3,
      title: "The Power of Next.js",
      excerpt: "Explore the features that make Next.js a powerful framework for React applications.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 mb-60">
      <h1 className="text-4xl font-bold mb-8 text-blue">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={`/blog-${post.id}.jpg`}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-blue">{post.title}</h2>
              <p className="text-black mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="text-blue font-bold hover:underline">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

