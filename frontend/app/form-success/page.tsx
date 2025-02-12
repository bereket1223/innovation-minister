import Link from "next/link"

export default function FormSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue">Submission Successful!</h1>
      <p className="text-xl mb-8">Thank you for your submission. We have received your information.</p>
      <Link href="/" className="bg-blue text-white font-bold py-2 px-4 rounded hover:bg-black transition duration-300">
        Return to Home
      </Link>
    </div>
  )
}

