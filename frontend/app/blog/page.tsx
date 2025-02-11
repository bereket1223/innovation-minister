export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Blog</h1>
      <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Blog Post 1</h2>
          <p className="mt-2 text-gray-600">Preview of blog post 1...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Blog Post 2</h2>
          <p className="mt-2 text-gray-600">Preview of blog post 2...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Blog Post 3</h2>
          <p className="mt-2 text-gray-600">Preview of blog post 3...</p>
        </div>
      </div>
    </div>
  )
}

