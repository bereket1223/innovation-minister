import SignupForm from "../components/SignupForm"

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto mt-20 mb-20 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-600  text-center">Sign Up</h1>
      <SignupForm />
    </div>
  )
}

