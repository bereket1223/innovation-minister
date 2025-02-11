export default function ServicesSection() {
  return (
    <section id="services" className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
        <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900">Service 1</h3>
            <p className="mt-2 text-gray-600">Description of Service 1</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900">Service 2</h3>
            <p className="mt-2 text-gray-600">Description of Service 2</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900">Service 3</h3>
            <p className="mt-2 text-gray-600">Description of Service 3</p>
          </div>
        </div>
      </div>
    </section>
  )
}

