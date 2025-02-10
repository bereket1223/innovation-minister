import Image from "next/image"
import Link from "next/link"
import TestimonialCart from "@/components/TestimonialCart"
import h2 from "../public/h2.jpg"
import about from "../public/h3.jpg"
export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-background">
        <Image src={h2} alt="Hero Background" layout="fill" objectFit="cover" quality={100} />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome to My Website</h1>
          <p className="text-xl mb-8 text-white">Discover amazing services and content</p>
          <Link
            href="#about"
            className="bg-blue text-white font-bold py-2 px-4 rounded hover:bg-black transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-blue">About Us</h2>
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <Image src={about} alt="About Us" width={500} height={300} className="rounded-lg shadow-lg" />
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <p className="text-lg mb-4 text-black">
                We are a passionate team dedicated to providing exceptional services and valuable content to our
                customers. Our mission is to empower individuals and businesses with innovative solutions.
              </p>
              <p className="text-lg text-black">
                With years of experience and a commitment to excellence, we strive to exceed expectations and deliver
                results that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Cart Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <TestimonialCart />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-blue">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Web Development", "Mobile Apps", "UI/UX Design"].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-blue">{service}</h3>
                <p className="text-lg mb-4 text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                </p>
                <Link href="#" className="text-blue font-bold hover:underline">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

