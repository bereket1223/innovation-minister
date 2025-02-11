import Link from "next/link";
import h2 from "../../public/h2.jpg"
export default function LandingSection() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${h2})` }}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 bg-black bg-opacity-50 rounded-lg">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          Welcome to Our Website
        </h1>
        <p className="mt-6 text-xl text-gray-200 max-w-3xl">
          We provide amazing services and share insightful blog posts. Explore our website to learn more!
        </p>
        <div className="mt-10">
          <Link
            href="/#services"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
